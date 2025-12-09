import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import styles from "../../styles/cadastro";
import { authService } from "../../services/authService";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // Validações
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
      return;
    }

    console.log("Iniciando cadastro com:", { email, username });
    setLoading(true);
    const result = await authService.register(email, password, username);
    setLoading(false);

    console.log("Resultado do cadastro:", result);

    if (result.success) {
      Alert.alert(
        "Sucesso", 
        "Conta criada com sucesso!",
        [
          {
            text: "OK",
            onPress: () => router.replace("/home/home")
          }
        ]
      );
    } else {
      console.log("Erro capturado:", result.error);
      Alert.alert("Erro no Cadastro", result.error || "Não foi possível criar a conta");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#4CAF50" />
      </TouchableOpacity>

      <View style={styles.signupCard}>
        <Text style={styles.signupTitle}>Crie sua Conta</Text>

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
          <Text style={styles.inputLabel}>Usuário</Text>
          <TextInput 
            style={styles.input}
            placeholder=""
            placeholderTextColor="#999"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
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

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirme sua senha</Text>
          <TextInput 
            style={styles.input}
            placeholder=""
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!loading}
          />
        </View>

        <TouchableOpacity 
          style={styles.signupButton}
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.signupButtonText}>
            {loading ? "Criando..." : "Criar Conta"}
          </Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Já possui uma conta?</Text>
          <TouchableOpacity onPress={() => router.push("/")}>
            <Text style={styles.loginLink}>Faça Login Conosco</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}