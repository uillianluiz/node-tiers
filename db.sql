CREATE DATABASE IF NOT EXISTS node_tiers;
USE node_tiers;

DROP TABLE IF EXISTS dummy_write;

CREATE TABLE dummy_write (
    value TEXT,
    value_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dummy_read (
    value TEXT,
    value_time DATETIME DEFAULT CURRENT_TIMESTAMP
);