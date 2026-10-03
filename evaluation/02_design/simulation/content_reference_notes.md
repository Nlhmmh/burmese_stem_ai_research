# Frozen simulation content reference notes

Reference set: `SIM-REFERENCES-01`; prepared 2026-10-01 before `SIM-RUN-01` generation. The runner records this file's SHA-256 before its first provider call. Do not change this set after inspecting outputs; amendments require a separately versioned set.

These source-backed expectations are an assessor aid, not completed qualified human judgement. No Burmese terminology has been certified by this document. English STEM competence and Burmese/English linguistic competence must be recorded separately by the human reviewer. All score, assessor and content-conclusion fields remain blank in the review worksheets.

## Fixed expectations

| Base | Expected concept/domain | Key facts within beginner scope | Unacceptable misconceptions | Reference |
| --- | --- | --- | --- | --- |
| SIM01 | Photosynthesis / biology | Plants use light energy, water and carbon dioxide to produce carbohydrates; oxygen is released. Distinguish chemical energy storage from obtaining food from soil. | Soil is the main source of plant sugar; sunlight is matter; plants do not respire. | R01 |
| SIM02 | DNA / biology | DNA comprises nucleotides, carries genetic information and typically forms a double helix with complementary A–T and C–G pairs. | DNA is a protein; every organism's entire DNA sequence is identical; all cells have a nucleus. | R02 |
| SIM03 | Osmosis / biology | Net water movement across a selectively permeable membrane; explain the dilute-to-concentrated direction under ordinary equal-pressure conditions. | Osmosis is the net movement of dissolved solute; no membrane is needed; water never moves in both directions microscopically. | R03 |
| SIM04 | Gravity / physics | Gravitational attraction between masses; near Earth it explains falling and weight. Mass and weight differ. | Gravity exists only on Earth; heavier objects necessarily fall faster in a vacuum. | R04 |
| SIM05 | Electric current / physics | Rate of charge flow, I = ΔQ/Δt, measured in amperes; distinguish conventional current direction and electron motion in metals. | Current equals voltage; charge is used up in a lamp; all charge carriers are electrons. | R05 |
| SIM06 | Momentum / physics | Linear momentum p = mv is a vector; conservation applies to an isolated system with no net external impulse. | Momentum equals kinetic energy; direction is irrelevant; every individual body's momentum is always conserved. | R06 |
| SIM07 | pH / chemistry | Logarithmic acidity measure; dilute aqueous approximation pH = −log10[H3O+]; lower values indicate greater acidity. Neutral pH is about 7 at 25 °C. | pH is linear; a one-unit change means twice the acidity; 0–14 is an absolute universal bound. | R07 |
| SIM08 | Ion / chemistry | An atom or group with net electric charge; cations positive and anions negative; explain electron loss/gain for simple atomic ions. | Charge results from losing the nucleus; all ions are positive; ions and isotopes are equivalent. | R08 |
| SIM09 | Catalyst / chemistry | Alters reaction rate through an alternative mechanism, commonly lower activation energy, and is regenerated overall. | Changes equilibrium constant or final equilibrium position; supplies unlimited energy; is consumed as an ordinary reactant. | R09 |
| SIM10 | OOP inheritance / computing | A derived class reuses and can extend or override accessible behaviour of a base class; distinguish class relationships from biological inheritance. | Java permits arbitrary multiple direct class inheritance; all private members become directly accessible; inheritance is copying DNA. | R10 |
| SIM11 | Algorithm / computing | A well-defined computational procedure for a task, with ordered rules/steps; an example should demonstrate the procedure, not merely rename it. | An algorithm must be AI; every algorithm is fast or optimal; a programming language is itself an algorithm. | R11 |
| SIM12 | Carbon fibre / engineering | Carbon-based reinforcing fibres are often used in polymer composites; high strength/stiffness relative to weight; distinguish fibres from the matrix/composite. | Carbon fibre is a metal; all loads/directions have identical properties; all carbon materials are equivalent. | R12 |
| SIM13 | Ambiguous cell; clarified target biological cell / biology | Initial request lacks domain: controlled clarification or an explicitly qualified interpretation. After fixed clarification, explain cells as basic units of life. | Confident unmarked selection of biology/electrical/spreadsheet meaning; all biological cells possess a nucleus. | R13; ambiguity rule below |
| SIM14 | Ambiguous current; clarified target electric current / physics | Initial request lacks context; preserve ambiguity/qualification. If corrected, apply SIM05 facts. | Unmarked confident choice between electric/water/other current; correction retaining an incompatible meaning. | R05; ambiguity rule below |
| SIM15 | Ambiguous network; clarified target computer network / computing | Initial request lacks context; after clarification, connected computing devices exchange data using communication links/protocols; Internet is one network of networks. | Every network is the Internet; a neural network and a computer network are interchangeable without explanation. | R14; ambiguity rule below |
| SIM16 | Ambiguous inheritance; clarified target OOP inheritance / computing | Initial request lacks domain; after clarification, use SIM10 facts, not genetic inheritance. | Silent selection of biology or programming as uniquely intended; correction retains biological mechanism as OOP explanation. | R10; ambiguity rule below |

