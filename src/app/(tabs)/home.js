import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/app.styles";

export default function Home() {
  const [aviso, setAviso] = useState("");

  async function salvarAviso() {
    if (aviso === "") {
      Alert.alert("Pão Doca", "Escreva um aviso antes de salvar!");
      return;
    }
    await AsyncStorage.setItem("recado_turno", aviso);
    Alert.alert("Pão Doca", "Recado salvo no celular!");
    setAviso("");
  }

  async function lerAviso() {
    const valorSalvo = await AsyncStorage.getItem("recado_turno");
    if (valorSalvo !== null) {
      Alert.alert("Último Aviso", valorSalvo);
    } else {
      Alert.alert("Pão Doca", "Nenhum recado salvo ainda.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <View>
          <Text style={styles.headerTitulo}>Painel Inicial</Text>
          <Text style={styles.headerSubtitulo}>Quadro de avisos do turno</Text>
        </View>
        <MaterialIcons name="storefront" size={34} color="#C67C4E" />
      </View>

      <TextInput
        placeholder="Digite um aviso para a equipe..."
        value={aviso}
        onChangeText={setAviso}
        style={styles.input}
      />

      <TouchableOpacity onPress={salvarAviso} style={styles.botao}>
        <Text style={styles.textoBotao}>Salvar Aviso</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={lerAviso} style={styles.botaoSecundario}>
        <Text style={styles.textoBotao}>Ver Último Aviso</Text>
      </TouchableOpacity>
    </View>
  );
}
