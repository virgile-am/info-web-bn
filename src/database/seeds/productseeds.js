import Product from '../models/Product.js';
import Category from '../models/Category.js';

const seedProducts = async () => {
  try {
    await Product.deleteMany({});

    const categoryA = await Category.findOne({ name: 'Category A' });
    const categoryB = await Category.findOne({ name: 'Category B' });

    if (!categoryA || !categoryB) {
      throw new Error('Categories not found. Ensure categories are seeded first.');
    }

    const products = [
      {
        productName: 'Product One',
        image: 'https://res.cloudinary.com/djk0jm7kg/image/upload/v1717838632/PsnRwanda/background.jpg',
        category: categoryA._id,
        description: 'This is a description for Product One.',
      },
      {
        productName: 'Product Two',
        image: 'https://res.cloudinary.com/djk0jm7kg/image/upload/v1717838632/PsnRwanda/background.jpg',
        category: categoryB._id,
        description: 'This is a description for Product Two.',
      },
    ];

    await Product.insertMany(products);
    console.log('Products seeded successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};

export default seedProducts;