import { useRouter, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { auth } from "../../config/firebase";

export default function PerfilResultado() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const valorX = parseInt(params.valorX as string) || 0;
  const valorY = parseInt(params.valorY as string) || 0;
  const diferenca = parseInt(params.diferenca as string) || 0;
  const resiliencia = params.resiliencia as string || "0";
  const inteligencia = params.inteligencia as string || "0";
  const curso = params.curso as string || "0";
  const instituicao = params.instituicao as string || "0";

  console.log("Params recebidos:", params); // Para debug

  const user = auth.currentUser;

  // Determinar situação e mensagem personalizada
  let situacao = "";
  let situacaoCor = "";
  let mensagemMotivacional = "";
  
  if (diferenca <= 20) {
    situacao = "Muito Bom";
    situacaoCor = "#4CAF50";
    mensagemMotivacional = "Você tem potencial! Só precisa manter o foco e a disciplina. Continue firme nos estudos e logo alcançará seu objetivo!";
  } else if (diferenca <= 40) {
    situacao = "Bom";
    situacaoCor = "#8BC34A";
    mensagemMotivacional = "Você está no caminho certo! Com mais dedicação e organização nos estudos, você conseguirá reduzir essa distância e conquistar sua vaga!";
  } else if (diferenca <= 60) {
    situacao = "Razoável";
    situacaoCor = "#FFC107";
    mensagemMotivacional = "Há um caminho a percorrer, mas nada é impossível! Revise seu método de estudos, busque ajuda e mantenha a consistência. Você consegue!";
  } else if (diferenca <= 80) {
    situacao = "Insuficiente";
    situacaoCor = "#FF9800";
    mensagemMotivacional = "A distância é considerável, mas não desanime! Intensifique seus estudos, busque apoio de professores e monte um plano de estudos sólido. Com determinação, você pode reverter isso!";
  } else {
    situacao = "Necessita Atenção";
    situacaoCor = "#F44336";
    mensagemMotivacional = "A diferença é grande, mas você não está sozinho! Considere reforço escolar, cursinhos preparatórios e um cronograma intensivo. Com esforço dedicado, tudo é possível!";
  }

  // Mapear curso e instituição
  const cursoNomes: { [key: string]: string } = {
    "160": "Medicina", "150": "Engenharia", "140": "Direito",
    "130": "Arquitetura", "120": "Odontologia", "110": "Psicologia",
    "100": "Administração", "90": "Ciências da Computação", "80": "Enfermagem",
    "70": "Farmácia", "60": "Fisioterapia", "50": "Veterinária",
    "40": "Nutrição", "30": "Educação Física", "20": "Ciências Biológicas",
    "10": "Pedagogia"
  };

  const instituicaoNomes: { [key: string]: string } = {
    "160": "USP", "150": "UNICAMP", "140": "UFRJ",
    "130": "UNESP", "120": "UFMG", "110": "UFRGS",
    "100": "UnB", "90": "UFSC", "80": "UFPR",
    "70": "UFC", "60": "UFV", "50": "UFPE",
    "40": "UFF", "30": "UFBA", "20": "UFSCar",
    "10": "UFPA"
  };

  const cursoNome = cursoNomes[curso] || "Não informado";
  const instituicaoNome = instituicaoNomes[instituicao] || "Não informada";

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>VestMath</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-social" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Card de Resultado */}
        <View style={styles.resultCard}>
          <View style={styles.resultBadge}>
            <Text style={styles.resultText}>Veja o seu Resultado</Text>
            <Text style={styles.resultSubtext}>e as informações que você adicionou</Text>
          </View>

          {/* Card de Dados */}
          <View style={styles.dataCard}>
            <Text style={styles.dataTitle}>Dados</Text>
            
            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>resiliência</Text>
              <Text style={styles.dataValue}>{resiliencia}</Text>
            </View>

            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>inteligência</Text>
              <Text style={styles.dataValue}>{inteligencia}</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>curso</Text>
              <Text style={styles.dataValue}>{cursoNome}</Text>
            </View>

            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>instituição</Text>
              <Text style={styles.dataValue}>{instituicaoNome}</Text>
            </View>
          </View>

          {/* Considerações Finais */}
          <View style={styles.considerationsCard}>
            <Text style={styles.considerationsTitle}>Considerações finais</Text>
            
            <View style={[styles.statusBadge, { backgroundColor: situacaoCor }]}>
              <Text style={styles.statusText}>Situação: {situacao}</Text>
            </View>

            <View style={styles.distanceBadge}>
              <Text style={styles.distanceText}>Distância: {diferenca}</Text>
            </View>

            <View style={styles.messageBox}>
              <Text style={styles.messageText}>{mensagemMotivacional}</Text>
              <View style={styles.avatarsRow}>
                <Ionicons name="person-circle" size={40} color="#2196F3" />
                <Ionicons name="person-circle" size={40} color="#FF9800" />
              </View>
            </View>

            <TouchableOpacity 
              style={styles.planButton}
              onPress={() => router.push("/home/home")}
            >
              <Text style={styles.planButtonText}>Voltar para página de perfil</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>VestMath</Text>
          <Text style={styles.footerSubtitle}>O seu progresso em um clique</Text>
          
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>Entradas</Text>
            <Text style={styles.footerLink}>Login</Text>
            <Text style={styles.footerLink}>Home</Text>
            <Text style={styles.footerLink}>Configurações</Text>
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
    backgroundColor: '#2C3E50',
  },
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#2C3E50',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  shareButton: {
    padding: 5,
  },
  resultCard: {
    margin: 20,
  },
  resultBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  resultSubtext: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 5,
  },
  dataCard: {
    backgroundColor: '#A8E6CF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  dataLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    textTransform: 'lowercase',
  },
  dataValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  separator: {
    height: 2,
    backgroundColor: '#2C3E50',
    marginVertical: 10,
    opacity: 0.3,
  },
  considerationsCard: {
    backgroundColor: '#34495E',
    borderRadius: 15,
    padding: 20,
  },
  considerationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  distanceBadge: {
    backgroundColor: '#2C3E50',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  distanceText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  messageBox: {
    backgroundColor: '#A8E6CF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  messageText: {
    fontSize: 13,
    color: '#2C3E50',
    lineHeight: 20,
    marginBottom: 15,
  },
  avatarsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  planButton: {
    backgroundColor: '#16A085',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  planButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#1A252F',
    padding: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  footerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  footerSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 20,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerLink: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  footerCopyright: {
    color: '#7F8C8D',
    fontSize: 12,
  },
});