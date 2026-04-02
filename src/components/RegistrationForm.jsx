import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, X, CheckCircle2 } from 'lucide-react';
import './RegistrationForm.css';

const divisions = [
  { id: 'peoples-patch', name: "The People's Patch", color: 'var(--c1)' },
  { id: 'whiskers-wings', name: 'Whiskers & Wings', color: 'var(--c3)' },
  { id: 'groves-petals', name: 'Groves & Petals', color: 'var(--c6)' },
];

const activities = [
  { id: 'blogging', name: 'Blogging', color: 'var(--c5)' },
  { id: 'designing', name: 'Designing and Website Help', color: 'var(--c4)' },
];

export default function RegistrationForm({ preselectedDivision }) {
  const [formData, setFormData] = useState({
    name: '',
    divisions: preselectedDivision ? [preselectedDivision] : [],
    activities: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
    if (errors.name) setErrors({ ...errors, name: null });
  };

  const handleDivisionToggle = (divId) => {
    setFormData((prev) => {
      const exists = prev.divisions.includes(divId);
      return {
        ...prev,
        divisions: exists
          ? prev.divisions.filter((d) => d !== divId)
          : [...prev.divisions, divId],
      };
    });
    if (errors.divisions) setErrors({ ...errors, divisions: null });
  };

  const handleActivityToggle = (actId) => {
    setFormData((prev) => {
      const exists = prev.activities.includes(actId);
      return {
        ...prev,
        activities: exists
          ? prev.activities.filter((a) => a !== actId)
          : [...prev.activities, actId],
      };
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.divisions.length === 0) {
      newErrors.divisions = 'Please select at least one division';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for FormSubmit
      const selectedDivs = formData.divisions.map(id => divisions.find(d => d.id === id)?.name).filter(Boolean);
      const selectedActs = formData.activities.map(id => activities.find(a => a.id === id)?.name).filter(Boolean);

      const submissionData = {
        name: formData.name,
        Division: selectedDivs.join(', '),
        Activity: selectedActs.join(', '),
        _subject: "New Member Registration - Mosaic Foundation",
        _template: "table",
        _captcha: "false"
      };

      const response = await fetch("https://formsubmit.co/ajax/the.mosaicfoundation.gen@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form
        setFormData({
          name: '',
          divisions: preselectedDivision ? [preselectedDivision] : [],
          activities: [],
        });
        // Auto-hide toaster after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err) {
      setErrors({ form: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create hidden inputs for selected divisions (as separate fields for FormSubmit)
  const divisionInputs = formData.divisions.map((divId) => {
    const div = divisions.find((d) => d.id === divId);
    return <input key={divId} type="hidden" name="Division" value={div?.name} />;
  });

  // Create hidden inputs for selected activities
  const activityInputs = formData.activities.map((actId) => {
    const act = activities.find((a) => a.id === actId);
    return <input key={actId} type="hidden" name="Activity" value={act?.name} />;
  });

  return (
    <div className="registration-form">
      {/* Name Field */}
      <div className="form-group">
        <label className="form-label" htmlFor="name">
          Your Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Enter your full name"
          className={errors.name ? 'error' : ''}
          required
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>

      {/* Division Selection */}
      <div className="form-group">
        <label className="form-label">
          Select Your Division(s) <span className="required">*</span>
        </label>
        <p className="form-hint handwritten">
          Choose at least one division you'd like to join
        </p>

        <div className="checkbox-group">
          {divisions.map((div) => (
            <label
              key={div.id}
              className={`checkbox-card ${
                formData.divisions.includes(div.id) ? 'selected' : ''
              }`}
              style={{ '--color': div.color }}
            >
              <input
                type="checkbox"
                name="divisions"
                value={div.id}
                checked={formData.divisions.includes(div.id)}
                onChange={() => handleDivisionToggle(div.id)}
                required={formData.divisions.length === 0 && !preselectedDivision}
              />
              <span className="checkbox-text">{div.name}</span>
              {formData.divisions.includes(div.id) && (
                <Check size={18} className="checkbox-check" />
              )}
            </label>
          ))}
        </div>
        {errors.divisions && <p className="error-message">{errors.divisions}</p>}
      </div>

      {/* Extracurricular Activities */}
      <div className="form-group">
        <label className="form-label">
          Extracurricular Activities{' '}
          <span className="optional">(Optional)</span>
        </label>
        <p className="form-hint handwritten">
          Select any additional ways you'd like to contribute
        </p>

        <div className="checkbox-group">
          {activities.map((act) => (
            <label
              key={act.id}
              className={`checkbox-card ${
                formData.activities.includes(act.id) ? 'selected' : ''
              }`}
              style={{ '--color': act.color }}
            >
              <input
                type="checkbox"
                name="activities"
                value={act.id}
                checked={formData.activities.includes(act.id)}
                onChange={() => handleActivityToggle(act.id)}
              />
              <span className="checkbox-text">{act.name}</span>
              {formData.activities.includes(act.id) && (
                <Check size={18} className="checkbox-check" />
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Submission Status Toaster */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            className="success-toaster"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <div className="toaster-content">
              <div className="toaster-icon">
                <CheckCircle2 size={24} />
              </div>
              <div className="toaster-text">
                <h4>Successfully Submitted!</h4>
                <p>Welcome to the mosaic. Check your email soon.</p>
              </div>
              <button className="toaster-close" onClick={() => setIsSubmitted(false)}>
                <X size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Error Message */}
      {errors.form && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="error-message form-error"
        >
          {errors.form}
        </motion.p>
      )}

      {/* Submit Button */}
      <button 
        type="submit" 
        className={`btn btn-primary btn-submit ${isSubmitting ? 'loading' : ''}`}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="spinner"></div>
        ) : (
          <>
            <Sparkles size={18} />
            Join the Mosaic
          </>
        )}
      </button>
    </div>
  );
}
