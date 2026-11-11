import { Redirect } from "expo-router"; //componente de redirecionamento

export default function Index() { //define o que vai aparecer primeiro de forma padrão no app
  return <Redirect href="/login" />; //vai direto pro login/direciona pra isso ae diretamente
}
