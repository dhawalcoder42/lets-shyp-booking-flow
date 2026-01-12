import React from "react";
import "../App.css";

const ProgressBar = ({ currentStep, steps }) => {
  return (
    <div className="progress-bar">
      {steps.map((step, index) => (
        <div key={index} className="progress-step">
          <div
            className={`step-circle ${
              index <= currentStep ? "active" : ""
            } ${index < currentStep ? "completed" : ""}`}
          >
            {index < currentStep ? "✓" : index + 1}
          </div>
          <div className="step-label">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
