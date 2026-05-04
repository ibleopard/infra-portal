import React, { useState, useEffect } from 'react';
import { groupRecordsByDistrict, calculateDistrictSummary } from '../utils/fileUploadHandler';
import './Reports.css';

const Reports = ({ uploadedRecords = [], allAssessments = [] }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [districtSummaries, setDistrictSummaries] = useState({});

  // Combine uploaded records and existing assessments
  const allRecords = [...uploadedRecords, ...allAssessments];

  useEffect(() => {
    // Calculate summaries by district
    const grouped = groupRecordsByDistrict(allRecords);
    const summaries = {};

    Object.keys(grouped).forEach((district) => {
      summaries[district] = calculateDistrictSummary(grouped[district]);
    });

    setDistrictSummaries(summaries);
  }, [allRecords]);

  const getFilteredRecords = () => {
    let records = activeTab === 'uploaded' ? uploadedRecords : allRecords;

    if (selectedDistrict) {
      records = records.filter((r) => r.district === selectedDistrict);
    }

    if (searchTerm) {
      records = records.filter(
        (r) =>
          r.caseId?.includes(searchTerm) ||
          r.district?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.province?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.landmark?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return records;
  };

  const districts = Object.keys(districtSummaries).sort();
  const filteredRecords = getFilteredRecords();

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h2>Assessment Reports</h2>
        <p>View all damage assessment records, summaries by district, and statistics</p>
      </div>

      <div className="reports-tabs">
        <button
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Records ({allRecords.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'uploaded' ? 'active' : ''}`}
          onClick={() => setActiveTab('uploaded')}
        >
          Uploaded ({uploadedRecords.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          By District ({districts.length})
        </button>
      </div>

      {activeTab === 'summary' ? (
        <div className="summary-view">
          <div className="summary-grid">
            {districts.map((district) => {
              const summary = districtSummaries[district];
              const count = summary?.count || 0;

              return (
                <div
                  key={district}
                  className={`summary-card ${selectedDistrict === district ? 'selected' : ''}`}
                  onClick={() => setSelectedDistrict(selectedDistrict === district ? null : district)}
                >
                  <h4>{district}</h4>
                  <div className="summary-stat">
                    <span className="stat-label">Records:</span>
                    <span className="stat-value">{count}</span>
                  </div>
                  <div className="summary-stat">
                    <span className="stat-label">Total Cost:</span>
                    <span className="stat-value">{summary?.totalCost}</span>
                  </div>
                  <div className="summary-stat">
                    <span className="stat-label">Avg Cost:</span>
                    <span className="stat-value">{summary?.averageCost}</span>
                  </div>
                  {Object.keys(summary?.damageBreakdown || {}).length > 0 && (
                    <div className="damage-breakdown">
                      <span className="label">Damage Types:</span>
                      {Object.entries(summary.damageBreakdown).map(([type, count]) => (
                        <span key={type} className="damage-tag">
                          {type}: {count}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedDistrict && (
            <div className="district-details">
              <h3>
                Records for {selectedDistrict}
                <button
                  className="close-details-btn"
                  onClick={() => setSelectedDistrict(null)}
                >
                  ×
                </button>
              </h3>
              <div className="records-list">
                {filteredRecords.map((record, index) => (
                  <div key={index} className="record-card">
                    <div className="record-header">
                      <span className="case-id">Case: {record.caseId || 'N/A'}</span>
                      <span className="location">{record.landmark}</span>
                    </div>
                    <div className="record-details">
                      <div className="detail-row">
                        <span className="label">Union Council:</span>
                        <span className="value">{record.unionCouncil || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Infrastructure:</span>
                        <span className="value">{record.infrastructureType || record.infrastructureCategory || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Damage Extent:</span>
                        <span className="value">{record.damageExtent || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Estimated Cost:</span>
                        <span className="value cost">
                          {record.estimatedCost
                            ? `PKR ${parseFloat(record.estimatedCost).toLocaleString()}`
                            : 'N/A'}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Coordinates:</span>
                        <span className="value">
                          {record.latitude && record.longitude
                            ? `${record.latitude.toFixed(4)}, ${record.longitude.toFixed(4)}`
                            : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="list-view">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by case ID, district, province, or landmark..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                ✕
              </button>
            )}
          </div>

          {filteredRecords.length === 0 ? (
            <div className="empty-state">
              <p>
                {activeTab === 'uploaded'
                  ? 'No uploaded records yet. Use the "Upload Report" button to add records.'
                  : 'No records found matching your search.'}
              </p>
            </div>
          ) : (
            <div className="records-table">
              <table>
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th>District</th>
                    <th>Location</th>
                    <th>Infrastructure Type</th>
                    <th>Damage Extent</th>
                    <th>Estimated Cost (PKR)</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{record.caseId || '-'}</td>
                      <td>{record.district || '-'}</td>
                      <td title={record.landmark}>{record.landmark ? record.landmark.substring(0, 30) : '-'}</td>
                      <td>{record.infrastructureType || record.infrastructureCategory || '-'}</td>
                      <td>
                        <span className={`damage-badge ${record.damageExtent?.toLowerCase().replace(/\s+/g, '-')}`}>
                          {record.damageExtent || '-'}
                        </span>
                      </td>
                      <td className="cost">
                        {record.estimatedCost ? parseFloat(record.estimatedCost).toLocaleString() : '-'}
                      </td>
                      <td>{record.assessmentDate || record.eventDate || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="records-footer">
            <p>Showing {filteredRecords.length} of {allRecords.length} total records</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
