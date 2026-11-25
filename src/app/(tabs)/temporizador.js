import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Vibration, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
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
      Alert.alert("Aviso!", "Tempo esgotado! Os pães estão prontos no forno!");
    }

    return () => clearInterval(intervalo);
  }, [ativo, segundosRestantes]);

  function iniciarTemporizador() {
    const minutos = parseInt(minutosDigitados);
    if (!minutos || minutos <= 0) {
      Alert.alert("Aviso!", "Digite um tempo válido em minutos!");
      return;
    }
    setSegundosRestantes(minutos * 60);
    setAtivo(true);
  }

  function testarAlertaRapido() {
    setSegundosRestantes(5);
    setAtivo(true);
  }

  function pararTemporizador() {
    setAtivo(false);
    setSegundosRestantes(0);
    Vibration.cancel();
  }

  function formatarTempo() {
    const minutos = Math.floor(segundosRestantes / 60);
    const segundos = segundosRestantes % 60;
    const minFormatado = minutos < 10 ? "0" + minutos : minutos;
    const segFormatado = segundos < 10 ? "0" + segundos : segundos;
    return `${minFormatado}:${segFormatado}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <View>
          <Text style={styles.headerTitulo}>Temporizador do Forno</Text>
          <Text style={styles.headerSubtitulo}>Alerta sonoro e vibração</Text>
        </View>
        <MaterialIcons name="timer" size={34} color="#C67C4E" />
      </View>

      <View style={[styles.card, { justifyContent: "center", paddingVertical: 25 }]}>
        <Text style={{ fontSize: 52, fontWeight: "bold", color: "#2F2D2C" }}>
          {formatarTempo()}
        </Text>
      </View>

      <TextInput
        placeholder="Tempo em minutos (ex: 15)"
        value={minutosDigitados}
        onChangeText={setMinutosDigitados}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity onPress={iniciarTemporizador} style={styles.botao}>
        <Text style={styles.textoBotao}>Iniciar Forno</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={testarAlertaRapido} style={styles.botaoSecundario}>
        <Text style={styles.textoBotao}>Teste Rápido (5 segundos)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={pararTemporizador}
        style={[styles.botaoSecundario, { backgroundColor: "#A52A2A" }]}
      >
        <Text style={styles.textoBotao}>Zerar / Parar</Text>
      </TouchableOpacity>
    </View>
  );
}
