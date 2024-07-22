import dbConnect from "../../lib/config/dbConnect";
import Schedule from "../../lib/models/schedule";
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
  
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          return res.status(401).json({ success: false, message: 'No token provided' });
        }
        
    
        const decoded = jwt.verify(token, SECRET_KEY);
        req.body.userId = decoded.id;

        const schedule = await Schedule.create(req.body);
        res.status(201).json({ success: true, data: schedule });
      } catch (error) {
        console.error("Error creating schedule:", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'GET':
      try {
        // Extract token from headers
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
          return res.status(401).json({ success: false, message: 'No token provided' });
        }
        
    
        const decoded = jwt.verify(token, SECRET_KEY);
        
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

     
        const allSchedules = await Schedule.find({ userId: decoded.id });
        const totalAmountMl = allSchedules.reduce((total, item) => total + item.amountMl, 0);

        const dailyIntake = {};
        allSchedules.forEach(item => {
          const date = new Date(item.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          if (!dailyIntake[date]) {
            dailyIntake[date] = 0;
          }
          dailyIntake[date] += item.amountMl;
        });
 
        const totalDays = Object.keys(dailyIntake).length;
        const averageDailyIntake = totalDays ? totalAmountMl / totalDays : 0;

      
        const total = await Schedule.countDocuments({ userId: decoded.id });
        const schedule = await Schedule.find({ userId: decoded.id })
          .skip(skip)
          .limit(parseInt(limit));

        res.status(200).json({ success: true, data: schedule, total, totalAmountMl, averageDailyIntake });
      } catch (error) {
        console.error('Error fetching schedule:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
