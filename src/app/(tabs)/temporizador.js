import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Vibration, Alert } from "react-native";
import { styles } from "../../styles/app.styles";


export default function Temporizador() {
  const [minutosDigitados, setMinutosDigitados] = useState("");
  const [segundosRestantes, setSegundosRestantes] = useState(0);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    let intervalo = null;

    if (ativo && segundosRestantes > 0) {
      intervalo = setInterval(() => {
        setSegundosRestantes((tempoAnterior) => tempoAnterior - 1);
      }, 1000);
    } else if (ativo && segundosRestantes === 0) {
      setAtivo(false);
      Vibration.vibrate([500, 500, 500, 500]);
      Alert.alert("Tempo Esgotado!", "Os pães estão prontos no forno!");
    }

    return () => clearInterval(intervalo);
  }, [ativo, segundosRestantes]);

  const iniciarTemporizador = () => {
    const minutos = parseInt(minutosDigitados);
    if (!minutos || minutos <= 0) {
      alert("Digite um tempo válido em minutos!");
      return;
    }
    setSegundosRestantes(minutos * 60);
    setAtivo(true);
  };

  const testarAlertaRapido = () => {
    setSegundosRestantes(5);
    setAtivo(true);
  };

  const pararTemporizador = () => {
    setAtivo(false);
    setSegundosRestantes(0);
    Vibration.cancel();
  };

  const formatarTempo = () => {
    const minutos = Math.floor(segundosRestantes / 60);
    const segundos = segundosRestantes % 60;
    const minFormatado = minutos < 10 ? "0" + minutos : minutos;
    const segFormatado = segundos < 10 ? "0" + segundos : segundos;
    return `${minFormatado}:${segFormatado}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temporizador do Forno</Text>
      <Text style={styles.subtitle}>Defina o tempo para assar</Text>

      <Text
        style={{
          fontSize: 54,
          fontWeight: "bold",
          marginVertical: 30,
          color: "#8B4513",
        }}
      >
        {formatarTempo()}
      </Text>

      <TextInput
        placeholder="Tempo em minutos (ex: 15)"
        value={minutosDigitados}
        onChangeText={setMinutosDigitados}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          width: "100%",
          backgroundColor: "#fff",
          marginBottom: 15,
        }}
      />

      <TouchableOpacity
        onPress={iniciarTemporizador}
        style={{
          backgroundColor: "#8B4513",
          padding: 14,
          borderRadius: 8,
          width: "100%",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Iniciar Forno</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={testarAlertaRapido}
        style={{
          backgroundColor: "#D2691E",
          padding: 12,
          borderRadius: 8,
          width: "100%",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Teste Rápido (5 segundos)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={pararTemporizador}
        style={{
          backgroundColor: "#A52A2A",
          padding: 12,
          borderRadius: 8,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Zerar / Parar</Text>
      </TouchableOpacity>
    </View>
  );
}
