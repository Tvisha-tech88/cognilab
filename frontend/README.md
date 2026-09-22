# Cognilab — Production Frontend

The official web frontend for **Cognilab**, an autonomous AI research experimentation platform that converts open scientific questions into verifiable literature evidence, testable hypotheses, and deterministically structured experiments.

Engineered with an **"Editorial Research Laboratory"** visual identity (Instrument Serif + Manrope, archival paper textures, deep ink typography, burnt coral and sage accents) that treats scientific investigation as a rigorous laboratory workflow rather than a chatbot conversation.

---

## 1. Prerequisites

- **Node.js**: v18.0.0 or later (tested on v24.14.0)
- **npm**: v9.0.0 or later (tested on v11.9.0)
- **Cognilab Backend**: Running FastAPI service at `http://127.0.0.1:8000`

---

## 2. Installation

Navigate to the `frontend/` directory from the repository root:

```bash
cd frontend
npm install
```

---

## 3. Environment Variables

The application relies on one centralized environment variable:

| Variable | Description | Default Fallback |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | Base URL of the Cognilab FastAPI backend | `http://127.0.0.1:8000` |

Copy the provided example file:

```bash
cp .env.example .env
```

To point the frontend to a remote or deployed backend, update `.env`:

```ini
VITE_API_BASE_URL=https://api.cognilab.yourdomain.com
```

*Note: In Vite, only variables prefixed with `VITE_` are exposed to the client bundle. Never place Azure secrets, client credentials, or API keys in the frontend environment.*

---

## 4. Development Workflow

Start the local Vite development server with hot-module replacement (HMR):

```bash
npm run dev
```

The application will be available at:
```
http://localhost:5173
```

---

## 5. Production Build & Verification

Compile and bundle the production assets using TypeScript and Vite:

```bash
npm run build
```

This compiles TypeScript (`tsc`), runs PostCSS/Tailwind, and creates optimized, minified static files in `frontend/dist/`.

---

## 6. Previewing the Production Build

Test the compiled production bundle locally before deploying:

```bash
npm run preview
```

Vite will serve the `dist/` directory at `http://localhost:4173`.

---

## 7. Backend Integration & Requirements

The frontend integrates directly with the Cognilab FastAPI backend:

- **Endpoint**: `POST /api/research`
- **Request Payload**:
  ```json
  {
    "research_question": "Does increasing the embedding dimension of a text embedding model improve semantic retrieval performance?"
  }
  ```
- **Response Format**:
  ```json
  {
    "run_id": "<uuid>",
    "status": "completed",
    "research_question": "...",
    "result": {
      "research": { "research_evidence": { ... } },
      "experiment": { "experiment_plan": { ... } }
    }
  }
  ```

### Starting the FastAPI Backend
From the Cognilab project root:

```bash
uvicorn backend.main:app --reload --port 8000
```

---

## 8. Application Flow & Architecture

The application is structured into modular domains:

```
src/
├── components/
│   ├── common/         # Masthead, Navigation, Footer, Error diagnostics
│   ├── landing/        # Hero, 5-Agent visualizer, Curated inquiries
│   ├── research/       # Inquiry textarea, Timeline progress, Recent history
│   ├── dossier/        # 9-section archival Research Dossier
│   └── workflow/       # 5-Agent pipeline architecture and spec cards
├── pages/
│   ├── LandingPage.tsx # Introduction & high-level architecture
│   ├── ResearchPage.tsx# Interactive laboratory workspace
│   ├── WorkflowPage.tsx# Deep-dive 5-agent specifications
│   └── AboutPage.tsx   # Scientific philosophy & methodology
├── config/             # Centralized API URLs
├── services/           # Abortable HTTP client (submitResearch)
├── hooks/              # State coordinator (useResearch)
├── utils/              # Error humanizer, local storage, date formatting
├── types/              # TypeScript definitions for backend schemas
├── App.tsx             # Main view router
└── main.tsx            # React root entry
```

### The Five-Agent Pipeline
1. **01 Research Agent** *(Active)*: Literature synthesis, evidence claims, gap analysis.
2. **02 Hypothesis Agent** *(Active)*: Formulates testable $H_1$ hypothesis and 10-parameter experiment plan verified by deterministic code validator.
3. **03 Resource Discovery Agent** *(Upcoming)*: Maps dataset & model constraints to benchmarks.
4. **04 Experiment Agent** *(Upcoming)*: Executes comparative trials.
5. **05 Analysis Agent** *(Upcoming)*: Computes statistical significance and publication artifacts.

---

## 9. Production Deployment

The frontend outputs purely static HTML, JavaScript, and CSS in `frontend/dist/`.

### Deploying to Vercel / Netlify / Cloudflare Pages:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Root Directory**: `frontend`
- **Environment Variable**: `VITE_API_BASE_URL` set to your backend URL.
