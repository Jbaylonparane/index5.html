const systolicReadings = [];
const diastolicReadings = [];
const dates = [];

const ctx = document.getElementById('bpChart').getContext('2d');
const bpChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: dates,
        datasets: [
            {
                label: 'Systolic Blood Pressure (mmHg)',
                data: systolicReadings,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                tension: 0.1,
                fill: false,
            },
            {
                label: 'Diastolic Blood Pressure (mmHg)',
                data: diastolicReadings,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                tension: 0.1,
                fill: false,
            },
        ],
    },
    options: {
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Blood Pressure (mmHg)',
                },
            },
        },
    },
});


function updateChartAndMessage(systolic, diastolic, message) {
    const currentDate = new Date().toLocaleDateString();
    systolicReadings.push(systolic);
    diastolicReadings.push(diastolic);
    dates.push(currentDate);

    
    document.getElementById('result').innerText = message;

    
    bpChart.update();
}

document.getElementById('bpForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const systolic = parseInt(document.getElementById('systolic').value);
    const diastolic = parseInt(document.getElementById('diastolic').value);
    let message = "";

    if (systolic < 0 || diastolic < 0) {
        message = "Blood pressure values cannot be negative. Please enter valid values.";
    } else {
        if (systolic <= 120 && diastolic <= 80) {
            message = "Normal blood pressure.";
        } else if (121 <= systolic && systolic < 130 && diastolic < 81) {
            message = "Elevated blood pressure.";
        } else if ((131 <= systolic && systolic < 140) || (81 <= diastolic && diastolic < 90)) {
            message = "High blood pressure (hypertension stage 1).";
        } else if ((141 <= systolic && systolic < 180) || (91 <= diastolic && diastolic < 120)) {
            message = "High blood pressure (hypertension stage 2).";
        } else {
            message = "Hypertensive crisis! Consult a doctor immediately.";
        }

        
        updateChartAndMessage(systolic, diastolic, `Your blood pressure is ${systolic}/${diastolic} mmHg. ${message}`);
    }
});

