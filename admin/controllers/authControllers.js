const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mail");
const { User, Doctor, Patient, Role } = require("../models");
require("dotenv").config();

const generatePassword = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

// Register any user
exports.registerUser = async (req, res) => {
  try {
    const { type, name, email, specialization, hospital, phno, roleId } = req.body;

    if (!type || !name || !email || !roleId) 
      return res.status(400).json({ error: "Missing fields" });

    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ error: "Email already exists" });

    const password = generatePassword();
    const hashed = await bcrypt.hash(password, 10);

    let user;
    if (type === "doctor") {
      user = await Doctor.create({ name, email, specialization, hospital, phno, roleId, password: hashed });
    
    } else if (type === "superadmin") {
      user = await User.create({ username: name, email, roleId, password: hashed });
    } else {
      return res.status(400).json({ error: "Invalid user type" });
    }

    // Send password email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `${type} Registration Password`,
      text: `Your password is: ${password}`
    });

    res.status(201).json({
      message: `${type} registered successfully`,
      user: { id: user.id, name, email, type, roleId }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password, type } = req.body;
    let user;

    if (type === "doctor") user = await Doctor.findOne({ where: { email } });
    else if (type === "superadmin") user = await User.findOne({ where: { email } });
    else return res.status(400).json({ error: "Invalid user type" });

    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Wrong password" });

    const token = jwt.sign({ id: user.id, roleId: user.roleId, type }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
