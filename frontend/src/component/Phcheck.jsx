import { useState } from 'react';
import '../style/phcheck.css'
function Phcheck() {
  const [ph, setPh] = useState('');
  const [growthStage, setGrowthStage] = useState('germination');
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    analyzePH(parseFloat(ph), growthStage);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setResult(null);
    setPh('');
    setGrowthStage('germination');
  };

  const analyzePH = (phValue, stage) => {
    let healthStatus = '';
    let precautions = [];
    let isOptimal = false;

    if (phValue < 4.5) {
      healthStatus = 'Critical (Very Acidic)';
      precautions = [
        'Apply dolomite lime (5-10 lbs/100 sq ft)',
        'Test for aluminum toxicity',
        'Add calcium-rich fertilizers'
      ];
    } 
    else if (phValue >= 4.5 && phValue < 5.2) {
      healthStatus = 'Moderate (Acidic)';
      precautions = [
        'Small lime application may be needed',
        'Monitor for magnesium deficiency',
        'Use Epsom salt foliar spray if yellowing occurs'
      ];
    }
    else if (phValue >= 5.2 && phValue <= 6.4) {
      healthStatus = 'Optimal';
      isOptimal = true;
      precautions = [
        'Maintain current pH level',
        'Continue regular nutrient monitoring'
      ];
    }
    else if (phValue > 6.4 && phValue <= 7.0) {
      healthStatus = 'Risky (Slightly Alkaline)';
      precautions = [
        'Apply elemental sulfur (3-5 lbs/100 sq ft)',
        'Choose scab-resistant potato varieties',
        'Avoid fresh manure fertilizers'
      ];
    }
    else {
      healthStatus = 'Dangerous (Alkaline)';
      precautions = [
        'Immediate sulfur application needed',
        'Use chelated iron supplements',
        'Consider container growing with acidic soil mix'
      ];
    }

    let stageAdvice = '';
    switch(stage) {
      case 'germination':
        stageAdvice = phValue > 6.5 ? 
          'Poor germination expected - consider pre-sprouting' : 
          'Normal sprouting expected';
        break;
      case 'vegetative':
        stageAdvice = phValue < 5.0 ? 
          'Expect stunted growth - apply magnesium sulfate' : 
          'Foliage development normal';
        break;
      case 'tuber':
        stageAdvice = phValue > 6.5 ? 
          'High scab risk - harvest early if symptoms appear' : 
          'Good tuber formation expected';
        break;
      default:
        stageAdvice = '';
    }

    setResult({
      phValue,
      healthStatus,
      precautions,
      isOptimal,
      stageAdvice
    });
  };

  return (
    <div className="ph-checker">
      <h2>Potato Plant pH Health Checker</h2>
      
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="ph">Enter Soil pH:</label>
            <input 
              type="number" 
              id="ph" 
              min="0" 
              max="14" 
              step="0.1"
              value={ph}
              onChange={(e) => setPh(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="stage">Growth Stage:</label>
            <select 
              id="stage" 
              value={growthStage}
              onChange={(e) => setGrowthStage(e.target.value)}
            >
              <option value="germination">Germination (0-30 days)</option>
              <option value="vegetative">Vegetative Growth (30-60 days)</option>
              <option value="tuber">Tuber Bulking (60-90 days)</option>
            </select>
          </div>

          <button type="submit">Analyze</button>
        </form>
      ) : (
        <div className="result-container">
          <div className={`result ${result.isOptimal ? 'optimal' : ''}`}>
            <h3>Analysis Results for pH {result.phValue}</h3>
            <p className="health-status">Health Status: <strong>{result.healthStatus}</strong></p>
            
            {result.isOptimal ? (
              <div className="optimal-message">
                <p>✅ Perfect! This is the ideal pH range for potatoes.</p>
                <p>Your plants will have:</p>
                <ul>
                  <li>Maximum nutrient availability</li>
                  <li>Minimum disease risk</li>
                  <li>Best yield potential</li>
                </ul>
              </div>
            ) : (
              <>
                <p>Stage-specific advice: {result.stageAdvice}</p>
                <h4>Recommended Precautions:</h4>
                <ul>
                  {result.precautions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <button onClick={handleReset} className="reset-button">
            Check Another pH
          </button>
        </div>
      )}
    </div>
  );
}

export default Phcheck;