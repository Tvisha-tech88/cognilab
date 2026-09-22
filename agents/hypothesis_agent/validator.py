"""
Deterministic validator for Cognilab experiment plans.

The LLM proposes an experiment.
This validator checks whether the proposed experiment
is structurally and logically valid.

IMPORTANT:
This validator does NOT decide whether a particular
dataset/model is supported.

Resource availability is handled later by the
Resource Discovery layer.
"""


def validate_experiment(plan: dict) -> dict:
    """
    Deterministically validate a generic experiment plan.

    The validator is intentionally model-agnostic and
    dataset-agnostic.

    Returns
    -------
    dict
        {
            "status": "VALID" | "INVALID",
            "issues": [...]
        }
    """

    errors = []

    # ========================================================
    # 1. BASIC STRUCTURE
    # ========================================================

    if not isinstance(plan, dict):
        return {
            "status": "INVALID",
            "issues": [
                "Experiment plan must be a JSON object."
            ]
        }

    # ========================================================
    # 2. REQUIRED TOP-LEVEL FIELDS
    # ========================================================

    required_fields = [
        "hypothesis",
        "experiment",
        "validation",
        "evidence_used",
        "next_step"
    ]

    for field in required_fields:
        if field not in plan:
            errors.append(
                f"Missing required field: {field}"
            )

    if errors:
        return {
            "status": "INVALID",
            "issues": errors
        }

    # ========================================================
    # 3. HYPOTHESIS
    # ========================================================

    hypothesis = plan.get("hypothesis")

    if not isinstance(hypothesis, str):
        errors.append(
            "Hypothesis must be a string."
        )

    elif not hypothesis.strip():
        errors.append(
            "Hypothesis cannot be empty."
        )

    # ========================================================
    # 4. EXPERIMENT OBJECT
    # ========================================================

    experiment = plan.get("experiment")

    if not isinstance(experiment, dict):
        return {
            "status": "INVALID",
            "issues": [
                "Experiment must be an object."
            ]
        }

    # ========================================================
    # 5. REQUIRED EXPERIMENT FIELDS
    # ========================================================

    required_experiment_fields = [
        "task",
        "independent_variable",
        "dependent_variables",
        "dataset_requirements",
        "model_requirements",
        "baseline",
        "treatment",
        "metrics",
        "controls",
        "execution_requirements"
    ]

    for field in required_experiment_fields:
        if field not in experiment:
            errors.append(
                f"Missing experiment field: {field}"
            )

    if errors:
        return {
            "status": "INVALID",
            "issues": errors
        }

    # ========================================================
    # 6. TASK
    # ========================================================

    task = experiment.get("task")

    if not isinstance(task, str):
        errors.append(
            "Task must be a string."
        )

    elif not task.strip():
        errors.append(
            "Task cannot be empty."
        )

    # ========================================================
    # 7. INDEPENDENT VARIABLE
    # ========================================================

    independent_variable = experiment.get(
        "independent_variable"
    )

    if not isinstance(independent_variable, str):
        errors.append(
            "Independent variable must be a string."
        )

    elif not independent_variable.strip():
        errors.append(
            "Independent variable cannot be empty."
        )

    # ========================================================
    # 8. DEPENDENT VARIABLES
    # ========================================================

    dependent_variables = experiment.get(
        "dependent_variables"
    )

    if not isinstance(dependent_variables, list):
        errors.append(
            "Dependent variables must be a list."
        )

    elif len(dependent_variables) == 0:
        errors.append(
            "At least one dependent variable must be defined."
        )

    else:
        for variable in dependent_variables:
            if not isinstance(variable, str):
                errors.append(
                    "Every dependent variable must be a string."
                )

            elif not variable.strip():
                errors.append(
                    "Dependent variables cannot be empty."
                )

    # ========================================================
    # 9. DATASET REQUIREMENTS
    # ========================================================

    dataset_requirements = experiment.get(
        "dataset_requirements"
    )

    if not isinstance(dataset_requirements, dict):
        errors.append(
            "Dataset requirements must be an object."
        )

    else:

        required_dataset_fields = [
            "modality",
            "task_type",
            "minimum_samples",
            "requirements"
        ]

        for field in required_dataset_fields:
            if field not in dataset_requirements:
                errors.append(
                    f"Missing dataset requirement: {field}"
                )

        modality = dataset_requirements.get("modality")

        if modality is not None:
            if not isinstance(modality, str):
                errors.append(
                    "Dataset modality must be a string."
                )
            elif not modality.strip():
                errors.append(
                    "Dataset modality cannot be empty."
                )

        task_type = dataset_requirements.get("task_type")

        if task_type is not None:
            if not isinstance(task_type, str):
                errors.append(
                    "Dataset task_type must be a string."
                )

        minimum_samples = dataset_requirements.get(
            "minimum_samples"
        )

        if (
            minimum_samples is not None
            and not isinstance(minimum_samples, int)
        ):
            errors.append(
                "minimum_samples must be an integer or null."
            )

        elif (
            isinstance(minimum_samples, int)
            and minimum_samples <= 0
        ):
            errors.append(
                "minimum_samples must be greater than zero."
            )

        requirements = dataset_requirements.get(
            "requirements"
        )

        if not isinstance(requirements, list):
            errors.append(
                "Dataset requirements must be a list."
            )

    # ========================================================
    # 10. MODEL REQUIREMENTS
    # ========================================================

    model_requirements = experiment.get(
        "model_requirements"
    )

    if not isinstance(model_requirements, dict):
        errors.append(
            "Model requirements must be an object."
        )

    else:

        required_model_fields = [
            "family",
            "input_modality",
            "requirements"
        ]

        for field in required_model_fields:
            if field not in model_requirements:
                errors.append(
                    f"Missing model requirement: {field}"
                )

        family = model_requirements.get("family")

        if not isinstance(family, str):
            errors.append(
                "Model family must be a string."
            )

        elif not family.strip():
            errors.append(
                "Model family cannot be empty."
            )

        input_modality = model_requirements.get(
            "input_modality"
        )

        if not isinstance(input_modality, str):
            errors.append(
                "Model input modality must be a string."
            )

        requirements = model_requirements.get(
            "requirements"
        )

        if not isinstance(requirements, list):
            errors.append(
                "Model requirements must be a list."
            )

    # ========================================================
    # 11. BASELINE
    # ========================================================

    baseline = experiment.get("baseline")

    if not isinstance(baseline, dict):
        errors.append(
            "Baseline must be an object."
        )

    else:

        if "condition" not in baseline:
            errors.append(
                "Baseline must contain a condition."
            )

        else:

            condition = baseline.get("condition")

            if not isinstance(condition, str):
                errors.append(
                    "Baseline condition must be a string."
                )

            elif not condition.strip():
                errors.append(
                    "Baseline condition cannot be empty."
                )

    # ========================================================
    # 12. TREATMENT
    # ========================================================

    treatment = experiment.get("treatment")

    if not isinstance(treatment, dict):
        errors.append(
            "Treatment must be an object."
        )

    else:

        if "condition" not in treatment:
            errors.append(
                "Treatment must contain a condition."
            )

        else:

            condition = treatment.get("condition")

            if not isinstance(condition, str):
                errors.append(
                    "Treatment condition must be a string."
                )

            elif not condition.strip():
                errors.append(
                    "Treatment condition cannot be empty."
                )

    # ========================================================
    # 13. BASELINE VS TREATMENT
    # ========================================================

    if (
        isinstance(baseline, dict)
        and isinstance(treatment, dict)
    ):

        baseline_condition = baseline.get(
            "condition"
        )

        treatment_condition = treatment.get(
            "condition"
        )

        if (
            isinstance(baseline_condition, str)
            and isinstance(treatment_condition, str)
        ):

            if (
                baseline_condition.strip().lower()
                == treatment_condition.strip().lower()
            ):
                errors.append(
                    "Baseline and treatment conditions "
                    "must be different."
                )

    # ========================================================
    # 14. METRICS
    # ========================================================

    metrics = experiment.get("metrics")

    if not isinstance(metrics, list):
        errors.append(
            "Metrics must be a list."
        )

    elif len(metrics) == 0:
        errors.append(
            "At least one metric must be defined."
        )

    else:

        for metric in metrics:

            if not isinstance(metric, str):
                errors.append(
                    "Every metric must be a string."
                )

            elif not metric.strip():
                errors.append(
                    "Metrics cannot contain empty values."
                )

    # ========================================================
    # 15. CONTROLS
    # ========================================================

    controls = experiment.get("controls")

    if not isinstance(controls, dict):
        errors.append(
            "Controls must be an object."
        )

    else:

        if "fixed_variables" not in controls:
            errors.append(
                "Controls must define fixed_variables."
            )

        if "reproducibility" not in controls:
            errors.append(
                "Controls must define reproducibility requirements."
            )

        fixed_variables = controls.get(
            "fixed_variables"
        )

        if not isinstance(fixed_variables, list):
            errors.append(
                "fixed_variables must be a list."
            )

        reproducibility = controls.get(
            "reproducibility"
        )

        if not isinstance(reproducibility, list):
            errors.append(
                "reproducibility must be a list."
            )

    # ========================================================
    # 16. EXECUTION REQUIREMENTS
    # ========================================================

    execution_requirements = experiment.get(
        "execution_requirements"
    )

    if not isinstance(execution_requirements, list):
        errors.append(
            "execution_requirements must be a list."
        )

    # ========================================================
    # 17. EVIDENCE
    # ========================================================

    evidence_used = plan.get(
        "evidence_used"
    )

    if not isinstance(evidence_used, list):
        errors.append(
            "evidence_used must be a list."
        )

    # ========================================================
    # 18. NEXT STEP
    # ========================================================

    next_step = plan.get(
        "next_step"
    )

    if not isinstance(next_step, str):
        errors.append(
            "next_step must be a string."
        )

    elif not next_step.strip():
        errors.append(
            "next_step cannot be empty."
        )

    # ========================================================
    # FINAL RESULT
    # ========================================================

    if errors:
        return {
            "status": "INVALID",
            "issues": errors
        }

    return {
        "status": "VALID",
        "issues": []
    }