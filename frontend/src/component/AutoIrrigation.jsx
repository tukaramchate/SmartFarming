import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/autoirrigation.css";
const AutoIrrigation = () => {
    const [sensorData, setSensorData] = useState([]);
    const [pumpState, setPumpState] = useState(false);
  
    // Fetch sensor data
    const fetchSensorData = async () => {
      const response = await axios.get("http://localhost:5000/api/sensors/data");
      setSensorData(response.data);
    };
  
    // Fetch pump state
    const fetchPumpState = async () => {
      const response = await axios.get("http://localhost:5000('/api/pump/pump");
      setPumpState(response.data.state);
    };
  
    // Toggle pump state
    const togglePump = async () => {
      const newState = !pumpState;
      await axios.post("http://localhost:5000('/api/pump/pump", { state: newState });
      setPumpState(newState);
    };
  
    useEffect(() => {
      fetchSensorData();
      fetchPumpState();
      const interval = setInterval(fetchSensorData, 5000);
      return () => clearInterval(interval);
    }, []);
  
    return (
<div className="bgimg">
<div className="container rainbow">
        {/* <h1>SmartCrop Income Boost</h1> */}
        <h2 class="typing-effect">SmartCrop Income Boost</h2>
        

        <h2>Sensor Data</h2>
        <table>
          <thead>
            <tr>
              <th>Moisture (%)</th>
              <th>Temperature (°C)</th>
              <th>Humidity (%)</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((data, index) => (
              <tr key={index}>
                <td>{data.moisture}</td>
                <td>{data.temperature}</td>
                <td>{data.humidity}</td>
                <td>{new Date(data.timestamp).toLocaleString()}</td>
                {/* <td>{new Date(data.timestamp).toLocaleTimeString()}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
        <button id="btn" onClick={togglePump} className={pumpState ? "on" : "off"}>
          {pumpState ? " Pump OFF" : "Pump ON"}
        </button>
      </div>
</div>
    );
  };
export default AutoIrrigation;

