import axios from "axios"; //biblioteca que simula requisições
import { Usuario } from "../src/model/Usuario"; //importa a classe usuario, na qual será testada
import { criptografarSenha } from "../src/utils/crypto"; //função de criptografia que será testada

jest.mock("axios"); //cria um servidor fake(mock) do axios para teste rodar offline

test("Teste 1: Retornando os usuários via Axios...", () => { //inicia o primeiro teste
  const usuario = new Usuario("Letícia", "leticia@paodoca.com"); //criação usuario fake
  const usuariosJSON = [JSON.stringify(usuario)]; //converte o user para texto json
  const resp = { data: usuariosJSON }; //resposta simulada do servidor

  axios.get.mockImplementation((url) => {
    if (url === "https://servidor/Usuarios") {
      return Promise.resolve(resp);
    } else {
      return Promise.resolve(null);
    }
  });

  return Usuario.all().then((data) => expect(data).toEqual([usuario]));  //invoca o usuario.all e confere se o resultado bate com o user que foi criado
});

test("Teste 2: Deve criptografar a senha usando Base64", () => { //iniciacao teste
  const senhaOriginal = "1234"; //senha teste
  const senhaCriptografada = criptografarSenha(senhaOriginal); //passando a senha para função do crypto.js
  expect(senhaCriptografada).toBe("MTIzNA=="); //confere se é 1234 mesmo
});
// jest mock - cria um servidor falso, finge que acessou a url servidor/usuarios e recebeu um json com um user falso, no expect ele verifica a classe usuario.all sabe ler esse json falso e transformar de volta em um objeto usuario procedente.
// teste de criptografia envia a senha 1234 para a função criptografar senha do arq crypto.js, no expect ele verifica se o resultado é exatamente eo 1234 em base 64, se mexer na criptografia e estraga ele falha na hora
