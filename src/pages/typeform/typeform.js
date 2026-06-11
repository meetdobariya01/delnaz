import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "./typeform.css";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";

const concernsList = [
  "Addictions",
  "Drinking",
  "Smoking",
  "Drugs",
  "Gambling",
  "Compulsive Behaviour",
  "Anxiety",
  "Stress",
  "Fears",
  "Phobias",
  "Panic Attacks",
  "Guilt",
  "Relaxation",
  "Eating Problems",
  "Food / Diet",
  "Weight Problems",
  "Anorexia",
  "Bulimia",
  "Exercise",
  "Depression",
  "Confidence",
  "Self Esteem",
  "Motivation",
  "Achieving Goals",
  "Procrastination",
  "Career Issues",
  "Interview Skills",
  "Nerves",
  "Public Speaking",
  "Concentration",
  "Exams",
  "Memory",
  "Driving Skills",
  "Sexual Problems",
  "Fertility",
  "IVF",
  "Conception",
  "Pregnancy",
  "Birth",
  "Pain Control",
  "Hearing",
  "Sight / Vision",
  "Mobility",
  "Skin Problems",
  "Hair Growth",
  "Relationships",
  "Childhood Problems",
  "Sleep Problems",
];

const Typeform = () => {
  const [formData, setFormData] = useState({
    surname: "",
    forename: "",
    preferredName: "",
    age: "",
    dob: "",
    address: "",
    maritalStatus: "",
    occupation: "",
    email: "",
    phone: "",
    emergencyContact: "",
    doctorDetails: "",
    lastCheckup: "",
    medications: "",
    healthProblems: "",
    concerns: [],
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckbox = (item) => {
    setFormData({
      ...formData,
      concerns: formData.concerns.includes(item)
        ? formData.concerns.filter((c) => c !== item)
        : [...formData.concerns, item],
    });
  };

  const submitForm = () => {
    if (
      !formData.surname ||
      !formData.forename ||
      !formData.preferredName ||
      !formData.age ||
      !formData.dob ||
      !formData.address ||
      !formData.maritalStatus ||
      !formData.occupation ||
      !formData.email ||
      !formData.phone ||
      !formData.emergencyContact ||
      !formData.doctorDetails ||
      !formData.lastCheckup ||
      !formData.medications ||
      !formData.healthProblems ||
      formData.concerns.length === 0
    ) {
      alert("Please fill all fields!");
      return;
    }

    console.log("SUBMITTED DATA:", formData);
    alert("Form Submitted Successfully!");
  };
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // or "smooth"
    });
  }, [pathname]);

  return (
    <>
      <Header />

      <Container fluid className="therapy-wrapper">
        <Row className="justify-content-center">
          <Col lg={8} md={10} sm={12}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="form-card"
            >
              {/* PERSONAL DETAILS */}
              <h4>Personal Details</h4>
              <Form.Control
                placeholder="Surname"
                name="surname"
                onChange={handleChange}
              />
              <Form.Control
                className="mt-3"
                placeholder="Forename"
                name="forename"
                onChange={handleChange}
              />
              <Form.Control
                className="mt-3"
                placeholder="Preferred Name"
                name="preferredName"
                onChange={handleChange}
              />
              <Form.Control
                className="mt-3"
                type="number"
                placeholder="Age"
                name="age"
                onChange={handleChange}
              />
              <Form.Control
                className="mt-3"
                type="date"
                name="dob"
                onChange={handleChange}
              />
              <Form.Control
                as="textarea"
                rows={2}
                className="mt-3"
                placeholder="Address"
                name="address"
                onChange={handleChange}
              />

              <Form.Select
                className="mt-3"
                name="maritalStatus"
                onChange={handleChange}
              >
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </Form.Select>

              <Form.Control
                className="mt-3"
                placeholder="Occupation"
                name="occupation"
                onChange={handleChange}
              />

              {/* CONTACT DETAILS */}
              <h4 className="mt-4">Contact Details</h4>
              <Form.Control
                placeholder="Email Address"
                name="email"
                onChange={handleChange}
              />
              <Form.Control
                className="mt-3"
                placeholder="Telephone"
                name="phone"
                onChange={handleChange}
              />
              <Form.Control
                className="mt-3"
                placeholder="Emergency Contact"
                name="emergencyContact"
                onChange={handleChange}
              />

              {/* HEALTH INFO */}
              <h4 className="mt-4">Health Information</h4>
              <Form.Control
                placeholder="Doctor’s Name & Address"
                name="doctorDetails"
                onChange={handleChange}
              />
              <Form.Control
                className="mt-3"
                type="date"
                name="lastCheckup"
                onChange={handleChange}
              />
              <Form.Control
                className="mt-3"
                placeholder="Medications"
                name="medications"
                onChange={handleChange}
              />
              <Form.Control
                as="textarea"
                rows={3}
                className="mt-3"
                placeholder="Health Problems"
                name="healthProblems"
                onChange={handleChange}
              />

              {/* CONCERNS */}
              <h4 className="mt-4">Areas of Concern</h4>
              <Row className="concern-scroll">
                {concernsList.map((item) => (
                  <Col xs={6} md={4} key={item}>
                    <Form.Check
                      label={item}
                      checked={formData.concerns.includes(item)}
                      onChange={() => handleCheckbox(item)}
                    />
                  </Col>
                ))}
              </Row>

              {/* SUBMIT */}
              <div className="text-center mt-4">
                <Button variant="success" size="lg" onClick={submitForm}>
                  Submit Form
                </Button>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default Typeform;
