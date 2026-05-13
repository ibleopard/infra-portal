// Script to create a sample Excel file for testing
import XLSX from 'xlsx';
import fs from 'fs';

const sampleData = [
  {
    'Case ID': 'TEST-001',
    'Province': 'Punjab',
    'District': 'Lahore',
    'Union Council': 'UC-01',
    'Landmark/Location Name': 'GT Road',
    'Latitude': '31.5204',
    'Longitude': '74.3587',
    'Assessment Date': '2024-05-01',
    'Assessment Member': 'John Doe',
    'Location Verified': 'Yes',
    'Event Date': '2024-04-28',
    'Event Type': 'Flood',
    'Information Source': 'Field Visit',
    'Infrastructure Category': 'Roads',
    'Infrastructure Type': 'Main Road',
    'Road Type': 'Asphalt',
    'Damage Extent': 'Moderate',
    'Damage Status': 'Open',
    'Estimated Cost': '500000',
    'Cost Confidence': 'High',
    'Ownership': 'Government',
    'Population Affected': '5000',
    'Critical Impact': 'Yes',
    'Immediate Actions': 'Repair required',
    'Support Required': 'Contractor needed',
    'Remarks': 'Road needs urgent repair'
  },
  {
    'Case ID': 'TEST-002',
    'Province': 'Sindh',
    'District': 'Karachi',
    'Union Council': 'UC-02',
    'Landmark/Location Name': 'Clifton Road',
    'Latitude': '24.7985',
    'Longitude': '67.0181',
    'Assessment Date': '2024-05-02',
    'Assessment Member': 'Jane Smith',
    'Location Verified': 'Yes',
    'Event Date': '2024-04-29',
    'Event Type': 'Earthquake',
    'Information Source': 'Remote Sensing',
    'Infrastructure Category': 'Buildings',
    'Infrastructure Type': 'Residential',
    'Building Type': 'Multi-story',
    'Damage Extent': 'Severe',
    'Damage Status': 'Open',
    'Estimated Cost': '2000000',
    'Cost Confidence': 'Medium',
    'Ownership': 'Private',
    'Population Affected': '150',
    'Critical Impact': 'Yes',
    'Immediate Actions': 'Evacuation required',
    'Support Required': 'Rescue team',
    'Remarks': 'Building severely damaged'
  },
  {
    'Case ID': 'TEST-003',
    'Province': 'KP',
    'District': 'Peshawar',
    'Union Council': 'UC-03',
    'Landmark/Location Name': 'Main Bazaar',
    'Latitude': '34.0151',
    'Longitude': '71.5249',
    'Assessment Date': '2024-05-03',
    'Assessment Member': 'Ahmed Khan',
    'Location Verified': 'Yes',
    'Event Date': '2024-04-30',
    'Event Type': 'Storm',
    'Information Source': 'Phone Survey',
    'Infrastructure Category': 'Commercial',
    'Infrastructure Type': 'Shop',
    'Damage Extent': 'Minor',
    'Damage Status': 'Open',
    'Estimated Cost': '150000',
    'Cost Confidence': 'Low',
    'Ownership': 'Private',
    'Population Affected': '200',
    'Critical Impact': 'No',
    'Immediate Actions': 'Survey and assessment',
    'Support Required': 'Technical support',
    'Remarks': 'Minor damage to roof'
  }
];

const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(sampleData);
XLSX.utils.book_append_sheet(workbook, worksheet, 'Assessments');
XLSX.writeFile(workbook, 'public/sample-data.xlsx');
console.log('Sample Excel file created at public/sample-data.xlsx');
