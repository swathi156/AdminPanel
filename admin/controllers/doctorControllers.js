const { Doctor } = require("../models");

// Role-based access
exports.getAllDoctors = async (req,res)=>{
  const doctors = await Doctor.findAll({attributes:["id","name","email","specialization","hospital","phno"]});
  res.json(doctors);
}

exports.getDoctor = async (req,res)=>{
  const doc = await Doctor.findByPk(req.params.id);
  if(!doc) return res.status(404).json({error:"Doctor not found"});
  res.json(doc);
}

exports.updateDoctor = async (req,res)=>{
  const doc = await Doctor.findByPk(req.params.id);
  if(!doc) return res.status(404).json({error:"Doctor not found"});
  if(req.user.role==="doctor" && req.user.id!==doc.id) return res.status(403).json({error:"Access denied"});
  await doc.update(req.body);
  res.json({message:"Updated",doc});
}

exports.deleteDoctor = async (req,res)=>{
  const doc = await Doctor.findByPk(req.params.id);
  if(!doc) return res.status(404).json({error:"Doctor not found"});
  if(req.user.role==="doctor") return res.status(403).json({error:"Access denied"});
  await doc.destroy();
  res.json({message:"Deleted"});
}
