# Calories Burnt Prediction Web Application

A machine learning-based web application that predicts the number of calories burnt during exercise based on various parameters.

## Features

- Interactive web interface
- Real-time calorie prediction
- Input validation
- Responsive design
- Modern dark theme UI
- Automatic form reset after prediction

## Tech Stack

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript
  - Bootstrap 5
  - Netlify (Hosting)

- **Backend**:
  - Python
  - Flask
  - XGBoost
  - Scikit-learn
  - Pandas
  - NumPy
  - Heroku (Hosting)
## Project Structure

```
calories-burnt-prediction/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── Procfile              # Heroku configuration
├── runtime.txt           # Python version specification
├── package.json          # Node.js dependencies
├── netlify.toml          # Netlify configuration
├── data/                 # Dataset directory
│   ├── calories.csv
│   └── exercise.csv
├── static/               # Static files
│   ├── style.css
│   └── script.js
└── templates/            # HTML templates
    └── index.html
```The application uses an XGBoost regression model trained on exercise and calorie data. The model takes the following features as input:

- Gender (0 for male, 1 for female)
- Age (years)
- Height (cm)
- Weight (kg)
- Exercise Duration (minutes)
- Heart Rate (bpm)
- Body Temperature (°C)
## Acknowledgments

- Dataset: [Exercise and Calories Dataset](https://www.kaggle.com/datasets/fmendes/exercise-and-calories)
- Bootstrap for the UI components
- Flask for the web framework
- XGBoost for the machine learning model
