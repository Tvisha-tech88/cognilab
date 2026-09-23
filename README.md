# 🧠 Cognilab Report Agent

> **A multi-agent AI research system that turns a research question into structured evidence, experiments, critical analysis, and a final research report.**

## 📌 About the Project

**Cognilab Report Agent** is a multi-agent AI research system built using **Azure AI Foundry**.

Instead of asking a single AI agent to handle the complete research process, Cognilab divides the workflow into specialized agents. Each agent is responsible for a specific stage of the research lifecycle, and the output from one stage is passed to the next.

The workflow covers **research planning, hypothesis development, resource discovery, experimentation, analysis, critique, and final report generation**.

The goal is to make the research process more structured, evidence-driven, and easier to reproduce.

---

## 🚀 What Cognilab Does

Cognilab can:

*  Break a research question into specialized research tasks
*  Discover relevant research resources and supporting information
*  Generate and structure research hypotheses
*  Design and execute experiments
*  Produce structured experimental results
*  Analyze experimental outcomes
*  Critically evaluate evidence and methodology
*  Identify limitations and missing information
*  Recommend follow-up experiments
*  Generate a structured final research report

---

## 🏗️ Multi-Agent Architecture

Cognilab uses a sequential multi-agent architecture where each stage builds on the output of the previous stage.

| Agent       | Name                        | Responsibility                                                             |
| ----------- | --------------------------- | -------------------------------------------------------------------------- |
| **Agent 1** | `cognilab-research-agent`   | Research planning and research question analysis                           |
| **Agent 2** | `cognilab-hypothesis-agent` | Hypothesis generation and research direction                               |
| **Agent 3** | `experiment-agent3`         | Experiment design, execution, and structured results                       |
| **Agent 4** |  `cognilab-analysis-critic` | Analysis, critique, responsiveness, limitations, and hypothesis assessment |
| **Agent 5** | `cognilab-final-report`     | Final research report generation                                           |

### 🔄 Overall Workflow


                    Research Question
                           │
                           ▼
              ┌─────────────────────────┐
              │         Agent 1         │
              │ cognilab-research-agent │
              │   Research Planning     │
              └────────────┬────────────┘
                           │
                           ▼
              ┌──────────────────────────┐
              │         Agent 2          │
              │ cognilab-hypothesis-agent│
              │  Hypothesis Development  │
              └────────────┬─────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │     Resource Discovery │
              │         Agent         │
              │ Resources & Evidence   │
              └────────────┬────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │         Agent 3         │
              │     experiment-agent3   │
              │ Experimentation & Data  │
              └────────────┬────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │         Agent 4         │
              │ cognilab-analysis-critic│
              │ Analysis & Critical     │
              │ Evaluation              │
              └────────────┬────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │         Agent 5         │
              │  cognilab-final-report  │
              │    Final Research       │
              │         Report          │
              └─────────────────────────┘
