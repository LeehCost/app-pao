import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Vibration, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../styles/app.styles";

export default function Temporizador() {
  const [minutosDigitados, setMinutosDigitados] = useState(""); //guarda os minutos digitados
  const [segundosRestantes, setSegundosRestantes] = useState(0); //guarda o tempo total da contagem em segundos
  const [ativo, setAtivo] = useState(false); //controle do cronometro se esta rodando ou parado /true ou false

  useEffect(() => { //monitora o cronometro a cada seg quando estiver ativo
    let intervalo = null;

    if (ativo && segundosRestantes > 0) { //se estiver ligado e ainda faltar tempo
      intervalo = setInterval(() => { //criação do relogio que roda a cada milissegundo
        setSegundosRestantes((tempoAnterior) => tempoAnterior - 1); //decrementa um segundo da contagem
      }, 1000);
    } else if (ativo && segundosRestantes === 0) { //quando chegar a zero
      setAtivo(false); //desliga o cronometro
      Vibration.vibrate([500, 500, 500, 500]); //vibra em pulsos
      Alert.alert("Aviso!", "Tempo esgotado!");
    }

    return () => clearInterval(intervalo); //limpa o relogio da memoria para evitar travamentos
  }, [ativo, segundosRestantes]);

  function iniciarTemporizador() { //quando for clicado iniciar 
    const minutos = parseInt(minutosDigitados); //conversao do texto digitado para int
    if (!minutos || minutos <= 0) { //verificação se é maior que zero
      Alert.alert("Aviso!", "Digite um tempo válido em minutos!");
      return;
    }
    setSegundosRestantes(minutos * 60); //minutos pra seg
    setAtivo(true); //inicia a contagem
  }

  function testarAlertaRapido() { //teste
    setSegundosRestantes(5);
    setAtivo(true);
  }

  function pararTemporizador() {
    setAtivo(false); //pausa
    setSegundosRestantes(0); //zera
    Vibration.cancel(); //para a vibração
  }

  function formatarTempo() { //transformação dos segundos totais no formato de relogio
    const minutos = Math.floor(segundosRestantes / 60); //calculo min
    const segundos = segundosRestantes % 60; //resto segundos
    const minFormatado = minutos < 10 ? "0" + minutos : minutos; //add um zero a esquerda se for menor que 10
    const segFormatado = segundos < 10 ? "0" + segundos : segundos;  //add um zero nos segs
    return `${minFormatado}:${segFormatado}`;//retorna um texto pro visor
  }

  return ( //cabeçalho arredondado em cima
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
