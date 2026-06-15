import Sqlite3 from "better-sqlite3";

const db = Sqlite3("../database.db/app.sqlite"); //better-sqlite3 le crée automatiquement. meme s'ils n'existent pas

db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS Book(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT NOT NULL, 
    author TEXT NOT NULL, 
    year INTEGER NOT NULL, 
    synopsis TEXT NOT NUll, 
    gender_id INTEGER, 
    FOREIGN KEY (gender_id) REFERENCES Gender(id) 
  ); 

  CREATE TABLE IF NOT EXISTS Gender(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT NOT NULL );
  `)

export default db; 