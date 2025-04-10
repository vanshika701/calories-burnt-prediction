document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('predictionForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const resultDiv = document.getElementById('result');
    const predictionValue = document.getElementById('predictionValue');
    
    // Store the original button text
    const originalButtonText = submitButton.textContent;

    // Get the API URL from environment variable or use localhost for development
    const API_URL = process.env.API_URL || 'https://calories-burnt-prediction.herokuapp.com';

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            gender: document.getElementById('gender').value,
            age: document.getElementById('age').value,
            height: document.getElementById('height').value,
            weight: document.getElementById('weight').value,
            duration: document.getElementById('duration').value,
            heart_rate: document.getElementById('heart_rate').value,
            body_temp: document.getElementById('body_temp').value
        };

        try {
            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Predicting...';
            resultDiv.style.display = 'none';

            // Make API call
            const response = await fetch(`${API_URL}/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.status === 'success') {
                // Display the result with animation
                predictionValue.textContent = Math.round(data.prediction) + ' calories';
                resultDiv.style.display = 'block';
                resultDiv.style.opacity = '0';
                setTimeout(() => {
                    resultDiv.style.opacity = '1';
                }, 10);

                // Reset the form after a short delay
                setTimeout(() => {
                    form.reset();
                }, 1000);
            } else {
                throw new Error(data.error || 'Prediction failed');
            }
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });

    // Add input validation that doesn't interfere with typing
    const numberInputs = form.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('change', function() {
            const value = parseFloat(this.value);
            const min = parseFloat(this.min);
            const max = parseFloat(this.max);
            
            if (isNaN(value)) {
                this.value = min;
            } else if (value < min) {
                this.value = min;
            } else if (value > max) {
                this.value = max;
            }
        });
    });
}); 