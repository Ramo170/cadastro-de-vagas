import { router } from "expo-router";
import { addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../firebase/firebaseConfig";

export default function Cadastro() {
  const [cargo, setCargo] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [salario, setSalario] = useState("");

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/login");
      }
    });

    return unsubcribe;
  }, []);

  async function salvarVagas() {
    await addDoc(collection(db, "vagas"), {
      cargo,
      empresa,
      salario,
    });

    alert("Vaga cadastrada com sucesso!");
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Cadastro de Vagas</Text>

        <TextInput
          value={cargo}
          onChangeText={setCargo}
          placeholder="Digite o cargo..."
          style={styles.input}
        />

        <TextInput
          value={empresa}
          onChangeText={setEmpresa}
          placeholder="Digite a empresa..."
          style={styles.input}
        />

        <TextInput
          value={salario}
          onChangeText={setSalario}
          placeholder="Digite o salario..."
          style={styles.input}
        />

        <TouchableOpacity onPress={salvarVagas} style={styles.botao}>
          <Text style={styles.textoBotao}>Salvar cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#272acf",
    marginBottom: 25,
  },
  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: "#fafafa",
    marginBottom: 15,
    fontSize: 16,
  },
  botao: {
    backgroundColor: "#272acf",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "##fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
