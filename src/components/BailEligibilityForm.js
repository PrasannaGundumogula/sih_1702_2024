import React, { useState } from 'react';
import axios from 'axios';
import './BailEligibilityForm.css'; // Import CSS for styling

const BailEligibilityForm = () => {
  const [formData, setFormData] = useState({
    cyber_crime: false,
    sc_st_crime: false,
    women_crime: false,
    severity: 'bailable',
    compoundable: 'yes',
    imprisonment_duration: 0,
    flight_risk: 'low',
    threat_to_witnesses: 'no',
    surety_bond_amount: 0,
    personal_bond: 'no',
    identity_verified: false,
    half_term_rule: 'no',
  });

  const [eligibility, setEligibility] = useState('');

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/checkBail', formData);
      setEligibility(response.data.eligibility);
    } catch (error) {
      console.error('Error checking bail eligibility:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Bail Reckoner Tool</h2>
      <form onSubmit={handleSubmit}>
        {/* Offense Information */}
        <label>Select the nature of the offense:</label>
        <div className="checkbox-group">
          <label><input type="checkbox" name="cyber_crime" checked={formData.cyber_crime} onChange={handleChange} /> Cyber Crime</label>
          <label><input type="checkbox" name="sc_st_crime" checked={formData.sc_st_crime} onChange={handleChange} /> Crimes Against SCs/STs</label>
          <label><input type="checkbox" name="women_crime" checked={formData.women_crime} onChange={handleChange} /> Crimes Against Women</label>
        </div>

        <label>Select the severity of the offense:</label>
        <select name="severity" value={formData.severity} onChange={handleChange}>
          <option value="bailable">Bailable</option>
          <option value="non_bailable">Non-Bailable</option>
        </select>

        <label>Is the offense compoundable?</label>
        <div className="radio-group">
          <label><input type="radio" name="compoundable" value="yes" checked={formData.compoundable === 'yes'} onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="compoundable" value="no" checked={formData.compoundable === 'no'} onChange={handleChange} /> No</label>
        </div>

        <label>Enter the duration of imprisonment already served (in months):</label>
        <input type="number" name="imprisonment_duration" value={formData.imprisonment_duration} onChange={handleChange} />

        <label>Is there a risk of flight?</label>
        <select name="flight_risk" value={formData.flight_risk} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label>Is there a potential threat to witnesses?</label>
        <div className="radio-group">
          <label><input type="radio" name="threat_to_witnesses" value="yes" checked={formData.threat_to_witnesses === 'yes'} onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="threat_to_witnesses" value="no" checked={formData.threat_to_witnesses === 'no'} onChange={handleChange} /> No</label>
        </div>

        <label>Enter the surety bond amount (if applicable):</label>
        <input type="number" name="surety_bond_amount" value={formData.surety_bond_amount} onChange={handleChange} />

        <label>Is a personal bond applicable?</label>
        <div className="radio-group">
          <label><input type="radio" name="personal_bond" value="yes" checked={formData.personal_bond === 'yes'} onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="personal_bond" value="no" checked={formData.personal_bond === 'no'} onChange={handleChange} /> No</label>
        </div>

        <label>Identity verified?</label>
        <input type="checkbox" name="identity_verified" checked={formData.identity_verified} onChange={handleChange} /> Identity Verified

        <label>Has the prisoner served half the term prescribed for their offense?</label>
        <div className="radio-group">
          <label><input type="radio" name="half_term_rule" value="yes" checked={formData.half_term_rule === 'yes'} onChange={handleChange} /> Yes</label>
          <label><input type="radio" name="half_term_rule" value="no" checked={formData.half_term_rule === 'no'} onChange={handleChange} /> No</label>
        </div>

        <button type="submit">Check Bail Eligibility</button>
      </form>

      {eligibility && <h3>Bail Eligibility Result: {eligibility}</h3>}
    </div>
  );
};

export default BailEligibilityForm;
