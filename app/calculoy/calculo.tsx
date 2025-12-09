import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth, app } from "../../config/firebase";

export default function CalculoY() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [curso, setCurso] = useState("");
  const [instituicao, setInstituicao] = useState("");

  const handleVoltar = () => {
    router.back();
  };

  const handleCalcular = async () => {
    if (!curso || !instituicao) {
      Alert.alert("Atenção", "Por favor, selecione todas as opções");
      return;
    }

    try {
      const db = getFirestore(app);
      const user = auth.currentUser;

      if (!user) {
        Alert.alert("Erro", "Você precisa estar logado");
        return;
      }

      // Calcular X e Y
      const resiliencia = parseInt(params.resiliencia as string);
      const inteligencia = parseInt(params.inteligencia as string);
      const cursoNum = parseInt(curso);
      const instituicaoNum = parseInt(instituicao);

      const valorX = resiliencia + inteligencia;
      const valorY = cursoNum + instituicaoNum;
      const diferenca = Math.abs(valorY - valorX);

      // Salvar no Firestore
      await addDoc(collection(db, 'calculos'), {
        userId: user.uid,
        userEmail: user.email,
        resiliencia: resiliencia,
        inteligencia: inteligencia,
        curso: cursoNum,
        instituicao: instituicaoNum,
        valorX: valorX,
        valorY: valorY,
        diferenca: diferenca,
        timestamp: new Date().toISOString()
      });

      // Navegar para resultado com TODOS os parâmetros
      router.push({
        pathname: "/resultado/resultado",
        params: {
          resiliencia: resiliencia.toString(),
          inteligencia: inteligencia.toString(),
          curso: cursoNum.toString(),
          instituicao: instituicaoNum.toString(),
          valorX: valorX.toString(),
          valorY: valorY.toString(),
          diferenca: diferenca.toString()
        }
      });

    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro", "Não foi possível processar o cálculo");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>VestMath</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Card Principal */}
      <View style={styles.mainCard}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Falta pouco Usuário!</Text>
          <Text style={styles.welcomeSubtitle}>você está a um passo de ver o seu plano</Text>
        </View>

        {/* Card de Cálculo */}
        <View style={styles.calculoCard}>
          <Text style={styles.calculoTitle}>Agora, vamos calcular o seu Y</Text>

          {/* Dropdown Curso */}
          <View style={styles.dropdownContainer}>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={curso}
                onValueChange={(value) => setCurso(value)}
                style={styles.picker}
              >
                <Picker.Item label="Informe o curso desejado" value="" />
                <Picker.Item label="Medicina" value="160" />
                <Picker.Item label="Engenharia" value="150" />
                <Picker.Item label="Direito" value="140" />
                <Picker.Item label="Arquitetura" value="130" />
                <Picker.Item label="Odontologia" value="120" />
                <Picker.Item label="Psicologia" value="110" />
                <Picker.Item label="Administração" value="100" />
                <Picker.Item label="Ciências da Computação" value="90" />
                <Picker.Item label="Enfermagem" value="80" />
                <Picker.Item label="Farmácia" value="70" />
                <Picker.Item label="Fisioterapia" value="60" />
                <Picker.Item label="Veterinária" value="50" />
                <Picker.Item label="Nutrição" value="40" />
                <Picker.Item label="Educação Física" value="30" />
                <Picker.Item label="Ciências Biológicas" value="20" />
                <Picker.Item label="Pedagogia" value="10" />
              </Picker>
            </View>
          </View>

          {/* Dropdown Instituição */}
          <View style={styles.dropdownContainer}>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={instituicao}
                onValueChange={(value) => setInstituicao(value)}
                style={styles.picker}
              >
                <Picker.Item label="Informe a instituição desejada" value="" />
                <Picker.Item label="USP - Universidade de São Paulo" value="160" />
                <Picker.Item label="UNICAMP - Universidade Estadual de Campinas" value="150" />
                <Picker.Item label="UFRJ - Universidade Federal do Rio de Janeiro" value="140" />
                <Picker.Item label="UNESP - Universidade Estadual Paulista" value="130" />
                <Picker.Item label="UFMG - Universidade Federal de Minas Gerais" value="120" />
                <Picker.Item label="UFRGS - Universidade Federal do Rio Grande do Sul" value="110" />
                <Picker.Item label="UnB - Universidade de Brasília" value="100" />
                <Picker.Item label="UFSC - Universidade Federal de Santa Catarina" value="90" />
                <Picker.Item label="UFPR - Universidade Federal do Paraná" value="80" />
                <Picker.Item label="UFC - Universidade Federal do Ceará" value="70" />
                <Picker.Item label="UFV - Universidade Federal de Viçosa" value="60" />
                <Picker.Item label="UFPE - Universidade Federal de Pernambuco" value="50" />
                <Picker.Item label="UFF - Universidade Federal Fluminense" value="40" />
                <Picker.Item label="UFBA - Universidade Federal da Bahia" value="30" />
                <Picker.Item label="UFSCar - Universidade Federal de São Carlos" value="20" />
                <Picker.Item label="UFPA - Universidade Federal do Pará" value="10" />
              </Picker>
            </View>
          </View>

          {/* Fórmula */}
          <View style={styles.formulaBox}>
            <Text style={styles.formulaText}>C+I = Y</Text>
          </View>

          {/* Avatar e Texto */}
          <View style={styles.avatarSection}>
            <Text style={styles.attentionText}>Atenção! verifique cada resposta antes de continuar</Text>
            <View style={styles.avatarsContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person-circle" size={45} color="#2196F3" />
              </View>
              <View style={styles.avatar}>
                <Ionicons name="person-circle" size={45} color="#FF9800" />
              </View>
            </View>
          </View>

          {/* Botões */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.voltarButton} onPress={handleVoltar}>
              <Text style={styles.voltarButtonText}>Voltar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.calcularButton} onPress={handleCalcular}>
              <Text style={styles.calcularButtonText}>Calcular</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>VestMath</Text>
        <Text style={styles.footerSubtitle}>O seu progresso em um clique</Text>
        
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Sobre</Text>
          <Text style={styles.footerLink}>Contato</Text>
          <Text style={styles.footerLink}>Termos</Text>
          <Text style={styles.footerLink}>Privacidade</Text>
        </View>
        
        <Text style={styles.footerCopyright}>© VestMath copyrights</Text>
      </View>
          </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  menuButton: {
    padding: 5,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  welcomeSection: {
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '400',
  },
  calculoCard: {
    backgroundColor: '#2C3E50',
    borderRadius: 15,
    padding: 20,
  },
  calculoTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  pickerWrapper: {
    backgroundColor: '#A8E6CF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  picker: {
    color: '#2C3E50',
    height: 50,
  },
  formulaBox: {
    backgroundColor: '#A8E6CF',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginVertical: 20,
  },
  formulaText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  attentionText: {
    fontSize: 12,
    color: '#FFFFFF',
    flex: 1,
    marginRight: 10,
  },
  avatarsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  avatar: {
    width: 45,
    height: 45,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  voltarButton: {
    flex: 1,
    backgroundColor: '#34495E',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  voltarButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  calcularButton: {
    flex: 1,
    backgroundColor: '#16A085',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  calcularButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#2C3E50',
    padding: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  footerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  footerSubtitle: {
    fontSize: 14,
    color: '#95A5A6',
    marginBottom: 20,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  footerLink: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  footerCopyright: {
    color: '#95A5A6',
    fontSize: 12,
  },
});