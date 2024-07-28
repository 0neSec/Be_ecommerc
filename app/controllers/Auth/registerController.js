const User = require('../../models/userModel');
const Role = require('../../models/roleModel');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Email setup
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, roleId } = req.body;

    // Check if email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Set default role to 'user' if no role is provided
    let userRole;
    if (!roleId) {
      let defaultRole = await Role.findOne({ name: 'users' });
      if (!defaultRole) {
        // Create default role if it doesn't exist
        defaultRole = new Role({ name: 'users' });
        await defaultRole.save();
      }
      userRole = defaultRole._id;
    } else {
      const role = await Role.findById(roleId);
      if (!role) {
        return res.status(400).json({ message: 'Role not found' });
      }
      userRole = role._id;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: userRole,
      verificationToken
    });
    const savedUser = await newUser.save();

    // Send verification email
    const verificationUrl = `http://localhost:5000/api/verify-email?token=${verificationToken}`;
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      subject: 'Email Verification',
      html: `Please verify your email by clicking this link: <a href="${verificationUrl}">Verify Email</a>`
    });

    res.status(201).json({ message: 'User registered successfully. Please check your email for verification link.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
