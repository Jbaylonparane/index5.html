from js import document 
def submit_bp(event):
    systolic = int(document.getElementById('systolic').value)
    diastolic = int(document.getElementById('diastolic').value)
    message = ""

    if systolic < 0 or diastolic < 0:
        message = "Blood pressure values cannot be negative. Please enter valid values."
    else:
        if systolic <= 120 and diastolic <= 80: 
            message = "Normal blood pressure." 
        elif (121 <= systolic < 130) and diastolic < 81:  
            message = "Elevated blood pressure."
        elif (131 <= systolic < 140) or (81 <= diastolic < 90):
            message = "High blood pressure (hypertension stage 1)."
        elif (141 <= systolic < 180) or (91 <= diastolic < 120):
            message = "High blood pressure (hypertension stage 2)."
        else:
            message = "Hypertensive crisis! Consult a doctor immediately."

    document.getElementById('result').innerText = f"Your blood pressure is {systolic}/{diastolic} mmHg. {message}"

document.getElementById('bpForm').addEventListener("submit", submit_bp)

