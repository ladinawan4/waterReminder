import dbConnect from '../../lib/config/dbConnect';
import Schedule from '../../lib/models/schedule';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'POST':
      try {
        const schedule = await Schedule.create(req.body);
        res.status(201).json({ success: true, data: schedule });
      } catch (error) {
        console.error('Error creating schedule:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
      case 'GET':
        try {
          const { page = 1, limit = 10 } = req.query;
          const skip = (page - 1) * limit;
  
          const total = await Schedule.countDocuments();
          const schedule = await Schedule.find({})
            .skip(skip)
            .limit(parseInt(limit));
  
          res.status(200).json({ success: true, data: schedule, total });
        } catch (error) {
          console.error('Error fetching schedule:', error);
          res.status(400).json({ success: false, error: error.message });
        }
        break;
        default:
          res.status(400).json({ success: false });
          break;
  }
}
