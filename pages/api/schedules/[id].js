import dbConnect from '../../../lib/config/dbConnect';
import Schedule from '../../../lib/models/schedule';

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;
  
    await dbConnect();
  
    switch (method) {
      case 'GET':
        try {
      
          const schedule = await Schedule.findById(id);
  
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
      
          const schedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  
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
          // Delete a schedule by ID
          const schedule = await Schedule.findByIdAndDelete(id);
  
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
        res.status(400).json({ success: false, error: 'Method not allowed' });
        break;
    }
}