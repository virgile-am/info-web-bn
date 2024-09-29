import Category from '../models/Category.js';

const seedCategories = async () => {
  try {
    await Category.deleteMany({});

    const categories = [
      {
        name: 'Category A',
        description: 'This is Category A',
        image: ' https://res.cloudinary.com/djk0jm7kg/image/upload/v1717838632/PsnRwanda/background.jpg', // Add image URL
      },
      {
        name: 'Category B',
        description: 'This is Category B',
        image: ' https://res.cloudinary.com/djk0jm7kg/image/upload/v1716883711/PsnRwanda/ver3.jpg', // Add image URL
      },
      
    ];

    await Category.insertMany(categories);
    console.log('Categories seeded successfully!');
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
};

export default seedCategories;
