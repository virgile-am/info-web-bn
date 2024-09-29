import User from '../database/models/User.js';
import JwtUtility from '../utils/jwtUtil.js';
import { sendUserCreationEmail } from '../utils/useremailregistrationutil.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = JwtUtility.generateToken(
      { id: user._id, email: user.email, role: user.role }, 
      '1d'
    );

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }
    res.status(400).json({ message: 'Login failed' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password, image } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const user = new User({ username, email, password, image });
    await user.save();

    // Send email notification with user credentials
    await sendUserCreationEmail({ username, email, password, image });

    res.status(201).json({ message: 'User created successfully', user: user.toJSON() });
  } catch (error) {
    console.error('User creation error:', error);
    res.status(400).json({ message: 'User creation failed' });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
};

export const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;   
    const users = await User.find({ role }, '-password');
    
    if (!users.length) {
      return res.status(404).json({ message: `No users found for role: ${role}` });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Get users by role error:', error);
    res.status(500).json({ message: 'Failed to retrieve users by role' });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email,image } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email,image },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user: user.toJSON() });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(400).json({ message: 'User update failed' });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'User deletion failed' });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); // exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { username, email, image } = req.body;

    // Find user by ID (from JWT token)
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if they exist in request body
    if (username) user.username = username;
    if (email) user.email = email;
    if (image) user.image = image;

    // If updating password, handle it separately
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      image: updatedUser.image,
      role: updatedUser.role,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