```

---

## 🔬 Example Research Workflow

Consider a research question:

> **Does Random Forest perform better than Logistic Regression on the Breast Cancer Wisconsin dataset?**

### 1. Research Agent

`cognilab-research-agent` first understands the research question and structures the research objective.

It can identify:

* Research problem
* Research objective
* Key variables
* Required evidence
* Potential experimental direction

### 2. Hypothesis Agent

`cognilab-hypothesis-agent` uses the research objective to formulate a testable hypothesis.

For example:

> Random Forest will achieve better classification performance than Logistic Regression on the selected dataset.

The agent can also structure the null and alternative hypotheses when required.

### 3. Resource Discovery Agent

The **Resource Discovery Agent** identifies useful resources and supporting information required for the research workflow.

It uses the **Hugging Face API** to discover relevant machine learning resources, models, datasets, and related information that can support the research and experimentation stages. Hugging Face provides access to models and datasets that agents can search and explore programmatically.

This stage can provide:

* Dataset-related information
* Relevant models from Hugging Face
* Research and technical resources
* Model documentation
* Supporting evidence
* Dataset information for experiments
* Context required for experimentation

The discovered resources are then passed forward in the workflow so that the experimentation stage can use relevant datasets, models, and supporting information.

**Technology used:** Hugging Face API / Hugging Face Hub


### 4. Experiment Agent

`experiment-agent3` uses the research context, hypothesis, and discovered resources to execute the experiment.

The experiment record can include:

* Dataset information
* Number of samples
* Number of features
* Train/test split
* Random seed
* Model configuration
* Baseline model
* Treatment model
* Accuracy
* Precision
* Recall
* F1-score
* Training time

### 5. Analysis & Critic Agent

`cognilab-analysis-critic` evaluates the experimental evidence rather than simply repeating the results.

It can identify:

* Performance differences between models
* Absolute and relative metric changes
* Whether the hypothesis is supported by the observed evidence
* Experimental limitations
* Missing methodological information
* Whether statistical significance can actually be claimed
* Potential weaknesses in the experiment
* A concrete next experiment

It also focuses on **responsiveness** — ensuring that the analysis directly addresses the research question, user request, and available experimental evidence instead of producing unrelated or generic analysis.

### 6. Final Report Agent

`cognilab-final-report` consolidates the complete research record into a structured research report.

The report can contain:

1. Executive Summary
2. Research Question
3. Research Evidence
4. Hypothesis
5. Experiment Design
6. Experiment Results
7. Analysis & Critique
8. Limitations
9. Conclusion
10. Next Experiment
11. Reproducibility Information

---

## 🧠 Agent Responsibilities

### `cognilab-research-agent`

Responsible for understanding and structuring the initial research problem.

**Main responsibilities:**

* Research question analysis
* Research objective identification
* Problem decomposition
* Research planning
* Identification of required information

---

### `cognilab-hypothesis-agent`

Responsible for converting the research objective into a structured, testable hypothesis.

**Main responsibilities:**

* Hypothesis generation
* Variable identification
* Expected outcome definition
* Research direction
* Experimental hypothesis structure

---

### `resource-discovery-agent`

Responsible for finding resources and supporting information needed for the research workflow.

**Main responsibilities:**

* Resource discovery
* Evidence gathering
* Dataset/resource identification
* Supporting information
* Research context collection

---

### `experiment-agent3`

Responsible for translating the research hypothesis into an executable experiment.

**Main responsibilities:**

* Experiment design
* Dataset preparation
* Model configuration
* Experiment execution
* Metric calculation
* Structured experiment output
* Reproducibility information

---

### `cognilab-analysis-critic`

Responsible for critically evaluating experimental results.

**Main responsibilities:**

1. Baseline vs treatment comparison
2. Absolute and relative metric differences
3. Hypothesis assessment
4. Evidence-based analysis
5. Experimental critique
6. Limitation identification
7. Statistical-evidence checks
8. Responsiveness to the research question
9. Next-experiment recommendation

The agent is designed to avoid unsupported conclusions, especially claims about statistical significance when the available experiment does not provide sufficient evidence.

---

### `cognilab-final-report`

Responsible for converting the complete research record into a readable final report.

**Main responsibilities:**

* Research summary
* Experiment documentation
* Results consolidation
* Analysis integration
* Limitations
* Conclusions
* Next-experiment recommendations
* Reproducibility information

---

## 🛠️ Technology Stack

| Technology                | Purpose                                         |
| ------------------------- | ----------------------------------------------- |
| **Python**                | Agent implementation and research logic         |
| **TypeScript**            | Frontend development                            |
| **FastAPI**               | Backend API and communication layer             |
| **Azure AI Foundry**      | AI agents and orchestration                     |
| **Azure AI Projects SDK** | Azure AI project and agent interaction          |
| **Azure Identity**        | Azure authentication                            |
| **Azure AI Agent Server** | Local agent serving                             |
| **Hugging Face API**      | Resource discovery, model and dataset retrieval |
| **JSON**                  | Structured agent-to-agent communication         |
| **scikit-learn**          | Machine learning experiments                    |
| **Git & GitHub**          | Version control                                 |


---

## 📁 Project Structure

```text
cognilab/
│
├── agents/
│   ├── research-agent/
│   ├── hypothesis-agent/
│   ├── resource-discovery-agent/
│   ├── experiment-agent3/
│   ├── analysis-critic/
│   └── final-report/
│
├── backend/
│   └── FastAPI backend
│
├── frontend/
│   └── TypeScript frontend
│
├── resource_discovery/
│   └── ...
│
├── auth.py
├── pipeline.py
├── requirements.txt
├── test_agent.py
├── test_hypothesis.py
├── test_pipeline.py
├── test_research.py
├── test_validator.py
└── README.md
```

---

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd cognilab
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

### 3. Activate the virtual environment

**Windows PowerShell:**

```powershell
.\.venv\Scripts\Activate.ps1
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

