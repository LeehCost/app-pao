import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { styles } from "../../styles/app.styles";

export default function Tarefas() {
  const [tarefa, setTarefa] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [listaTarefas, setListaTarefas] = useState([]);

  async function buscarTarefas() {
    const dados = await getDocs(collection(db, "tarefas"));
    const itens = dados.docs.map((item) => ({
      id: item.id,
      tarefa: item.data().tarefa,
      responsavel: item.data().responsavel,
      concluida: item.data().concluida,
    }));
    setListaTarefas(itens);
  }

  useEffect(() => {
    buscarTarefas();
  }, []);

  async function adicionarTarefa() {
    if (tarefa === "" || responsavel === "") {
      Alert.alert("Aviso!", "Preencha a tarefa e o responsável!");
      return;
    }

    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefa,
      responsavel: responsavel,
      concluida: false,
    });

    setTarefa("");
    setResponsavel("");
    buscarTarefas();
  }

  async function marcarConcluida(item) {
    await updateDoc(doc(db, "tarefas", item.id), {
      concluida: !item.concluida,
    });
    buscarTarefas();
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <View>
          <Text style={styles.headerTitulo}>Tarefas do Turno</Text>
          <Text style={styles.headerSubtitulo}>Toque para marcar como feita</Text>
        </View>
        <MaterialIcons name="checklist" size={34} color="#C67C4E" />
      </View>

      <TextInput
        placeholder="Digite a tarefa"
        value={tarefa}
        onChangeText={setTarefa}
        style={styles.input}
      />

      <TextInput
        placeholder="Nome do funcionário"
        value={responsavel}
        onChangeText={setResponsavel}
        style={styles.input}
      />

      <TouchableOpacity onPress={adicionarTarefa} style={styles.botao}>
        <Text style={styles.textoBotao}>Salvar Tarefa</Text>
      </TouchableOpacity>

      <FlatList
        data={listaTarefas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => marcarConcluida(item)} style={styles.card}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: item.concluida ? "#999" : "#2F2D2C",
                  textDecorationLine: item.concluida ? "line-through" : "none",
                }}
              >
                {item.tarefa}
              </Text>
              <Text style={styles.cardTexto}>Responsável: {item.responsavel}</Text>
            </View>

            <MaterialIcons
              name={item.concluida ? "check-box" : "check-box-outline-blank"}
              size={26}
              color={item.concluida ? "#2E7D32" : "#C67C4E"}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
