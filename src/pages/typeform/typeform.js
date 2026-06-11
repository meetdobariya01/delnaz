import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, Spinner } from "react-bootstrap";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ show: false, type: "", message: "" });
  
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

  const submitForm = async () => {
    // Validate required fields
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
      setSubmitStatus({
        show: true,
        type: "danger",
        message: "Please fill all required fields!"
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        show: true,
        type: "danger",
        message: "Please provide a valid email address."
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ show: false, type: "", message: "" });

    try {
      const response = await fetch("http://localhost:5005/api/submit-therapy-intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          show: true,
          type: "success",
          message: "Form Submitted Successfully! We will contact you soon."
        });
        console.log("SUBMITTED DATA:", formData);
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
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
          setSubmitStatus({ show: false, type: "", message: "" });
        }, 3000);
      } else {
        setSubmitStatus({
          show: true,
          type: "danger",
          message: data.message || "Something went wrong. Please try again."
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        show: true,
        type: "danger",
        message: "Network error. Please check your connection and try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
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
              {submitStatus.show && (
                <Alert 
                  variant={submitStatus.type} 
                  onClose={() => setSubmitStatus({ show: false, type: "", message: "" })}
                  dismissible
                >
                  {submitStatus.message}
                </Alert>
              )}

              {/* PERSONAL DETAILS */}
              <h4>Personal Details</h4>
              <Form.Control
                placeholder="Surname"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <Form.Control
                className="mt-3"
                placeholder="Forename"
                name="forename"
                value={formData.forename}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <Form.Control
                className="mt-3"
                placeholder="Preferred Name"
                name="preferredName"
                value={formData.preferredName}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <Form.Control
                className="mt-3"
                type="number"
                placeholder="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <Form.Control
                className="mt-3"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <Form.Control
                as="textarea"
                rows={2}
                className="mt-3"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={isSubmitting}
              />

              <Form.Select
                className="mt-3"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                disabled={isSubmitting}
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
                value={formData.occupation}
                onChange={handleChange}
                disabled={isSubmitting}
              />

              {/* CONTACT DETAILS */}
              <h4 className="mt-4">Contact Details</h4>
              <Form.Control
                placeholder="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <Form.Control
                className="mt-3"
                placeholder="Telephone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <Form.Control
                className="mt-3"
                placeholder="Emergency Contact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                disabled={isSubmitting}
              />

              {/* HEALTH INFO */}
              <h4 className="mt-4">Health Information</h4>
              <Form.Control
                placeholder="Doctor's Name & Address"
                name="doctorDetails"
                value={formData.doctorDetails}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <Form.Control
                className="mt-3"
                type="date"
                name="lastCheckup"
                value={formData.lastCheckup}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <Form.Control
                className="mt-3"
                placeholder="Medications"
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <Form.Control
                as="textarea"
                rows={3}
                className="mt-3"
                placeholder="Health Problems"
                name="healthProblems"
                value={formData.healthProblems}
                onChange={handleChange}
                disabled={isSubmitting}
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
                      disabled={isSubmitting}
                    />
                  </Col>
                ))}
              </Row>

              {/* SUBMIT */}
              <div className="text-center mt-4">
                <Button 
                  variant="success" 
                  size="lg" 
                  onClick={submitForm}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      {" Submitting..."}
                    </>
                  ) : (
                    "Submit Form"
                  )}
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