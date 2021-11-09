import axios from "axios";

/**
 * Envia credenciais de login e retorna um token
 * @param string email
 * @param string senha
 * @returns string
 */
export async function login(email, senha) {
  const login = {
    email: email,
    password: senha,
  };

  const { data } = await axios.post("https://reqres.in/api/login", login);

  return data.token;
}

// login("tobias.funke@reqres.in", "123456");

export function usuarioLogado() {}

export function token() {}

export function logout() {}
