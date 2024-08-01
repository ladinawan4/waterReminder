import dbConnect from '../../lib/config/dbConnect';
import User from '../../lib/models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      return res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve user',
        error: error.message
      });
    }
  } else if (req.method === 'PUT') {
    const { userId, username, email, password, weight, weightUnit, age, gender, activityLevel, climate, result } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { username, email, password, weight, weightUnit, age, gender, activityLevel, climate, result },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: updatedUser
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update user',
        error: error.message
      });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
