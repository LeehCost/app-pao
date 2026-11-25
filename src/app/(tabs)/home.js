import React, { useState } from "react"; //importação react e o hook usestate para guardar dados na tela
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native"; //componentes visuais e a caixinha de aviso
import { MaterialIcons } from "@expo/vector-icons"; //biblioteca de icones
import AsyncStorage from "@react-native-async-storage/async-storage"; //armazenamento local do celular, ps: nao sei se tiro isso
import { styles } from "../../styles/app.styles"; //importa o arq unico de estios 

export default function Home() {
  const [aviso, setAviso] = useState(""); //textinput, guarda o que for digitado

  async function salvarAviso() { //funçao assincrona executada ao salvar o arquivo
    if (aviso === "") { //verifica se está vazio e emite um alerta caso esteja
      Alert.alert("Pão Doca", "Escreva um aviso antes de salvar!");
      return;
    }
    await AsyncStorage.setItem("recado_turno", aviso);  // grava o texto
    Alert.alert("Pão Doca", "Recado salvo no celular!"); //emite o aviso 
    setAviso(""); //limpa a caixa do texto antes de salvar
  }

  async function lerAviso() { //funcao assincrona quando clica em ver ultimo aviso
    const valorSalvo = await AsyncStorage.getItem("recado_turno"); //busca na memoria do aparelho o que está salvo no recado_turno
    if (valorSalvo !== null) { //verificação se há algum recado
      Alert.alert("Último Aviso", valorSalvo); //mostra na tela o valor salvo
    } else { //alerta caso nao tenha nada
      Alert.alert("Pão Doca", "Nenhum recado salvo ainda.");
    }
  }

  return ( //container principal da tela e o headercard o que aparece no topo
    <View style={styles.container}> 
      <View style={styles.headerCard}>
        <View>
          <Text style={styles.headerTitulo}>Painel Inicial</Text>
          <Text style={styles.headerSubtitulo}>Quadro de avisos do turno</Text>
        </View>
        <MaterialIcons name="storefront" size={34} color="#C67C4E" /> 
      </View>

      <TextInput
        placeholder="Digite um aviso para a equipe..." //texto quando estiver o campo estiver vazio
        value={aviso} //une o texto a variavel "aviso"
        onChangeText={setAviso} //atualiza a variavel aviso
        style={styles.input} //aplicação de estilo
      />

      <TouchableOpacity onPress={salvarAviso} style={styles.botao}>
        <Text style={styles.textoBotao}>Salvar Aviso</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={lerAviso} style={styles.botaoSecundario}>
        <Text style={styles.textoBotao}>Ver Último Aviso</Text>
      </TouchableOpacity>
    </View>
  );
}
//nessas ultimas linhas de código são aplicações de estilos da pasta e a definição dos botoes salvar aviso e ler