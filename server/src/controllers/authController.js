import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Registers a new user.
 */
export async function register(req, res) {
  try {
    const { username, password, gradeLevel } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const trimmedUsername = username.trim().toLowerCase();

    // Validate username characters (alphanumeric & underscore only)
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(trimmedUsername)) {
      return res.status(400).json({ error: 'Username must be 3-30 characters long and contain only letters, numbers, or underscores.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username: trimmedUsername });
    if (existingUser) {
      return res.status(400).json({ error: 'Username is already taken.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      username: trimmedUsername,
      password: hashedPassword,
      gradeLevel: gradeLevel || 'middle'
    });

    await newUser.save();

    // Sign JWT
    const secret = process.env.JWT_SECRET || 'promptwriter_secret_key_8e59d9c2_2026';
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username, gradeLevel: newUser.gradeLevel },
      secret,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        gradeLevel: newUser.gradeLevel
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration.' });
  }
}

/**
 * Logs in an existing user.
 */
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const trimmedUsername = username.trim().toLowerCase();

    // Find user
    const user = await User.findOne({ username: trimmedUsername });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password.' });
    }

    // Sign JWT
    const secret = process.env.JWT_SECRET || 'promptwriter_secret_key_8e59d9c2_2026';
    const token = jwt.sign(
      { id: user._id, username: user.username, gradeLevel: user.gradeLevel },
      secret,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        gradeLevel: user.gradeLevel
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login.' });
  }
}
