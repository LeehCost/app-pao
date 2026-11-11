
import { View, Text } from "react-native"; //layout

export default function Home() {
  return (
    <View //estiliza a tela inteira
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#FFF8EF",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#8B4513",
          marginBottom: 10,
        }}
      >
        Pão Doca
      </Text>

      <Text
        style={{
          fontSize: 16,
          marginBottom: 25,
        }}
      >
        Sistema - Padaria
      </Text>

      <View
        style={{
          backgroundColor: "#F5E4D0",
          padding: 20,
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Controle de estoque
        </Text>

        <Text>
          consulta dos produtos
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#F5E4D0",
          padding: 20,
          borderRadius: 10,
          marginBottom: 15,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Pedidos
        </Text>

        <Text>
          pedidos aos fornecedores
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#F5E4D0",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Temporizador
        </Text>

        <Text>
          tempo dos troços
        </Text>
      </View>
    </View>
  );
}
