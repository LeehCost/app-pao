import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native"; //componentes visuais do react-native
import { useRouter } from "expo-router"; //hook do expo-router para navegação entre telas
import { styles } from "../styles/login.styles"; //importando os estilos da tela de login

export default function Login() { //cria e inicializa a tela de login
  const router = useRouter(); //inicializa o hook de navegação
  const [cargo, setCargo] = useState("funcionario"); //cria a variavel funcionario, começa com ela e muda pra gerente se clicar no botão de gerente
  const [senha, setSenha] = useState(""); //cria variavel senha e começa vazia, muda de acordo com o que for digitado 

  const lidarComLogin = () => { //verifica se é 1234, devemos mudar isso com a autenticação e o uso da criptografia, mas por enquanto é só pra testar a navegação
    if (senha === "1234") {
      router.replace("/home");
    } else {
      alert("1234)");
    }
  };

  return (
    <View style={styles.tela}>
      <Text style={styles.titulo}>
        Pão Doca
      </Text>

      <Text style={styles.subtitulo}>
        selecione o seu cargo e digite a senha de acesso ebaa
      </Text>

      <View style={styles.areaBotoes}>
        <TouchableOpacity //criação do botao de funcionário, muda a cor do botão e do texto dependendo se o cargo é funcionário ou gerente
          onPress={() => setCargo("funcionario")}
          style={cargo === "funcionario" ? styles.botaoSelecionado : styles.botaoNormal}
        >
          <Text 
            style={cargo === "funcionario" ? styles.textoSelecionado : styles.textoNormal}
          >
            Funcionário
          </Text>
        </TouchableOpacity>

        {/* Espaço simples entre os dois botões */}
        <View style={{ width: 20 }} />

        <TouchableOpacity //criação do botao de gerente, muda a cor do botão e do texto dependendo se o cargo é funcionário ou gerente
          onPress={() => setCargo("gerente")}
          style={cargo === "gerente" ? styles.botaoSelecionado : styles.botaoNormal}
        >
          <Text
            style={cargo === "gerente" ? styles.textoSelecionado : styles.textoNormal}
          >
            Gerente
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput //campo de digitação da senha, placeholder é o texto que aparece quando não tem nada digitado, secureTextEntry esconde o que é digitado, value é a variavel senha 
      //e onChangeText muda a variavel senha de acordo com o que for digitado
        placeholder="Digite sua senha de acesso"
        placeholderTextColor="#A0A0A0"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
        keyboardType="numeric"
        style={styles.campoSenha}
      />

      <TouchableOpacity //botão de login, chama a função lidarComLogin quando clicado, estilização do botão e do texto
        onPress={lidarComLogin}
        style={styles.botaoEntrar}
      >
        <Text style={styles.textoBotaoEntrar}>
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
