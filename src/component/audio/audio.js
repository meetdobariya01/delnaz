import React, { useRef, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";
import { motion } from "framer-motion";
import "./audio.css";

const data = [
  {
    id: 1,
    name: "Build Healthy Boundaries ",
    image: "./images/audio-1.png",
    audio: "./images/audio/1.mp4",
  },
  {
    id: 2,
    name: "Breathing for Anxiety",
    image: "./images/audio-2.png",
    audio: "./images/audio/2.mp4",
  },
  {
    id: 3,
    name: "Loving Kindness Meditation",
    image: "./images/audio-3.png",
    audio: "./images/audio/3.mp4",
  },
];
const Audio = () => {
  const [playingId, setPlayingId] = useState(null);
  const audioRefs = useRef({});

  const handleAudio = (id) => {
    const currentAudio = audioRefs.current[id];

    // Stop all other audios
    Object.keys(audioRefs.current).forEach((key) => {
      if (Number(key) !== id) {
        audioRefs.current[key].pause();
        audioRefs.current[key].currentTime = 0;
      }
    });

    if (playingId === id) {
      currentAudio.pause();
      setPlayingId(null);
    } else {
      currentAudio.play();
      setPlayingId(id);
    }
  };
  return (
    <div>
      <section className="voice-section py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">
              Healing Voices for a Peaceful Mind
            </h2>
            <p className="section-subtitle">
              Relax, heal, and reconnect with yourself through calming guided
              audio experiences designed for inner peace and emotional wellness.
            </p>
          </div>

          <Row className="g-4">
            {data.map((item, index) => (
              <Col lg={4} md={6} xs={6} key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="voice-card border-0">
                    <div className="image-wrapper">
                      <Card.Img
                        variant="top"
                        src={item.image}
                        className="voice-image"
                      />

                      <div className="image-overlay"></div>
                    </div>

                    <Card.Body className="text-center">
                      <h4 className="voice-name">{item.name}</h4>

                      <div className="audio-box">
                        <audio
                          ref={(el) => (audioRefs.current[item.id] = el)}
                          src={item.audio}
                        />

                        <Button
                          className="audio-btn"
                          onClick={() => handleAudio(item.id)}
                        >
                          {playingId === item.id ? (
                            <>
                              <FaPause className="me-2" />
                              Stop
                            </>
                          ) : (
                            <>
                              <FaPlay className="me-2" />
                              Play
                            </>
                          )}
                        </Button>

                        <FaVolumeUp className="volume-icon" />
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Audio;
