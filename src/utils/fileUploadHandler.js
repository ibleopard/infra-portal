import * as XLSX from 'xlsx';

/**
 * Parse Excel file and extract assessment data
 * @param {File} file - The uploaded file
 * @returns {Promise<Array>} - Array of assessment records
 */
export async function parseExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const records = XLSX.utils.sheet_to_json(worksheet);
        
        // Transform records to match form fields
        const transformedRecords = records.map((record) => transformExcelRow(record));
        
        resolve(transformedRecords);
      } catch (error) {
        reject(new Error(`Failed to parse Excel file: ${error.message}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsArrayBuffer(file);
  });
}

/**
 * Transform Excel row to match form field structure
 */
function transformExcelRow(row) {
  // Create a case-insensitive map of the row
  const lowerCaseRow = {};
  Object.keys(row).forEach((key) => {
    lowerCaseRow[key.toLowerCase().trim()] = row[key];
  });

  const getValueByKeys = (keys) => {
    for (const key of keys) {
      if (lowerCaseRow[key.toLowerCase()]) {
        return String(lowerCaseRow[key.toLowerCase()]).trim();
      }
    }
    return '';
  };

  return {
    caseId: getValueByKeys(['case id', 'caseid', 'case_id', 'case no', 'case no.']) || '',
    province: getValueByKeys(['province', 'provincial', 'prov']) || '',
    district: getValueByKeys(['district', 'distict', 'dist']) || '',
    unionCouncil: getValueByKeys(['union council', 'union', 'uc', 'union_council']) || '',
    landmark: getValueByKeys(['landmark', 'location', 'place']) || '',
    latitude: getValueByKeys(['latitude', 'lat']) || '',
    longitude: getValueByKeys(['longitude', 'long', 'lng']) || '',
    assessmentDate: getValueByKeys(['assessment date', 'assessment_date', 'date']) || '',
    assessmentMember: getValueByKeys(['assessment member', 'member', 'assessed by', 'assessor']) || '',
    locationVerified: getValueByKeys(['location verified', 'verified', 'location_verified']) || 'Yes',
    eventDate: getValueByKeys(['event date', 'event_date', 'incident date']) || '',
    eventType: getValueByKeys(['event type', 'event_type', 'incident type', 'type']) || '',
    informationSource: getValueByKeys(['information source', 'source', 'information_source']) || '',
    infrastructureCategory: getValueByKeys(['infrastructure category', 'category', 'infrastructure_category']) || '',
    infrastructureType: getValueByKeys(['infrastructure type', 'infrastructure_type']) || '',
    roadType: getValueByKeys(['road type', 'road_type']) || '',
    bridgeType: getValueByKeys(['bridge type', 'bridge_type']) || '',
    buildingType: getValueByKeys(['building type', 'building_type']) || '',
    damageExtent: getValueByKeys(['damage extent', 'damage_extent', 'extent', 'damage level']) || '',
    damageStatus: getValueByKeys(['damage status', 'damage_status', 'status']) || '',
    estimatedCost: getValueByKeys(['estimated cost', 'estimated_cost', 'cost', 'amount', 'damage cost']) || '',
    costConfidence: getValueByKeys(['cost confidence', 'cost_confidence', 'confidence']) || '',
    ownership: getValueByKeys(['ownership', 'owner', 'owner type']) || '',
    populationAffected: getValueByKeys(['population affected', 'population_affected', 'affected population', 'people affected']) || '',
    criticalImpact: getValueByKeys(['critical impact', 'critical_impact', 'impact']) || '',
    immediateActions: getValueByKeys(['immediate actions', 'immediate_actions', 'actions']) || '',
    supportRequired: getValueByKeys(['support required', 'support_required', 'support', 'needs']) || '',
    remarks: getValueByKeys(['remarks', 'comments', 'notes']) || '',
    verifiedBy: getValueByKeys(['verified by', 'verified_by']) || '',
    verifiedDate: getValueByKeys(['verified date', 'verified_date']) || '',
  };
}

/**
 * Parse PDF file (placeholder for future implementation)
 */
export async function parsePdfFile(file) {
  console.warn('PDF parsing not yet implemented. Using Excel parser.');
  throw new Error('PDF parsing not yet implemented. Please upload an Excel file.');
}

/**
 * Main file upload handler that determines file type and parses accordingly
 */
export async function parseUploadedFile(file) {
  const fileName = file.name.toLowerCase();
  
  if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.includes('spreadsheet')) {
    return parseExcelFile(file);
  } else if (fileName.endsWith('.pdf')) {
    return parsePdfFile(file);
  } else {
    throw new Error('Unsupported file format. Please upload an Excel file (.xlsx/.xls) or PDF.');
  }
}

/**
 * Group records by district for map integration
 */
export function groupRecordsByDistrict(records) {
  const grouped = {};
  
  records.forEach((record) => {
    const district = record.district || 'Unknown';
    if (!grouped[district]) {
      grouped[district] = [];
    }
    grouped[district].push(record);
  });
  
  return grouped;
}

/**
 * Calculate summary statistics for a group of records
 */
export function calculateDistrictSummary(records) {
  if (!records || records.length === 0) {
    return null;
  }

  const totalCost = records.reduce((sum, r) => {
    const cost = parseFloat(r.estimatedCost) || 0;
    return sum + cost;
  }, 0);

  const damageTypes = {};
  records.forEach((r) => {
    const damage = r.damageExtent || 'Unknown';
    damageTypes[damage] = (damageTypes[damage] || 0) + 1;
  });

  return {
    count: records.length,
    totalCost: totalCost.toLocaleString('en-US', { style: 'currency', currency: 'PKR' }),
    averageCost: (totalCost / records.length).toLocaleString('en-US', { style: 'currency', currency: 'PKR' }),
    damageBreakdown: damageTypes,
    infrastructureTypes: [...new Set(records.map((r) => r.infrastructureType).filter(Boolean))],
  };
}
