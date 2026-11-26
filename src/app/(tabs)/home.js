import React, { useState, useCallback } from "react"; //importação react e o hook usestate para guardar dados na tela
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native"; //componentes visuais e a caixinha de aviso
import { useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; //biblioteca de icones
import AsyncStorage from "@react-native-async-storage/async-storage"; //armazenamento local do celular
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { styles } from "../../styles/app.styles"; //importa o arq unico de estios

export default function Home() {
  const [nomeUsuario, setNomeUsuario] = useState("Equipe");
  const [totalFornadas, setTotalFornadas] = useState(0);
  const [tarefasPendentes, setTarefasPendentes] = useState(0);
  const [insumo, setInsumo] = useState(""); //textinput, guarda o que for digitado
  const [listaFaltas, setListaFaltas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [])
  );

  async function carregarDados() {
    const nomeSalvo = await AsyncStorage.getItem("@usuario_nome");
    if (nomeSalvo) setNomeUsuario(nomeSalvo);

    const faltasSalvas = await AsyncStorage.getItem("@lista_faltas"); //busca na memoria do aparelho o que está salvo
    if (faltasSalvas) setListaFaltas(JSON.parse(faltasSalvas));

    try {
      const snapProducao = await getDocs(collection(db, "producao"));
      setTotalFornadas(snapProducao.size);

      const snapTarefas = await getDocs(collection(db, "tarefas"));
      const pendentes = snapTarefas.docs.filter((d) => !d.data().concluida);
      setTarefasPendentes(pendentes.length);
    } catch (erro) {}
  }

  async function adicionarFalta() { //funçao assincrona executada ao salvar
    if (insumo === "") { //verifica se está vazio e emite um alerta caso esteja
      Alert.alert("Aviso!", "Digite o ingrediente que está faltando!");
      return;
    }

    const novaLista = [{ id: Date.now().toString(), nome: insumo }, ...listaFaltas];
    setListaFaltas(novaLista);
    await AsyncStorage.setItem("@lista_faltas", JSON.stringify(novaLista)); //grava o texto
    setInsumo(""); //limpa a caixa do texto
  }

  async function removerFalta(id) {
    const novaLista = listaFaltas.filter((item) => item.id !== id);
    setListaFaltas(novaLista);
    await AsyncStorage.setItem("@lista_faltas", JSON.stringify(novaLista));
  }

  return ( //container principal da tela e o headercard o que aparece no topo
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <View>
          <Text style={styles.headerTitulo}>Olá, {nomeUsuario}!</Text>
          <Text style={styles.headerSubtitulo}>Resumo da padaria hoje</Text>
        </View>
        <MaterialIcons name="storefront" size={34} color="#C67C4E" />
      </View>

      <View style={{ flexDirection: "row", marginBottom: 18 }}>
        <View style={[styles.card, { flex: 1, marginRight: 6, flexDirection: "column", alignItems: "flex-start" }]}>
          <Text style={{ fontSize: 26, fontWeight: "bold", color: "#C67C4E" }}>
            {totalFornadas}
          </Text>
          <Text style={styles.cardTitulo}>Fornadas Ativas</Text>
        </View>

        <View style={[styles.card, { flex: 1, marginLeft: 6, flexDirection: "column", alignItems: "flex-start" }]}>
          <Text style={{ fontSize: 26, fontWeight: "bold", color: "#2F2D2C" }}>
            {tarefasPendentes}
          </Text>
          <Text style={styles.cardTitulo}>Tarefas Pendentes</Text>
        </View>
      </View>

      <Text style={{ fontSize: 16, fontWeight: "bold", color: "#2F2D2C", marginBottom: 8 }}>
        Lista de Faltas / Insumos (Offline)
      </Text>

      <TextInput
        placeholder="Ex: Farinha de trigo, Fermento..." //texto quando o campo estiver vazio
        value={insumo} //une o texto a variavel
        onChangeText={setInsumo} //atualiza a variavel
        style={styles.input} //aplicação de estilo
      />

      <TouchableOpacity onPress={adicionarFalta} style={styles.botao}>
        <Text style={styles.textoBotao}>Anotar Falta</Text>
      </TouchableOpacity>

      <FlatList
        data={listaFaltas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => removerFalta(item.id)} style={styles.card}>
            <Text style={styles.cardTitulo}>{item.nome}</Text>
            <MaterialIcons name="check-circle-outline" size={24} color="#2E7D32" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