## Sources consulted before generation

All links accessed on 2026-10-01. Expectations above are concise paraphrases, not a validated Burmese glossary or an exhaustive marking scheme.

- R01: [OpenStax Biology 2e, 8.1 Overview of Photosynthesis](https://openstax.org/books/biology-2e/pages/8-1-overview-of-photosynthesis).
- R02: [OpenStax Biology 2e, 14.2 DNA Structure and Sequencing](https://openstax.org/books/biology-2e/pages/14-2-dna-structure-and-sequencing).
- R03: [OpenStax Biology 2e, 5.2 Passive Transport](https://openstax.org/books/biology-2e/pages/5-2-passive-transport).
- R04: [OpenStax College Physics 2e, 6.5 Newton's Universal Law of Gravitation](https://openstax.org/books/college-physics-2e/pages/6-5-newtons-universal-law-of-gravitation).
- R05: [OpenStax College Physics 2e, 20.1 Current](https://openstax.org/books/college-physics-2e/pages/20-1-current).
- R06: [OpenStax College Physics 2e, 8.1 Linear Momentum and Force](https://openstax.org/books/college-physics-2e/pages/8-1-linear-momentum-and-force).
- R07: [OpenStax Chemistry 2e, 14.2 pH and pOH](https://openstax.org/books/chemistry-2e/pages/14-2-ph-and-poh).
- R08: [OpenStax Chemistry 2e, 2.6 Ionic and Molecular Compounds](https://openstax.org/books/chemistry-2e/pages/2-6-ionic-and-molecular-compounds).
- R09: [OpenStax Chemistry 2e, 12.7 Catalysis](https://openstax.org/books/chemistry-2e/pages/12-7-catalysis).
- R10: [Oracle Java Tutorials, Inheritance](https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html). Historical JDK 8 tutorial used for stable introductory concepts, not current deployment/API advice.
- R11: [NIST Dictionary of Algorithms and Data Structures, algorithm](https://xlinux.nist.gov/dads/HTML/algorithm.html).
- R12: [US Department of Energy, Long-Term Lightweight Materials Research](https://www.energy.gov/cmei/vehicles/long-term-lightweight-materials-research-magnesium-and-carbon-fiber) and [ARPA-E lightweight composite structures](https://arpa-e.energy.gov/programs-and-initiatives/search-all-projects/energy-efficient-manufacturing-lightweight-composite-architected-structures-transporation-vehicles).
- R13: [OpenStax Biology 2e, 4.1 Studying Cells](https://openstax.org/books/biology-2e/pages/4-1-studying-cells).
- R14: [IBM, What Is Computer Networking?](https://www.ibm.com/think/topics/networking).

## Frozen application oracles versus human judgement

The ambiguity expectation comes from protocol F2, not from a claim that a dictionary proves the learner's intention. An HTTP 422 `AMBIGUOUS_STEM_CONTEXT` with no stored session is a controlled technical outcome; downstream paths are not applicable. A 201 response for an ambiguous query requires human inspection of explicit qualification before F2 can receive a content pass.

Path A: High fades at 0→0 with no provider generation, followed by explicit completion. Path B: Medium/skip creates `another_example` at 0→1, then High fades at 1→1 before completion. Path C: simpler support at 0→1, conceptual clarification at 1→2, then a capped event at 2→2 without a third generation. Language cases require bilingual payload plus override and unchanged profile; rendering itself is not established by payload checks. Concept correction is attempted only if an original ambiguous input has created a session; no rewritten question or fabricated starting session will be substituted.

Human assessment must consider analogy limitations, whether English technical terms are usefully retained, Burmese naturalness and fidelity, revised core meaning, and whether adaptations meaningfully differ from previous support. String inequality alone is not pedagogical adequacy. Score each initial/adaptation separately: 2 adequate, 1 limited/minor issue, 0 material error/absent, NA not assessable. Required 0 fails; 1 supports only Partial; required NA prevents full judgement. Do not give fade/cap a generated-content score when no content was generated.
