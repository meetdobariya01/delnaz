import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import "bootstrap/dist/css/bootstrap.min.css";
import About from "./pages/about/about";
import Contact from "./pages/contact/contact";
import Services from "./pages/services/services";
import Booking from "./pages/booking/booking";
import Workshop from "./pages/workshop/workshop";
import Testimonial from "./pages/testimonial/testimonial";
import Blog from "./pages/blog/blog";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router basename="/">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="contact" element={<Contact />} />
      <Route path="booking" element={<Booking />} />
      <Route path="workshop" element={<Workshop />} />
      <Route path="testimonial" element={<Testimonial />} />
      {/* <Route path="booking" element={<Booking/>} /> */}
            <Route path="blog" element={<Blog/>} />
      {/* <Route path="*" element={<Error/>} /> */}
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
