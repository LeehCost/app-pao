import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { criptografarSenha } from "../utils/crypto";
import { styles } from "../styles/app.styles";

export default function Login() {
  const router = useRouter(); //controlador
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modo, setModo] = useState("login"); //controle de qual tela está(login, cadastro ou esqueci)

  async function lidarComBotao() { //funcao ao clicar no botao
    if (email === "" || senha === "" || (modo === "cadastro" && nome === "")) { //verificação
      Alert.alert("Aviso!", "Preencha todos os campos!");
      return;
    }

    //email em letras minusculas e conversao da senha em codigo base64
    const emailFormatado = email.toLowerCase().trim();
    const senhaCriptografada = criptografarSenha(senha);

    if (modo === "cadastro") { //conta nova
      await addDoc(collection(db, "usuarios"), { //grava nome, email e senha já criptografados
        nome: nome.trim(),
        email: emailFormatado,
        senha: senhaCriptografada,
      });
      Alert.alert("Aviso!", "Conta criada com sucesso!");
      setModo("login"); //volta pra tela de login
      setSenha(""); //limpa o campo
    } else if (modo === "esqueci") { //redefinição da senha
      const dados = await getDocs(collection(db, "usuarios")); //busca os users cadastrados no firebase
      const usuarioDoc = dados.docs.find((d) => d.data().email === emailFormatado); //procura o doc com o email digitado

      if (usuarioDoc) { //se email encontrado no banco, atualiza a senha
        await updateDoc(doc(db, "usuarios", usuarioDoc.id), {
          senha: senhaCriptografada,
        });
        Alert.alert("Aviso!", "Nova senha salva!");
        setModo("login");
        setSenha("");
      } else {
        Alert.alert("Aviso!", "E-mail não encontrado!");
      }
    } else {
      const dados = await getDocs(collection(db, "usuarios")); //leitura de todos os users do fire
      const listaUsuarios = dados.docs.map((d) => d.data()); //pega os dados de cada doc

      const encontrado = listaUsuarios.find(
        (u) => u.email === emailFormatado && u.senha === senhaCriptografada //procura um usuario que tenha exatamente o mesmo email e senha
      );

      if (encontrado) { //se encontrados
        await AsyncStorage.setItem("@usuario_nome", encontrado.nome || "Funcionário");
        router.replace("/home"); //volta pra tela inicial e evita a volta pro login
      } else {
        Alert.alert("Aviso!", "E-mail ou senha incorretos!"); //avisa o erro
      }
    }
  }

  return (
    <View style={[styles.container, { justifyContent: "center" }]}>
      <View style={styles.topo}>
        <MaterialIcons name="bakery-dining" size={64} color="#C67C4E" />
        <Text style={styles.titulo}>Pão Doca</Text>
        <Text style={styles.subtitulo}>
          {modo === "cadastro"
            ? "Crie sua conta de acesso"
            : modo === "esqueci"
            ? "Digite seu e-mail e a nova senha"
            : "Gestão de Padaria & Forno"}
        </Text>
      </View>

      {modo === "cadastro" ? (
        <TextInput
          placeholder="Seu nome (ex: Letícia)"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
      ) : null}

      <TextInput
        placeholder="Seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder={modo === "esqueci" ? "Digite a nova senha" : "Sua senha"}
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
      />

      <TouchableOpacity onPress={lidarComBotao} style={styles.botao}>
        <Text style={styles.textoBotao}>
          {modo === "cadastro"
            ? "Cadastrar"
            : modo === "esqueci"
            ? "Redefinir Senha"
            : "Entrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setModo(modo === "login" ? "cadastro" : "login")}
        style={{ alignItems: "center", marginTop: 10 }}
      >
        <Text style={{ color: "#7A6A5E" }}>
          {modo === "login" ? "Não tem conta? Cadastre-se" : "Voltar para o Login"}
        </Text>
      </TouchableOpacity>

      {modo === "login" ? (
        <TouchableOpacity
          onPress={() => setModo("esqueci")}
          style={{ alignItems: "center", marginTop: 12 }}
        >
          <Text style={{ color: "#C67C4E", fontWeight: "bold" }}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
