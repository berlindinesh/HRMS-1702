import mongoose from 'mongoose';

const organizationNodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrganizationNode',
    default: null
  },
  // Employee reference fields
  employeeId: {
    type: String
  },
  email: {
    type: String
  },
  department: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'vacant'],
    default: 'active'
  }
}, { timestamps: true });

const OrganizationNode = mongoose.model('OrganizationNode', organizationNodeSchema);

export default OrganizationNode;
