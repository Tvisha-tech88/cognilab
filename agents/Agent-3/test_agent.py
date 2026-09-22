import json
from urllib.request import Request, urlopen


url = "http://localhost:8088/responses"


experiment_plan = {
    "hypothesis": (
        "Random Forest will achieve better "
        "classification performance than "
        "Logistic Regression."
    ),

    "experiment": {
        "task": "binary classification",

        "independent_variable": "model family",

        "dependent_variables": [
            "accuracy",
            "precision",
            "recall",
            "f1_score",
            "training_time"
        ],

        "dataset_requirements": {
            "modality": "tabular",
            "task_type": "binary classification",
            "minimum_samples": 500,
            "requirements": [
                "labeled tabular dataset",
                "same dataset for baseline and treatment"
            ]
        },

        "model_requirements": {
            "family": "classification models",
            "input_modality": "tabular",
            "requirements": [
                "Logistic Regression baseline",
                "Random Forest treatment"
            ]
        },

        "baseline": {
            "condition": "Logistic Regression"
        },

        "treatment": {
            "condition": "Random Forest"
        },

        "metrics": [
            "accuracy",
            "precision",
            "recall",
            "f1_score",
            "training_time"
        ],

        "controls": {
            "fixed_variables": [
                "same dataset",
                "same train/test split"
            ],
            "reproducibility": [
                "random seed = 42"
            ]
        },

        "execution_requirements": [
            "Python",
            "scikit-learn"
        ]
    }
}


payload = {
    "input": json.dumps(
        experiment_plan,
        indent=2
    ),
    "stream": False
}


request = Request(
    url,
    data=json.dumps(payload).encode("utf-8"),
    headers={
        "Content-Type": "application/json"
    },
    method="POST",
)


with urlopen(request) as response:

    result = json.loads(
        response.read().decode("utf-8")
    )


print(
    json.dumps(
        result,
        indent=2
    )
)