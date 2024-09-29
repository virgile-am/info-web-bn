import User from '../models/User.js';

const seedUsers = async () => {
  try {
    // Delete existing users
    await User.deleteMany({});

    const users = [
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: '$2a$12$T0QKV6UCltH9PapnEccpBOPfX727uWxCVKBqYHTUHnsOSlXcftZUC',
        role: 'admin',
        image: ' https://res.cloudinary.com/djk0jm7kg/image/upload/v1717839871/PsnRwanda/about.jpg',
      },
      {
        username: 'adminone',
        email: 'virgilendayambaje@gmail.com',
        password: '$2a$12$T0QKV6UCltH9PapnEccpBOPfX727uWxCVKBqYHTUHnsOSlXcftZUC',
        role: 'admin',
        image: ' https://res.cloudinary.com/djk0jm7kg/image/upload/v1717839871/PsnRwanda/about.jpg',
      },
    ];

    await User.insertMany(users);
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error; 
  }
};

export default seedUsers;