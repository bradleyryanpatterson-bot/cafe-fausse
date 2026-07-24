import React, { useState } from 'react';
import { securePost } from '../api';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus({ type: '', message: '' });

    if (!email || !validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await securePost('/newsletter', { email });
      setStatus({
        type: 'success',
        message: response.data.message
      });
      setEmail('');
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.error || 'An error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="section section-alt">
      <div className="section-container newsletter-container">
        <h2>Subscribe to Our Newsletter</h2>
        <p className="section-subtitle">Stay updated on events, specials, and seasonal menus</p>

        {status.message && (
          <div className={`toast toast-${status.type}`} role="alert">
            {status.type === 'success' ? '✅' : '⚠️'} {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="newsletter-form" aria-label="Newsletter signup form">
          <div className="form-group newsletter-input-group">
            <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
            <input
              type="email"
              id="newsletter-email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="Enter your email"
              aria-required="true"
              aria-describedby={error ? 'newsletter-error' : undefined}
              className={error ? 'input-error' : ''}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {error && <span id="newsletter-error" className="error-text">{error}</span>}
        </form>
      </div>
    </section>
  );
}

export default NewsletterSignup;
