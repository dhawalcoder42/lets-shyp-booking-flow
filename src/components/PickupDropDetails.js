import React, { useState } from 'react';
import '../App.css';

const PickupDropDetails = ({ data, onNext, serviceType }) => {
  const [formData, setFormData] = useState(data || {
    pickupAddress: '',
    pickupPincode: '',
    dropAddress: '',
    dropPincode: '',
    deliveryType: 'express',
    instructions: ''
  });

  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState({});

  const unserviceableAreas = ['400001', '400002', '110001'];

  const validatePincode = (pincode, field) => {
    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      return 'Pincode must be 6 digits';
    }
    if (unserviceableAreas.includes(pincode)) {
      return 'Sorry, we don\'t service this area yet';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }

    // Validate pincode on change
    if (name.includes('Pincode') && value.length === 6) {
      const error = validatePincode(value, name);
      if (error) {
        setErrors({ ...errors, [name]: error });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.pickupAddress.trim()) newErrors.pickupAddress = 'Pickup address is required';
    if (!formData.pickupPincode) newErrors.pickupPincode = 'Pickup pincode is required';
    if (!formData.dropAddress.trim()) newErrors.dropAddress = 'Drop address is required';
    if (!formData.dropPincode) newErrors.dropPincode = 'Drop pincode is required';

    const pickupError = validatePincode(formData.pickupPincode, 'pickupPincode');
    const dropError = validatePincode(formData.dropPincode, 'dropPincode');
    
    if (pickupError) newErrors.pickupPincode = pickupError;
    if (dropError) newErrors.dropPincode = dropError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Check if distance warning
      if (formData.pickupPincode[0] !== formData.dropPincode[0]) {
        setWarnings({ distance: 'Long distance delivery - prices may vary' });
      }
      onNext(formData);
    }
  };

  const isFormValid = formData.pickupAddress && formData.pickupPincode && 
                      formData.dropAddress && formData.dropPincode &&
                      Object.keys(errors).every(key => !errors[key]);

  return (
    <div className="form-container">
      <h2>Pickup & Drop Details</h2>
      <p className="subtitle">Enter your pickup and delivery locations</p>

      <div className="form-section">
        <h3>📍 Pickup Location</h3>
        <div className="form-group">
          <label>Pickup Address *</label>
          <input
            type="text"
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleChange}
            placeholder="Enter complete pickup address"
            className={errors.pickupAddress ? 'error' : ''}
          />
          {errors.pickupAddress && <span className="error-text">{errors.pickupAddress}</span>}
        </div>

        <div className="form-group">
          <label>Pincode *</label>
          <input
            type="text"
            name="pickupPincode"
            value={formData.pickupPincode}
            onChange={handleChange}
            placeholder="6-digit pincode"
            maxLength="6"
            className={errors.pickupPincode ? 'error' : ''}
          />
          {errors.pickupPincode && <span className="error-text">{errors.pickupPincode}</span>}
        </div>
      </div>

      <div className="form-section">
        <h3>📍 Drop Location</h3>
        <div className="form-group">
          <label>Drop Address *</label>
          <input
            type="text"
            name="dropAddress"
            value={formData.dropAddress}
            onChange={handleChange}
            placeholder="Enter complete drop address"
            className={errors.dropAddress ? 'error' : ''}
          />
          {errors.dropAddress && <span className="error-text">{errors.dropAddress}</span>}
        </div>

        <div className="form-group">
          <label>Pincode *</label>
          <input
            type="text"
            name="dropPincode"
            value={formData.dropPincode}
            onChange={handleChange}
            placeholder="6-digit pincode"
            maxLength="6"
            className={errors.dropPincode ? 'error' : ''}
          />
          {errors.dropPincode && <span className="error-text">{errors.dropPincode}</span>}
        </div>
      </div>

      <div className="form-section">
        <h3>⚡ Delivery Type</h3>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="deliveryType"
              value="express"
              checked={formData.deliveryType === 'express'}
              onChange={handleChange}
            />
            <span>Express Delivery (30-60 mins) - ₹50 extra</span>
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="deliveryType"
              value="normal"
              checked={formData.deliveryType === 'normal'}
              onChange={handleChange}
            />
            <span>Normal Delivery (1-2 hours)</span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Delivery Instructions (Optional)</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Any special instructions for delivery..."
          rows="3"
        />
      </div>

      {warnings.distance && (
        <div className="warning-banner">⚠️ {warnings.distance}</div>
      )}

      <button
        className="btn-primary"
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        Continue to Package Details
      </button>
    </div>
  );
};
export default PickupDropDetails;