import { useState } from "react";

export default function App() {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState("");
  const [result, setResult] = useState("");

  const generatePlan = () => {
    const response = `
Trip Plan for ${destination}

Duration: ${days} days
Budget: ${budget}

Recommended Activities:
- Explore local attractions
- Try regional cuisine
- Visit famous landmarks
- Capture memorable experiences

Travel Tips:
- Book tickets early
- Keep emergency cash
- Use local transport apps
`;

    setResult(response);
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: "40px",
        maxWidth: "700px",
        margin: "auto",
      }}
    >
      <h1>AI Travel Planning Engine</h1>

      <input
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="Budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="Trip Duration (days)"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        style={inputStyle}
      />

      <button onClick={generatePlan} style={buttonStyle}>
        Generate Travel Plan
      </button>

      {result && (
        <div style={resultStyle}>
          <pre>{result}</pre>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const resultStyle = {
  marginTop: "20px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  background: "#f5f5f5",
};