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
    
    // Process checkboxes separately
    const checkboxes = event.target.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        data[checkbox.name] = checkbox.checked ? 'Yes' : 'No';
    });

    // Process range inputs
    const ranges = event.target.querySelectorAll('input[type="range"]');
    ranges.forEach(range => {
        data[range.name] = range.value;
    });

    // Process other form elements
    for (const [key, value] of formData.entries()) {
        if (!data[key]) { // Don't overwrite checkbox/range values
            data[key] = value;
        }
    }
    
    // Convert to CSV
    const csvContent = Object.entries(data)
        .map(([key, value]) => `${key},${value}`)
        .join("\n");
    
    // Create download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "research_survey_data.csv";
    a.click();
    
    // Show success message
    alert("Thank you for completing the survey! Your responses have been saved.");
}

// Add event listener for when range inputs change
document.addEventListener('DOMContentLoaded', function() {
    const ranges = document.querySelectorAll('input[type="range"]');
    ranges.forEach(range => {
        range.addEventListener('input', function() {
            this.setAttribute('title', this.value);
        });
    });
});
