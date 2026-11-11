import { Tabs } from "expo-router"; //importação para a naveg em abas
import { MaterialIcons } from "@expo/vector-icons"; //icones prontos, facilitou mucho ps: baixar bibliotecas

export default function TabLayout() { //definindo o componente de lyt em abas
  return (
    <Tabs
      screenOptions={{ //colocando as config de todas as abas, caso as confi visuais
        headerShown: true, //p exibir uma barra coom o titulo em todos os topos nas telas
        tabBarActiveTintColor: "#B85C38", //esse comando define a cor do icone e do text qnd é selecionada
        tabBarInactiveTintColor: "#777777", //inverso cor qnd nao está selecionado
        tabBarStyle: { //estilo da barra, cor de fundo e espaçamento interno ebaa = barra inferior
          backgroundColor: "#FFF8EF",
          height: 60,
          paddingBottom: 6,
        },
      }}
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
