import { Router } from 'express';
import { pool } from './db.js';


const router = Router();


// Health
router.get('/health', async (req, res) => {
try {
res.status(200).json({ status: 'ok', uptime: process.uptime() });
} catch (e) {
res.status(500).json({ status: 'error' });
}
});


// CRUD simples de filmes
router.get('/movies', async (req, res) => {
const { rows } = await pool.query('SELECT id, title, director, year FROM movies ORDER BY id');
res.json(rows);
});


router.get('/movies/:id', async (req, res) => {
const { id } = req.params;
const { rows } = await pool.query('SELECT id, title, director, year FROM movies WHERE id = $1', [id]);
if (!rows[0]) return res.status(404).json({ error: 'Not found' });
res.json(rows[0]);
});


router.post('/movies', async (req, res) => {
const { title, director, year } = req.body;
if (!title) return res.status(400).json({ error: 'title is required' });
const { rows } = await pool.query(
'INSERT INTO movies(title, director, year) VALUES($1,$2,$3) RETURNING id, title, director, year',
[title, director || null, year ? Number(year) : null]
);
res.status(201).json(rows[0]);
});


router.put('/movies/:id', async (req, res) => {
const { id } = req.params;
const { title, director, year } = req.body;
const { rows } = await pool.query(
'UPDATE movies SET title = COALESCE($1, title), director = COALESCE($2, director), year = COALESCE($3, year) WHERE id=$4 RETURNING id, title, director, year',
[title ?? null, director ?? null, year != null ? Number(year) : null, id]
);
if (!rows[0]) return res.status(404).json({ error: 'Not found' });
res.json(rows[0]);
});


router.delete('/movies/:id', async (req, res) => {
const { id } = req.params;
const { rowCount } = await pool.query('DELETE FROM movies WHERE id = $1', [id]);
if (!rowCount) return res.status(404).json({ error: 'Not found' });
res.status(204).send();
});


export default router;