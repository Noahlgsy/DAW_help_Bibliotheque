import './style.css'
import type { Book, Gender } from './type';


window.addEventListener("load", (event) => {
  get_book();
  button_add_Book();
  button_search_Book();
  get_Gender();
  add_gender_button()
})

function button_add_Book() {
  const button_add = document.getElementById("addBook"); // ← id sans espace, à aligner sur ton HTML
  button_add?.addEventListener("click", () => {
    const title = (document.getElementById("Rentrer_titre") as HTMLInputElement).value;
    const author = (document.getElementById("Rentrer_author") as HTMLInputElement).value;
    const year = Number((document.getElementById("Rentrer_year") as HTMLInputElement).value);
    const synopsis = (document.getElementById("Rentrer_synopsis") as HTMLInputElement).value;
    const gender_id = Number((document.getElementById("select_genre") as HTMLSelectElement).value);

    add_Book(title, author, year, synopsis, gender_id);
  });
}

async function add_Book(title: string, author: string, year: number, synopsis: string, gender_id: number) {
  const response = await fetch("http://localhost:8080/Books", {   // ← 8080 !
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, author, year, synopsis, gender_id })
  });
  if (response.ok) {
    get_book();
  }
}

async function get_book() {
  const response = await fetch("http://localhost:8080/Books");      // ← 8080 + même URL que le POST
  if (response.ok) {
    const books = await response.json() as Book[];
    display(books);
  }
}

function display(items: Book[]) {
  const conteneur = document.getElementById("Books");
  if (conteneur === null) return;
  conteneur.innerHTML = "";
  for (const it of items) {
    const p = document.createElement("p");
    p.textContent = `Title: ${it.title}, Author: ${it.author}, Year of parution: ${it.year}, Synopsis: ${it.synopsis},Gender: ${it.genre}`;
    conteneur.appendChild(p);
  }
}

async function search_Book(seek: string) {
  const response = await fetch(`http://localhost:8080/Books/search?q=${encodeURIComponent(seek)}`);
  if (response.ok) {
    const data = await response.json() as Book[];
    display(data);
  }
}
function button_search_Book() {
  const button_search = document.getElementById("search")
  button_search?.addEventListener("click", (event) => {
    const book_search = (document.getElementById("Enter_book") as HTMLInputElement).value;
    search_Book(book_search);
  });
}

async function get_Gender() {
  const response = await fetch("http://localhost:8080/Genders");
  if (response.ok) {
    const data = await response.json() as Gender[];
    display_gender(data);
  }
}

function display_gender(gender: Gender[]) {
  const select = document.getElementById("select_genre") as HTMLSelectElement;
  select.innerHTML = "";

  for (const g of gender) {
    const option = document.createElement("option");
    option.value = String(g.id);
    option.textContent = g.name;
    select.appendChild(option);
  }
}

async function add_gender(name: string) {
  const response = await fetch("http://localhost:8080/Genders",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    }
  );
  if (response.ok) {
    get_Gender();
  }
}

function add_gender_button() {
  const button_add_gender = document.getElementById("add_Gender");
  button_add_gender?.addEventListener("click", (event) => {
    const gender_name = (document.getElementById("Enter_gender") as HTMLInputElement).value; //pas de parena value
    add_gender(gender_name);
  })
}


