import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Turso client
const client = createClient({
  url: process.env.TURSO_DB_URL,
  authToken: process.env.TURSO_DB_AUTH_TOKEN,
});

// Initialize database schema
async function initializeDatabase() {
  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS damage_assessments (
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
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

// Routes

// Get all assessments
app.get('/api/assessments', async (req, res) => {
  try {
    const result = await client.execute('SELECT * FROM damage_assessments ORDER BY createdAt DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching assessments:', error);
    res.status(500).json({ error: 'Failed to fetch assessments' });
  }
});

// Get single assessment
app.get('/api/assessments/:id', async (req, res) => {
  try {
    const result = await client.execute({
      sql: 'SELECT * FROM damage_assessments WHERE id = ?',
      args: [req.params.id],
    });
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Assessment not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching assessment:', error);
    res.status(500).json({ error: 'Failed to fetch assessment' });
  }
});

// Create new assessment
app.post('/api/assessments', async (req, res) => {
  try {
    const {
      caseId,
      province,
      district,
      unionCouncil,
      landmark,
      latitude,
      longitude,
      assessmentDate,
      assessmentMember,
      locationVerified,
      eventDate,
      eventType,
      informationSource,
      infrastructureCategory,
      infrastructureType,
      roadType,
      bridgeType,
      buildingType,
      damageExtent,
      damageStatus,
      estimatedCost,
      costConfidence,
      ownership,
      populationAffected,
      criticalImpact,
      immediateActions,
      supportRequired,
      remarks,
      verifiedBy,
      verifiedDate,
    } = req.body;

    const id = `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();

    await client.execute({
      sql: `INSERT INTO damage_assessments (
        id, caseId, province, district, unionCouncil, landmark, latitude, longitude,
        assessmentDate, assessmentMember, locationVerified, eventDate, eventType,
        informationSource, infrastructureCategory, infrastructureType, roadType,
        bridgeType, buildingType, damageExtent, damageStatus, estimatedCost,
        costConfidence, ownership, populationAffected, criticalImpact,
        immediateActions, supportRequired, remarks, verifiedBy, verifiedDate,
        createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        id, caseId, province, district, unionCouncil, landmark, latitude, longitude,
        assessmentDate, assessmentMember, locationVerified, eventDate, eventType,
        informationSource, infrastructureCategory, infrastructureType, roadType,
        bridgeType, buildingType, damageExtent, damageStatus, estimatedCost,
        costConfidence, ownership, populationAffected, criticalImpact,
        immediateActions, supportRequired, remarks, verifiedBy, verifiedDate,
        now, now
      ],
    });

    res.status(201).json({ id, message: 'Assessment created successfully' });
  } catch (error) {
    console.error('Error creating assessment:', error);
    res.status(500).json({ error: 'Failed to create assessment' });
  }
});

// Update assessment
app.put('/api/assessments/:id', async (req, res) => {
  try {
    const updates = req.body;
    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(updates);

    await client.execute({
      sql: `UPDATE damage_assessments SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`,
      args: [...values, req.params.id],
    });

    res.json({ message: 'Assessment updated successfully' });
  } catch (error) {
    console.error('Error updating assessment:', error);
    res.status(500).json({ error: 'Failed to update assessment' });
  }
});

// Delete assessment
app.delete('/api/assessments/:id', async (req, res) => {
  try {
    await client.execute({
      sql: 'DELETE FROM damage_assessments WHERE id = ?',
      args: [req.params.id],
    });

    res.json({ message: 'Assessment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assessment:', error);
    res.status(500).json({ error: 'Failed to delete assessment' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
