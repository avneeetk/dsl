// api/user_verify.js
import { mockUsers } from '../mockData.json';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, password } = req.body;

    const user = mockUsers.find(u => u.username === userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User ID not found' });
    }

    if (user.password === password) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
