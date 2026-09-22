# 🧠 Cognilab Report Agent

> **A multi-agent AI research system that helps turn a research question into an experiment, analyze the results, and generate a structured research report with a research dashboard.**

## 📌 About the Project

Cognilab Report Agent is a **multi-agent AI research system** built using **Azure AI Foundry**.

The idea behind Cognilab is simple: instead of asking one AI agent to handle the entire research process, the work is divided between multiple specialized agents. Each agent focuses on one stage of the workflow and passes its output to the next stage.

The system takes a research question and moves through **research planning, evidence gathering, hypothesis development, experimentation, critical analysis, and final report generation**.

The final stage also prepares structured information that can be used by a **research dashboard** to present the results in a more accessible way.

---

## 🚀 What Can Cognilab Do?

* Break a research workflow into specialized AI agents
*  Run and structure machine learning experiments
*  Compare experimental results and evaluation metrics
*  Critically analyze experiment outcomes
*  Check whether a hypothesis is supported by the available evidence
*  Identify limitations and missing information
*  Generate a structured final research report
*  Prepare dashboard-ready research results
*  Suggest suitable follow-up experiments
* Pass structured information between agents using JSON
*  Use Azure AI Foundry for agent development and evaluation
*  Provide a backend API using FastAPI
*  Provide a frontend interface using TypeScript

---

## 🏗️ Agent Architecture

Cognilab follows a sequential multi-agent workflow. Each agent has a specific responsibility, and the output from one stage becomes useful input for the next.

| Agent       | Cognilab Agent Name         | Responsibility                                                |
| ----------- | --------------------------- | ------------------------------------------------------------- |
| **Agent 1** | `Cognilab-Research-Agent`   | Research planning and research question                       |
| **Agent 2** | `Cognilab-Hypothesis-Agent` | Research evidence and hypothesis development                  |
| **Agent 3** | `Experiment-Agent3`         | Experiment design, execution, and results                     |
| **Agent 4** | `Cognilab-Analysis-Critic`  | Analysis, critique, responsiveness, and hypothesis assessment |
| **Agent 5** | `Cognilab-Final-Report`     | Final report, application output, and dashboard-ready results |

### 🔄 Overall Workflow

```text
                         Research Question
                                │
                                ▼
                 ┌─────────────────────────┐
                 │         Agent 1         │
                 │ Cognilab-Research-Agent │
                 │ Research Planning       │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │         Agent 2         │
                 │ Cognilab-Hypothesis-   │
                 │ Agent                   │
                 │ Evidence & Hypothesis   │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │         Agent 3         │
                 │ Experiment-Agent3       │
                 │ Experiment & Results   │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │         Agent 4         │
                 │ Cognilab-Analysis-      │
                 │ Critic                  │
                 │ Analysis & Critique     │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │         Agent 5         │
                 │ Cognilab-Final-Report   │
                 │ Final Report &          │
                 │ Dashboard Output        │
                 └────────────┬────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
              Research Report     Research Dashboard
```

---

## 🔬 Example: End-to-End Research Workflow

One of the experimental workflows in the project investigates:

> **Does Random Forest perform better than Logistic Regression on the Breast Cancer Wisconsin dataset?**

The research moves through all five agents.

### Agent 1 — `Cognilab-Research-Agent`

The research agent starts with the initial research problem.

It structures the research question, defines the research direction, and identifies what needs to be investigated.

### Agent 2 — `Cognilab-Hypothesis-Agent`

The hypothesis agent uses the research context to develop the hypothesis and organize supporting research information required for the experiment.

For example:

> **Hypothesis:** Random Forest will perform better than Logistic Regression on the selected classification task.

### Agent 3 — `Experiment-Agent3`

The experiment agent runs the machine learning experiment and records information such as:

* Dataset and data source
* Number of samples and features
* Train/test split
* Random seed
* Baseline model
* Treatment model
* Accuracy
* Precision
* Recall
* F1-score
* Training time

The structured experiment results are then passed to the analysis stage.

### Agent 4 — `Cognilab-Analysis-Critic`

The analysis agent examines what the experimental results actually show.

It compares the models, calculates relevant differences, evaluates the hypothesis, identifies limitations, checks whether statistical claims are justified, and recommends what should be tested next.

