import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { auth, app } from "../../config/firebase";

interface Calculo {
  id: string;
  resiliencia: number;
  inteligencia: number;
  curso: number;
  instituicao: number;
  valorX: number;
  valorY: number;
  diferenca: number;
  timestamp: string;
  situacao: string;
}

export default function Historico() {
  const router = useRouter();
  const [calculos, setCalculos] = useState<Calculo[]>([]);
  const [loading, setLoading] = useState(true);

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

  const getSituacao = (diferenca: number) => {
    if (diferenca <= 20) return "Muito Bom";
    if (diferenca <= 40) return "Bom";
    if (diferenca <= 60) return "Razoável";
    if (diferenca <= 80) return "Insuficiente";
    return "Necessita Atenção";
  };

  const getSituacaoCor = (diferenca: number) => {
    if (diferenca <= 20) return "#4CAF50";
    if (diferenca <= 40) return "#8BC34A";
    if (diferenca <= 60) return "#FFC107";
    if (diferenca <= 80) return "#FF9800";
    return "#F44336";
  };

  const formatarData = (timestamp: string) => {
    const data = new Date(timestamp);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("Usuário não logado");
        setLoading(false);
        return;
      }

      const db = getFirestore(app);
      
      // Query simples sem orderBy (não precisa de índice)
      const q = query(
        collection(db, 'calculos'),
        where('userId', '==', user.uid)
      );

      const querySnapshot = await getDocs(q);
      const calculosData: Calculo[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        calculosData.push({
          id: doc.id,
          resiliencia: data.resiliencia,
          inteligencia: data.inteligencia,
          curso: data.curso,
          instituicao: data.instituicao,
          valorX: data.valorX,
          valorY: data.valorY,
          diferenca: data.diferenca,
          timestamp: data.timestamp,
          situacao: getSituacao(data.diferenca)
        });
      });

      // Ordenar manualmente do mais recente para o mais antigo
      calculosData.sort((a, b) => {
        const dateA = new Date(a.timestamp).getTime();
        const dateB = new Date(b.timestamp).getTime();
        return dateB - dateA; // Ordem decrescente (mais recente primeiro)
      });

      setCalculos(calculosData);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
      setLoading(false);
    }
  };

  const verDetalhes = (calculo: Calculo) => {
    router.push({
      pathname: "/perfil/perfil",
      params: {
        resiliencia: calculo.resiliencia.toString(),
        inteligencia: calculo.inteligencia.toString(),
        curso: calculo.curso.toString(),
        instituicao: calculo.instituicao.toString(),
        valorX: calculo.valorX.toString(),
        valorY: calculo.valorY.toString(),
        diferenca: calculo.diferenca.toString()
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>VestMath</Text>
          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Título */}
          <View style={styles.titleSection}>
            <Text style={styles.greeting}>Olá, Usuário</Text>
            <Text style={styles.subtitle}>Visualize aqui o seu histórico de cálculos</Text>
          </View>

          {/* Lista de Cálculos */}
          <View style={styles.calculosContainer}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>Carregando histórico...</Text>
              </View>
            ) : calculos.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="document-text-outline" size={80} color="#95A5A6" />
                <Text style={styles.emptyText}>Nenhum cálculo encontrado</Text>
                <Text style={styles.emptySubtext}>Faça seu primeiro cálculo para começar!</Text>
              </View>
            ) : (
              calculos.map((calculo) => (
                <TouchableOpacity 
                  key={calculo.id} 
                  style={styles.calculoCard}
                  onPress={() => verDetalhes(calculo)}
                >
                  <View style={styles.calculoIcon}>
                    <Ionicons name="calculator" size={30} color="#2C3E50" />
                  </View>
                  
                  <View style={styles.calculoInfo}>
                    <Text style={styles.calculoTitle}>
                      Objetivo: {cursoNomes[calculo.curso.toString()]} | Data: {formatarData(calculo.timestamp)}
                    </Text>
                    <Text style={styles.calculoSubtitle}>
                      Instituição: {instituicaoNomes[calculo.instituicao.toString()]}
                    </Text>
                    <View style={styles.calculoDetails}>
                      <View style={[styles.situacaoBadge, { backgroundColor: getSituacaoCor(calculo.diferenca) }]}>
                        <Text style={styles.situacaoText}>{calculo.situacao}</Text>
                      </View>
                      <Text style={styles.diferencaText}>Distância: {calculo.diferenca}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>

          {/* Botão Novo Planejamento */}
          <View style={styles.newPlanSection}>
            <Text style={styles.newPlanText}>Ou comece uma nova previsão</Text>
            <TouchableOpacity 
              style={styles.newPlanButton}
              onPress={() => router.push("/calculox/calculo")}
            >
              <Text style={styles.newPlanButtonText}>+ Fazer Novo Planejamento</Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>VestMath</Text>
            <Text style={styles.footerSubtitle}>O seu progresso em um clique</Text>
            <Text style={styles.footerCopyright}>© VestMath copyrights</Text>
          </View>
        </ScrollView>
      </View>
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
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flex: 1,
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
  menuButton: {
    padding: 5,
  },
  titleSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 5,
  },
  calculosContainer: {
    padding: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 10,
    color: '#7F8C8D',
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#7F8C8D',
    marginTop: 10,
    textAlign: 'center',
  },
  calculoCard: {
    flexDirection: 'row',
    backgroundColor: '#A8E6CF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  calculoIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  calculoInfo: {
    flex: 1,
  },
  calculoTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  calculoSubtitle: {
    fontSize: 11,
    color: '#2C3E50',
    marginBottom: 8,
  },
  calculoDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  situacaoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  situacaoText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  diferencaText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2C3E50',
  },
  newPlanSection: {
    padding: 20,
    alignItems: 'center',
  },
  newPlanText: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 15,
  },
  newPlanButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newPlanButtonText: {
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
    marginBottom: 10,
  },
  footerCopyright: {
    color: '#95A5A6',
    fontSize: 12,
  },
});