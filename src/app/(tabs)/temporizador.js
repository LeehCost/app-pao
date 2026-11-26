import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Vibration, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../styles/app.styles";

export default function Temporizador() {
  const [nomeFornada, setNomeFornada] = useState("");
  const [minutos, setMinutos] = useState(""); //guarda os minutos digitados
  const [segundos, setSegundos] = useState("");
  const [timers, setTimers] = useState([]);

  useEffect(() => { //monitora o cronometro a cada seg quando estiver ativo
    const intervalo = setInterval(() => { //criação do relogio que roda a cada milissegundo
      setTimers((listaAtual) =>
        listaAtual.map((item) => {
          if (item.ativo && item.restante > 1) { //se estiver ligado e ainda faltar tempo
            return { ...item, restante: item.restante - 1 }; //decrementa um segundo da contagem
          } else if (item.ativo && item.restante === 1) { //quando chegar a zero
            Vibration.vibrate([500, 500, 500, 500, 500, 500]); //vibra em pulsos
            Alert.alert("Aviso!", `Tempo esgotado: ${item.nome} está pronto!`);
            return { ...item, restante: 0, ativo: false }; //desliga o cronometro
          }
          return item;
        })
      );
    }, 1000);

    return () => clearInterval(intervalo); //limpa o relogio da memoria para evitar travamentos
  }, []);

  function adicionarTimer() { //quando for clicado iniciar
    const min = parseFloat(minutos.replace(",", ".")) || 0;
    const seg = parseInt(segundos) || 0; //conversao do texto digitado para int
    const totalSegundos = Math.round(min * 60 + seg);

    if (totalSegundos <= 0) { //verificação se é maior que zero
      Alert.alert("Aviso!", "Informe os minutos ou segundos!");
      return;
    }

    const novoTimer = {
      id: Date.now().toString(),
      nome: nomeFornada.trim() || "Fornada #" + (timers.length + 1),
      restante: totalSegundos,
      ativo: true, //inicia a contagem
    };

    setTimers([novoTimer, ...timers]);
    setNomeFornada("");
    setMinutos("");
    setSegundos("");
  }

  function alternarPausa(id) {
    Vibration.cancel(); //para a vibração
    setTimers(
      timers.map((t) => (t.id === id && t.restante > 0 ? { ...t, ativo: !t.ativo } : t)) //pausa
    );
  }

  function removerTimer(id) {
    Vibration.cancel(); //para a vibração
    setTimers(timers.filter((t) => t.id !== id));
  }

  function formatarTempo(total) { //transformação dos segundos totais no formato de relogio
    const m = Math.floor(total / 60); //calculo min
    const s = total % 60; //resto segundos
    const minFormatado = m < 10 ? "0" + m : m; //add um zero a esquerda se for menor que 10
    const segFormatado = s < 10 ? "0" + s : s; //add um zero nos segs
    return `${minFormatado}:${segFormatado}`; //retorna um texto pro visor
  }

  return ( //cabeçalho arredondado em cima
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <View>
          <Text style={styles.headerTitulo}>Fornos & Temporizador</Text>
          <Text style={styles.headerSubtitulo}>Controle várias fornadas ao mesmo tempo</Text>
        </View>
        <MaterialIcons name="timer" size={34} color="#C67C4E" />
      </View>

      <TextInput
        placeholder="Nome da fornada (ex: Pão Francês)"
        value={nomeFornada}
        onChangeText={setNomeFornada}
        style={styles.input}
      />

      <View style={{ flexDirection: "row" }}>
        <TextInput
          placeholder="Minutos (ex: 0.5 ou 15)"
          value={minutos}
          onChangeText={setMinutos}
          keyboardType="numeric"
          style={[styles.input, { flex: 1, marginRight: 6 }]}
        />
        <TextInput
          placeholder="Segundos (ex: 10)"
          value={segundos}
          onChangeText={setSegundos}
          keyboardType="numeric"
          style={[styles.input, { flex: 1, marginLeft: 6 }]}
        />
      </View>

      <TouchableOpacity onPress={adicionarTimer} style={styles.botao}>
        <Text style={styles.textoBotao}>Iniciar Novo Temporizador</Text>
      </TouchableOpacity>

      <FlatList
        data={timers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitulo}>{item.nome}</Text>
              <Text style={{ fontSize: 28, fontWeight: "bold", color: "#C67C4E", marginTop: 4 }}>
                {formatarTempo(item.restante)}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity onPress={() => alternarPausa(item.id)} style={{ marginRight: 15 }}>
                <MaterialIcons
                  name={item.ativo ? "pause-circle-filled" : "play-circle-filled"}
                  size={36}
                  color="#2F2D2C"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => removerTimer(item.id)}>
                <MaterialIcons name="delete" size={30} color="#A52A2A" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