It also considers **responsiveness** — whether the agent responds clearly and appropriately to the information and requirements provided in the research workflow.

For example, if the experiment only contains one train/test split, Agent 4 can identify that limitation instead of treating the result as a general conclusion.

### Agent 5 — `Cognilab-Final-Report`

The final report agent brings the complete research record together.

It produces:

* A structured research report
* Executive summary
* Experiment findings
* Analysis and critique
* Limitations
* Conclusion
* Next experiment
* Reproducibility checklist
* Dashboard-ready JSON

The dashboard can then use this structured output to present the research results visually.

---

## 🧩 Agent Responsibilities

### 1. `Cognilab-Research-Agent`

The first agent starts with the research problem.

Its job is to:

* Understand the research topic
* Structure the research question
* Define the research direction
* Identify the main research objective
* Prepare the research plan for the next agent

---

### 2. `Cognilab-Hypothesis-Agent`

The second agent works with the research context and prepares the hypothesis and supporting research information.

Its responsibilities include:

* Reviewing the research question
* Developing a testable hypothesis
* Organizing supporting evidence
* Identifying relevant variables
* Preparing information required for experimentation

---

### 3. `Experiment-Agent3`

This agent focuses on the practical experimentation stage.

Its responsibilities include:

* Preparing the experiment
* Running machine learning models
* Comparing baseline and treatment conditions
* Recording evaluation metrics
* Recording experiment parameters
* Producing structured experiment results

---

### 4. `Cognilab-Analysis-Critic`

This agent critically evaluates the experiment rather than simply repeating the numbers.

Its responsibilities include:

* Comparing experimental results
* Calculating metric differences
* Assessing the hypothesis against observed evidence
* Identifying methodological limitations
* Checking whether statistical claims are justified
* Identifying missing information
* Evaluating **responsiveness** to the provided research context and requirements
* Recommending a follow-up experiment
* Maintaining a clear distinction between observations and interpretations

---

### 5. `Cognilab-Final-Report`

The final agent brings everything together.

It converts the research record, experimental results, and analysis into:

* A structured final research report
* Reproducibility information
* Dashboard-ready JSON
* Application-ready research output

The final output can be consumed by the frontend to display the research workflow and results through a dashboard.

---

## 🧠 Why Use Multiple Agents?

A major idea behind Cognilab is **separation of responsibilities**.

Instead of giving one agent a huge prompt and asking it to research, experiment, analyze, and write everything at once, each stage has its own focused role.

This makes the workflow easier to understand, test, and debug:

```text
Research
   ↓
Hypothesis
   ↓
Experiment
   ↓
Analysis & Critique
   ↓
Final Report
   ↓
Research Dashboard
```

Each agent can also be evaluated independently before the complete pipeline is connected.

---

## 🛠️ Tech Stack

| Technology                       | Used For                                            |
| -------------------------------- | --------------------------------------------------- |
| **Python**                       | Agent implementation                                |
| **Azure AI Foundry**             | Building, managing, and evaluating AI agents        |
| **Azure AI Projects SDK**        | Connecting the application with the Foundry project |
| **InteractiveBrowserCredential** | Azure authentication                                |
| **FastAPI**                      | Backend API                                         |
| **TypeScript**                   | Frontend application                                |
| **JSON**                         | Passing structured data between agents              |
| **scikit-learn**                 | Machine learning experiments                        |
| **Git & GitHub**                 | Version control                                     |

---

## 📁 Project Structure

```text
cognilab-report-agent/
│
├── agent 1/
│   └── ...
│
├── agent 2/
│   └── ...
│
├── agent 3/
│   ├── main.py
│   ├── test_agent.py
│   └── ...
│
├── agent 4/
│   ├── run_agent.py
│   └── ...
│
├── agent 5/
│   ├── dashboard/
│   └── ...
│
├── backend/
│   └── FastAPI application
│
├── frontend/
│   └── TypeScript application
│
├── data/
│   └── ...
│
├── README.md
└── .gitignore
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd cognilab-report-agent
```

### 2. Create a virtual environment

```bash
python -m venv .venv
```

### 3. Activate the virtual environment

On Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure Azure authentication

Cognilab uses Azure's `InteractiveBrowserCredential` for authentication.

