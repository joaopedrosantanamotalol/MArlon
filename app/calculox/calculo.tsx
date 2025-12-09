import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, Modal, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

export default function Calculo() {
  const router = useRouter();
  const [resiliencia, setResiliencia] = useState("");
  const [inteligencia, setInteligencia] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleContinuar = () => {
    if (!resiliencia || !inteligencia) {
      alert("Por favor, selecione todas as opções");
      return;
    }
    setShowModal(true);
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
          <Text style={styles.welcomeText}>Ok, Usuário! Vamos iniciar um</Text>
          <Text style={styles.welcomeText}>novo planejamento</Text>
        </View>

        {/* Card de Cálculo */}
        <View style={styles.calculoCard}>
          <Text style={styles.calculoTitle}>Primeiro, vamos calcular o seu X</Text>

          {/* Dropdown Resiliência */}
          <View style={styles.dropdownContainer}>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={resiliencia}
                onValueChange={(value) => setResiliencia(value)}
                style={styles.picker}
              >
                <Picker.Item label="Informe a sua resiliência" value="" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="40" value="40" />
                <Picker.Item label="50" value="50" />
                <Picker.Item label="60" value="60" />
                <Picker.Item label="70" value="70" />
                <Picker.Item label="80" value="80" />
                <Picker.Item label="90" value="90" />
                <Picker.Item label="100" value="100" />
                <Picker.Item label="110" value="110" />
                <Picker.Item label="120" value="120" />
                <Picker.Item label="130" value="130" />
                <Picker.Item label="140" value="140" />
                <Picker.Item label="150" value="150" />
                <Picker.Item label="160" value="160" />
              </Picker>
            </View>
          </View>

          {/* Dropdown Inteligência */}
          <View style={styles.dropdownContainer}>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={inteligencia}
                onValueChange={(value) => setInteligencia(value)}
                style={styles.picker}
              >
                <Picker.Item label="Informe a sua inteligência" value="" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="30" value="30" />
                <Picker.Item label="40" value="40" />
                <Picker.Item label="50" value="50" />
                <Picker.Item label="60" value="60" />
                <Picker.Item label="70" value="70" />
                <Picker.Item label="80" value="80" />
                <Picker.Item label="90" value="90" />
                <Picker.Item label="100" value="100" />
                <Picker.Item label="110" value="110" />
                <Picker.Item label="120" value="120" />
                <Picker.Item label="130" value="130" />
                <Picker.Item label="140" value="140" />
                <Picker.Item label="150" value="150" />
                <Picker.Item label="160" value="160" />
              </Picker>
            </View>
          </View>

          {/* Fórmula */}
          <View style={styles.formulaBox}>
            <Text style={styles.formulaText}>R+I = X</Text>
          </View>

          {/* Avatar e Texto */}
          <View style={styles.avatarSection}>
            <Text style={styles.attentionText}>Atenção! verifique cada resposta antes de continuar</Text>
            <View style={styles.avatar}>
              <Ionicons name="person-circle" size={50} color="#2196F3" />
            </View>
          </View>

          {/* Botão Continuar */}
          <TouchableOpacity style={styles.continueButton} onPress={handleContinuar}>
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>VestMath</Text>
        <Text style={styles.footerSubtitle}>O seu futuro está aqui.clique</Text>
        
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Sobre</Text>
          <Text style={styles.footerLink}>Contato</Text>
          <Text style={styles.footerLink}>Termos</Text>
          <Text style={styles.footerLink}>Privacidade</Text>
        </View>
        
        <Text style={styles.footerCopyright}>© VestMath copyrights</Text>
      </View>

      {/* Modal de Confirmação */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cálculo Realizado!</Text>
            <Text style={styles.modalText}>Seu valor de X foi calculado com sucesso.</Text>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => {
                setShowModal(false);
                // Passar os parâmetros para a próxima página
                router.push({
                  pathname: "/calculoy/calculo",
                  params: {
                    resiliencia: resiliencia,
                    inteligencia: inteligencia
                  }
                });
              }}
            >
              <Text style={styles.modalButtonText}>Próxima Etapa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  welcomeText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
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
  avatar: {
    width: 50,
    height: 50,
  },
  continueButton: {
    backgroundColor: '#16A085',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  continueButtonText: {
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 30,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});