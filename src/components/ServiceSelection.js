import React, { useState } from "react";

const ServiceSelection = ({ onNext }) => {
  const [selectedService, setSelectedService] = useState("");

  const services = [
    {
      id: "express",
      name: "Express Vehicle Delivery",
      icon: "🚗",
      description: "Fast delivery with dedicated vehicle",
      time: "30-60 mins",
      price: "Starting ₹199",
    },
    {
      id: "package",
      name: "Package Delivery",
      icon: "📦",
      description: "Reliable package delivery service",
      time: "1-2 hours",
      price: "Starting ₹99",
    },
  ];

  return (
    <div className="service-selection">
      <h2>Choose Your Service</h2>
      <p className="subtitle">Select the delivery service that suits your needs</p>

      <div className="service-grid">
        {services.map((service) => (
          <div
            key={service.id}
            className={`service-card ${selectedService === service.id ? "selected" : ""}`}
            onClick={() => setSelectedService(service.id)}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.name}</h3>
            <p className="service-desc">{service.description}</p>

            <div className="service-meta">
              <span>⏱️ {service.time}</span>
              <span>{service.price}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn-primary"
        disabled={!selectedService}
        onClick={() => onNext(selectedService)}
      >
        Continue →
      </button>
    </div>
  );
};

export default ServiceSelection;
