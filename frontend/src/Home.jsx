import React from 'react';
import AutoIrrigation from './component/AutoIrrigation';
import './style/home.css'; // Import the CSS file


const Home = () => {
  return (
    <div className='home'>
      <main className="main">
        <AutoIrrigation />
      </main>
    </div>
  );
};

export default Home;
