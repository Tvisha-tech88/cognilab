import json
import os
import time
from typing import Any, Dict

import numpy as np
import sklearn

from dotenv import load_dotenv
from azure.identity import InteractiveBrowserCredential

from agent_framework import Agent, tool
from agent_framework.foundry import FoundryChatClient
from agent_framework_foundry_hosting import ResponsesHostServer

from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
)


# ============================================================
# CONFIGURATION
# ============================================================

load_dotenv()

TENANT_ID = "TENANT_ID"

client = FoundryChatClient(
    project_endpoint=os.environ["FOUNDRY_PROJECT_ENDPOINT"],
    model=os.environ["AZURE_AI_MODEL_DEPLOYMENT_NAME"],
    credential=InteractiveBrowserCredential(
        tenant_id=TENANT_ID
    ),
)


# ============================================================
# PARSE EXPERIMENT PLAN
# ============================================================

def parse_experiment_plan(
    experiment_plan: str,
) -> Dict[str, Any]:

    if not isinstance(experiment_plan, str):
        raise TypeError(
            "experiment_plan must be a JSON string."
        )

    experiment_plan = experiment_plan.strip()

    if not experiment_plan:
        raise ValueError(
            "experiment_plan cannot be empty."
        )

    try:
        plan = json.loads(experiment_plan)
    except json.JSONDecodeError as exc:
        raise ValueError(
            f"Invalid experiment_plan JSON: {exc}"
        ) from exc

    if not isinstance(plan, dict):
        raise ValueError(
            "experiment_plan must be a JSON object."
        )

    return plan


# ============================================================
# NORMALIZE EXPERIMENT PLAN
# ============================================================

