// controllers/authController.js
import User from '../models/User.js';

export const googleLogin = async (req, res) => {
  const { email, name } = req.body;

  // Create user if not exists
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, name }); // default role = 'customer'
    await user.save();
  }

  res.json(user);
};
