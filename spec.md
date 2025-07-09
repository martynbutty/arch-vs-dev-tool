# Architecture vs Design Decision Helper

## Purpose

A browser-based tool to help software architects determine whether a decision should be made at the architectural level or deferred to the development team. The tool guides users through four structured questions and provides a recommendation on a scale from A to D.

---

## User Flow

1. Architect answers four structured questions.
2. Tool calculates a score (A–D) based on responses.
3. A breakdown is shown for each category.
4. Architect can edit responses and re-score.
5. Results can be exported as a Markdown file.

---

## Scoring Categories and Criteria

Each question maps to a score from **A** to **D**:

| Score | Meaning |
|-------|---------|
| A     | Strong architectural decision |
| B     | Likely architectural, borderline |
| C     | Likely development team, borderline |
| D     | Strong development team decision |

---

### 1. Structural vs. Code

> *Does this decision affect the structure of the system (e.g. components, deployment units, communication patterns), or is it limited to how source code is written or organized?*

| Score | Description |
|-------|-------------|
| A     | Significant structural changes (e.g. new architectural style, major component reorganization) |
| B     | Some structural changes (e.g. new deployment units, added communication paths) |
| C     | Mostly code movement or reorganization |
| D     | Simple refactoring or new functions |

---

### 2. Strategic vs. Tactical

> *How many people need to be involved in making this decision, and how long will it take to reach consensus?*

| Score | Description |
|-------|-------------|
| A     | Many people involved, decision takes weeks or months |
| B     | 3+ people involved, takes at least a couple of weeks |
| C     | Few people involved, decision within two weeks |
| D     | 1–2 people, decision in a few days |

---

### 3. Effort

> *What is the estimated level of effort required to implement this decision?*

| Score | Description |
|-------|-------------|
| A     | High effort (e.g. breaking up monolith, separating data stores) |
| B     | Significant effort (e.g. creating new deployment units) |
| C     | Moderate effort (e.g. moving lots of source code) |
| D     | Simple changes |

---

### 4. Trade-offs

> *Does this decision involve significant trade-offs that could impact scalability, performance, cost, or maintainability?*

| Score | Description |
|-------|-------------|
| A     | Major trade-offs (e.g. performance, data integrity, distributed transactions, but gains in agility/extensibility) |
| B     | Subset of A’s trade-offs |
| C     | Minor but noticeable trade-offs |
| D     | No significant architectural trade-offs |

---

## Scoring Logic

- A = 1, B = 2, C = 3, D = 4
- Final score = average of the four category scores
- Round to nearest whole number
- Map back to A–D

---

## Output

- Final A–D recommendation
- Breakdown of each category with score and rationale
- Option to export results as a Markdown file

---

## Features

- Editable after scoring
- Export to Markdown
- No preloaded examples (for now)
