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
// import Testimonial from "./pages/testimonial/testimonial";
import Blog from "./pages/blog/blog";
import Typeform from "./pages/typeform/typeform";
import Login from "./pages/login/login";
import Policy from "./pages/policy/policy";
import Condition from "./pages/condition/condition";
import Refund from "./pages/refund/refund";
import Sanctum from "./pages/sanctum/sanctum";
import HealingJourneyForm from "./component/form3/form3";
import ParentingWorkshopForm from "./component/form/form";
import HealingJourneyForm2 from "./component/form2/form2";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router basename="/">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="services" element={<Services />} />
      <Route path="contact" element={<Contact />} />
      <Route path="Sanctum" element={<Sanctum />} />
      <Route path="workshop" element={<Workshop />} />
      {/* <Route path="testimonial" element={<Testimonial />} /> */}
      <Route path="typeform" element={<Typeform />} />
      <Route path="blog" element={<Blog />} />
      <Route path="login" element={<Login />} />
      {/* <Route path="*" element={<Error/>} /> */}
      <Route path="policy" element={<Policy />} />
      <Route path="condition" element={<Condition />} />
      <Route path="refund" element={<Refund />} />
      <Route path="healingjourneyform" element={<HealingJourneyForm />} />
      <Route path="parentingworkshopform" element={<ParentingWorkshopForm />} />
      <Route path="healingjourneyform2" element={<HealingJourneyForm2 />} />
    </Routes>
  </Router>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