def normalize_experiment_plan(
    raw_plan: Dict[str, Any],
) -> Dict[str, Any]:

    # --------------------------------------------------------
    # Locate experiment
    # --------------------------------------------------------

    if "experiment" in raw_plan:
        experiment = raw_plan["experiment"]
    else:
        # Also accept a plan where experiment fields are at
        # the top level.
        experiment = raw_plan

    if not isinstance(experiment, dict):
        raise ValueError(
            "Experiment specification must be an object."
        )

    # --------------------------------------------------------
    # Hypothesis
    # --------------------------------------------------------

    hypothesis = (
        experiment.get("hypothesis")
        or raw_plan.get("hypothesis")
        or ""
    )

    # --------------------------------------------------------
    # Task
    # --------------------------------------------------------

    task = experiment.get(
        "task",
        "binary classification",
    )

    # ========================================================
    # DATASET NORMALIZATION
    # ========================================================

    dataset_requirements_input = (
        experiment.get("dataset_requirements")
        or {}
    )

    if not isinstance(
        dataset_requirements_input,
        dict,
    ):
        dataset_requirements_input = {}

    # Prefer concrete dataset specifications.
    #
    # dataset_choice:
    #     concrete resource selected by Agent 3/Agent 2
    #
    # dataset:
    #     concrete resource specification
    #
    # dataset_requirements:
    #     generic resource requirements

    dataset_source = (
        experiment.get("dataset_choice")
        or experiment.get("dataset")
        or dataset_requirements_input
    )

    if not isinstance(
        dataset_source,
        dict,
    ):
        dataset_source = {}

    # --------------------------------------------------------
    # Dataset parameters
    # --------------------------------------------------------

    dataset_params = (
        dataset_source.get("params")
        or dataset_source.get("parameters")
        or {}
    )

    if not isinstance(
        dataset_params,
        dict,
    ):
        dataset_params = {}

    # --------------------------------------------------------
    # Dataset generator
    # --------------------------------------------------------

    generator = (
        dataset_source.get("generator")
        or dataset_source.get("method")
        or dataset_source.get("type")
    )

    library = dataset_source.get(
        "library",
        "",
    )

    # Normalize known representations.

    if (
        library == "sklearn"
        and generator == "make_classification"
    ):
        generator = (
            "sklearn.datasets.make_classification"
        )

    elif generator == "make_classification":
        generator = (
            "sklearn.datasets.make_classification"
        )

    elif generator == (
        "sklearn.datasets.make_classification"
    ):
        generator = (
            "sklearn.datasets.make_classification"
        )

    # ========================================================
    # RESOURCE DISCOVERY FOR DATASET
    # ========================================================

    # If Agent 2 only provided requirements such as:
    #
    # modality = tabular
    # task_type = binary classification
    # minimum_samples = 500
    #
    # Agent 3 resolves those requirements to the supported
    # executable dataset generator.

    if generator is None:

        modality = str(
            dataset_requirements_input.get(
                "modality",
                "",
            )
        ).lower()

        task_type = str(
            dataset_requirements_input.get(
                "task_type",
                task,
            )
        ).lower()

        minimum_samples = (
            dataset_requirements_input.get(
                "minimum_samples",
                500,
            )
        )

        # Current supported resource:
        #
        # sklearn.datasets.make_classification
        #
        # It is appropriate for tabular binary
        # classification requirements.

        if (
            "tabular" in modality
            and "classification" in task_type
        ):

            generator = (
                "sklearn.datasets.make_classification"
            )

            # Build a deterministic executable resource
            # from the requirements.

            dataset_params = {
                "n_samples": max(
                    int(minimum_samples),
                    1000,
                ),

                "n_features": 20,

                "n_informative": 5,

                "n_redundant": 2,

                "n_repeated": 0,

                "n_classes": 2,

                "weights": [0.5, 0.5],

                "flip_y": 0.01,

                "class_sep": 1.0,

                "random_state": 42,
            }

        else:

            raise ValueError(
                "No supported executable dataset could be "
                "resolved from the dataset requirements."
            )

    # --------------------------------------------------------
    # Canonical dataset requirements
    # --------------------------------------------------------

    dataset_requirements = {
        "type": (
            dataset_source.get(
                "type"
            )
            or "synthetic"
        ),

        "generator": generator,

        "n_samples": dataset_params.get(
            "n_samples",
            dataset_source.get(
                "n_samples"
            ),
        ),

        "n_features": dataset_params.get(
            "n_features",
            dataset_source.get(
                "n_features"
            ),
        ),

        "n_informative": dataset_params.get(
            "n_informative",
            dataset_source.get(
                "n_informative"
            ),
        ),

        "n_redundant": dataset_params.get(
            "n_redundant",
            dataset_source.get(
                "n_redundant"
            ),
        ),

        "n_repeated": dataset_params.get(
            "n_repeated",
            dataset_source.get(
                "n_repeated"
            ),
        ),

        "n_classes": dataset_params.get(
            "n_classes",
            dataset_source.get(
                "n_classes"
            ),
        ),

        "weights": dataset_params.get(
            "weights",
            dataset_source.get(
                "weights"
            ),
        ),

        "class_sep": dataset_params.get(
            "class_sep",
            dataset_source.get(
                "class_sep"
            ),
        ),

        "flip_y": dataset_params.get(
            "flip_y",
            dataset_source.get(
                "flip_y"
            ),
        ),

        "random_state": dataset_params.get(
            "random_state",
            dataset_source.get(
                "random_state"
            ),
        ),
    }

    # Remove unspecified values.

    dataset_requirements = {
        key: value
        for key, value in dataset_requirements.items()
        if value is not None
    }

    # ========================================================
    # MODEL NORMALIZATION
    # ========================================================

    models = (
        experiment.get("models")
        or {}
    )

    if not isinstance(
        models,
        dict,
    ):
        models = {}

    model_requirements = (
        experiment.get("model_requirements")
        or {}
    )

    if not isinstance(
        model_requirements,
        dict,
    ):
        model_requirements = {}

    # --------------------------------------------------------
    # Resolve model from Agent 2's natural-language
    # condition.
    # --------------------------------------------------------

    def resolve_requested_model(
        requested_name: str,
        role: str,
    ) -> Dict[str, Any]:

        if not requested_name:
            raise ValueError(
                f"{role} model specification is missing."
            )

        name = (
            str(requested_name)
            .lower()
            .strip()
        )

        # Logistic Regression

        if (
            "logistic regression" in name
            or "logisticregression" in name
        ):

            return {
                "name": "LogisticRegression",

                "library": (
                    "sklearn.linear_model"
                ),

                "params": {
                    "max_iter": 1000,
                    "random_state": 42,
                },
            }

        # Random Forest

        if (
            "random forest" in name
            or "randomforestclassifier" in name
        ):

            return {
                "name": "RandomForestClassifier",

                "library": (
                    "sklearn.ensemble"
                ),

                "params": {
                    "n_estimators": 100,
                    "random_state": 42,
                },
            }

        raise ValueError(
            f"Unsupported {role} model requested by "
            f"Agent 2: {requested_name}"
        )

    # --------------------------------------------------------
    # Explicit model objects first
    # --------------------------------------------------------

    baseline = models.get(
        "baseline"
    )

    treatment = models.get(
        "treatment"
    )

    # --------------------------------------------------------
    # Resolve from baseline condition
    # --------------------------------------------------------

    if baseline is None:

        baseline_info = (
            experiment.get(
                "baseline"
            )
            or {}
        )

        if isinstance(
            baseline_info,
            dict,
        ):

            baseline_condition = (
                baseline_info.get(
                    "condition"
                )
            )

        else:

            baseline_condition = (
                baseline_info
            )

        if baseline_condition:

            baseline = resolve_requested_model(
                baseline_condition,
                "Baseline",
            )

    # --------------------------------------------------------
    # Resolve from treatment condition
    # --------------------------------------------------------

    if treatment is None:

        treatment_info = (
            experiment.get(
                "treatment"
            )
            or {}
        )

        if isinstance(
            treatment_info,
            dict,
        ):

            treatment_condition = (
                treatment_info.get(
                    "condition"
                )
            )

        else:

            treatment_condition = (
                treatment_info
            )

        if treatment_condition:

            treatment = resolve_requested_model(
                treatment_condition,
                "Treatment",
            )

    # --------------------------------------------------------
    # Explicit model requirements fallback
    # --------------------------------------------------------

    if baseline is None:

        baseline = (
            model_requirements.get(
                "baseline_model"
            )
        )

    if treatment is None:

        treatment = (
            model_requirements.get(
                "treatment_model"
            )
        )

    # --------------------------------------------------------
    # Validate model objects
    # --------------------------------------------------------

    if not isinstance(
        baseline,
        dict,
    ):
        raise ValueError(
            "Baseline model specification is missing."
        )

    if not isinstance(
        treatment,
        dict,
    ):
        raise ValueError(
            "Treatment model specification is missing."
        )

    # --------------------------------------------------------
    # Normalize parameter names
    # --------------------------------------------------------

    baseline_params = (
        baseline.get("params")
        or baseline.get("parameters")
        or {}
    )

    treatment_params = (
        treatment.get("params")
        or treatment.get("parameters")
        or {}
    )

    if not isinstance(
        baseline_params,
        dict,
    ):
        baseline_params = {}

    if not isinstance(
        treatment_params,
        dict,
    ):
        treatment_params = {}

    baseline_name = (
        baseline.get("name")
        or baseline.get("class")
    )

    treatment_name = (
        treatment.get("name")
        or treatment.get("class")
    )

    canonical_baseline = {
        "name": baseline_name,

        "library": (
            baseline.get("module")
            or baseline.get("library")
            or baseline.get("type")
            or ""
        ),

        "params": baseline_params,
    }

    canonical_treatment = {
        "name": treatment_name,

        "library": (
            treatment.get("module")
            or treatment.get("library")
            or treatment.get("type")
            or ""
        ),

        "params": treatment_params,
    }

    canonical_model_requirements = {
        "baseline_model": canonical_baseline,
        "treatment_model": canonical_treatment,
    }

    # ========================================================
    # TRAIN / TEST SPLIT
    # ========================================================

    split = experiment.get(
        "train_test_split",
        {},
    )

    if not isinstance(
        split,
        dict,
    ):
        split = {}

    test_size = split.get(
        "test_size",
        0.2,
    )

    split_random_state = split.get(
        "random_state",
        dataset_requirements.get(
            "random_state",
            42,
        ),
    )

    # ========================================================
    # METRICS
    # ========================================================

    metrics = experiment.get(
        "metrics",
        [
            "accuracy",
            "precision",
            "recall",
            "f1_score",
            "training_time",
        ],
    )

    # ========================================================
    # CONTROLS
    # ========================================================

    controls = experiment.get(
        "controls",
        {},
    )

    if not isinstance(
        controls,
        dict,
    ):
        controls = {}

    # ========================================================
    # EXECUTION REQUIREMENTS
    # ========================================================

    execution_requirements = experiment.get(
        "execution_requirements",
        [
            "Python",
            "scikit-learn",
        ],
    )

    # ========================================================
    # RETURN CANONICAL PLAN
    # ========================================================

    return {
        "hypothesis": hypothesis,

        "experiment": {
            "task": task,

            "dataset_requirements": (
                dataset_requirements
            ),

            "model_requirements": (
                canonical_model_requirements
            ),

            "train_test_split": {
                "test_size": test_size,
                "random_state": split_random_state,
            },

            "metrics": metrics,

            "controls": controls,

            "execution_requirements": (
                execution_requirements
            ),
        },
    }


