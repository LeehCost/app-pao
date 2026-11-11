import { Tabs } from "expo-router"; //importação para a naveg em abas
import { MaterialIcons } from "@expo/vector-icons"; //icones prontos, facilitou mucho ps: baixar bibliotecas
import { tabScreenOptions } from "../../styles/tabs.styles"; //importando as config visuais das abas

export default function TabLayout() { //definindo o componente de lyt em abas
  return (
    <Tabs
      screenOptions={tabScreenOptions} //colocando as config de todas as abas, no caso as confi visuais
    >
      <Tabs.Screen
        name="home" //liga a aba ao arq home
        options={{ //coloca as config dessa aba, titulo, texto/legenda
          title: "Início",
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} /> //desenho do icone e tudo automatizado especificado na ultima linha
          ),
        }}
      />
      <Tabs.Screen
        name="estoque"
        options={{
          title: "Estoque",
          tabBarLabel: "Estoque",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="inventory" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pedidos"
        options={{
          title: "Pedidos",
          tabBarLabel: "Pedidos",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="receipt" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
