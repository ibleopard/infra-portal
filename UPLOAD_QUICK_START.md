# Upload Feature - Quick Start Guide

## How to Use

### 1. Upload an Assessment Report

1. Click the green **"📁 Upload Report"** button at the top right of the page
2. The upload modal will appear
3. Either:
   - **Drag & Drop**: Drag your Excel file onto the drag-drop area
   - **Browse**: Click "Browse Files" and select your Excel file
4. The file will be parsed automatically
5. You'll see a success message with the count of records parsed
6. The modal will close automatically
7. All records are saved to the database

### 2. View All Reports

1. Click the **"Reports"** tab in the navigation
2. You'll see three tabs to switch between:

   - **All Records (N)**: View every assessment in a searchable table
     - Search by: Case ID, District, Province, or Landmark
     - See details like damage extent, estimated cost, date
     - Filter with search box
   
   - **Uploaded (N)**: View only newly uploaded records
     - Same table view as All Records
     - Helps track recent additions
   
   - **By District (N)**: Summary view organized by district
     - Click any district card to expand
     - See total cost, average cost, damage breakdown
     - View all records for that district

### 3. Interact with the Map

1. Go to **Dashboard** tab
2. Scroll to the **"Provincial & Divisional Map"** section
3. Districts are color-coded by assessment density:
   - 🔴 **Red**: 10+ assessments
   - 🟠 **Amber**: 5-10 assessments
   - 🟢 **Green**: 1-4 assessments

4. **Hover over a district** to:
   - Highlight it in red
   - Show increased opacity of the color

5. **Click on a district** to:
   - Open a popup showing:
     - District name
     - Province
     - Number of assessments
     - Total estimated cost
     - Average cost per assessment
     - Breakdown by damage type

## Excel File Format

Your Excel file should have columns matching these names (any case):

| Important Fields | Alternate Names |
|---|---|
| Case ID | caseid, case_id, case no |
| District | distict, dist |
| Province | provincial, prov |
| Union Council | union, uc, union_council |
| Landmark | location, place |
| Infrastructure Type | infrastructure_type |
| Damage Extent | extent, damage level |
| Estimated Cost | estimated_cost, cost, amount |
| Assessment Date | assessment_date, date |
| Event Date | event_date, incident date |
| Assessment Member | member, assessed by |
| Latitude | lat |
| Longitude | long, lng |

**Example Excel Structure:**
```
Case ID | District | Province | Infrastructure Type | Damage Extent | Estimated Cost
1       | Karachi  | Sindh    | Bridge              | Major        | 500000
2       | Lahore   | Punjab   | Road                | Moderate     | 250000
```

## Supported File Types

- ✅ **Excel**: .xlsx, .xls (recommended)
- 🔜 **PDF**: Coming soon

**Max File Size**: 5 MB

## Tips

1. **Column Names**: Don't worry about exact case - "Case ID", "CASE ID", "case id" all work
2. **Empty Cells**: Missing data is handled gracefully - use empty cells freely
3. **Many Records**: Can handle files with hundreds of records
4. **Auto-Save**: All records are automatically saved to the database
5. **Real-Time**: Dashboard and map update immediately after upload
6. **Search**: Use the search box in All Records to find specific assessments
7. **Export**: Download the Reports data for use elsewhere (future feature)

## Troubleshooting

| Issue | Solution |
|---|---|
| "File size exceeds 5MB" | Split your file into smaller parts or compress it |
| "No records found" | Check that your file has data rows (not just headers) |
| "Failed to parse file" | Ensure the file is a valid Excel file (.xlsx or .xls) |
| "Fields not populated" | Check column headers match expected names (see format above) |
| Map shows no colors | Upload some records first - colors appear based on data |

## What Happens After Upload?

1. ✅ File is parsed and validated
2. ✅ Data is transformed to match form fields
3. ✅ Records are sent to the server
4. ✅ Database is updated with new assessments
5. ✅ Map refreshes with new district summaries
6. ✅ Reports view updates with new records
7. ✅ Charts and summaries recalculate

## Example Workflows

### Workflow 1: Upload Damage Report
1. Receive Excel file with damage assessments from field team
2. Click "Upload Report"
3. Select the Excel file
4. All records are now in the system!
5. Go to Reports → By District to review summary by location
6. Check Dashboard map to visualize damage density

### Workflow 2: Review Specific District
1. Click "Reports" tab
2. Go to "By District" view
3. Find the district of interest
4. Click the card to expand
5. View all records for that district
6. See total cost and damage breakdown

### Workflow 3: Check Map for Updates
1. Upload new damage reports
2. Go to Dashboard
3. Map is automatically updated with new colors
4. Hover/click on highlighted districts to see new data
5. Share map with stakeholders for visualization

## Keyboard Shortcuts

While in Reports:
- Search box is ready to type - just start typing
- Press `Escape` to close expanded district view (future)
- Search works with any keyword

## Notes

- All data is stored securely in the database
- Upload history is preserved
- No file is stored - only the extracted data
- Maximum 5MB per file (technical limit)
- Works offline for UI (data sync on server connection)
