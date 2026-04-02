import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import RegistrationForm from '../components/RegistrationForm';
import './Register.css';

export default function Register({ preselectedDivision }) {
  const [formKey, setFormKey] = useState(0);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // FormSubmit.co will handle the actual submission
    // We just need to let the form component know it was successful
  };

  return (
    <div className="register-page page-enter">
      {/* Hero */}
      <section className="register-hero">
        <div className="floating-tiles">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="float-tile"
              style={{
                '--i': i,
                '--x': `${10 + (i * 41) % 80}%`,
                '--y': `${15 + (i * 47) % 70}%`,
                '--size': 25 + (i % 5) * 12,
                '--color': `var(--c${(i % 10) + 1})`,
                '--rotation': (i * 31) % 360,
              }}
            />
          ))}
        </div>

        <div className="container">
          <span className="tag-glow">
            <span className="star">★</span>
            Join Us
          </span>
          <h1 className="register-title">Become a Member</h1>
          <p className="register-subtitle handwritten">
            Add your piece to the mosaic — your journey starts here.
          </p>
        </div>
      </section>


      {/* Form Section */}
      <section className="register-section section">
        <div className="container">
          <div className="register-grid">
            {/* Form Card */}
            <motion.div
              className="register-card"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, type: 'spring' }}
            >
              <div className="card-header">
                <div className="header-tiles">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="header-tile"
                      style={{ backgroundColor: `var(--c${(i % 10) + 1})` }}
                    />
                  ))}
                </div>
                <h2 className="card-title display-font">Registration Form</h2>
                <p className="card-sub handwritten">Fill in your details below</p>
              </div>

              <form
                action="https://formsubmit.co/the.mosaicfoundation.gen@gmail.com"
                method="POST"
                key={formKey}
              >
                <RegistrationForm
                  preselectedDivision={preselectedDivision}
                  onSubmitted={() => {}}
                />
              </form>
            </motion.div>

            {/* Info Sidebar */}
            <motion.div
              className="info-sidebar"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            >
              <div className="info-card">
                <h3 className="info-title display-font">What Happens Next?</h3>

                <div className="steps">
                  <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h4>Submit Your Form</h4>
                      <p>Fill out the registration form with your details and division preferences.</p>
                    </div>
                  </div>

                  <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h4>We'll Contact You</h4>
                      <p>Our team will reach out via email with next steps and orientation details.</p>
                    </div>
                  </div>

                  <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h4>Join Your Division</h4>
                      <p>Start making an impact with your chosen division(s) and fellow members.</p>
                    </div>
                  </div>

                  <div className="step">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h4>Make a Difference</h4>
                      <p>Participate in projects, events, and initiatives that matter to you.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card contact-card">
                <h3 className="info-title display-font">Questions?</h3>
                <p className="contact-text">
                  Reach out to us anytime:
                </p>
                <a href="mailto:the.mosaicfoundation.gen@gmail.com" className="contact-email">
                  <CheckCircle size={18} />
                  the.mosaicfoundation.gen@gmail.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
