import dbConnect from '../../lib/config/dbConnect';
import User from '../../lib/models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { username, email, password, weight, weightUnit, age, gender, activityLevel, climate, result } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required'
      });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists'
        });
      }

      const newUser = await User.create({ 
        username, 
        email, 
        password,
        weight,
        weightUnit,
        age,
        gender,
        activityLevel,
        climate,
        result,
      });

      return res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Failed to create user',
        error: error.message
      });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
