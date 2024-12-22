import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [preferences, setPreferences] = useState('');
  const [mealPlan, setMealPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchMealPlan = async () => {
    setIsLoading(true);
    setMealPlan('');
    try {
      const response = await axios.post('http://127.0.0.1:5001/generate-meal-plan', {
        preferences,
      });
      setMealPlan(response.data.meal_plan);
    } catch (error) {
      console.error('Error fetching meal plan:', error);
      setMealPlan('Failed to fetch meal plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🍽️ Weekly Pinoy Meal Plan Generator</h1>
      <div>
        <input
          type="text"
          placeholder="Enter preferences (e.g., low-carb, vegetarian)"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
        />
        <button onClick={fetchMealPlan} disabled={isLoading}>
          {isLoading ? 'Generating...' : 'Generate Meal Plan'}
        </button>
      </div>
      {mealPlan && (
        <pre>
          {mealPlan}
        </pre>
      )}
    </div>
  );
}

export default App;
