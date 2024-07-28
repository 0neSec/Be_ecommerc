// Logout a user
exports.logoutUser = (req, res) => {
    try {
      res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  