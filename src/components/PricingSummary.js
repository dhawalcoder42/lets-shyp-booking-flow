import React from "react";
import "../App.css";

const PricingSummary = ({ addressData, packageData, serviceType, onNext, onEdit }) => {
  const calculatePrice = () => {
    let basePrice = serviceType === 'package' ? 99 : 199;
    let distance = 15; 
    
    let distanceCharge = distance * 8;
    
    let expressCharge = addressData.deliveryType === 'express' ? 50 : 0;
    
    let extraCharge = 0;
    if (serviceType === 'package') {
      const packagePrices = { small: 0, medium: 30, large: 60 };
      extraCharge = packagePrices[packageData.packageType] || 0;
      if (packageData.fragile) extraCharge += 20;
    } else {
      const vehiclePrices = { bike: 0, auto: 80, 'mini-truck': 150 };
      extraCharge = vehiclePrices[packageData.vehicleType] || 0;
    }
    
    let platformFee = 15;
    let subtotal = basePrice + distanceCharge + expressCharge + extraCharge;
    let gst = Math.round(subtotal * 0.18);
    let total = subtotal + platformFee + gst;
    
    return {
      basePrice,
      distanceCharge,
      distance,
      expressCharge,
      extraCharge,
      platformFee,
      subtotal,
      gst,
      total
    };
  };

  const pricing = calculatePrice();

  return (
    <div className="form-container">
      <h2>Pricing & Order Summary</h2>
      <p className="subtitle">Review your booking details</p>

      <div className="summary-section">
        <div className="summary-card">
          <h3>📍 Delivery Details</h3>
          <div className="summary-row">
            <span className="label">Pickup:</span>
            <span>{addressData.pickupAddress}</span>
          </div>
          <div className="summary-row">
            <span className="label">Pincode:</span>
            <span>{addressData.pickupPincode}</span>
          </div>
          <div className="summary-row">
            <span className="label">Drop:</span>
            <span>{addressData.dropAddress}</span>
          </div>
          <div className="summary-row">
            <span className="label">Pincode:</span>
            <span>{addressData.dropPincode}</span>
          </div>
          <div className="summary-row">
            <span className="label">Type:</span>
            <span className="badge">{addressData.deliveryType === 'express' ? '⚡ Express' : '🕐 Normal'}</span>
          </div>
          <button className="btn-text" onClick={() => onEdit(0)}>Edit</button>
        </div>

        <div className="summary-card">
          <h3>{serviceType === 'package' ? '📦 Package Details' : '🚗 Vehicle Details'}</h3>
          {serviceType === 'package' ? (
            <>
              <div className="summary-row">
                <span className="label">Size:</span>
                <span className="capitalize">{packageData.packageType}</span>
              </div>
              <div className="summary-row">
                <span className="label">Weight:</span>
                <span>{packageData.weight} kg</span>
              </div>
              {packageData.fragile && (
                <div className="summary-row">
                  <span className="badge-warning">⚠️ Fragile</span>
                </div>
              )}
            </>
          ) : (
            <div className="summary-row">
              <span className="label">Vehicle:</span>
              <span className="capitalize">{packageData.vehicleType.replace('-', ' ')}</span>
            </div>
          )}
          <button className="btn-text" onClick={() => onEdit(1)}>Edit</button>
        </div>
      </div>

      <div className="pricing-card">
        <h3>💰 Fare Breakdown</h3>
        <div className="pricing-row">
          <span>Base Fare</span>
          <span>₹{pricing.basePrice}</span>
        </div>
        <div className="pricing-row">
          <span>Distance ({pricing.distance} km)</span>
          <span>₹{pricing.distanceCharge}</span>
        </div>
        {pricing.expressCharge > 0 && (
          <div className="pricing-row">
            <span>Express Delivery</span>
            <span>₹{pricing.expressCharge}</span>
          </div>
        )}
        {pricing.extraCharge > 0 && (
          <div className="pricing-row">
            <span>{serviceType === 'package' ? 'Package' : 'Vehicle'} Charges</span>
            <span>₹{pricing.extraCharge}</span>
          </div>
        )}
        <div className="pricing-row subtotal">
          <span>Subtotal</span>
          <span>₹{pricing.subtotal}</span>
        </div>
        <div className="pricing-row">
          <span>Platform Fee</span>
          <span>₹{pricing.platformFee}</span>
        </div>
        <div className="pricing-row">
          <span>GST (18%)</span>
          <span>₹{pricing.gst}</span>
        </div>
        <div className="pricing-row total">
          <span>Total Amount</span>
          <span>₹{pricing.total}</span>
        </div>
      </div>

      <button className="btn-primary" onClick={() => onNext(pricing)}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default PricingSummary;