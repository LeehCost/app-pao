import base64 from "react-native-base64";

export function criptografarSenha(senha) {
  if (!senha) return "";
  return base64.encode(senha);
}
