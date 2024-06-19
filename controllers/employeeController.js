const Employee = require('../models/employeeModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Register a new employee
exports.registerEmployee = async (req, res) => {
    const { employeeId, email, adharNo, name, phoneNumber, password, role } = req.body;

    try {
        let employee = await Employee.findOne({ email });
        if (employee) {
            return res.status(400).json({ msg: 'Employee already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        employee = new Employee({
            employeeId,
            email,
            adharNo,
            name,
            phoneNumber,
            password: hashedPassword,
            role
        });

        await employee.save();

        const payload = {
            employee: {
                id: employee.id,
                role: employee.role
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Authenticate employee and get token
exports.loginEmployee = async (req, res) => {
    const { email, password } = req.body;

    try {
        let employee = await Employee.findOne({ email }).select('+password');
        if (!employee) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            employee: {
                id: employee.id,
                role: employee.role
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().select('+password');
        res.json(employees);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update employee
exports.updateEmployee = async (req, res) => {
    const { email } = req.params;
    const { adharNo, name, phoneNumber, password, role } = req.body;

    try {
        const updatedFields = { adharNo, name, phoneNumber, role };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedFields.password = await bcrypt.hash(password, salt);
        }

        const employee = await Employee.findOneAndUpdate(
            { email },
            updatedFields,
            { new: true }
        ).select('-password');

        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        res.json(employee);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
    const { email } = req.params;

    try {
        const employee = await Employee.findOneAndRemove({ email });

        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        res.json({ msg: 'Employee removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');

        employee.resetPasswordToken = token;
        employee.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await employee.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            to: email,
            from: process.env.EMAIL_USER,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://${req.headers.host}/reset-password/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).json({ msg: 'Error sending email' });
            }
            res.json({ msg: 'Email sent successfully' });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Reset password
exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const employee = await Employee.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!employee) {
            return res.status(400).json({ msg: 'Password reset token is invalid or has expired' });
        }

        const salt = await bcrypt.genSalt(10);
        employee.password = await bcrypt.hash(password, salt);
        employee.resetPasswordToken = undefined;
        employee.resetPasswordExpires = undefined;
        await employee.save();

        res.json({ msg: 'Password has been reset' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
