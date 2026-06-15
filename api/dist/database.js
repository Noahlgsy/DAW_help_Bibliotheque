"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const db = (0, better_sqlite3_1.default)("../database.db/app.sqlite"); //better-sqlite3 le crée automatiquement. meme s'ils n'existent pas
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
  `);
exports.default = db;
