import React, { useState } from 'react';

const Checkout = ({ pricing, onNext }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        onNext(formData);
      }, 2000);
    }
  };

  const isFormValid = formData.name && formData.phone;

  return (
    <div className="form-container">
      <h2>Checkout</h2>
      <p className="subtitle">Enter your contact details</p>

      <div className="checkout-summary">
        <div className="amount-display">
          <span>Total Amount</span>
          <h1>₹{pricing.total}</h1>
        </div>
      </div>

      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className={errors.name ? 'error' : ''}
          disabled={loading}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Phone Number *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          maxLength="10"
          className={errors.phone ? 'error' : ''}
          disabled={loading}
        />
        {errors.phone && <span className="error-text">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label>Email (Optional)</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          className={errors.email ? 'error' : ''}
          disabled={loading}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <button
        className="btn-primary"
        disabled={!isFormValid || loading}
        onClick={handleSubmit}
      >
        {loading ? (
          <span className="loading-text">
            <span className="spinner"></span>
            Processing...
          </span>
        ) : (
          `Pay ₹${pricing.total}`
        )}
      </button>

      <p className="secure-text">🔒 Your payment is secure and encrypted</p>
    </div>
  );
};

export default Checkout;
