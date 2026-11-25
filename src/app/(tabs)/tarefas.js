import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { styles } from "../../styles/app.styles";

export default function Tarefas() {
  const [tarefa, setTarefa] = useState(""); //guarda o texto da tarefa digitada
  const [responsavel, setResponsavel] = useState(""); //guarda o nome do funcionario
  const [listaTarefas, setListaTarefas] = useState([]); //guarda a lista de tarefas do banco

  async function buscarTarefas() { //busca as tarefas salvas no firebase
    const dados = await getDocs(collection(db, "tarefas")); //mesma coisa, pega todos os itens da coleção
    const itens = dados.docs.map((item) => ({ //transforma cada document em um obj(mesma coisa)
      id: item.id,
      tarefa: item.data().tarefa,
      responsavel: item.data().responsavel,
      concluida: item.data().concluida,
    }));
    setListaTarefas(itens); //atualiza a lista na tela
  }

  useEffect(() => { //execução automatica assim que a tela for aberta
    buscarTarefas(); //carrega no banco
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
//limpeza
    setTarefa("");
    setResponsavel("");
    buscarTarefas();
  }


  async function marcarConcluida(item) { //checklist
    await updateDoc(doc(db, "tarefas", item.id), { //atualiza o doc pelo id no firebase
      concluida: !item.concluida, //inverte o stts(false pra true e vice-versa)
    });
    buscarTarefas(); //recarrega a lista pra atualizar o risco e o icone
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
