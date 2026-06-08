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
    <View>
      <Text>Cadastro de Vagas</Text>

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
        <Text>Salvar cadastro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    margin: 5,
  },
  botao: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
  },
});