# ============================================================
# DATASET EXECUTION
# ============================================================

def resolve_dataset(
    requirements: Dict[str, Any],
) -> Dict[str, Any]:

    generator = requirements.get(
        "generator"
    )

    if generator != (
        "sklearn.datasets.make_classification"
    ):

        raise ValueError(
            "Unsupported dataset requested by Agent 2: "
            f"{generator!r}"
        )

    # --------------------------------------------------------
    # Required parameters
    # --------------------------------------------------------

    required = [
        "n_samples",
        "n_features",
        "n_informative",
        "n_redundant",
        "n_repeated",
        "n_classes",
        "class_sep",
        "flip_y",
        "random_state",
    ]

    missing = [
        key
        for key in required
        if key not in requirements
    ]

    if missing:

        raise ValueError(
            "Dataset specification is missing: "
            + ", ".join(missing)
        )

    # --------------------------------------------------------
    # Build generator parameters
    # --------------------------------------------------------

    params = {
        "n_samples": requirements[
            "n_samples"
        ],

        "n_features": requirements[
            "n_features"
        ],

        "n_informative": requirements[
            "n_informative"
        ],

        "n_redundant": requirements[
            "n_redundant"
        ],

        "n_repeated": requirements[
            "n_repeated"
        ],

        "n_classes": requirements[
            "n_classes"
        ],

        "class_sep": requirements[
            "class_sep"
        ],

        "flip_y": requirements[
            "flip_y"
        ],

        "random_state": requirements[
            "random_state"
        ],
    }

    if requirements.get(
        "weights"
    ) is not None:

        params["weights"] = requirements[
            "weights"
        ]

    # --------------------------------------------------------
    # Execute actual dataset generator
    # --------------------------------------------------------

    X, y = make_classification(
        **params
    )

    return {
        "X": X,
        "y": y,

        "metadata": {
            "name": (
                "Synthetic Classification Dataset"
            ),

            "generator": (
                "sklearn.datasets.make_classification"
            ),

            **params,
        },
    }


