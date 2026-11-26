import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; //armazenamento local(offline first
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore"; //salvar e ler do firebase
import { db } from "../../services/firebaseConfig"; //conexao configurada com o firebase
import { styles } from "../../styles/app.styles"; 

export default function Producao() {
  const [nomePao, setNomePao] = useState(""); //guarda o nome digitado
  const [quantidade, setQuantidade] = useState("");
  const [categoria, setCategoria] = useState("Não Iniciado");
  const [listaProducao, setListaProducao] = useState([]); //guarda a lista de todos os paes que aparecem na tela
  const [itemSelecionado, setItemSelecionado] = useState(null);

  async function buscarProducao() { //função que busca os paes salvos(primeiro nuvem, depois no cel se estiver offline)
    try {
      const dados = await getDocs(collection(db, "producao")); //vai no firebase e pega todos os itens da coleção producao 
      const itens = dados.docs.map((doc) => ({ //transformação dos docs do firebase em um obj para a lista
        id: doc.id,
        nome: doc.data().nome,
        quantidade: doc.data().quantidade,
        categoria: doc.data().categoria || "Não Iniciado",
      }));
      setListaProducao(itens); //atualiza a lista na tela com os dados da nuvem
      await AsyncStorage.setItem("@producao_offline", JSON.stringify(itens)); //salva uma cópia no celular, para uso offline
    } catch (erro) { //se estiver sem net e der erro no firebase
      const dadosLocais = await AsyncStorage.getItem("@producao_offline"); //buscador para a ultima copia salva no cel
      if (dadosLocais !== null) { //se existir copia salva no cel, converte o texto pra lista e exibe
        setListaProducao(JSON.parse(dadosLocais));
      }
    }
  }

  useEffect(() => { // hook que roda automaticamente uma unica vez assim que a tela for aberta
    buscarProducao(); //chama a função pra carregar a lista inicial
  }, []);

  async function adicionarItem() { //função executada ao clicar em add item
    if (nomePao === "" || quantidade === "") { //verifica se algum campo está vazio
      Alert.alert("Aviso!", "Preencha o nome do pão e a quantidade!"); //aviso caso esteja
      return;
    }

    const novoItem = { //criação do obj do novo pao com um id temporario baseado no horario da ação
      id: Date.now().toString(),
      nome: nomePao,
      quantidade: quantidade,
      categoria: categoria,
    };

    const novaLista = [...listaProducao, novoItem]; //junta a lista atual com o item adicionado
    setListaProducao(novaLista); //atualização imediata da tela
    await AsyncStorage.setItem("@producao_offline", JSON.stringify(novaLista)); //salva a lista atualizada no cel
//limpeza dos campos
    setNomePao(""); 
    setQuantidade("");

    try { 
      await addDoc(collection(db, "producao"), { //envio do novo item para o firebase
        nome: novoItem.nome,
        quantidade: novoItem.quantidade,
        categoria: novoItem.categoria,
      });
      buscarProducao();
    } catch (erro) { //se estiver sem net na hora de salvar
      Alert.alert("Aviso!", "Salvo no celular (Modo Offline)!");
    }
  }

  async function mudarCategoria(item, novaCategoria) {
    await updateDoc(doc(db, "producao", item.id), {
      categoria: novaCategoria,
    });
    setItemSelecionado(null);
    buscarProducao();
  }

  async function excluirItem(id) {
    await deleteDoc(doc(db, "producao", id));
    setItemSelecionado(null);
    buscarProducao();
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <View>
          <Text style={styles.headerTitulo}>Produção & Estoque</Text>
          <Text style={styles.headerSubtitulo}>Controle de fornadas do dia</Text>
        </View>
        <MaterialIcons name="bakery-dining" size={34} color="#C67C4E" />
      </View>

      <TextInput
        placeholder="Nome do pão (ex: Pão Francês)"
        value={nomePao}
        onChangeText={setNomePao}
        style={styles.input}
      />

      <TextInput
        placeholder="Quantidade (ex: 50)"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <TouchableOpacity
          onPress={() => setCategoria("Não Iniciado")}
          style={[
            categoria === "Não Iniciado" ? styles.botao : styles.botaoSecundario,
            { flex: 1, marginRight: 4, marginBottom: 0, padding: 10 },
          ]}
        >
          <Text style={[styles.textoBotao, { fontSize: 12 }]}>Não Iniciado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCategoria("Em Produção")}
          style={[
            categoria === "Em Produção" ? styles.botao : styles.botaoSecundario,
            { flex: 1, marginHorizontal: 4, marginBottom: 0, padding: 10 },
          ]}
        >
          <Text style={[styles.textoBotao, { fontSize: 12 }]}>Em Produção</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setCategoria("Pronto")}
          style={[
            categoria === "Pronto" ? styles.botao : styles.botaoSecundario,
            { flex: 1, marginLeft: 4, marginBottom: 0, padding: 10 },
          ]}
        >
          <Text style={[styles.textoBotao, { fontSize: 12 }]}>Pronto</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={adicionarItem} style={styles.botao}> 
        <Text style={styles.textoBotao}>Adicionar à Produção</Text>
      </TouchableOpacity> 

      <FlatList //lista que coloca cada item de produção na tela
        data={listaProducao} //fonte dos dados
        keyExtractor={(item) => item.id} //identificador unico de cada um dos itens
        renderItem={({ item }) => ( //estilização de cada item da tela
          <TouchableOpacity onPress={() => setItemSelecionado(item)} style={styles.card}>
            <View>
              <Text style={styles.cardTitulo}>{item.nome}</Text>
              <Text style={styles.cardTexto}>{item.quantidade} un.</Text>
            </View>
            <Text style={{ fontWeight: "bold", color: "#5C3A21", fontSize: 13 }}>
              {item.categoria}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Modal visible={itemSelecionado !== null} transparent={true} animationType="fade">
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 20 }}>
          {itemSelecionado ? (
            <View style={{ backgroundColor: "#FFF", padding: 20, borderRadius: 16 }}>
              <Text style={styles.titulo}>{itemSelecionado.nome}</Text>
              <Text style={[styles.subtitulo, { marginBottom: 15 }]}>
                Quantidade: {itemSelecionado.quantidade} un. | Status: {itemSelecionado.categoria}
              </Text>

              <TouchableOpacity
                onPress={() => mudarCategoria(itemSelecionado, "Não Iniciado")}
                style={styles.botaoSecundario}
              >
                <Text style={styles.textoBotao}>Marcar como Não Iniciado</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => mudarCategoria(itemSelecionado, "Em Produção")}
                style={styles.botao}
              >
                <Text style={styles.textoBotao}>Marcar como Em Produção</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => mudarCategoria(itemSelecionado, "Pronto")}
                style={[styles.botao, { backgroundColor: "#2E7D32" }]}
              >
                <Text style={styles.textoBotao}>Marcar como Pronto</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => excluirItem(itemSelecionado.id)}
                style={[styles.botaoSecundario, { backgroundColor: "#A52A2A" }]}
              >
                <Text style={styles.textoBotao}>Excluir Item</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setItemSelecionado(null)}
                style={{ alignItems: "center", marginTop: 10 }}
              >
                <Text style={{ color: "#7A6A5E", fontWeight: "bold" }}>Fechar</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </Modal>
    </View>
  );
}
//itens da flatlist data=fonte, keyextractor retorna em uma unica chave de string para cada elemento otimizado e renderizado, renderitem tira o item, index e o separators e retorna em jsx para cada item.
