import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import styles from "../../styles/cadastro";

export default function Signup() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Card de Cadastro */}

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
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Usuário</Text>
          <TextInput 
            style={styles.input}
            placeholder=""
            placeholderTextColor="#999"
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

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirme sua senha</Text>
          <TextInput 
            style={styles.input}
            placeholder=""
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Criar Conta</Text>
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