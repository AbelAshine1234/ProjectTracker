import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Project Tracker Backend is running' });
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
