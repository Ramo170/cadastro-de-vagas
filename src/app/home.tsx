import { router } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../firebase/firebaseConfig";

export default function Home() {
  const [vagas, setVagas] = useState<any[]>([]);

  async function carregarVagas() {
    const snapshot = await getDocs(collection(db, "vagas"));

    const lista: any = [];

    snapshot.forEach((doc) => {
      lista.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setVagas(lista);
  }

  useEffect(() => {
    carregarVagas();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vagas</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/cadastroUsuario")}
      >
        <Text style={styles.buttonText}>Faça seu cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/cadastro")}
      >
        <Text style={styles.buttonText}>Cadastrar Vagas</Text>
      </TouchableOpacity>
      <FlatList
        data={vagas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cargo}>{item.cargo}</Text>
            <Text style={styles.empresa}>{item.empresa}</Text>
            <Text style={styles.salario}>{item.salario}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  cargo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 4,
  },
  empresa: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 8,
  },
  salario: {
    fontSize: 15,
    fontWeight: "600",
    color: "2b9348",
  },
});
