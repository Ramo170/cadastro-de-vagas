import { auth } from "@/firebase/firebaseConfig";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function fazerLogin() {
    if (!email.trim()) {
      alert("Informe seu email...");
      return;
    }
    if (!senha.trim()) {
      alert("Informe sua senha...");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      alert("Login realizado com sucesso");
      router.push("/");
    } catch (error: any) {
      if (error.code === "auth/invalid-credencial") {
        alert("Email ou senha incorretos...");
        return;
      }

      if (error.code === "auth/too-many-requets") {
        alert("Muitas tentativas de login. Tente mais tarde!");
      }

      alert("Email ou senha invalidos");
      console.log(error);
    }
    setEmail("");
    setSenha("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>

      <TextInput
        placeholder="Digite o seu email..."
        value="email"
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Digite o seu senha..."
        value="senha"
        onChangeText={setSenha}
        autoCapitalize="none"
        style={styles.input}
      />

      <TouchableOpacity onPress={fazerLogin} style={styles.botao}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/cadastroUsuario")}>
        <Text style={styles.link}>Não possui conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8fafc",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  botao: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    textAlign: "center",
    marginTop: 20,
    color: "#2563eb",
    fontWeight: "bold",
  },
});
