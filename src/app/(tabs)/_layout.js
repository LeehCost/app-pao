import { Tabs } from "expo-router"; //componente de criação de uma barra de navegação inferior
import { MaterialIcons } from "@expo/vector-icons"; //biblioteca de ícones prontos, ps: bem útil
import { useSafeAreaInsets } from "react-native-safe-area-context"; //para medir a área da tela (estava sobrepondo os botoes do celular, e isso faz com que ele fique acima disso)

export default function TabLayout() {
  const insets = useSafeAreaInsets(); // utilizada para pegar o tamanho da barra de botoes do sistema

  return (
    <Tabs
      screenOptions={{
        headerShown: false, //esconde o cabeçalho padrão
        tabBarActiveTintColor: "#C67C4E", //active: icone e texto selecionados / inative: os que nao estão
        tabBarInactiveTintColor: "#9E8E82",
        tabBarStyle: {
          backgroundColor: "#FFFFFF", 
          borderTopColor: "#E5D5C5", //cor da linha fina do topo
          height: 60 + insets.bottom, // ajuste da altura da barra e soma o espaço com os botoes do celular          paddingBottom: 8 + insets.bottom,
          paddingTop: 6, //esse padding é o espaçamento superior da barra
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Início",
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="producao"
        options={{
          title: "Produção",
          tabBarLabel: "Produção",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bakery-dining" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="temporizador"
        options={{
          title: "Temporizador",
          tabBarLabel: "Forno",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="timer" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="tarefas"
        options={{
          title: "Tarefas",
          tabBarLabel: "Tarefas",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="checklist" size={size} color={color} />
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
