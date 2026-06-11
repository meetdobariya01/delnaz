import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  ProgressBar,
  Row,
  Col,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../header/header";
import Footer from "../footer/footer";

const HealingJourneyForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ show: false, type: "", message: "" });

  const [formData, setFormData] = useState({
    // PERSONAL DETAILS
    surname: "",
    forename: "",
    preferredName: "",
    dob: "",
    address: "",
    relationshipStatus: "",
    occupation: "",
    email: "",
    phone: "",
    emergencyName: "",
    emergencyPhone: "",

    // HEALTH
    doctorDetails: "",
    medication: "",
    medicalConditions: "",

    // AREAS OF CONCERN
    concerns: [],

    // CONSULTATION QUESTIONS
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    q11: "",
    q12: "",
  });

  const handleMultiSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const OptionCard = ({ label, selected, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      style={{
        border: selected ? "2px solid #28a745" : "1px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "10px",
        cursor: "pointer",
        background: selected ? "#e9f7ef" : "#fff",
      }}
    >
      <Form.Check type="checkbox" checked={selected} readOnly label={label} />
    </motion.div>
  );

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.surname || !formData.forename || !formData.email || !formData.phone) {
      setSubmitStatus({
        show: true,
        type: "danger",
        message: "Please fill in all required contact information (Surname, Forename, Email, Phone)."
      });
      setStep(1);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ show: false, type: "", message: "" });

    try {
      const response = await fetch("https://app.delnazmedora.com/api/submit-healing-journey-intake", {
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
          message: "Form Submitted Successfully ✅ We will contact you soon!"
        });
        console.log("Final Data:", formData);
        
        // Reset form after successful submission
        setTimeout(() => {
          setStep(1);
          setFormData({
            surname: "",
            forename: "",
            preferredName: "",
            dob: "",
            address: "",
            relationshipStatus: "",
            occupation: "",
            email: "",
            phone: "",
            emergencyName: "",
            emergencyPhone: "",
            doctorDetails: "",
            medication: "",
            medicalConditions: "",
            concerns: [],
            q1: "",
            q2: "",
            q3: "",
            q4: "",
            q5: "",
            q6: "",
            q7: "",
            q8: "",
            q9: "",
            q10: "",
            q11: "",
            q12: "",
          });
          setTimeout(() => {
            setSubmitStatus({ show: false, type: "", message: "" });
          }, 3000);
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

  const concernOptions = [
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
    "Public Speaking",
    "Nerves",
    "Exams",
    "Memory",
    "Driving Skills",
    "Sexual Problems",
    "Fertility",
    "IVF",
    "Pregnancy",
    "Birth",
    "Conception",
    "Pain Control",
    "Hearing",
    "Sight/Vision",
    "Mobility",
    "Skin Problems",
    "Hair Growth",
    "Relationships",
    "Childhood Problems",
    "Sleep Problems",
  ];
  
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return (
    <div>
      <Header />
      <Container className="my-5">
        <Card className="p-4 shadow">
          <h3 className="text-center mb-3">🌿 Intake & Consultation Form</h3>

          {submitStatus.show && (
            <Alert 
              variant={submitStatus.type} 
              onClose={() => setSubmitStatus({ show: false, type: "", message: "" })}
              dismissible
            >
              {submitStatus.message}
            </Alert>
          )}

          <ProgressBar
            now={(step / totalSteps) * 100}
            className="mb-4"
            animated
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              {/* STEP 1 – PERSONAL DETAILS */}
              {step === 1 && (
                <>
                  <h5>Personal Details</h5>
                  <Row>
                    <Col md={6}>
                      <Form.Control
                        placeholder="Surname *"
                        value={formData.surname}
                        onChange={(e) =>
                          handleInputChange("surname", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        placeholder="Forename *"
                        value={formData.forename}
                        onChange={(e) =>
                          handleInputChange("forename", e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                  <Form.Control 
                    className="mt-3" 
                    placeholder="Preferred Name"
                    value={formData.preferredName}
                    onChange={(e) =>
                      handleInputChange("preferredName", e.target.value)
                    }
                  />
                  <Form.Control 
                    className="mt-3" 
                    type="date"
                    value={formData.dob}
                    onChange={(e) =>
                      handleInputChange("dob", e.target.value)
                    }
                  />
                  <Form.Control
                    className="mt-3"
                    as="textarea"
                    rows={2}
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Control 
                        placeholder="Relationship Status"
                        value={formData.relationshipStatus}
                        onChange={(e) =>
                          handleInputChange("relationshipStatus", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control 
                        placeholder="Occupation"
                        value={formData.occupation}
                        onChange={(e) =>
                          handleInputChange("occupation", e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Control 
                        placeholder="Email *"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control 
                        placeholder="Phone *"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Control 
                        placeholder="Emergency Contact Name"
                        value={formData.emergencyName}
                        onChange={(e) =>
                          handleInputChange("emergencyName", e.target.value)
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control 
                        placeholder="Emergency Contact Phone"
                        value={formData.emergencyPhone}
                        onChange={(e) =>
                          handleInputChange("emergencyPhone", e.target.value)
                        }
                      />
                    </Col>
                  </Row>
                </>
              )}

              {/* STEP 2 – HEALTH */}
              {step === 2 && (
                <>
                  <h5>Health Information</h5>
                  <Form.Control 
                    className="mb-3" 
                    placeholder="Doctor's Name & Address"
                    value={formData.doctorDetails}
                    onChange={(e) =>
                      handleInputChange("doctorDetails", e.target.value)
                    }
                  />
                  <Form.Control 
                    className="mb-3" 
                    placeholder="Medication"
                    value={formData.medication}
                    onChange={(e) =>
                      handleInputChange("medication", e.target.value)
                    }
                  />
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Health Problems / Medical Conditions (Past & Current)"
                    value={formData.medicalConditions}
                    onChange={(e) =>
                      handleInputChange("medicalConditions", e.target.value)
                    }
                  />
                </>
              )}

              {/* STEP 3 – AREAS OF CONCERN */}
              {step === 3 && (
                <>
                  <h5>Areas of Concern</h5>
                  <Row>
                    {concernOptions.map((item) => (
                      <Col md={4} key={item}>
                        <OptionCard
                          label={item}
                          selected={formData.concerns.includes(item)}
                          onClick={() => handleMultiSelect("concerns", item)}
                        />
                      </Col>
                    ))}
                  </Row>
                </>
              )}

              {/* STEP 4 – QUESTIONS 1–4 */}
              {step === 4 && (
                <>
                  <h5>Consultation Questions</h5>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="1. What is the most important issue/problem that you would like to start with? Please state it clearly in 4-5 sentences."
                    className="mb-3"
                    value={formData.q1}
                    onChange={(e) => handleInputChange("q1", e.target.value)}
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="2. How does that make you feel? List the emotions that come up for you."
                    className="mb-3"
                    value={formData.q2}
                    onChange={(e) => handleInputChange("q2", e.target.value)}
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="3. What is the WORST thing about this problem?"
                    className="mb-3"
                    value={formData.q3}
                    onChange={(e) => handleInputChange("q3", e.target.value)}
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="4. What makes you angry and why?"
                    value={formData.q4}
                    onChange={(e) => handleInputChange("q4", e.target.value)}
                  />
                </>
              )}

              {/* STEP 5 – QUESTIONS 5–8 */}
              {step === 5 && (
                <>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="5. Biggest regret or sadness?"
                    className="mb-3"
                    value={formData.q5}
                    onChange={(e) => handleInputChange("q5", e.target.value)}
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="6. If our work together was amazingly successful, what would change for you?"
                    className="mb-3"
                    value={formData.q6}
                    onChange={(e) => handleInputChange("q6", e.target.value)}
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="7. What strengths or positive qualities are you bringing to our work together?"
                    className="mb-3"
                    value={formData.q7}
                    onChange={(e) => handleInputChange("q7", e.target.value)}
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="8. How would you know that these sessions were successful? How would they make you feel?"
                    value={formData.q8}
                    onChange={(e) => handleInputChange("q8", e.target.value)}
                  />
                </>
              )}

              {/* STEP 6 – QUESTIONS 9–12 */}
              {step === 6 && (
                <>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="9. All of us have repetitive thoughts. What are the thoughts/ beliefs about yourself or about other or about the world relating to this issue which keep circling in your head? (As many as you want)"
                    className="mb-3"
                    value={formData.q9}
                    onChange={(e) => handleInputChange("q9", e.target.value)}
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="10. What have you tried before that has worked/ not worked?"
                    className="mb-3"
                    value={formData.q10}
                    onChange={(e) => handleInputChange("q10", e.target.value)}
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="11. Does some part of you feel that these sessions may not work? Why do you think that? List the possible reasons."
                    className="mb-3"
                    value={formData.q11}
                    onChange={(e) => handleInputChange("q11", e.target.value)}
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="12. How much time are you willing to invest at home so we can move towards your goal even quicker?"
                    value={formData.q12}
                    onChange={(e) => handleInputChange("q12", e.target.value)}
                  />
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="d-flex justify-content-between mt-4">
            {step > 1 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)} disabled={isSubmitting}>
                Back
              </Button>
            )}
            {step < totalSteps ? (
              <Button variant="outline-dark" onClick={() => setStep(step + 1)} disabled={isSubmitting}>
                Next
              </Button>
            ) : (
              <Button variant="success" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                    {" Submitting..."}
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            )}
          </div>
        </Card>
      </Container>
      <Footer />
    </div>
  );
};

export default HealingJourneyForm;