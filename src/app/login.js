import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { criptografarSenha } from "../utils/crypto";
import { styles } from "../styles/app.styles";

export default function Login() {
  const router = useRouter();
  const [turno, setTurno] = useState("Manhã");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modo, setModo] = useState("login");

  const lidarComBotao = async () => {
    if (email === "" || senha === "") {
      Alert.alert("Pão Doca", "Preencha o e-mail e a senha!");
      return;
    }

    const emailFormatado = email.toLowerCase().trim();
    const senhaCriptografada = criptografarSenha(senha);

    if (modo === "cadastro") {
      await addDoc(collection(db, "usuarios"), {
        email: emailFormatado,
        senha: senhaCriptografada,
      });
      Alert.alert("Pão Doca", "Conta criada com sucesso!");
      setModo("login");
      setSenha("");
    } else if (modo === "esqueci") {
      const dados = await getDocs(collection(db, "usuarios"));
      const usuarioDoc = dados.docs.find((d) => d.data().email === emailFormatado);

      if (usuarioDoc) {
        await updateDoc(doc(db, "usuarios", usuarioDoc.id), {
          senha: senhaCriptografada,
        });
        Alert.alert("Pão Doca", "Nova senha salva!");
        setModo("login");
        setSenha("");
      } else {
        Alert.alert("Pão Doca", "E-mail não encontrado!");
      }
    } else {
      const dados = await getDocs(collection(db, "usuarios"));
      const listaUsuarios = dados.docs.map((d) => d.data());

      const encontrado = listaUsuarios.find(
        (u) => u.email === emailFormatado && u.senha === senhaCriptografada
      );

      if (encontrado) {
        router.replace("/home");
      } else {
        Alert.alert("Pão Doca", "E-mail ou senha incorretos!");
      }
    }
  };

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
            : "Controle de Fornadas & Turno"}
        </Text>
      </View>

      {modo === "login" ? (
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <TouchableOpacity
            onPress={() => setTurno("Manhã")}
            style={[
              turno === "Manhã" ? styles.botao : styles.botaoSecundario,
              { flex: 1, marginRight: 5, marginBottom: 0, padding: 12 },
            ]}
          >
            <Text style={styles.textoBotao}>Manhã</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTurno("Tarde")}
            style={[
              turno === "Tarde" ? styles.botao : styles.botaoSecundario,
              { flex: 1, marginHorizontal: 5, marginBottom: 0, padding: 12 },
            ]}
          >
            <Text style={styles.textoBotao}>Tarde</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTurno("Noite")}
            style={[
              turno === "Noite" ? styles.botao : styles.botaoSecundario,
              { flex: 1, marginLeft: 5, marginBottom: 0, padding: 12 },
            ]}
          >
            <Text style={styles.textoBotao}>Noite</Text>
          </TouchableOpacity>
        </View>
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
            : "Entrar no Turno (" + turno + ")"}
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
