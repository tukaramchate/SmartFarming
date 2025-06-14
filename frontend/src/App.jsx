import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './style/app.css'
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import AuthForm from "./component/AuthForm";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component
import About from "./component/About";
import Home from "./Home";

import LeafDisease from "./component/LeafDisease";
import PricePrediction from "./component/PricePrediction";
import PredictDisease from "./component/PredictDisease";
import Fertiliser from "./component/Fertiliser";
import Medicine from "./component/Medicine";
import FarmImg from "./component/FarmImg";
import Phcheck from "./component/Phcheck";


const App = () => {
  return (
    <div className="app-container">
      <Router>
        <Nav />
        <main className="main-content">
          <Routes>
            {/* Your existing routes */}
            <Route path="/authform" element={<AuthForm />} />
            <Route path="/about" element={<About />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/predictdisease" element={<PredictDisease />} />
              <Route
                path="/leafdisease"
                element={<LeafDisease url="http://127.0.0.1:5000/" />}
              />
              <Route
                path="/priceprediction"
                element={
                  <PricePrediction url='../public/priceprediction.png' />
                }
              />
              <Route path="/phcheck" element={<Phcheck/>} />
              <Route path="/medicine" element={<Medicine />} />
              <Route path="/fertiliser" element={<Fertiliser />} />
              <Route path="/ourfarm" element={<FarmImg  />} />
            </Route>
          </Routes>
        </main>

        <div className="footer-wrapper">
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
