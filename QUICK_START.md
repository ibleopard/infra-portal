# Quick Start Guide - Running the Application

## Summary of Changes

### New Files Created:
1. **`server.js`** - Express backend API server with Turso database integration
2. **`src/components/DataForm.jsx`** - Comprehensive damage assessment form component
3. **`src/components/DataForm.css`** - Form styling with responsive design
4. **`.env.example`** - Environment variables template
5. **`DATA_FORM_SETUP.md`** - Complete setup documentation

### Modified Files:
1. **`src/App.jsx`** - Added page navigation and DataForm rendering
2. **`src/components/Header.jsx`** - Added navigation buttons between Dashboard and Add Assessment
3. **`package.json`** - Added "server" script to run backend
4. **`.env`** - Added VITE_API_URL configuration

## Running the Application

### Method 1: Using Separate Terminals (Recommended for Development)

**Terminal 1 - Start Backend Server:**
```powershell
cd d:\3-DVPortal
npm run server
```
Expected output:
```
◇ injected env (3) from .env
Database initialized successfully
Server running on http://localhost:3001
```

**Terminal 2 - Start Frontend Development Server:**
```powershell
cd d:\3-DVPortal
npm run dev
```
Expected output:
```
VITE v8.0.10  ready in 123 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### Step 1: Access the Application
Open your browser and navigate to: `http://localhost:5173`

### Step 2: Navigate to Data Form
- You'll see the Dashboard page first
- Click the **"Add Assessment"** button in the top navigation
- The form will load with all assessment fields

### Step 3: Submit Assessment Data
1. Fill in the form fields (required: Case ID, Province, District, Assessment Date)
2. Fill in additional details as needed
3. Click **"Submit Assessment"** button
4. You should see a success message: "Assessment created successfully!"
5. The assessment will appear in the "Submitted Assessments" section below

### Step 4: View & Manage Assessments
Below the form, you'll see:
- **Assessment Cards** for each submitted assessment
- **Edit Button** - Click to modify an assessment
- **Delete Button** - Click to remove an assessment

## Testing the API (Optional)

### Using PowerShell to Test API Endpoints:

**1. Health Check:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/health" | ConvertFrom-Json
```

**2. Get All Assessments:**
```powershell
Invoke-WebRequest -Uri "http://localhost:3001/api/assessments" | ConvertFrom-Json
```

**3. Create a Test Assessment:**
```powershell
$body = @{
    caseId = 1001
    province = "Punjab"
    district = "Lahore"
    assessmentDate = "2026-05-03"
    damageExtent = "Minor"
    infrastructureType = "Road"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:3001/api/assessments" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body | ConvertFrom-Json
```

## Features

✅ **Comprehensive Form** - 30+ fields organized in 7 sections  
✅ **Data Persistence** - All data stored in Turso database  
✅ **CRUD Operations** - Create, Read, Update, Delete assessments  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **Live Validation** - Required field checking  
✅ **Assessment Cards** - View all submissions at a glance  
✅ **Edit/Delete** - Manage existing assessments  

## Data Persistence

All submitted assessments are automatically saved to your Turso database at:
```
libsql://ndma-app-ibleopard.aws-us-west-2.turso.io
```

Data persists across:
- Browser refreshes
- Server restarts
- Application restarts

## Troubleshooting

### Server won't start
```bash
# Check if port 3001 is in use
netstat -ano | findstr :3001

# If in use, find the process
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess
```

### Frontend can't connect to backend
1. Ensure backend is running on `http://localhost:3001`
2. Check browser console for CORS errors
3. Verify `.env` has `VITE_API_URL=http://localhost:3001`

### Database connection errors
1. Verify `.env` has correct TURSO_DB_URL and TURSO_DB_AUTH_TOKEN
2. Check internet connection to Turso service
3. Try restarting both servers

## Next Steps

1. ✅ Start the backend server: `npm run server`
2. ✅ Start the frontend: `npm run dev`
3. ✅ Open browser to `http://localhost:5173`
4. ✅ Click "Add Assessment" and submit test data
5. ✅ View submissions and verify data persistence

For detailed API documentation and database schema, see `DATA_FORM_SETUP.md`
