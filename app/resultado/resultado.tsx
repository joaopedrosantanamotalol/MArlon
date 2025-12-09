import { useRouter, useLocalSearchParams } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';

export default function Resultado() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const valorX = parseInt(params.valorX as string);
  const valorY = parseInt(params.valorY as string);
  const diferenca = parseInt(params.diferenca as string);

  // Determinar situação e mensagem
  let situacao = "";
  let situacaoCor = "";
  let mensagem = "";
  
  if (diferenca <= 20) {
    situacao = "Muito Bom";
    situacaoCor = "#4CAF50";
    mensagem = "Excelente! Você está muito próximo do seu objetivo. Continue com dedicação e em breve alcançará seus sonhos. Seu esforço está dando resultados!";
  } else if (diferenca <= 40) {
    situacao = "Bom";
    situacaoCor = "#8BC34A";
    mensagem = "Você está no caminho certo! Com um pouco mais de esforço e persistência, você alcançará seu objetivo. Continue focado nos seus estudos!";
  } else if (diferenca <= 60) {
    situacao = "Razoável";
    situacaoCor = "#FFC107";
    mensagem = "Você está progredindo, mas ainda há um caminho a percorrer. Mantenha o foco, organize seus estudos e dedique-se com consistência. O sucesso virá!";
  } else if (diferenca <= 80) {
    situacao = "Insuficiente";
    situacaoCor = "#FF9800";
    mensagem = "Há uma distância considerável entre você e seu objetivo. Não desanime! Revise seu plano de estudos, busque apoio e intensifique sua dedicação. Você consegue!";
  } else {
    situacao = "Necessita Atenção";
    situacaoCor = "#F44336";
    mensagem = "A diferença é significativa, mas isso não significa impossível. Reavalie suas estratégias, busque orientação e comprometa-se com um plano intensivo. Com determinação, você pode reverter essa situação!";
  }

  // Calcular posição do Y no gráfico (0-100%)
  const maxValue = 320;
  const yPosition = (valorY / maxValue) * 100;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push("/home/home")} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#4CAF50" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>VestMath</Text>
          <TouchableOpacity style={styles.saveButton}>
            <Ionicons name="bookmark-outline" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        {/* Card Principal */}
        <View style={styles.mainCard}>
          <Text style={styles.mainTitle}>
            Veja as informações que calculamos e o seu resultado
          </Text>

          {/* Card de Dados */}
          <View style={styles.dataCard}>
            <Text style={styles.dataTitle}>Dados</Text>
            
            <View style={styles.dataGrid}>
              <View style={styles.dataRow}>
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>Sua Resiliência (mental)</Text>
                  <View style={styles.dataValueBox}>
                    <Text style={styles.dataValue}>{params.resiliencia}</Text>
                  </View>
                </View>
                
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>Sua Inteligência</Text>
                  <View style={styles.dataValueBox}>
                    <Text style={styles.dataValue}>{params.inteligencia}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.dataRow}>
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>Seu Curso</Text>
                  <View style={styles.dataValueBox}>
                    <Text style={styles.dataValue}>{params.curso}</Text>
                  </View>
                </View>
                
                <View style={styles.dataItem}>
                  <Text style={styles.dataLabel}>Sua Instituição</Text>
                  <View style={styles.dataValueBox}>
                    <Text style={styles.dataValue}>{params.instituicao}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Resultado */}
          <View style={styles.resultSection}>
            <Text style={styles.resultTitle}>Resultado</Text>
            
            {/* Régua numérica melhorada */}
            <View style={styles.ruler}>
              <View style={styles.rulerLine} />
              
              {/* Marcadores principais */}
              {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((num) => (
                <View key={num} style={[styles.rulerMark, { left: `${(num / 320) * 100}%` }]}>
                  <View style={styles.rulerTick} />
                  <Text style={styles.rulerNumber}>{num}</Text>
                </View>
              ))}

              {/* Marcador X */}
              <View style={[styles.markerContainer, { left: `${(valorX / 320) * 100}%` }]}>
                <View style={[styles.marker, { backgroundColor: '#2196F3' }]}>
                  <Text style={styles.markerText}>X</Text>
                </View>
                <View style={styles.markerLine} />
                <Text style={styles.markerValue}>{valorX}</Text>
              </View>

              {/* Marcador Y - posição dinâmica */}
              <View style={[styles.markerContainer, { left: `${yPosition}%`, top: 35 }]}>
                <View style={[styles.marker, { backgroundColor: '#4CAF50' }]}>
                  <Text style={styles.markerText}>Y</Text>
                </View>
                <View style={styles.markerLine} />
                <Text style={styles.markerValue}>{valorY}</Text>
              </View>
            </View>
          </View>

          {/* Considerações Finais */}
          <View style={styles.considerationsCard}>
            <Text style={styles.considerationsTitle}>Considerações Finais</Text>
            
            <View style={styles.badgeContainer}>
              <View style={[styles.badge, { backgroundColor: situacaoCor }]}>
                <Text style={styles.badgeText}>Situação: {situacao}</Text>
              </View>
              
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Diferença: {diferenca}</Text>
              </View>
            </View>

            <View style={styles.messageBox}>
              <Ionicons name="person-circle" size={50} color="#2196F3" style={styles.avatar} />
              <Text style={styles.messageText}>{mensagem}</Text>
            </View>

            <TouchableOpacity 
              style={styles.planButton}
              onPress={() => router.push("/home/home")}
            >
              <Text style={styles.planButtonText}>Voltar para página inicial</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>VestMath</Text>
          <Text style={styles.footerSubtitle}>O seu progresso em um clique</Text>
          
          <View style={styles.footerContent}>
            <View style={styles.footerLinks}>
              <Text style={styles.footerLinkTitle}>Contatos</Text>
              <View style={styles.socialIcons}>
                <Ionicons name="logo-github" size={24} color="#FFFFFF" />
                <Ionicons name="mail" size={24} color="#FFFFFF" />
              </View>
            </View>
            
            <View style={styles.footerCenter}>
              <View style={styles.logoCircle}>
                <Text style={styles.logoText}>V-Math</Text>
              </View>
            </View>
            
            <View style={styles.footerLinks}>
              <Text style={styles.footerLinkTitle}>Páginas</Text>
              <Text style={styles.footerLink}>Entrar</Text>
              <Text style={styles.footerLink}>Login</Text>
              <Text style={styles.footerLink}>Home</Text>
            </View>
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
  saveButton: {
    padding: 5,
  },
  mainCard: {
    margin: 20,
  },
  mainTitle: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
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
  dataGrid: {
    gap: 15,
  },
  dataRow: {
    flexDirection: 'row',
    gap: 15,
  },
  dataItem: {
    flex: 1,
  },
  dataLabel: {
    fontSize: 12,
    color: '#2C3E50',
    marginBottom: 5,
  },
  dataValueBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  dataValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  resultSection: {
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 30,
  },
  ruler: {
    height: 120,
    position: 'relative',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  rulerLine: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#E0E0E0',
  },
  rulerMark: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
    transform: [{ translateX: -15 }],
  },
  rulerTick: {
    width: 2,
    height: 10,
    backgroundColor: '#999',
    marginBottom: 5,
  },
  rulerNumber: {
    fontSize: 10,
    color: '#666',
    fontWeight: '600',
  },
  markerContainer: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -20 }],
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  markerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  markerLine: {
    width: 2,
    height: 15,
    backgroundColor: '#666',
    marginVertical: 3,
  },
  markerValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#FFF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  considerationsCard: {
    backgroundColor: '#2C3E50',
    borderRadius: 15,
    padding: 20,
  },
  considerationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  badge: {
    flex: 1,
    backgroundColor: '#34495E',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  messageBox: {
    backgroundColor: '#A8E6CF',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  avatar: {
    flexShrink: 0,
  },
  messageText: {
    flex: 1,
    fontSize: 13,
    color: '#2C3E50',
    lineHeight: 18,
  },
  planButton: {
    backgroundColor: '#16A085',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  planButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
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
    marginBottom: 30,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  footerLinks: {
    alignItems: 'flex-start',
  },
  footerLinkTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  footerLink: {
    color: '#95A5A6',
    fontSize: 14,
    marginBottom: 5,
  },
  footerCenter: {
    alignItems: 'center',
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#16A085',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerCopyright: {
    color: '#95A5A6',
    fontSize: 12,
  },
});