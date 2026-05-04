// Script to create sample Excel file for testing
// Run with: node create-sample.js

import * as XLSX from 'xlsx';
import * as fs from 'fs';

const sampleData = [
  {
    "Case ID": "D-001",
    "Province": "Sindh",
    "District": "Karachi",
    "Union Council": "Gadap",
    "Landmark": "Bridge near Gadap Road",
    "Latitude": "24.8215",
    "Longitude": "67.3915",
    "Assessment Date": "2024-03-15",
    "Assessment Member": "Ahmed Khan",
    "Location Verified": "Yes",
    "Event Date": "2024-03-10",
    "Event Type": "Heavy Rainfall",
    "Information Source": "Field Survey",
    "Infrastructure Category": "Roads",
    "Infrastructure Type": "Bridge",
    "Bridge Type": "RCC",
    "Damage Extent": "Major",
    "Damage Status": "Partially Damaged",
    "Estimated Cost": "500000",
    "Cost Confidence": "High",
    "Ownership": "Government",
    "Population Affected": "2500",
    "Critical Impact": "Yes - Main Access Road",
    "Immediate Actions": "Temporary closure",
    "Support Required": "Structural assessment",
    "Remarks": "Needs urgent repair",
    "Verified By": "Supervisor-001",
    "Verified Date": "2024-03-16"
  },
  {
    "Case ID": "D-002",
    "Province": "Punjab",
    "District": "Lahore",
    "Union Council": "Model Town",
    "Landmark": "School Building - Model Town",
    "Latitude": "31.5497",
    "Longitude": "74.3436",
    "Assessment Date": "2024-03-16",
    "Assessment Member": "Fatima Ali",
    "Location Verified": "Yes",
    "Event Date": "2024-03-12",
    "Event Type": "Storm",
    "Information Source": "Community Report",
    "Infrastructure Category": "Buildings",
    "Infrastructure Type": "Educational",
    "Building Type": "School",
    "Damage Extent": "Moderate",
    "Damage Status": "Partially Damaged",
    "Estimated Cost": "250000",
    "Cost Confidence": "Medium",
    "Ownership": "Government",
    "Population Affected": "400",
    "Critical Impact": "Yes - School closure",
    "Immediate Actions": "Temporary repair",
    "Support Required": "Structural rehabilitation",
    "Remarks": "Classes shifted to nearby venue",
    "Verified By": "Supervisor-002",
    "Verified Date": "2024-03-17"
  },
  {
    "Case ID": "D-003",
    "Province": "Khyber Pakhtunkhwa",
    "District": "Peshawar",
    "Union Council": "Hayatabad",
    "Landmark": "Main Road - Hayatabad",
    "Latitude": "34.0151",
    "Longitude": "71.5249",
    "Assessment Date": "2024-03-18",
    "Assessment Member": "Hassan Malik",
    "Location Verified": "Yes",
    "Event Date": "2024-03-14",
    "Event Type": "Heavy Rainfall",
    "Information Source": "Municipal Authority",
    "Infrastructure Category": "Roads",
    "Infrastructure Type": "Road",
    "Road Type": "Asphalt",
    "Damage Extent": "Minor",
    "Damage Status": "Slightly Damaged",
    "Estimated Cost": "75000",
    "Cost Confidence": "High",
    "Ownership": "Municipal",
    "Population Affected": "5000",
    "Critical Impact": "No",
    "Immediate Actions": "Pothole filling",
    "Support Required": "Resurfacing",
    "Remarks": "Quick repair possible",
    "Verified By": "Supervisor-003",
    "Verified Date": "2024-03-19"
  },
  {
    "Case ID": "D-004",
    "Province": "Balochistan",
    "District": "Quetta",
    "Union Council": "Satellite Town",
    "Landmark": "Health Center - Satellite Town",
    "Latitude": "30.1798",
    "Longitude": "66.9750",
    "Assessment Date": "2024-03-17",
    "Assessment Member": "Rashid Ahmed",
    "Location Verified": "Yes",
    "Event Date": "2024-03-11",
    "Event Type": "Earthquake Aftershock",
    "Information Source": "Field Survey",
    "Infrastructure Category": "Buildings",
    "Infrastructure Type": "Health Facility",
    "Building Type": "Hospital",
    "Damage Extent": "Major",
    "Damage Status": "Significantly Damaged",
    "Estimated Cost": "1200000",
    "Cost Confidence": "High",
    "Ownership": "Government",
    "Population Affected": "10000",
    "Critical Impact": "Yes - Healthcare disrupted",
    "Immediate Actions": "Emergency services relocated",
    "Support Required": "Full structural assessment and rebuild",
    "Remarks": "Critical infrastructure - priority repair",
    "Verified By": "Supervisor-004",
    "Verified Date": "2024-03-18"
  },
  {
    "Case ID": "D-005",
    "Province": "Sindh",
    "District": "Hyderabad",
    "Union Council": "Latifabad",
    "Landmark": "Water Supply Line",
    "Latitude": "25.3960",
    "Longitude": "68.4711",
    "Assessment Date": "2024-03-19",
    "Assessment Member": "Nida Khan",
    "Location Verified": "Yes",
    "Event Date": "2024-03-13",
    "Event Type": "Flooding",
    "Information Source": "Municipal Complaint",
    "Infrastructure Category": "Utilities",
    "Infrastructure Type": "Water Supply",
    "Damage Extent": "Moderate",
    "Damage Status": "Service Disrupted",
    "Estimated Cost": "180000",
    "Cost Confidence": "Medium",
    "Ownership": "Government",
    "Population Affected": "8000",
    "Critical Impact": "Yes - Water shortage",
    "Immediate Actions": "Water tankers deployed",
    "Support Required": "Pipeline replacement",
    "Remarks": "Temporary arrangements in place",
    "Verified By": "Supervisor-005",
    "Verified Date": "2024-03-20"
  }
];

// Create a new workbook
const ws = XLSX.utils.json_to_sheet(sampleData);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Assessments");

// Auto-size columns
const colWidths = {};
Object.keys(sampleData[0]).forEach(key => {
  colWidths[key] = { wch: Math.min(20, Math.max(10, key.length)) };
});
ws['!cols'] = Object.values(colWidths);

// Write the file
XLSX.writeFile(wb, "public/samples/sample-damage-assessments.xlsx");

console.log("✓ Sample file created: public/samples/sample-damage-assessments.xlsx");
console.log(`✓ Contains ${sampleData.length} sample assessment records`);
console.log("✓ Ready for testing file upload functionality");
