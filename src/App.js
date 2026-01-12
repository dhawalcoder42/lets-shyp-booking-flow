import React from "react";
import "../App.css";
import { useState } from "react";
import ProgressBar from "./components/ProgressBar";
import ServiceSelection from "./components/ServiceSelection";
import PickupDropDetails from "./components/PickupDropDetails";
import PackageDetails from "./components/PackageDetails";
import PricingSummary from "./components/PricingSummary";
import Checkout from "./components/Checkout";
import BookingConfirmation from "./components/BookingConfirmation";

function App() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [serviceType, setServiceType] = useState("");
  const [addressData, setAddressData] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [pricing, setPricing] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  const steps = [
    "Service",
    "Pickup & Drop",
    "Package Details",
    "Pricing",
    "Checkout",
    "Confirmation",
  ];

  const handleServiceSelect = (service) => {
    setServiceType(service);
    setCurrentStep(0);
  };

  const handleAddressNext = (data) => {
    setAddressData(data);
    setCurrentStep(1);
  };

  const handlePackageNext = (data) => {
    setPackageData(data);
    setCurrentStep(2);
  };

  const handlePricingNext = (pricingData) => {
    setPricing(pricingData);
    setCurrentStep(3);
  };

  const handleCheckoutNext = (data) => {
    setCustomerData(data);
    setCurrentStep(4);
  };

  const handleEdit = (step) => {
    setCurrentStep(step);
  };

  const handleNewBooking = () => {
    setCurrentStep(-1);
    setServiceType("");
    setAddressData(null);
    setPackageData(null);
    setPricing(null);
    setCustomerData(null);
  };

  return (
    <div className="app">
      <header className="app-header">
  <div className="header-left">
    <h1 className="logo">Let's Shyp 🚚</h1>
    <p className="tagline">Hyperlocal Logistics Made Easy</p>
  </div>

  <div className="brand-chip">
    ✨ <span>Fast • Secure • Reliable</span>
  </div>
</header>


      <div className="app-container">
        {currentStep >= 0 && currentStep < 4 && (
          <ProgressBar currentStep={currentStep} steps={steps.slice(1, 5)} />
        )}

        <div className="content">
          {currentStep === -1 && (
            <ServiceSelection onNext={handleServiceSelect} />
          )}

          {currentStep === 0 && (
            <PickupDropDetails
              data={addressData}
              onNext={handleAddressNext}
              serviceType={serviceType}
            />
          )}

          {currentStep === 1 && (
            <PackageDetails
              data={packageData}
              onNext={handlePackageNext}
              serviceType={serviceType}
              addressData={addressData}
            />
          )}

          {currentStep === 2 && (
            <PricingSummary
              addressData={addressData}
              packageData={packageData}
              serviceType={serviceType}
              onNext={handlePricingNext}
              onEdit={handleEdit}
            />
          )}

          {currentStep === 3 && (
            <Checkout pricing={pricing} onNext={handleCheckoutNext} />
          )}

          {currentStep === 4 && (
            <BookingConfirmation
              bookingData={{ addressData, packageData, pricing, customerData }}
              onNewBooking={handleNewBooking}
            />
          )}
        </div>
      </div>

      <footer className="app-footer">
        <p>© 2026 Let's Shyp. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
