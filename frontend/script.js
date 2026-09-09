document.getElementById("predictionForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const data = {
        sl_no: Number(document.getElementById("sl_no").value),
        gender: document.getElementById("gender").value,
        ssc_p: Number(document.getElementById("ssc_p").value),
        ssc_b: document.getElementById("ssc_b").value,
        hsc_p: Number(document.getElementById("hsc_p").value),
        hsc_b: document.getElementById("hsc_b").value,
        hsc_s: document.getElementById("hsc_s").value,
        degree_p: Number(document.getElementById("degree_p").value),
        degree_t: document.getElementById("degree_t").value,
        workex: document.getElementById("workex").value,
        etest_p: Number(document.getElementById("etest_p").value),
        specialisation: document.getElementById("specialisation").value,
        mba_p: Number(document.getElementById("mba_p").value)
    };

    const result = document.getElementById("result");

    result.innerHTML = "Predicting...";

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const resultData = await response.json();

        result.innerHTML = "Prediction: " + resultData.prediction;

    } catch (error) {
        result.innerHTML = "Error: Backend is not connected.";
        console.error(error);
    }
});