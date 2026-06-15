import Fastify from "fastify";
import cors from "@fastify/cors";


const fastify = Fastify();
fastify.register(cors);

import db from "./database.js"
import { Book, Gender } from "./type.js";


fastify.get("/Books", (request, reply) => {
  try {
    const query = db.prepare("SELECT Book.title, Book.author, Book.year, Book.synopsis, Gender.name AS genre FROM Book JOIN Gender ON Book.gender_id = Gender.id;"); 
    const result = query.all(); 
    reply.code(200).send(result);
  } catch (error) {
    console.log(error);
    reply.code(500).send();
  }
});
//Démarre le serveur Web qui écoutera sur le port 8080
fastify.listen({ port: 8080 });

fastify.post("/Books", (request, reply) => {
  try {
    const { title, author, year, synopsis, gender_id } = request.body as Book;
    const query = db.prepare("INSERT INTO Book (title, author, year, synopsis, gender_id ) VALUES (?, ?, ?, ?, ?);");
    const result = query.run(title, author, year, synopsis, gender_id);
    //const verif_id = result.lastInsertRowid;
    //const verif = db.prepare(SELECT ) //comment verif qu'un livre à été deja mis, par rapport à l'id ? 
    reply.code(200).send(result);
  } catch (error) {
    console.log(error);
    reply.code(500).send();
  }

});

fastify.get("/Books/search", (request, reply) => {
  try {
    const { q } = request.query as { q: string };
    const query = db.prepare("SELECT title, author, year, synopsis FROM Book WHERE author LIKE ? OR title LIKE ?");
    const result = query.all(`%${q}%`, `%${q}%`); //Une recherche qui ressemble ou commence par 
    reply.code(200).send(result);

  } catch (error) {
    console.log(error);
    reply.code(500).send();
  }
});

fastify.get("/Genders", (request, reply) => {
  try {
    const query = db.prepare("SELECT name FROM Gender ;");
    const result = query.all();
    reply.code(200).send(result);
  } catch (error) {
    console.log(error);
    reply.code(500).send();
  }
});

fastify.post("/Genders", (request, reply) => {
  try {
    const { name } = request.body as Gender;
    const query = db.prepare("INSERT INTO Gender (name) VALUES (?); ");
    const result = query.run(name);
    reply.code(200).send(result);
  } catch (error) {
    console.log(error);
    reply.code(500).send();
  }
});

/*fastify.post("/Books/Genders", (request, reply) => {
  try {
    const { name, title } = request.body as { name: string, title: string };
    const query = db.prepare("SELECT id FROM Gender WHERE name = ?;");
    const result = query.get(name); //dans result j'ai l'id du Gender associé 
    if (!result) {
      reply.code(400);
      return;
    }

    const query1 = db.prepare("UPDATE Book SET gender_id = ? WHERE title = ?");
    const result1 = query1.run(name, title);

    reply.code(200).send();

  } catch (error) {
    console.log("error");
    reply.code(500).send();
  }

}); */