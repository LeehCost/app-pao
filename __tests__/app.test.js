import axios from "axios";
import { Usuario } from "../src/model/Usuario";
import { criptografarSenha } from "../src/utils/crypto";

jest.mock("axios");

test("Teste 1: Retornando os usuários via Axios...", () => {
  const usuario = new Usuario("gerente", "gerente@paodoca.com");
  const usuariosJSON = [JSON.stringify(usuario)];
  const resp = { data: usuariosJSON };

  axios.get.mockImplementation((url) => {
    if (url === "https://servidor/Usuarios") {
      return Promise.resolve(resp);
    } else {
      return Promise.resolve(null);
    }
  });

  return Usuario.all().then((data) => expect(data).toEqual([usuario]));
});

test("Teste 2: Deve criptografar a senha usando Base64", () => {
  const senhaOriginal = "1234";
  const senhaCriptografada = criptografarSenha(senhaOriginal);
  expect(senhaCriptografada).toBe("MTIzNA==");
});