---

## 🔐 Authentication

The project uses Azure authentication through the Azure Identity library.

The current implementation uses an interactive browser-based authentication flow where required.

Example:

```python
from azure.identity import InteractiveBrowserCredential

credential = InteractiveBrowserCredential()
```

Make sure the authenticated Azure account has the required permissions for the Azure AI Foundry project and associated resources.

### ⚠️ Security

Do **not** commit:

* API keys
* Passwords
* Access tokens
* `.env` files containing secrets
* Azure credentials
* Private configuration files

Use environment variables or Azure authentication mechanisms instead.

---

## ▶️ Running the Project

### Run an Agent

For an Agent Server based agent:

```bash
python main.py
```

The local agent server can expose the configured Responses API on the specified local port.

### Run the Backend

The backend is implemented using **FastAPI**.

A typical development command is:

```bash
uvicorn main:app --reload
```

The exact command may vary depending on the backend entry point.

### Run the Frontend

The frontend is built using **TypeScript**.

Install the frontend dependencies and start the development server according to the frontend configuration.

---

## 📊 Structured Agent Communication

Agents communicate using structured research records and JSON.

A typical experiment record can contain:

```json
{
  "research_question": "...",
  "hypothesis": "...",
  "experiment_details": {},
  "baseline_results": {},
  "treatment_results": {},
  "relevant_metrics": {}
}
```

The Analysis & Critic Agent can transform this into:

```json
{
  "analysis": "...",
  "hypothesis_assessment": "...",
  "critique": "...",
  "limitations": [],
  "conclusion": "...",
  "next_experiment": "..."
}
```

The Final Report Agent then uses the accumulated research information to generate the final structured research report.

---

## 🎯 Design Principles

### Evidence-driven analysis

Agents should base conclusions on the experimental information and available evidence instead of inventing missing results.

### Explicit uncertainty

Missing information, limitations, and methodological gaps should be clearly identified.

### Reproducibility

Experiments should record important parameters such as dataset, random seed, model configuration, and evaluation metrics whenever available.

### Separation of responsibilities

Each agent has a specialized responsibility instead of asking a single model to perform the entire research workflow.

### Structured communication

Agents communicate through structured research records and JSON, making the workflow easier to process and extend.

### Critical evaluation

The system separates experimentation from analysis so that experimental results can be independently reviewed and critically evaluated.

---

## 🔮 Future Improvements

Potential extensions include:

* Automated literature retrieval and citation management
* Advanced experiment tracking
* Multiple experiment comparison
* Statistical significance testing
* Hyperparameter optimization
* Persistent research memory
* Automated visualization generation
* Reproducibility reports
* Export to PDF and academic report formats
* Improved multi-agent orchestration
* Advanced research workflow automation

---

## 📌 Project Status

**Active development**

Cognilab is currently focused on building and testing a multi-agent research workflow using **Azure AI Foundry**, with specialized agents for research planning, hypothesis development, resource discovery, experimentation, critical analysis, and final report generation.

---

## ⭐ Acknowledgements

Built using Microsoft's Azure AI ecosystem and **Azure AI Foundry**.
