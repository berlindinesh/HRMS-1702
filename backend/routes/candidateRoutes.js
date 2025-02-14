import express from 'express'
import {
  addCandidate,
  getCandidatesByRecruitment,
  updateCandidate,
  deleteCandidate,
} from '../controllers/candidateController.js';

const router = express.Router();

// Route to add a new candidate
router.post('/api/recruitment', addCandidate);

// Route to get candidates by recruitment type (e.g., 'Recruitment Drive')
router.get('/api/recruitment/:recruitment', getCandidatesByRecruitment);

// Route to update a candidate's details
router.put('/api/recruitment/:id', updateCandidate);

// Route to delete a candidate
router.delete('/api/recruitment/:id', deleteCandidate);

export default router