# ============================================================
# MODEL EXECUTION
# ============================================================

def build_model(
    model_spec: Dict[str, Any],
):

    name = model_spec.get(
        "name"
    )

    params = (
        model_spec.get("params")
        or {}
    )

    if not isinstance(
        params,
        dict,
    ):
        params = {}

    # --------------------------------------------------------
    # Logistic Regression
    # --------------------------------------------------------

    if name == "LogisticRegression":

        return LogisticRegression(
            **params
        )

    # --------------------------------------------------------
    # Random Forest
    # --------------------------------------------------------

    if name == "RandomForestClassifier":

        return RandomForestClassifier(
            **params
        )

    raise ValueError(
        "Unsupported model requested by Agent 2: "
        f"{name}"
    )


# ============================================================
# METRICS
# ============================================================

def calculate_metrics(
    y_true,
    predictions,
    training_time,
    model_name,
):

    return {
        "model": model_name,

        "accuracy": round(
            accuracy_score(
                y_true,
                predictions,
            ),
            4,
        ),

        "precision": round(
            precision_score(
                y_true,
                predictions,
                average="binary",
                zero_division=0,
            ),
            4,
        ),

        "recall": round(
            recall_score(
                y_true,
                predictions,
                average="binary",
                zero_division=0,
            ),
            4,
        ),

        "f1_score": round(
            f1_score(
                y_true,
                predictions,
                average="binary",
                zero_division=0,
            ),
            4,
        ),

        "training_time_seconds": round(
            training_time,
            4,
        ),
    }


