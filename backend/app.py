from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pickle

app = Flask(__name__)
CORS(app)

# Load trained model
with open("model.pkl", "rb") as file:
    model = pickle.load(file)


@app.route("/")
def home():
    return "Student Placement Predictor Backend is Running!"


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    input_data = pd.DataFrame([{
        "sl_no": data["sl_no"],
        "gender": data["gender"],
        "ssc_p": data["ssc_p"],
        "ssc_b": data["ssc_b"],
        "hsc_p": data["hsc_p"],
        "hsc_b": data["hsc_b"],
        "hsc_s": data["hsc_s"],
        "degree_p": data["degree_p"],
        "degree_t": data["degree_t"],
        "workex": data["workex"],
        "etest_p": data["etest_p"],
        "specialisation": data["specialisation"],
        "mba_p": data["mba_p"]
    }])

    prediction = model.predict(input_data)[0]

    return jsonify({
        "prediction": prediction
    })


if __name__ == "__main__":
    app.run(debug=True)