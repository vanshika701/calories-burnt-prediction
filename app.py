from flask import Flask, render_template, request, jsonify
import numpy as np
import pandas as pd
from xgboost import XGBRegressor
import joblib
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load and prepare the model
def load_and_train_model():
    # Load the data
    calories = pd.read_csv('data/calories.csv')
    exercise_data = pd.read_csv('data/exercise.csv')
    
    # Prepare the data
    calories_data = pd.concat([exercise_data, calories['Calories']], axis=1)
    calories_data.replace({"Gender":{'male':0,'female':1}}, inplace=True)
    
    X = calories_data.drop(columns=['User_ID', 'Calories'], axis=1)
    Y = calories_data['Calories']
    
    # Train the model
    model = XGBRegressor()
    model.fit(X, Y)
    
    return model

# Try to load the model, if not available, train a new one
try:
    model = joblib.load('model.joblib')
except:
    model = load_and_train_model()
    joblib.dump(model, 'model.joblib')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data
        data = request.get_json()
        
        # Prepare the input features
        gender = 0 if data['gender'] == 'male' else 1
        age = float(data['age'])
        height = float(data['height'])
        weight = float(data['weight'])
        duration = float(data['duration'])
        heart_rate = float(data['heart_rate'])
        body_temp = float(data['body_temp'])
        
        # Create input array
        input_data = np.array([[gender, age, height, weight, duration, heart_rate, body_temp]])
        
        # Make prediction
        prediction = model.predict(input_data)
        
        return jsonify({
            'prediction': float(prediction[0]),
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        })

if __name__ == '__main__':
    app.run(debug=True) 