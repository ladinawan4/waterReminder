import dbConnect from '../../../lib/config/dbConnect';
import Schedule from '../../../lib/models/schedule';

export default async function handler(req, res) {
    const { id } = req.query;

    await dbConnect();

    if (req.method === 'DELETE') {
        try {
            const deletedSchedule = await Schedule.findByIdAndDelete(id);

            if (!deletedSchedule) {
                return res.status(404).json({ success: false, error: 'Schedule not found' });
            }

            return res.status(200).json({ success: true, data: deletedSchedule });
        } catch (error) {
            return res.status(500).json({ success: false, error: 'Server error' });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        return res.status(405).json({ success: false, error: `Method ${req.method} not allowed` });
    }
}