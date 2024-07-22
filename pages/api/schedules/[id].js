import dbConnect from '../../../lib/config/dbConnect';
import Schedule from '../../../lib/models/schedule';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;
  
    await dbConnect();
  
    try {
 
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }
        
        const decoded = jwt.verify(token, SECRET_KEY);
 
        req.body.userId = decoded.id;
        
        switch (method) {
            case 'GET':
                try {
                    const schedule = await Schedule.findOne({ _id: id, userId: decoded.id });

                    if (!schedule) {
                        return res.status(404).json({ success: false, error: 'Schedule not found' });
                    }

                    res.status(200).json({ success: true, data: schedule });
                } catch (error) {
                    console.error('Error fetching schedule:', error);
                    res.status(400).json({ success: false, error: error.message });
                }
                break;

            case 'PUT':
                try {
                    const schedule = await Schedule.findOneAndUpdate(
                        { _id: id, userId: decoded.id },
                        req.body,
                        { new: true, runValidators: true }
                    );

                    if (!schedule) {
                        return res.status(404).json({ success: false, error: 'Schedule not found' });
                    }

                    res.status(200).json({ success: true, data: schedule });
                } catch (error) {
                    console.error('Error updating schedule:', error);
                    res.status(400).json({ success: false, error: error.message });
                }
                break;

            case 'DELETE':
                try {
                    const schedule = await Schedule.findOneAndDelete({ _id: id, userId: decoded.id });

                    if (!schedule) {
                        return res.status(404).json({ success: false, error: 'Schedule not found' });
                    }

                    res.status(200).json({ success: true, message: 'Schedule deleted successfully' });
                } catch (error) {
                    console.error('Error deleting schedule:', error);
                    res.status(400).json({ success: false, error: error.message });
                }
                break;

            default:
                res.status(405).json({ success: false, message: 'Method not allowed' });
                break;
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
}
