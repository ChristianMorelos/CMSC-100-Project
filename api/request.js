import needle from 'needle';

const newUser = {
    firstName: 'John',
    lastName: 'Doe',
    userType: 'customer',
    email: 'john@example.com',
    password: 'password123'
};



needle.post('http://localhost:3000/auth/register', newUser, 
(err, res) => {
    console.log('Response:', res.body);
});
