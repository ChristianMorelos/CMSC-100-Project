import { User } from '../models/model.js';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';

const SECRET_KEY = '279fa3818db53ae62ed74894b0312d2339bfabf269f4462f7ed7fe7f33efb55c'

const register = async (req, res) => {
    try {
        const { firstName, middleName, lastName, userType, email } = req.body;
        let { password } = req.body;

        password = await bcrypt.hash(password, 10);
    
        if (!firstName || !lastName || !userType || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const newUser = new User({ firstName, middleName, lastName, userType, email, password });
        await newUser.save();
    
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error signing up' });
    };
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
    
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials'})
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password)
    
        if(!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }   
    
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' }) 
        res.status(201).json({ token: token });
    } catch (error) {
        res.status(500).json({ error: 'Error signing up' });
    };
};

const authenticateToken = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: ' Unauthorized user' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Token is not valid' });

        req.user = decoded;
        return res.status(200).json({ response: ' Authorized user' });
    });
}

export { register, login, authenticateToken }
