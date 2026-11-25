import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Perfil() {
  const router = useRouter();
  const ambienteAtual = process.env.EXPO_PUBLIC_AMBIENTE || "DEV";

  const sairDoApp = () => {
    router.replace("/login");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#F5F5F5",
      }}
    >
      <MaterialIcons name="account-circle" size={100} color="#8B4513" />

      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333", marginTop: 10 }}>
        Equipe Pão Doca
      </Text>

      <Text style={{ fontSize: 16, color: "#666", marginBottom: 30 }}>
        Padaria & Confeitaria Artesanal
      </Text>

      <View
        style={{
          width: "100%",
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#ddd",
          marginBottom: 30,
        }}
      >
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          <Text style={{ fontWeight: "bold" }}>Unidade: </Text>Matriz
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          <Text style={{ fontWeight: "bold" }}>Turno: </Text>Manhã / Tarde
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 8 }}>
          <Text style={{ fontWeight: "bold" }}>Status: </Text>Conectado ao Servidor
        </Text>
        <Text style={{ fontSize: 16 }}>
          <Text style={{ fontWeight: "bold" }}>Ambiente: </Text>{ambienteAtual}
        </Text>
      </View>

      <TouchableOpacity
        onPress={sairDoApp}
        style={{
          backgroundColor: "#A52A2A",
          padding: 14,
          borderRadius: 8,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Sair da Conta
        </Text>
      </TouchableOpacity>
    </View>
  );
}
