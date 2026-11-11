import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native"; //componentes visuais do react-native
import { useRouter } from "expo-router"; //hook do expo-router para navegação entre telas

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
    <View //chatice de estilização
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#FFF8EF",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: "#8B4513",
          textAlign: "center",
          marginBottom: 10,
        }}
      >
        Pão Doca
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: "#777777",
          textAlign: "center",
          marginBottom: 40,
        }}
      >
        selecione o seu cargo e digite a senha de acesso ebaa
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        <TouchableOpacity //criação do botao de funcionário, muda a cor do botão e do texto dependendo se o cargo é funcionário ou gerente
          onPress={() => setCargo("funcionario")}
          style={{
            flex: 1,
            backgroundColor: cargo === "funcionario" ? "#B85C38" : "#F5E4D0",
            padding: 15,
            borderRadius: 8,
            marginRight: 10,
            alignItems: "center",
          }}
        >
          <Text 
            style={{
              color: cargo === "funcionario" ? "#FFFFFF" : "#8B4513",
              fontWeight: "bold",
            }}
          >
            Funcionário
          </Text>
        </TouchableOpacity>

        <TouchableOpacity //criação do botao de gerente, muda a cor do botão e do texto dependendo se o cargo é funcionário ou gerente
          onPress={() => setCargo("gerente")}
          style={{
            flex: 1,
            backgroundColor: cargo === "gerente" ? "#B85C38" : "#F5E4D0",
            padding: 15,
            borderRadius: 8,
            marginLeft: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: cargo === "gerente" ? "#FFFFFF" : "#8B4513",
              fontWeight: "bold",
            }}
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
        style={{
          backgroundColor: "#FFFFFF",
          borderWidth: 1,
          borderColor: "#F5E4D0",
          borderRadius: 8,
          padding: 15,
          fontSize: 16,
          marginBottom: 25,
          color: "#000000",
        }}
      />

      <TouchableOpacity //botão de login, chama a função lidarComLogin quando clicado, estilização do botão e do texto
        onPress={lidarComLogin}
        style={{
          backgroundColor: "#8B4513",
          padding: 16,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 18, fontWeight: "bold" }}>
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
