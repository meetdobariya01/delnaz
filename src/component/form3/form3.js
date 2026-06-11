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
} from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../header/header";
import Footer from "../footer/footer";

const HealingJourneyForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

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
      behavior: "instant", // or "smooth"
    });
  }, [pathname]);

  return (
    <div>
      <Header />
      <Container className="my-5">
        <Card className="p-4 shadow">
          <h3 className="text-center mb-3">🌿 Intake & Consultation Form</h3>

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
                        placeholder="Surname"
                        onChange={(e) =>
                          setFormData({ ...formData, surname: e.target.value })
                        }
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Control
                        placeholder="Forename"
                        onChange={(e) =>
                          setFormData({ ...formData, forename: e.target.value })
                        }
                      />
                    </Col>
                  </Row>
                  <Form.Control className="mt-3" placeholder="Preferred Name" />
                  <Form.Control className="mt-3" type="date" />
                  <Form.Control
                    className="mt-3"
                    as="textarea"
                    rows={2}
                    placeholder="Address"
                  />
                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Control placeholder="Relationship Status" />
                    </Col>
                    <Col md={6}>
                      <Form.Control placeholder="Occupation" />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Control placeholder="Email" />
                    </Col>
                    <Col md={6}>
                      <Form.Control placeholder="Phone" />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Control placeholder="Emergency Contact Name" />
                    </Col>
                    <Col md={6}>
                      <Form.Control placeholder="Emergency Contact Phone" />
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
                    placeholder="Doctor’s Name & Address"
                  />
                  <Form.Control className="mb-3" placeholder="Medication" />
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Health Problems / Medical Conditions (Past & Current)"
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
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="2. How does that make you feel? List the emotions that come up for you.?"
                    className="mb-3"
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="3. What is the WORST thing about this problem?"
                    className="mb-3"
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="4. What makes you angry and why?"
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
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="6. If our work together was amazingly successful, what would change for you?"
                    className="mb-3"
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="7. What strengths or positive qualities are you bringing to our work together?"
                    className="mb-3"
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="8. How would you know that these sessions were successful? How would they make you feel?"
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
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="10. What have you tried before that has worked/ not worked?"
                    className="mb-3"
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="11. Does some part of you feel that these sessions may not work? Why do you think that? List the possible reasons."
                    className="mb-3"
                  />
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="12. How much time are you willing to invest at home so we can move towards your goal even quicker?"
                  />
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="d-flex justify-content-between mt-4">
            {step > 1 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            )}
            {step < totalSteps ? (
              <Button variant="outline-dark" onClick={() => setStep(step + 1)}>Next</Button>
            ) : (
              <Button variant="success" onClick={() => console.log(formData)}>
                Submit
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
