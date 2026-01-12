import React from "react";
import "../App.css";

const BookingConfirmation = ({ bookingData, onNewBooking }) => {
  const bookingId = `LS-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  return (
    <div className="confirmation-container">
      <div className="success-animation">
        <div className="checkmark">✓</div>
      </div>

      <h1>Booking Confirmed!</h1>
      <p className="subtitle">Your delivery has been successfully booked</p>

      <div className="booking-id-card">
        <span className="label">Booking Reference</span>
        <h2>{bookingId}</h2>
        <span className="helper-text">Save this for tracking your delivery</span>
      </div>

      <div className="confirmation-details">
        <div className="detail-row">
          <span className="icon">📱</span>
          <div>
            <strong>SMS Confirmation Sent</strong>
            <p>Check your phone for delivery updates</p>
          </div>
        </div>

        <div className="detail-row">
          <span className="icon">🚚</span>
          <div>
            <strong>Delivery Partner Assigned</strong>
            <p>You'll be notified once pickup is confirmed</p>
          </div>
        </div>

        <div className="detail-row">
          <span className="icon">📞</span>
          <div>
            <strong>24/7 Support Available</strong>
            <p>Call us at 1800-123-4567 for any queries</p>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn-primary" onClick={onNewBooking}>
          Book New Delivery
        </button>
        <button className="btn-secondary">Track Delivery</button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
