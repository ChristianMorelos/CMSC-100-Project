import { User } from '../models/model.js';
import { bcrypt } from 'bcrypt';

const SECRET_KEY = '279fa3818db53ae62ed74894b0312d2339bfabf269f4462f7ed7fe7f33efb55c'

const register = async (req, res) => {
    try {
        const { firstName, middleName, lastName, userType, email, password } = req.body;
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        if (!firstName || !lastName || !userType || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
    
        const newUser = new User({ firstName, middleName, lastName, userType, email, hashedPassword });
        await newUser.save();
    
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error signing up' })
    }
};

const login = (req, res) => {
    // Implement user login logic here
};

export { register, login }
