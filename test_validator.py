from agents.hypothesis_agent.validator import validate_experiment


# ============================================================
# INTENTIONALLY INVALID EXPERIMENT
# ============================================================

bad_plan = {
    "hypothesis": "",
    
    "experiment": {
        "task": "image classification",

        "independent_variable": "",

        "dependent_variables": [],

        "dataset_requirements": {
            "modality": "image",
            "task_type": "classification",
            "minimum_samples": -100,
            "requirements": "not-a-list"
        },

        "model_requirements": {
            "family": "",
            "input_modality": "image",
            "requirements": "not-a-list"
        },

        "baseline": {
            "condition": "training with augmentation"
        },

        "treatment": {
            "condition": "training with augmentation"
        },

        "metrics": [],

        "controls": {
            "fixed_variables": "not-a-list",
            "reproducibility": "not-a-list"
        },

        "execution_requirements": "not-a-list"
    },

    "validation": {
        "status": "VALID",
        "issues": []
    },

    "evidence_used": [],

    "next_step": ""
}


# ============================================================
# RUN VALIDATION
# ============================================================

result = validate_experiment(bad_plan)


print("Status:", result["status"])
print("Issues:")

for issue in result["issues"]:
    print("-", issue)


# ============================================================
# ASSERTION
# ============================================================

assert result["status"] == "INVALID"

print()
print("✅ Validator correctly rejected the invalid experiment.")