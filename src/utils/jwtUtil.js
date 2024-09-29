import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class JwtUtility {
  static generateToken(userData, exp) {
    if (!process.env.SECRET_TOKEN) {
      throw new Error('JWT secret is not defined');
    }
  
    const payload = {
      id: userData.id,     
      email: userData.email, 
      role: userData.role    
    };

    const options = {
      expiresIn: exp || '1h' // Use the provided exp or default to 1 hour
    };

    return jwt.sign(payload, process.env.SECRET_TOKEN, options);
  }

  static verifyToken(token) {
    if (!process.env.SECRET_TOKEN) {
      throw new Error('JWT secret is not defined');
    }
    
    try {
      const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
      return decoded;
    } catch (error) {
      throw error;
    }
  }
}

export default JwtUtility;