# ============================================================
# EXPERIMENT EXECUTION
# ============================================================

def execute_experiment(
    plan: Dict[str, Any],
) -> Dict[str, Any]:

    experiment = plan[
        "experiment"
    ]

    # ========================================================
    # TASK
    # ========================================================

    task = str(
        experiment.get(
            "task",
            "",
        )
    ).lower()

    if "classification" not in task:

        raise ValueError(
            "Only classification experiments "
            "are currently supported."
        )

    # ========================================================
    # DATASET
    # ========================================================

    dataset = resolve_dataset(
        experiment[
            "dataset_requirements"
        ]
    )

    X = dataset["X"]
    y = dataset["y"]

    # ========================================================
    # TRAIN / TEST SPLIT
    # ========================================================

    split = experiment.get(
        "train_test_split",
        {},
    )

    test_size = split.get(
        "test_size",
        0.2,
    )

    random_state = split.get(
        "random_state",
        42,
    )

    X_train, X_test, y_train, y_test = (
        train_test_split(
            X,
            y,
            test_size=test_size,
            random_state=random_state,
            stratify=y,
        )
    )

    # ========================================================
    # MODELS
    # ========================================================

    models = experiment[
        "model_requirements"
    ]

    baseline_spec = models[
        "baseline_model"
    ]

    treatment_spec = models[
        "treatment_model"
    ]

    baseline_model = build_model(
        baseline_spec
    )

    treatment_model = build_model(
        treatment_spec
    )

    # ========================================================
    # SCALING
    # ========================================================

    execution_requirements = (
        experiment.get(
            "execution_requirements",
            [],
        )
    )

    use_scaling = any(
        isinstance(
            item,
            str,
        )
        and (
            "standardscaler"
            in item.lower()
            or
            "standard scaler"
            in item.lower()
        )
        for item in execution_requirements
    )

    scaling_info = {
        "enabled": False,
    }

    X_train_baseline = X_train
    X_test_baseline = X_test

    X_train_treatment = X_train
    X_test_treatment = X_test

    if use_scaling:

        scaler = StandardScaler()

        X_train_scaled = (
            scaler.fit_transform(
                X_train
            )
        )

        X_test_scaled = (
            scaler.transform(
                X_test
            )
        )

        X_train_baseline = (
            X_train_scaled
        )

        X_test_baseline = (
            X_test_scaled
        )

        X_train_treatment = (
            X_train_scaled
        )

        X_test_treatment = (
            X_test_scaled
        )

        scaling_info = {
            "enabled": True,
            "method": "StandardScaler",
            "fit_on": "training data only",
        }

    # ========================================================
    # BASELINE EXECUTION
    # ========================================================

    start = time.perf_counter()

    baseline_model.fit(
        X_train_baseline,
        y_train,
    )

    baseline_time = (
        time.perf_counter()
        - start
    )

    baseline_predictions = (
        baseline_model.predict(
            X_test_baseline
        )
    )

    baseline_results = calculate_metrics(
        y_test,
        baseline_predictions,
        baseline_time,
        baseline_spec["name"],
    )

    # ========================================================
    # TREATMENT EXECUTION
    # ========================================================

    start = time.perf_counter()

    treatment_model.fit(
        X_train_treatment,
        y_train,
    )

    treatment_time = (
        time.perf_counter()
        - start
    )

    treatment_predictions = (
        treatment_model.predict(
            X_test_treatment
        )
    )

    treatment_results = calculate_metrics(
        y_test,
        treatment_predictions,
        treatment_time,
        treatment_spec["name"],
    )

    # ========================================================
    # METRIC DIFFERENCES
    # ========================================================

    differences = {
        "accuracy_difference": round(
            treatment_results[
                "accuracy"
            ]
            -
            baseline_results[
                "accuracy"
            ],
            4,
        ),

        "precision_difference": round(
            treatment_results[
                "precision"
            ]
            -
            baseline_results[
                "precision"
            ],
            4,
        ),

        "recall_difference": round(
            treatment_results[
                "recall"
            ]
            -
            baseline_results[
                "recall"
            ],
            4,
        ),

        "f1_difference": round(
            treatment_results[
                "f1_score"
            ]
            -
            baseline_results[
                "f1_score"
            ],
            4,
        ),
    }

    # ========================================================
    # RESULT
    # ========================================================

    return {
        "status": "COMPLETED",

        "hypothesis": plan.get(
            "hypothesis",
            "",
        ),

        "experiment": {
            "task": experiment.get(
                "task"
            ),

            "dataset": dataset[
                "metadata"
            ],

            "baseline": baseline_spec,

            "treatment": treatment_spec,

            "metrics_requested": (
                experiment.get(
                    "metrics",
                    [],
                )
            ),
        },

        "baseline_results": (
            baseline_results
        ),

        "treatment_results": (
            treatment_results
        ),

        "metric_differences": (
            differences
        ),

        "controls": {
            "test_size": test_size,

            "random_state": random_state,

            "same_dataset": True,

            "same_train_test_split": True,

            "stratified_split": True,
        },

        "execution": {
            "framework": "scikit-learn",

            "sklearn_version": (
                sklearn.__version__
            ),

            "numpy_version": (
                np.__version__
            ),

            "reproducible": True,

            "scaling": scaling_info,
        },
    }


