import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import styles from "../styles/index";
import { authService } from "../services/authService";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    const result = await authService.login(email, password);
    setLoading(false);

    if (result.success) {
      router.replace("/home/home");
    } else {
      Alert.alert("Erro no Login", result.error || "Não foi possível fazer login");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#4CAF50" />
      </TouchableOpacity>

      <View style={styles.loginCard}>
        <Text style={styles.loginTitle}>Faça seu Login</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput 
            style={styles.input}
            placeholder=""
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Senha</Text>
          <TextInput 
            style={styles.input}
            placeholder=""
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
        </View>

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? "Entrando..." : "Entrar"}
          </Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Não tem uma conta ainda?</Text>
          <TouchableOpacity onPress={() => router.push("/cadastro/cadastro")}>
            <Text style={styles.signupLink}>Crie uma conta conosco</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}