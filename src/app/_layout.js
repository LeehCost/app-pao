import { Stack } from "expo-router";
//definindo o lyt do app todo, literalmente raiz,/config de todas as telas, nesse caso, nao mostrar o header em nenhuma tela(false
    //definindo a tela de login, nome do arquivo, //definindo a tela de abas, nome do arquivo
export default function RootLayout() { 
  return (
    <Stack screenOptions={{ headerShown: false }}> 
      <Stack.Screen name="login" /> 
      <Stack.Screen name="(tabs)" /> 
    </Stack>
  );
}
