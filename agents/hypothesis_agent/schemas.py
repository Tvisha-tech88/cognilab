"""
Schemas used by Cognilab's Hypothesis and Experiment Design Agent.

The design is intentionally generic:
the agent describes WHAT the experiment needs,
rather than being hardcoded to a particular dataset or model.
"""


EXPERIMENT_PLAN_SCHEMA = {
    "type": "object",
    "required": [
        "hypothesis",
        "experiment",
        "validation",
        "evidence_used",
        "next_step"
    ],
    "properties": {

        "hypothesis": {
            "type": "string"
        },

        "experiment": {
            "type": "object",
            "required": [
                "task",
                "independent_variable",
                "dataset_requirements",
                "model_requirements",
                "baseline",
                "treatment",
                "metrics",
                "controls"
            ],
            "properties": {

                "task": {
                    "type": "string"
                },

                "independent_variable": {
                    "type": "string"
                },

                "dataset_requirements": {
                    "type": "object",
                    "required": [
                        "modality"
                    ],
                    "properties": {

                        "modality": {
                            "type": "string"
                        },

                        "task_type": {
                            "type": "string"
                        },

                        "minimum_samples": {
                            "type": "integer"
                        },

                        "requirements": {
                            "type": "array"
                        }
                    }
                },

                "model_requirements": {
                    "type": "object",
                    "required": [
                        "family",
                        "input_modality"
                    ],
                    "properties": {

                        "family": {
                            "type": "string"
                        },

                        "input_modality": {
                            "type": "string"
                        },

                        "requirements": {
                            "type": "array"
                        }
                    }
                },

                "baseline": {
                    "type": "object"
                },

                "treatment": {
                    "type": "object"
                },

                "metrics": {
                    "type": "array"
                },

                "controls": {
                    "type": "object"
                }
            }
        },

        "validation": {
            "type": "object",
            "required": [
                "status",
                "issues"
            ]
        },

        "evidence_used": {
            "type": "array"
        },

        "next_step": {
            "type": "string"
        }
    }
}