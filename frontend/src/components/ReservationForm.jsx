import React, { useState, useEffect } from 'react';
import { api, securePost } from '../api';
import Tooltip from './Tooltip';

const WEEKDAY_TIME_SLOTS = [
  '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
];
const SUNDAY_TIME_SLOTS = ['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

function fallbackTimeSlots(dateString) {
  // Parse as local midnight so YYYY-MM-DD is evaluated as the selected calendar day.
  return new Date(`${dateString}T00:00:00`).getDay() === 0
    ? SUNDAY_TIME_SLOTS
    : WEEKDAY_TIME_SLOTS;
}

function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guest_count: '',
    date: '',
    time: '',
    newsletter: false
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formData.date) {
      fetchAvailability(formData.date);
    } else {
      setAvailableSlots([]);
    }
  }, [formData.date]);

  const fetchAvailability = async (date) => {
    try {
      const response = await api.get(`/reservations/availability?date=${date}`);
      setAvailableSlots(response.data.available_slots || []);
    } catch (err) {
      setAvailableSlots(fallbackTimeSlots(date));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name (2-100 characters).';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date.';
    } else {
      const selected = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        newErrors.date = 'Please select a future date.';
      }
    }

    const guestCount = Number(formData.guest_count);
    if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 30) {
      newErrors.guest_count = 'Please select between 1 and 30 guests.';
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time.';
    }

    setErrors(newErrors);
    setTouched({ name: true, email: true, date: true, time: true, guest_count: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await securePost('/reservations', formData);
      setStatus({
        type: 'success',
        message: `${response.data.message} Table #${response.data.table_number}. See you on ${response.data.time_slot}!`
      });
      setFormData({ name: '', email: '', phone: '', guest_count: '', date: '', time: '', newsletter: false });
      setAvailableSlots([]);
      setTouched({});
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.error || 'An error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const showError = (field) => touched[field] && errors[field];

  return (
    <section id="reservations" className="section">
      <div className="section-container">
        <h1>Make a Reservation</h1>
        <p className="section-subtitle">Reserve your table for an unforgettable dining experience</p>

        {status.message && (
          <div className={`toast toast-${status.type}`} role="alert">
            {status.type === 'success' ? '✅' : '⚠️'} {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="reservation-form" aria-label="Reservation form" noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your full name"
              aria-required="true"
              aria-describedby={showError('name') ? 'name-error' : undefined}
              className={showError('name') ? 'input-error' : ''}
            />
            {showError('name') && <span id="name-error" className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="guest_count">Number of Guests *</label>
            <input type="number" id="guest_count" name="guest_count" min="1" max="30" step="1" value={formData.guest_count} onChange={handleChange} onBlur={handleBlur} aria-required="true" aria-describedby={showError('guest_count') ? 'guest-count-error' : undefined} className={showError('guest_count') ? 'input-error' : ''} />
            {showError('guest_count') && <span id="guest-count-error" className="error-text">{errors.guest_count}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your email"
              aria-required="true"
              aria-describedby={showError('email') ? 'email-error' : undefined}
              className={showError('email') ? 'input-error' : ''}
            />
            {showError('email') && <span id="email-error" className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone Number
              <Tooltip content="Optional. Format: (555) 555-5555" />
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="(555) 555-5555"
            />
            {showError('phone') && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="date">Preferred Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              onBlur={handleBlur}
              min={today}
              aria-required="true"
              aria-describedby={showError('date') ? 'date-error' : undefined}
              className={showError('date') ? 'input-error' : ''}
            />
            {showError('date') && <span id="date-error" className="error-text">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="time">
              Preferred Time *
              <Tooltip content="Choose an available start time during our operating hours." />
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-required="true"
              aria-describedby={showError('time') ? 'time-error' : undefined}
              className={showError('time') ? 'input-error' : ''}
              disabled={!formData.date}
            >
              <option value="">{formData.date ? 'Select a time' : 'Select a date first'}</option>
              {availableSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
            {showError('time') && <span id="time-error" className="error-text">{errors.time}</span>}
            <span className="field-help">All reservation times are Eastern Time (Washington, DC).</span>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
              />
              Sign me up for the newsletter
              <Tooltip content="We'll send you monthly updates about events and specials." />
            </label>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Reservation'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ReservationForm;
