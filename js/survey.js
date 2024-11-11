function authenticate() {
    const password = document.getElementById("password").value;
    const validPasswords = ["demo123", "research2024", "survey2024"];
    
    if (validPasswords.includes(password)) {
        document.getElementById("loginForm").classList.add("hidden");
        document.getElementById("surveyForm").classList.remove("hidden");
        document.getElementById("errorMessage").classList.add("hidden");
    } else {
        document.getElementById("errorMessage").classList.remove("hidden");
        document.getElementById("password").value = "";
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    const csvContent = Object.entries(data)
        .map(([key, value]) => `${key},${value}`)
        .join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "research_survey_data.csv";
    a.click();
    
    alert("Thank you for completing the survey!");
}
