import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import styles from "../styles/index";

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* teste 2 */}
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#4CAF50" />
      </TouchableOpacity>

      {/* Card de Login */}
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
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Senha</Text>
          <TextInput 
            style={styles.input}
            placeholder=""
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={() => router.push("/home/home")} >
          <Text style={styles.loginButtonText}>Entrar</Text>
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