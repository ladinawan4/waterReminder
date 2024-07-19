import dbConnect from "../../lib/config/dbConnect";
import Schedule from "../../lib/models/schedule";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const schedule = await Schedule.create(req.body);
        res.status(201).json({ success: true, data: schedule });
      } catch (error) {
        console.error("Error creating schedule:", error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;
      case 'GET':
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * limit;
    
            // Fetch all documents to calculate the total amountMl and group by day
            const allSchedules = await Schedule.find({});
            const totalAmountMl = allSchedules.reduce((total, item) => total + item.amountMl, 0);
    
            // Group by day and calculate daily totals
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
    
            // Calculate daily average intake
            const totalDays = Object.keys(dailyIntake).length;
            const averageDailyIntake = totalDays ? totalAmountMl / totalDays : 0;
    
            // Fetch paginated documents
            const total = await Schedule.countDocuments();
            const schedule = await Schedule.find({})
                .skip(skip)
                .limit(parseInt(limit));
    
            res.status(200).json({ success: true, data: schedule, total, totalAmountMl, averageDailyIntake });
        } catch (error) {
            console.error('Error fetching schedule:', error);
            res.status(400).json({ success: false, error: error.message });
        }
        break;
  }
}
