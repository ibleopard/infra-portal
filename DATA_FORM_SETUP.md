# NDMA Infrastructure Damage Portal - Data Form Setup Guide

## Overview
A new damage assessment data form has been created for the NDMA Infrastructure Portal. This form allows users to:
- Submit infrastructure damage assessments
- Store data persistently in Turso database
- View, edit, and delete submitted assessments
- Organize assessment data across multiple sections

## New Features

### 1. Data Form Page (`/src/components/DataForm.jsx`)
A comprehensive form with the following sections:
- **Location/Basic Info**: Case ID, Province, District, GPS coordinates, Assessment date
- **Incident Information**: Event date, type, information source
- **Infrastructure Information**: Category, type (Roads, Bridges, Buildings)
- **Damage Assessment**: Extent, status, estimated cost, confidence level
- **Community Impact & Response**: Population affected, critical impacts, actions taken
- **Verification**: Verified by, verification date

### 2. Backend API Server (`server.js`)
Express.js backend with Turso database integration:
- `GET /api/assessments` - Fetch all assessments
- `GET /api/assessments/:id` - Fetch single assessment
- `POST /api/assessments` - Create new assessment
- `PUT /api/assessments/:id` - Update assessment
- `DELETE /api/assessments/:id` - Delete assessment
- `GET /api/health` - Health check

### 3. Database Schema
Turso SQLite database with `damage_assessments` table:
- 30+ columns for comprehensive damage assessment data
- Timestamps for creation and modification tracking
- Automatic schema creation on server startup

## Installation & Setup

### Prerequisites
- Node.js v18+ installed
- Turso account with database created
- Environment variables configured

### Step 1: Install Dependencies (Already Done)
```bash
npm install
# Additional packages installed:
# - @libsql/client (Turso database client)
# - express (Backend framework)
# - cors (Cross-Origin Resource Sharing)
# - dotenv (Environment variables)
# - xlsx (Excel file parsing)
```

### Step 2: Environment Configuration
The `.env` file has been configured with:
```
TURSO_DB_URL=libsql://ndma-app-ibleopard.aws-us-west-2.turso.io
TURSO_DB_AUTH_TOKEN=your_token_here
VITE_API_URL=http://localhost:3001
```

### Step 3: Running the Application

**Terminal 1 - Start Backend Server:**
```bash
npm run server
# Server will start on http://localhost:3001
# Database schema will be created automatically
```

**Terminal 2 - Start Frontend Development Server:**
```bash
npm run dev
# Vite dev server will start (usually http://localhost:5173)
```

## Usage

### Accessing the Data Form
1. Open the application in your browser
2. Click "Add Assessment" in the header navigation
3. Fill out the comprehensive form with assessment data
4. Click "Submit Assessment" to save to the database

### Managing Assessments
- **View All**: All submitted assessments appear in the "Submitted Assessments" section
- **Edit**: Click "Edit" on any assessment card to modify it
- **Delete**: Click "Delete" to remove an assessment (confirmation required)

### Form Validation
- Required fields: Case ID, Province, District, Assessment Date
- All other fields are optional
- Date inputs use HTML5 date picker for consistency

## File Structure

```
src/
├── components/
│   ├── DataForm.jsx          (New - Form component)
│   ├── DataForm.css          (New - Form styling)
│   ├── Header.jsx            (Updated - Added navigation)
│   ├── Charts.jsx
│   ├── CostCalculator.jsx
│   ├── DamageLibrary.jsx
│   ├── Map.jsx
│   └── SummaryCards.jsx
├── App.jsx                   (Updated - Added page routing)
└── ...

Root files:
├── server.js                 (New - Backend Express server)
├── .env                      (Updated - Added VITE_API_URL)
├── .env.example              (New - Template for env vars)
└── package.json              (Updated - Added server script)
```

## API Endpoints Documentation

### Create Assessment (POST)
```
POST /api/assessments
Content-Type: application/json

Request Body:
{
  "caseId": 491,
  "province": "GB",
  "district": "Jalkhad",
  "damageExtent": "Minor",
  "estimatedCost": 50000,
  ...
}

Response:
{
  "id": "assessment_1234567890_abc123",
  "message": "Assessment created successfully"
}
```

### Fetch All Assessments (GET)
```
GET /api/assessments

Response:
[
  {
    "id": "assessment_...",
    "caseId": 491,
    "province": "GB",
    "createdAt": "2026-05-03T...",
    ...
  }
]
```

### Update Assessment (PUT)
```
PUT /api/assessments/{id}
Content-Type: application/json

Request Body: (partial or full fields to update)
{
  "damageExtent": "Moderate",
  "estimatedCost": 75000
}

Response:
{
  "message": "Assessment updated successfully"
}
```

### Delete Assessment (DELETE)
```
DELETE /api/assessments/{id}

Response:
{
  "message": "Assessment deleted successfully"
}
```

## Database Schema

```sql
CREATE TABLE damage_assessments (
  id TEXT PRIMARY KEY,
  caseId INTEGER,
  province TEXT,
  district TEXT,
  unionCouncil TEXT,
  landmark TEXT,
  latitude TEXT,
  longitude TEXT,
  assessmentDate TEXT,
  assessmentMember TEXT,
  locationVerified TEXT,
  eventDate TEXT,
  eventType TEXT,
  informationSource TEXT,
  infrastructureCategory TEXT,
  infrastructureType TEXT,
  roadType TEXT,
  bridgeType TEXT,
  buildingType TEXT,
  damageExtent TEXT,
  damageStatus TEXT,
  estimatedCost TEXT,
  costConfidence TEXT,
  ownership TEXT,
  populationAffected TEXT,
  criticalImpact TEXT,
  immediateActions TEXT,
  supportRequired TEXT,
  remarks TEXT,
  verifiedBy TEXT,
  verifiedDate TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Troubleshooting

### Server won't start
- Ensure `TURSO_DB_URL` and `TURSO_DB_AUTH_TOKEN` are set correctly
- Check that port 3001 is not in use
- Verify Node.js version is v18 or higher

### Frontend can't connect to API
- Verify backend server is running on port 3001
- Check `VITE_API_URL` is set to `http://localhost:3001`
- Look for CORS errors in browser console

### Database errors
- Verify Turso credentials in `.env`
- Check internet connection to Turso service
- Clear browser cache and restart both servers

### Form not submitting
- Check browser console for errors
- Verify required fields are filled (Case ID, Province, District, Assessment Date)
- Ensure backend server is running

## Data Persistence

All submitted assessments are automatically persisted to the Turso database:
- Data survives page refreshes
- Data survives server restarts
- Accessible from any client connecting to the backend API
- Automatic timestamps for creation and modification tracking

## Future Enhancements

Potential improvements:
- Add file upload for photographic evidence
- Implement user authentication
- Add export to Excel functionality
- Add batch import from Excel files
- Add assessment filtering and search
- Add reporting and analytics dashboard
- Add role-based access control

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review backend logs in server terminal
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly
