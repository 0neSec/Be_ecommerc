const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Login a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    console.log('User found for email:', email);

    // Check if the user is verified
    if (!user.isVerified) {
      console.log('User is not verified for email:', email);
      return res.status(400).json({ message: 'Account not verified. Please check your email for verification instructions.' });
    }
    console.log('User is verified for email:', email);

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for email:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    console.log('Password matched for email:', email);

    // Create and assign a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    console.log('Token generated for user:', user._id);

    res.status(200).json({ token });
  } catch (error) {
    console.log('Error during login:', error.message);
    res.status(500).json({ message: error.message });
  }
};
