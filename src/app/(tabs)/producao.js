import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import { styles } from "../../styles/app.styles";


export default function Producao() {
  const [nomePao, setNomePao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [listaProducao, setListaProducao] = useState([]);

  const buscarProducao = async () => {
    try {
      const dados = await getDocs(collection(db, "producao"));
      const itens = dados.docs.map((doc) => ({
        id: doc.id,
        nome: doc.data().nome,
        quantidade: doc.data().quantidade,
      }));
      setListaProducao(itens);
      await AsyncStorage.setItem("@producao_offline", JSON.stringify(itens));
    } catch (erro) {
      const dadosLocais = await AsyncStorage.getItem("@producao_offline");
      if (dadosLocais) {
        setListaProducao(JSON.parse(dadosLocais));
      }
    }
  };

  useEffect(() => {
    buscarProducao();
  }, []);

  const adicionarItem = async () => {
    if (nomePao === "" || quantidade === "") {
      alert("Preencha o nome e a quantidade!");
      return;
    }

    const novoItem = { id: Date.now().toString(), nome: nomePao, quantidade: quantidade };
    const novaLista = [...listaProducao, novoItem];

    setListaProducao(novaLista);
    await AsyncStorage.setItem("@producao_offline", JSON.stringify(novaLista));

    setNomePao("");
    setQuantidade("");

    try {
      await addDoc(collection(db, "producao"), {
        nome: novoItem.nome,
        quantidade: novoItem.quantidade,
      });
    } catch (erro) {
      alert("Salvo no celular (Modo Offline)!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <MaterialIcons name="bakery-dining" size={56} color="#C67C4E" />
        <Text style={styles.titulo}>Produção & Estoque</Text>
        <Text style={styles.subtitulo}>Controle de fornadas do dia</Text>
      </View>

      <TextInput
        placeholder="Nome do pão (ex: Pão Francês)"
        placeholderTextColor="#9E8E82"
        value={nomePao}
        onChangeText={setNomePao}
        style={styles.input}
      />

      <TextInput
        placeholder="Quantidade (ex: 50)"
        placeholderTextColor="#9E8E82"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity onPress={adicionarItem} style={styles.botao}>
        <Text style={styles.textoBotao}>Adicionar à Produção</Text>
      </TouchableOpacity>

      <FlatList
        data={listaProducao}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>{item.nome}</Text>
            <Text style={styles.cardTexto}>{item.quantidade} un.</Text>
          </View>
        )}
      />
    </View>
  );
}
