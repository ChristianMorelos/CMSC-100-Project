import { User } from '../models/model.js';

const register = async (req, res) => {
    const { 
        firstName, 
        middleName, 
        lastName, 
        userType, 
        email, 
        password 
    } = req.body;

    if (!firstName || !lastName || !userType || !email || !password) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ firstName, middleName, lastName, userType, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
};

const login = (req, res) => {
    // Implement user login logic here
};

export { register, login }
