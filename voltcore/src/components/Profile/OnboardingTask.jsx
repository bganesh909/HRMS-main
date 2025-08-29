import { useNavigate } from "react-router-dom";
import "./onboardingtask.css";

export default function OnBoardingTask() {
  const navigate = useNavigate();

  return (
    <div className="onboarding-container">
      <h2 className="title">🎉 Welcome to Core Volt Matrix</h2>
      <h2 className="title"> Onboarding Tasks</h2>
      <div className="steps-container">
        <div className="step-card step-active">
          <h3 className="step-label">Step 1: Education Documents</h3>
          <button className="complete-btn" onClick={() => navigate("/education")}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
}
