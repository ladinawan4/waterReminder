import dbConnect from '../../lib/config/dbConnect';
import User from '../../lib/models/User';
 
export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required'
      });
    }

    try {
        const newUser = await User.create({ 
        username, 
        email, 
        password,  
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
