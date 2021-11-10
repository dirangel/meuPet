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
  console.log("data: ", data);

  if (data.token) {
    const session = {
      email: email,
      token: data.token,
    };
    localStorage.setItem("session-login", JSON.stringify(session));
  }

  return data.token;
}

// login("tobias.funke@reqres.in", "123456");

/**
 * Retorna usuário armazenado no local storage
 * @returns JSON
 */
export function usuarioLogado() {
  const session = localStorage.getItem("session-login");

  return JSON.parse(session);
}

/**
 * Retorna token do usuário logado
 */
export function token() {
  const session = usuarioLogado();
  return session.token;
}

/**
 * Remove os dados de sessão do usuário
 */
export function logout() {
  localStorage.removeItem("session-login");
}
