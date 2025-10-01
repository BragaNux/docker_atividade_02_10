import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes.js';
import { healthDB } from './db.js';


dotenv.config();


const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api', router);


const port = process.env.API_PORT || 3000;
app.get('/', (req, res) => res.send('Film Catalog API'));


// Liveness/Readiness for Docker healthcheck
app.get('/healthz', async (req, res) => {
try {
const ok = await healthDB();
if (ok) return res.status(200).send('OK');
return res.status(500).send('DB NOK');
} catch (e) {
return res.status(500).send('ERR');
}
});


app.listen(port, () => console.log(`API listening on :${port}`));