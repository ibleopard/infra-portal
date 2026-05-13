import React, { useState, useEffect } from 'react';
import './DataForm.css';

const DataForm = ({ prefilledData = null, onRecordSaved = null }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [assessments, setAssessments] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    caseId: '',
    province: '',
    district: '',
    unionCouncil: '',
    landmark: '',
    latitude: '',
    longitude: '',
    assessmentDate: '',
    assessmentMember: '',
    locationVerified: 'Yes',
    eventDate: '',
    eventType: '',
    informationSource: '',
    infrastructureCategory: '',
    infrastructureType: '',
    roadType: '',
    bridgeType: '',
    buildingType: '',
    damageExtent: '',
    damageStatus: '',
    estimatedCost: '',
    costConfidence: '',
    ownership: '',
    populationAffected: '',
    criticalImpact: '',
    immediateActions: '',
    supportRequired: '',
    remarks: '',
    verifiedBy: '',
    verifiedDate: '',
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetchAssessments();
    // Prefill form if data is passed
    if (prefilledData) {
      setFormData((prev) => ({
        ...prev,
        ...prefilledData,
      }));
    }
  }, [prefilledData]);

  const fetchAssessments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/assessments`);
      if (response.ok) {
        const data = await response.json();
        setAssessments(data);
      }
    } catch (err) {
      console.error('Error fetching assessments:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      caseId: '',
      province: '',
      district: '',
      unionCouncil: '',
      landmark: '',
      latitude: '',
      longitude: '',
      assessmentDate: '',
      assessmentMember: '',
      locationVerified: 'Yes',
      eventDate: '',
      eventType: '',
      informationSource: '',
      infrastructureCategory: '',
      infrastructureType: '',
      roadType: '',
      bridgeType: '',
      buildingType: '',
      damageExtent: '',
      damageStatus: '',
      estimatedCost: '',
      costConfidence: '',
      ownership: '',
      populationAffected: '',
      criticalImpact: '',
      immediateActions: '',
      supportRequired: '',
      remarks: '',
      verifiedBy: '',
      verifiedDate: '',
    });
    setEditingId(null);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `${API_BASE_URL}/api/assessments/${editingId}`
        : `${API_BASE_URL}/api/assessments`;

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingId ? 'update' : 'create'} assessment`);
      }

      setSuccess(`Assessment ${editingId ? 'updated' : 'created'} successfully!`);
      resetForm();
      fetchAssessments();
      // Call parent callback if provided
      if (onRecordSaved) {
        onRecordSaved();
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (assessment) => {
    setFormData({
      caseId: assessment.caseId || '',
      province: assessment.province || '',
      district: assessment.district || '',
      unionCouncil: assessment.unionCouncil || '',
      landmark: assessment.landmark || '',
      latitude: assessment.latitude || '',
      longitude: assessment.longitude || '',
      assessmentDate: assessment.assessmentDate || '',
      assessmentMember: assessment.assessmentMember || '',
      locationVerified: assessment.locationVerified || 'Yes',
      eventDate: assessment.eventDate || '',
      eventType: assessment.eventType || '',
      informationSource: assessment.informationSource || '',
      infrastructureCategory: assessment.infrastructureCategory || '',
      infrastructureType: assessment.infrastructureType || '',
      roadType: assessment.roadType || '',
      bridgeType: assessment.bridgeType || '',
      buildingType: assessment.buildingType || '',
      damageExtent: assessment.damageExtent || '',
      damageStatus: assessment.damageStatus || '',
      estimatedCost: assessment.estimatedCost || '',
      costConfidence: assessment.costConfidence || '',
      ownership: assessment.ownership || '',
      populationAffected: assessment.populationAffected || '',
      criticalImpact: assessment.criticalImpact || '',
      immediateActions: assessment.immediateActions || '',
      supportRequired: assessment.supportRequired || '',
      remarks: assessment.remarks || '',
      verifiedBy: assessment.verifiedBy || '',
      verifiedDate: assessment.verifiedDate || '',
    });
    setEditingId(assessment.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this assessment?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/assessments/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete assessment');
        }

        setSuccess('Assessment deleted successfully!');
        fetchAssessments();
      } catch (err) {
        setError(err.message || 'An error occurred');
        console.error('Delete error:', err);
      }
    }
  };

  return (
    <div className="data-form-container">
      <div className="form-section">
        <h2>{editingId ? 'Edit Assessment' : 'Add New Damage Assessment'}</h2>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="assessment-form">
          {/* Location / Basic Info Section */}
          <fieldset>
            <legend>Location / Basic Info</legend>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="caseId">Case ID</label>
                <input
                  type="number"
                  id="caseId"
                  name="caseId"
                  value={formData.caseId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="province">Province</label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="district">District/Tehsil/Sub-Tehsil</label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="unionCouncil">Union Council/Village</label>
                <input
                  type="text"
                  id="unionCouncil"
                  name="unionCouncil"
                  value={formData.unionCouncil}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="landmark">Moza/ Khasra No./ Landmark</label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="latitude">Latitude</label>
                <input
                  type="text"
                  id="latitude"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  placeholder="e.g., 35 0 23 N"
                />
              </div>
              <div className="form-group">
                <label htmlFor="longitude">Longitude</label>
                <input
                  type="text"
                  id="longitude"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  placeholder="e.g., 73 56 26 E"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="assessmentDate">Date of Assessment</label>
                <input
                  type="date"
                  id="assessmentDate"
                  name="assessmentDate"
                  value={formData.assessmentDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="assessmentMember">Assessment Member & Contact</label>
                <input
                  type="text"
                  id="assessmentMember"
                  name="assessmentMember"
                  value={formData.assessmentMember}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="locationVerified">Location Verified</label>
                <select
                  id="locationVerified"
                  name="locationVerified"
                  value={formData.locationVerified}
                  onChange={handleInputChange}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* Incident Information Section */}
          <fieldset>
            <legend>Incident Information</legend>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="eventDate">Date of Event</label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventType">Type of Event</label>
                <input
                  type="text"
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleInputChange}
                  placeholder="e.g., Flood"
                />
              </div>
              <div className="form-group">
                <label htmlFor="informationSource">Source of Information</label>
                <input
                  type="text"
                  id="informationSource"
                  name="informationSource"
                  value={formData.informationSource}
                  onChange={handleInputChange}
                  placeholder="e.g., Field visit"
                />
              </div>
            </div>
          </fieldset>

          {/* Infrastructure Section */}
          <fieldset>
            <legend>Infrastructure Information</legend>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="infrastructureCategory">Infrastructure Category</label>
                <input
                  type="text"
                  id="infrastructureCategory"
                  name="infrastructureCategory"
                  value={formData.infrastructureCategory}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="infrastructureType">Type of Infrastructure</label>
                <input
                  type="text"
                  id="infrastructureType"
                  name="infrastructureType"
                  value={formData.infrastructureType}
                  onChange={handleInputChange}
                  placeholder="e.g., Road"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="roadType">Roads</label>
                <input
                  type="text"
                  id="roadType"
                  name="roadType"
                  value={formData.roadType}
                  onChange={handleInputChange}
                  placeholder="e.g., Metalled"
                />
              </div>
              <div className="form-group">
                <label htmlFor="bridgeType">Bridges</label>
                <input
                  type="text"
                  id="bridgeType"
                  name="bridgeType"
                  value={formData.bridgeType}
                  onChange={handleInputChange}
                  placeholder="e.g., Pedestrian"
                />
              </div>
              <div className="form-group">
                <label htmlFor="buildingType">Buildings</label>
                <input
                  type="text"
                  id="buildingType"
                  name="buildingType"
                  value={formData.buildingType}
                  onChange={handleInputChange}
                  placeholder="e.g., School"
                />
              </div>
            </div>
          </fieldset>

          {/* Damage Assessment Section */}
          <fieldset>
            <legend>Damage Assessment</legend>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="damageExtent">Extent of Damage</label>
                <select
                  id="damageExtent"
                  name="damageExtent"
                  value={formData.damageExtent}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Minor">Minor</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Major">Major</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="damageStatus">Status</label>
                <select
                  id="damageStatus"
                  name="damageStatus"
                  value={formData.damageStatus}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Fully Functional">Fully Functional</option>
                  <option value="Partially Functional">Partially Functional</option>
                  <option value="Non-Functional">Non-Functional</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="estimatedCost">Estimated Cost (PKR)</label>
                <input
                  type="number"
                  id="estimatedCost"
                  name="estimatedCost"
                  value={formData.estimatedCost}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="costConfidence">Estimate Confidence Level</label>
                <select
                  id="costConfidence"
                  name="costConfidence"
                  value={formData.costConfidence}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="ownership">Ownership</label>
                <select
                  id="ownership"
                  name="ownership"
                  value={formData.ownership}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* Impact & Response Section */}
          <fieldset>
            <legend>Community Impact & Response</legend>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="populationAffected">Population Affected</label>
                <input
                  type="text"
                  id="populationAffected"
                  name="populationAffected"
                  value={formData.populationAffected}
                  onChange={handleInputChange}
                  placeholder="e.g., <100"
                />
              </div>
              <div className="form-group">
                <label htmlFor="criticalImpact">Critical Impact</label>
                <input
                  type="text"
                  id="criticalImpact"
                  name="criticalImpact"
                  value={formData.criticalImpact}
                  onChange={handleInputChange}
                  placeholder="e.g., Road Blocked"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="immediateActions">Immediate Actions Taken</label>
                <input
                  type="text"
                  id="immediateActions"
                  name="immediateActions"
                  value={formData.immediateActions}
                  onChange={handleInputChange}
                  placeholder="e.g., Relief Provided"
                />
              </div>
              <div className="form-group">
                <label htmlFor="supportRequired">Support Required</label>
                <input
                  type="text"
                  id="supportRequired"
                  name="supportRequired"
                  value={formData.supportRequired}
                  onChange={handleInputChange}
                  placeholder="e.g., Machinery"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full-width">
                <label htmlFor="remarks">Remarks</label>
                <textarea
                  id="remarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  rows="4"
                />
              </div>
            </div>
          </fieldset>

          {/* Verification Section */}
          <fieldset>
            <legend>Verification</legend>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="verifiedBy">Verified By (Name & Designation)</label>
                <input
                  type="text"
                  id="verifiedBy"
                  name="verifiedBy"
                  value={formData.verifiedBy}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="verifiedDate">Verification Date</label>
                <input
                  type="date"
                  id="verifiedDate"
                  name="verifiedDate"
                  value={formData.verifiedDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : editingId ? 'Update Assessment' : 'Submit Assessment'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List of Assessments */}
      <div className="assessments-section">
        <h2>Submitted Assessments ({assessments.length})</h2>
        {assessments.length === 0 ? (
          <p className="no-data">No assessments found</p>
        ) : (
          <div className="assessments-grid">
            {assessments.map((assessment) => (
              <div key={assessment.id} className="assessment-card">
                <div className="card-header">
                  <h3>Case ID: {assessment.caseId}</h3>
                  <span className="card-meta">
                    {new Date(assessment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="card-body">
                  <p><strong>Location:</strong> {assessment.district}, {assessment.province}</p>
                  <p><strong>Infrastructure:</strong> {assessment.infrastructureType}</p>
                  <p><strong>Damage Extent:</strong> {assessment.damageExtent}</p>
                  <p><strong>Status:</strong> {assessment.damageStatus}</p>
                  {assessment.estimatedCost && (
                    <p><strong>Est. Cost:</strong> PKR {assessment.estimatedCost}</p>
                  )}
                </div>
                <div className="card-actions">
                  <button
                    className="btn btn-sm btn-edit"
                    onClick={() => handleEdit(assessment)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-delete"
                    onClick={() => handleDelete(assessment.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataForm;
