CREATE DATABASE node_tiers;
USE node_tiers;

CREATE TABLE dummy_write (
    value TEXT,
    value_time DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dummy_read (
    value TEXT,
    value_time DATETIME DEFAULT CURRENT_TIMESTAMP
);