# ============================================================
# TOOL
# ============================================================

@tool(
    approval_mode="never_require"
)
def run_experiment(
    experiment_plan: str,
) -> str:
    """
    Execute an experiment specification generated by Agent 2.
    """

    try:

        raw_plan = parse_experiment_plan(
            experiment_plan
        )

        plan = normalize_experiment_plan(
            raw_plan
        )

        results = execute_experiment(
            plan
        )

        return json.dumps(
            results,
            indent=2,
        )

    except Exception as exc:

        return json.dumps(
            {
                "status": "ERROR",
                "error": str(exc),
            },
            indent=2,
        )


# ============================================================
# AGENT 3 INSTRUCTIONS
# ============================================================

instructions = """
You are Cognilab Agent 3: Resource Discovery and
Experiment Execution Agent.

You receive an experiment specification produced by
Agent 2.

Your job is to execute the experiment using the
run_experiment tool.

IMPORTANT RULES:

1. Treat the experiment specification as the source
   of truth.

2. Do not redesign the hypothesis.

3. Do not invent a different research question.

4. Do not substitute an unrelated dataset.

5. Do not substitute an unrelated model.

6. Do not fabricate experiment results.

7. Do not manually calculate results.

8. Call run_experiment with the experiment specification.

9. The run_experiment tool performs resource
   normalization and actual Python execution.

10. If run_experiment returns COMPLETED, return the
    results.

11. If run_experiment returns ERROR, return the error.

12. Do not repeatedly retry the experiment with
    redesigned JSON after an ERROR.

13. Do not invent experimental results to make the
    experiment appear successful.

CURRENTLY SUPPORTED EXECUTABLE DATASET RESOURCE:

sklearn.datasets.make_classification

CURRENTLY SUPPORTED EXECUTABLE MODELS:

sklearn.linear_model.LogisticRegression

sklearn.ensemble.RandomForestClassifier

CURRENTLY SUPPORTED TASK:

binary classification

The experiment must be executed using actual Python
and scikit-learn.
"""


# ============================================================
# CREATE AGENT
# ============================================================

agent = Agent(
    client=client,
    name="cognilab-experiment-agent",
    instructions=instructions,
    tools=[
        run_experiment
    ],
)


# ============================================================
# SERVER
# ============================================================

if __name__ == "__main__":

    print(
        "Starting Cognilab Agent 3..."
    )

    server = ResponsesHostServer(
        agent
    )

    server.run(
        host="0.0.0.0",
        port=8088
    )
