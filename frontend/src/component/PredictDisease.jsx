;
import React, { useEffect, useState } from 'react';
import '../style/predictdisease.css'; // Import the CSS file

// Function to predict disease based on temperature and humidity
const predictDisease = (temperature, humidity) => {
  if (temperature >= 24 && temperature <= 29 && humidity > 90) {
    return 'Early Blight'; // Conditions for Early Blight
  } else if (temperature >= 10 && temperature <= 24 && humidity > 90) {
    return 'Late Blight'; // Conditions for Late Blight
  } else {
    return 'Healthy'; // No disease risk
  }
};

// React component to display the data in a table
const PredictDisease = () => {
  const [pastData, setPastData] = useState([]);
  const [averageTemperature, setAverageTemperature] = useState(0);
  const [averageHumidity, setAverageHumidity] = useState(0);
  const [predictedDisease, setPredictedDisease] = useState('Healthy');

  // Fetch data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/sensors/data'); // Replace with your server URL
        const data = await response.json();

        if (data.length > 0) {
          // Update pastData with fetched data
          setPastData(
            data.map((item, index) => ({
              day: `Day ${index + 1}`,
              temperature: item.temperature,
              humidity: item.humidity,
            }))
          );

          // Calculate averages
          const avgTemp =
            data.reduce((sum, item) => sum + item.temperature, 0) / data.length;
          const avgHumidity =
            data.reduce((sum, item) => sum + item.humidity, 0) / data.length;

          setAverageTemperature(avgTemp);
          setAverageHumidity(avgHumidity);

          // Predict disease based on averages
          setPredictedDisease(predictDisease(avgTemp, avgHumidity));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Disease conditions data
  const diseaseConditions = [
    { disease: 'Early Blight', temperatureRange: '24°C to 29°C', humidityRange: 'Above 90%' },
    { disease: 'Late Blight', temperatureRange: '10°C to 24°C', humidityRange: 'Above 90%' },
  ];

  return (
    <div className="disease-prediction-container">
      <h2>Disease Conditions</h2>
      <table className="disease-prediction-table">
        <thead>
          <tr>
            <th>Disease</th>
            <th>Temperature Range</th>
            <th>Humidity Range</th>
          </tr>
        </thead>
        <tbody>
          {diseaseConditions.map((condition, index) => (
            <tr key={index}>
              <td data-label="Disease">{condition.disease}</td>
              <td data-label="Temperature Range">{condition.temperatureRange}</td>
              <td data-label="Humidity Range">{condition.humidityRange}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Past 3 Days Sensor Data and Predicted Disease</h2>
      <table className="disease-prediction-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Temperature (°C)</th>
            <th>Humidity (%)</th>
            <th>Predicted Disease</th>
          </tr>
        </thead>
        <tbody>
          {pastData.map((data, index) => (
            <tr key={index}>
              <td data-label="Day">{data.day}</td>
              <td data-label="Temperature (°C)">{data.temperature}</td>
              <td data-label="Humidity (%)">{data.humidity}</td>
              <td data-label="Predicted Disease">
                {predictDisease(data.temperature, data.humidity)}
              </td>
            </tr>
          ))}
          {/* Add a new row for averages */}
          <tr>
            <td data-label="Day">Average</td>
            <td data-label="Temperature (°C)">{averageTemperature.toFixed(2)}</td>
            <td data-label="Humidity (%)">{averageHumidity.toFixed(2)}</td>
            <td data-label="Predicted Disease">{predictedDisease}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PredictDisease;