```python
from azure.identity import InteractiveBrowserCredential

credential = InteractiveBrowserCredential()
```

When the application requires authentication, the user can authenticate through the browser.

Make sure the required Azure permissions and access to the Azure AI Foundry project are configured before running the agents.

---

## ▶️ Running the Project

The project contains individual agents that can be tested separately as well as application components for the complete workflow.

### Run an agent

Depending on the agent, use its corresponding Python entry point:

```bash
python main.py
```

Agent-specific test scripts can also be used to test individual stages of the research pipeline.

### Run the FastAPI backend

The backend exposes APIs that allow the frontend to communicate with the research agents and retrieve structured research results.

A typical development command is:

```bash
uvicorn main:app --reload
```

### Run the frontend

The frontend is implemented using TypeScript and can be started using the project's configured frontend command.

```bash
npm install
npm run dev
```

---

## 🔐 Security

Never commit sensitive credentials to GitHub.

Do not upload:

* API keys
* Access tokens
* Passwords
* Azure credentials
* Private `.env` files
* Other confidential configuration

Use secure environment variables or Azure authentication mechanisms instead.

---

## 📊 Structured Agent Communication

The agents communicate using structured JSON records.

For example, the research and experiment pipeline can produce a research record like:

```json
{
  "research_question": "...",
  "research_evidence": {},
  "hypothesis": "...",
  "experiment_details": {},
  "baseline_results": {},
  "treatment_results": {},
  "relevant_metrics": {}
}
```

The analysis agent can then convert the experimental information into an analytical result:

```json
{
  "analysis": "...",
  "hypothesis_assessment": "...",
  "critique": "...",
  "responsiveness": "...",
  "limitations": [],
  "conclusion": "...",
  "next_experiment": "..."
}
```

Agent 5 uses the combined research information to generate the final research report and dashboard-ready summary.

---

## 📈 Research Dashboard

The final stage of Cognilab prepares structured information that can be displayed through a **research dashboard**.

The dashboard is intended to make the research workflow easier to understand by presenting information such as:

* Research question
* Hypothesis
* Research evidence
* Experiment configuration
* Model comparison
* Evaluation metrics
* Analysis and critique
* Limitations
* Hypothesis assessment
* Recommended next experiment
* Overall research status

The dashboard is designed to work with the structured output produced by the agents rather than relying on manually entered results.

---

## 🎯 Design Goals

Cognilab is designed around a few important ideas.

### Evidence over assumptions

Agents should work with the information actually provided instead of inventing missing experimental details.

### Clear limitations

If an experiment has limitations, they should be explicitly mentioned rather than hidden.

### Reproducibility

Important experimental details such as datasets, random seeds, model settings, and evaluation metrics should be recorded whenever available.

### Specialized agents

Each agent has a focused responsibility, making the overall workflow easier to understand and test.

### Structured outputs

Using JSON between stages makes it easier for one agent's results to be passed to another agent or consumed by the backend and dashboard.

### Human-readable results

The final research output should be understandable to a researcher while remaining structured enough for software applications to consume.

---

## 🔮 Future Improvements

Some features planned for future versions of Cognilab include:

* 📚 Automated literature search and citation management
* 📊 Advanced experiment tracking and comparison
* 📈 Automatic result visualizations
* 🧪 More advanced statistical analysis
* ⚙️ Hyperparameter optimization
* 🧠 Persistent research memory
* 📋 More advanced research dashboards
* 📄 PDF and academic report export
* 🔁 Automated reproducibility reports
* 🔗 Fully automated end-to-end execution of all five agents
* 🌐 Improved frontend experience for interacting with the research workflow

---

## 📌 Current Status

**Active Development**

The current version focuses on building and testing the core multi-agent research workflow using **Azure AI Foundry**.

The individual agents are being developed and evaluated separately before being connected into the complete research pipeline.

The backend and frontend components are being developed to provide a complete application experience around the multi-agent research workflow.

---

## ⭐ Acknowledgements

Built using **Microsoft Azure AI Foundry** and the Azure AI ecosystem.

Cognilab is being developed as a practical exploration of **multi-agent AI systems, machine learning experimentation, AI-assisted research, structured agent communication, and research applications**.
