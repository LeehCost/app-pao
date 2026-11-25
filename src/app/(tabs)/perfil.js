import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../styles/app.styles";

export default function Perfil() {
  const router = useRouter();

  function sairDoApp() {
    router.replace("/login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <View>
          <Text style={styles.headerTitulo}>Equipe Pão Doca</Text>
          <Text style={styles.headerSubtitulo}>Padaria & Confeitaria</Text>
        </View>
        <MaterialIcons name="person" size={34} color="#C67C4E" />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Unidade</Text>
        <Text style={styles.cardTexto}>Matriz - Rio de Janeiro</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Status do Servidor</Text>
        <Text style={styles.cardTexto}>Conectado (Firebase)</Text>
      </View>

      <TouchableOpacity
        onPress={sairDoApp}
        style={[styles.botaoSecundario, { marginTop: 15 }]}
      >
        <Text style={styles.textoBotao}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}
