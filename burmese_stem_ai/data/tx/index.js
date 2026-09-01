import mongoose from "mongoose";

const isTransactionUnsupportedError = (error) => {
  const message = `${error?.message ?? ""}`;
  return (
    message.includes("Transaction numbers are only allowed on a replica set member or mongos") ||
    message.includes("Transaction support is not available") ||
    error?.codeName === "IllegalOperation"
  );
};

/**
 * Start a transaction, execute the callback, and commit or abort based on success or failure.
 * @param {*} session
 * @param {*} callback
 * @returns {Promise<*>} the result of the callback if successful, or throws an error if failed
 */
export const sessionWithTx = async (session, callback) => {
  let result;
  try {
    await session.withTransaction(async () => {
      result = await callback(session);
    });
  } catch (error) {
    if (!isTransactionUnsupportedError(error)) {
      console.error("Transaction aborted due to an error:", error);
    }
    throw error;
  }
  return result;
};

/**
 * Executes a callback within a transactional context.
 * @param {*} callback
 * @returns {Promise<*>} the result of the callback if successful, or throws an error if failed
 */
export const runWithTx = async (callback) => {
  const session = await mongoose.startSession();
  try {
    try {
      return await sessionWithTx(session, callback);
    } catch (error) {
      if (!isTransactionUnsupportedError(error)) throw error;
      // Standalone MongoDB does not support transactions.
      return await callback(null);
    }
  } finally {
    await session.endSession();
  }
};
