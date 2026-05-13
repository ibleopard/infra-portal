import React, { useState } from 'react';
import { parseUploadedFile } from '../utils/fileUploadHandler';
import './FileUpload.css';

const FileUpload = ({ onFilesParsed, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error('File size exceeds 5MB limit');
      }

      // Parse the file
      const records = await parseUploadedFile(file);

      if (records.length === 0) {
        throw new Error('No records found in the uploaded file');
      }

      setSuccess(`Successfully parsed ${records.length} record(s) from ${file.name}`);
      
      // Pass parsed records to parent component
      if (onFilesParsed) {
        onFilesParsed(records);
      }

      // Close modal after short delay to show success message
      setTimeout(() => {
        if (onClose) {
          onClose();
        }
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to parse file');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  return (
    <div className="file-upload-overlay">
      <div className="file-upload-modal">
        <div className="file-upload-header">
          <h2>Upload Assessment Report</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="file-upload-content">
          {!success ? (
            <>
              <div
                className={`drag-drop-area ${dragActive ? 'active' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="drag-drop-icon">📁</div>
                <h3>Drag and drop your file here</h3>
                <p>or</p>
                <label className="file-input-label">
                  <span>Browse Files</span>
                  <input
                    type="file"
                    onChange={handleInputChange}
                    accept=".xlsx,.xls"
                    disabled={loading}
                    style={{ display: 'none' }}
                  />
                </label>
                <p className="file-info">
                  Supported format: Excel (.xlsx, .xls)<br />
                  Maximum file size: 5MB
                </p>
              </div>

              {error && (
                <div className="error-message">
                  <span>⚠️</span> {error}
                </div>
              )}

              {loading && (
                <div className="loading-message">
                  <span className="spinner"></span> Parsing file...
                </div>
              )}
            </>
          ) : (
            <div className="success-message">
              <span>✓</span> {success}
            </div>
          )}
        </div>

        <div className="file-upload-footer">
          <button
            className="cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
