import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles/global.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Intro from "./components/Intro";
import Background from "./components/Background";
import Sponsor from "./components/Sponsor";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";



export default class App extends Component {
  render() {
    return (
    <Router>
      <div className="main--div">
        <Header />
        <div className="page--content">
          <div className="logo--pattern">
          </div>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/intro" element={<Intro />} />
            <Route exact path="/background" element={<Background />} />
            <Route exact path="/sponsor" element={<Sponsor />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <p className="copyright">Copyright © Piyush Acharya 2023. DNAnalyzer is a 501(c)(3) nonprofit (EIN: 81-2908499). MIT License.</p>
      </div>
    </Router>
  
    );
  }
}