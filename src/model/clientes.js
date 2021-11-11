import axios from "axios";
import { token } from "./login";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCy8nw9cQK9904JXu3pl7pEgPoE6iAIg_k",
  authDomain: "meupet-86503.firebaseapp.com",
  projectId: "meupet-86503",
  storageBucket: "meupet-86503.appspot.com",
  messagingSenderId: "968261010",
  appId: "1:968261010:web:8419ba5b518c70a3c4d54b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const API_URL = "https://reques.in/api/users";

export async function listar() {
  let page = 1;
  let total_pages = null;
  let dados = [];

  const Token = token();
  const config = {
    headers: { authorization: Token },
  };

  do {
    const { data } = await axios.get(API_URL + "?page" + page, config);

    total_pages = data.total_pages;

    dados = dados.concat(data.data);
    page++;
  } while (total_pages >= page);

  return dados;
}

export function deletar() {}

export function editar() {}

export function criar() {}
