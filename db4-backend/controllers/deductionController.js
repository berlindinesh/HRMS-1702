import Deduction from '../models/deductionModel.js';

export const createDeduction = async (req, res) => {
  try {
    const deduction = new Deduction(req.body);
    await deduction.save();
    res.status(201).json({ success: true, data: deduction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDeductions = async (req, res) => {
  try {
    const deductions = await Deduction.find();
    res.status(200).json({ success: true, data: deductions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateDeduction = async (req, res) => {
  try {
    const deduction = await Deduction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!deduction) {
      return res.status(404).json({ success: false, message: 'Deduction not found' });
    }
    res.json({ success: true, data: deduction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteDeduction = async (req, res) => {
  try {
    const deduction = await Deduction.findByIdAndDelete(req.params.id);
    if (!deduction) {
      return res.status(404).json({ message: 'Deduction not found' });
    }
    res.status(200).json({ success: true, message: 'Deduction deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
