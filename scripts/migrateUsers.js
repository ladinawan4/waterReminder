import dbConnect from '../../lib/config/dbConnect';
import User from '../../lib/models/User';

async function migrate() {
  await dbConnect();

  try {
    await User.updateMany({}, {
      $set: {
        weight: null,
        weightUnit: null,
        age: null,
        gender: null,
        activityLevel: null,
        climate: null,
      }
    });
    console.log('Migration completed successfully.');
  } catch (error) {
    console.error('Migration error:', error);
  }
}

migrate();
