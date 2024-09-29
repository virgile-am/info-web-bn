import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedUsers from './userseeds.js';
import seedProducts from './productseeds.js';
import seedCategories from './categoryseeds.js';

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('Connected successfully to MongoDB');

    // Run seed functions in order
    console.log('Seeding categories...');
    await seedCategories();
    
    console.log('Seeding users...');
    await seedUsers();
    
    console.log('Seeding products...');
    await seedProducts();

    console.log('All seed operations completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection only after all operations are complete
    if (mongoose.connection.readyState === 1) {
      console.log('Closing database connection...');
      await mongoose.connection.close();
      console.log('Database connection closed');
    }
  }
};

// Execute the seed function
seedDatabase().catch(err => {
  console.error('Unhandled promise rejection:', err);
  process.exit(1);
});