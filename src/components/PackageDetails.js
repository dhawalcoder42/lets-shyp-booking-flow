import React, { useState } from 'react';

const PackageDetails = ({ data, onNext, serviceType, addressData }) => {
  const [formData, setFormData] = useState(data || {
    packageType: '',
    weight: '',
    dimensions: '',
    fragile: false,
    vehicleType: ''
  });

  const [errors, setErrors] = useState({});
  const [priceChange, setPriceChange] = useState(null);

  const isPackageService = serviceType === 'package';

  const packageTypes = [
    { id: 'small', name: 'Small', icon: '📦', maxWeight: 5, price: 0 },
    { id: 'medium', name: 'Medium', icon: '📦📦', maxWeight: 15, price: 30 },
    { id: 'large', name: 'Large', icon: '📦📦📦', maxWeight: 30, price: 60 }
  ];

  const vehicleTypes = [
    { id: 'bike', name: 'Bike', icon: '🏍️', capacity: '50L', price: 0 },
    { id: 'auto', name: 'Auto', icon: '🛺', capacity: '200L', price: 80 },
    { id: 'mini-truck', name: 'Mini Truck', icon: '🚚', capacity: '500L', price: 150 }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({ ...formData, [name]: newValue });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }

  
    if (name === 'packageType' || name === 'vehicleType') {
      const selectedItem = isPackageService 
        ? packageTypes.find(p => p.id === value)
        : vehicleTypes.find(v => v.id === value);
      
      if (selectedItem && selectedItem.price > 0) {
        setPriceChange(`+₹${selectedItem.price} for ${selectedItem.name}`);
        setTimeout(() => setPriceChange(null), 3000);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (isPackageService) {
      if (!formData.packageType) newErrors.packageType = 'Please select package size';
      if (!formData.weight) {
        newErrors.weight = 'Weight is required';
      } else {
        const weight = parseFloat(formData.weight);
        const selectedPackage = packageTypes.find(p => p.id === formData.packageType);
        if (selectedPackage && weight > selectedPackage.maxWeight) {
          newErrors.weight = `Weight exceeds ${selectedPackage.maxWeight}kg limit for ${selectedPackage.name} package`;
        }
      }
    } else {
      if (!formData.vehicleType) newErrors.vehicleType = 'Please select vehicle type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onNext(formData);
    }
  };

  const isFormValid = isPackageService 
    ? formData.packageType && formData.weight
    : formData.vehicleType;

  return (
    <div className="form-container">
      <h2>{isPackageService ? 'Package Details' : 'Vehicle Selection'}</h2>
      <p className="subtitle">Choose your {isPackageService ? 'package size and weight' : 'vehicle type'}</p>

      {priceChange && (
        <div className="info-banner animate-slide">💰 {priceChange}</div>
      )}

      {isPackageService ? (
        <>
          <div className="form-section">
            <h3>Package Size</h3>
            <div className="selection-grid">
              {packageTypes.map(pkg => (
                <div
                  key={pkg.id}
                  className={`selection-card ${formData.packageType === pkg.id ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, packageType: pkg.id })}
                >
                  <div className="selection-icon">{pkg.icon}</div>
                  <h4>{pkg.name}</h4>
                  <p>Max {pkg.maxWeight}kg</p>
                  {pkg.price > 0 && <span className="price-tag">+₹{pkg.price}</span>}
                </div>
              ))}
            </div>
            {errors.packageType && <span className="error-text">{errors.packageType}</span>}
          </div>

          <div className="form-group">
            <label>Weight (kg) *</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="Enter weight in kg"
              min="0.1"
              step="0.1"
              className={errors.weight ? 'error' : ''}
            />
            {errors.weight && <span className="error-text">{errors.weight}</span>}
            <span className="helper-text">Maximum weight depends on package size selected</span>
          </div>

          <div className="form-group">
            <label>Dimensions (Optional)</label>
            <input
              type="text"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              placeholder="e.g., 30x20x15 cm"
            />
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="fragile"
                checked={formData.fragile}
                onChange={handleChange}
              />
              <span>This package is fragile (Extra care required)</span>
            </label>
          </div>
        </>
      ) : (
        <div className="form-section">
          <h3>Select Vehicle Type</h3>
          <div className="selection-grid">
            {vehicleTypes.map(vehicle => (
              <div
                key={vehicle.id}
                className={`selection-card ${formData.vehicleType === vehicle.id ? 'selected' : ''}`}
                onClick={() => setFormData({ ...formData, vehicleType: vehicle.id })}
              >
                <div className="selection-icon">{vehicle.icon}</div>
                <h4>{vehicle.name}</h4>
                <p>Capacity: {vehicle.capacity}</p>
                {vehicle.price > 0 && <span className="price-tag">+₹{vehicle.price}</span>}
              </div>
            ))}
          </div>
          {errors.vehicleType && <span className="error-text">{errors.vehicleType}</span>}
        </div>
      )}

      <button
        className="btn-primary"
        disabled={!isFormValid}
        onClick={handleSubmit}
      >
        Continue to Pricing
      </button>
    </div>
  );
};

export default PackageDetails;