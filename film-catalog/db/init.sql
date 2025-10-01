CREATE TABLE IF NOT EXISTS movies (
id SERIAL PRIMARY KEY,
title TEXT NOT NULL,
director TEXT,
year INT
);


INSERT INTO movies (title, director, year) VALUES
('The Matrix', 'Lana & Lilly Wachowski', 1999),
('Inception', 'Christopher Nolan', 2010)
ON CONFLICT DO NOTHING;