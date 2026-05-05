import Issue from '../models/Issue.js';

// POST: Add a new issue 
export const createIssue = async (req, res) => {
  try {

    const newIssue = new Issue(req.body);
    const savedIssue = await newIssue.save();
    res.status(201).json({ success: true, data: savedIssue });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// GET: Fetch all issues 
export const getAllIssues = async (req, res) => {
  try {
    
    const issues = await Issue.find().sort({ createdAt: -1 });  // this is for the sorting the issues
    res.status(200).json({ success: true, data: issues });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET: Fetch a single issue by ID 
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.status(200).json({ success: true, data: issue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};