# Let’s Shyp 🚚 — Booking Flow

A modern multi-step booking flow UI for hyperlocal logistics, built using **React** with a focus on:
✅ smooth user flow  
✅ validation + error handling  
✅ realistic edge cases  
✅ clean UI consistency + CTA placement  
✅ clean code structure and readability  

> Note: This project intentionally avoids overbuilding. No login, maps, or real payment gateway is implemented.

---

## ✨ Features

### ✅ Multi-step Booking Flow
1. **Service Selection**
2. **Pickup & Drop Details**
3. **Package / Vehicle Details**
4. **Pricing Summary**
5. **Checkout**
6. **Booking Confirmation**

### ✅ UX / UI
- Dark **glassmorphism** UI
- 3D shadows + modern buttons
- Clear CTA placement
- Responsive layout (desktop + mobile)

### ✅ Validations & Error Handling
- Required fields validation
- Phone number validation (Indian format)
- Pincode validation (6-digit numeric)
- Unserviceable pincode handling
- Package size weight limit validation
- Disabled CTAs until valid fields

### ✅ Pricing System (Mocked)
- Base Fare
- Distance charge (mock distance)
- Express delivery fee
- Package/Vehicle extra charge
- Fragile item fee
- Platform fee
- GST (18%)

---

## 🛠 Tech Stack
- **React (Create React App)**
- **Pure CSS** (No UI frameworks used)

---

## 📂 Project Structure

src/
components/
BookingConfirmation.js
Checkout.js
PackageDetails.js
PickupDropDetails.js
PricingSummary.js
ProgressBar.js
ServiceSelection.js
App.js
App.css
index.js
index.css


---

## ⚙️ Setup Instructions

1) Clone repo
git clone <YOUR_GITHUB_REPO_LINK>
cd lets-shyp-booking
2) Install dependencies
npm install
3) Run locally
npm start
App runs on:
http://localhost:3000