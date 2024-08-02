// api/check_dsl.js
import { mockDSLNumbers } from '../mockData.json';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { dslNumber } = req.body;

    const entry = mockDSLNumbers.find(item => item.dsl_number === dslNumber);

    if (entry) {
      res.status(200).json({ dslNumber, platform: entry.platform });
    } else {
      res.status(404).json({ message: 'DSL number not found' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
