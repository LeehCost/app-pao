import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { tabScreenOptions } from "../../styles/tabs.styles.js";

export default function TabLayout() {
  return (
    <Tabs screenOptions={tabScreenOptions}>
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
