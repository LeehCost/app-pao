import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../styles/app.styles";

export default function Home() {
  const [valorSalvar, setValorSalvar] = useState("");

  const _storeData = async (valorParaSalvar) => {
    try {
      await AsyncStorage.setItem("recado_turno", valorParaSalvar);
      alert("Recado salvo no celular!");
      setValorSalvar("");
    } catch (error) {
      alert(error);
    }
  };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("recado_turno");
      if (value !== null) {
        alert("Recado salvo: " + value);
      } else {
        alert("Nenhum recado salvo ainda.");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel Inicial - Pão Doca</Text>
      <Text style={styles.subtitle}>Quadro de Avisos Offline</Text>

      <TextInput
        placeholder="Digite um aviso do turno"
        value={valorSalvar}
        onChangeText={setValorSalvar}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          width: "100%",
          backgroundColor: "#fff",
          marginTop: 20,
          marginBottom: 15,
        }}
      />

      <View style={{ width: "100%", marginBottom: 10 }}>
        <Button
          onPress={() => _storeData(valorSalvar)}
          title="Registrar Aviso"
          color="#8B4513"
        />
      </View>

      <View style={{ width: "100%" }}>
        <Button
          onPress={_retrieveData}
          title="Ler Último Aviso"
          color="#D2691E"
        />
      </View>
    </View>
  );
}
