import express from 'express';
import { createIssue, getAllIssues, getIssueById } from '../controllers/issueController.js';
import Issue from '../models/Issue.js';

const router = express.Router();

// --- 1. STATIC/SPECIFIC ROUTES ---
router.post('/add', createIssue);
router.get('/all', getAllIssues);

// --- 2. SEMI-SPECIFIC ROUTES (User-specific activity) ---
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userIssues = await Issue.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: userIssues });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 3. ADMIN STATUS UPDATE (PATCH) ---
router.patch('/status/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedIssue) return res.status(404).json({ success: false, message: "Issue not found" });
    res.json({ success: true, data: updatedIssue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// --- 4. GENERIC ID ROUTES (MUST BE AT THE BOTTOM) ---
router.get('/:id', getIssueById);

// UPDATE ROUTE (Fixes the "Saving..." hang)
router.put('/:id', async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true } 
    );
    if (!updatedIssue) return res.status(404).json({ success: false, message: "Issue not found" });
    res.json({ success: true, data: updatedIssue }); 
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE ROUTE
router.delete('/:id', async (req, res) => {
  try {
    const deletedIssue = await Issue.findByIdAndDelete(req.params.id);
    if (!deletedIssue) return res.status(404).json({ success: false, message: "Issue not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;