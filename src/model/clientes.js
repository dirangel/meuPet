import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  setDoc,
} from "firebase/firestore";

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

const db = getFirestore(app);

// const API_URL = "https://reques.in/api/users";

export async function listar() {
  const col = collection(db, "clientes");
  const docs = await getDocs(col);

  const clientes = docs.docs.map(function (item) {
    let dados = item.data();
    dados.id = item.id;
    return dados;
  });

  return clientes;
}

/**
 * deleta um cliente no firebase
 * @param string id
 * @returns
 */
export async function deletar(id) {
  const cliente = doc(db, "clientes", id);

  const retorno = await deleteDoc(cliente);

  return retorno;
}

/**
 * Altera um registro no bd
 * @param string id
 * @param JSON dados
 * @returns JSON com objeto do BD
 */
export async function editar(id, dados) {
  const cliente = doc(db, "clientes", id);

  const novo = await setDoc(cliente, dados);

  return novo;
}

/**
 * Add um cliente
 * @param JSON dados
 * @returns JSON com objeto do BD
 */
export async function criar(dados) {
  const col = collection(db, "clientes");

  const cliente = await addDoc(col, dados);

  return cliente;
}
