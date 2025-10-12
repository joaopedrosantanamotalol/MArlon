import { router, useRouter } from "expo-router";
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles/home";

export default function Home() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header com imagem de fundo */}
      <View style={styles.header}>
        <ImageBackground 
          source={require('../../assets/images/header.jpg')} 
          resizeMode="cover" 
          style={styles.imageHeader}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>VestMath</Text>
            <Text style={styles.headerSubtitle}>Calcule suas chances</Text>
          </View>
        </ImageBackground>
      </View>

      {/* Seção: Entenda Melhor nosso Projeto */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Entenda Melhor nosso Projeto</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardText}>
            o VestMath é um projeto que surgiu com a ideia de ajudar estudantes 
            que gostariam de verificar as chances que possuem para entrar na 
            faculdade ou universidade de seus sonhos através de um cálculo matemático
          </Text>
        </View>
      </View>

      {/* Seção: Como funciona nosso Cálculo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Como Funciona nosso calculo?</Text>
        
        <View style={styles.formulaMainCard}>
          <Text style={styles.formulaMainText}>
            Suas chances = (R+I = X) | (C+I = Y)
          </Text>
        </View>

        <View style={styles.explanationGrid}>
          <View style={styles.explanationCard}>
            <Text style={styles.explanationText}>
              A variável "R" significa sua resiliência, sua capacidade de se 
              aguentar pressão nos estudos
            </Text>
          </View>

          <View style={styles.explanationCard}>
            <Text style={styles.explanationText}>
              A variável "I" significa o curso que você deseja fazer
            </Text>
          </View>

          <View style={styles.explanationCard}>
            <Text style={styles.explanationText}>
              A variável "I" significa sua inteligência, a sua capacidade de 
              aprender novos conteúdos e o quanto você já possui
            </Text>
          </View>

          <View style={styles.explanationCard}>
            <Text style={styles.explanationText}>
              A variável "C" significa a instituição que você deseja, sendo 
              faculdade e universidade
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Após descobrir os valores de X e Y, vamos os colocar respectivamente em uma 
            reta numérica que vai de 0 até 100, onde X é a sua situação atual e Y você você 
            deseja, ao definirmos as posições, vamos contar quantas casas estão entre X e Y. 
            Após isso, você vai receber em porcentagem e com alguns gráficos para que 
            você entenderá a sua situação atual e o quanto você precisa melhorar
          </Text>
        </View>

        {/* Tabela de situações */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Número</Text>
            <Text style={styles.tableHeaderText}>Situação</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>04</Text>
            <Text style={styles.tableCell}>Muito Bom</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>05 a 07</Text>
            <Text style={styles.tableCell}>Bom</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>08 a 11</Text>
            <Text style={styles.tableCell}>Razoável</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>12 a 14</Text>
            <Text style={styles.tableCell}>Insuficiente</Text>
          </View>
          <View style={styles.tableRowLast}>
            <Text style={styles.tableCell}>15</Text>
            <Text style={styles.tableCell}>Péssimo</Text>
          </View>
        </View>
      </View>

      {/* Seção: Opiniões de usuários */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Veja algumas opiniões de nossos usuários</Text>
        
        <View style={styles.testimonialCard}>
          <View style={styles.testimonialHeader}>
            <View style={styles.avatarOrange} />
            <View style={styles.testimonialContent}>
              <Text style={styles.testimonialText}>
                "VestMath foi essencial para eu conseguir entrar na faculdade que 
                tanto sonhava, me ajudou a visualizar meu progresso"
              </Text>
              <Text style={styles.testimonialAuthor}>- Carlos Matia</Text>
            </View>
          </View>
        </View>

        <View style={styles.testimonialCard}>
          <View style={styles.testimonialHeader}>
            <View style={styles.testimonialContent}>
              <Text style={styles.testimonialText}>
                "Extremamente útil! Consegui mapear exatamente onde precisava 
                melhorar para alcançar minha nota de corte"
              </Text>
              <Text style={styles.testimonialAuthor}>- Ana Beatriz Santos</Text>
            </View>
            <View style={styles.avatarYellow} />
          </View>
        </View>
      </View>

      {/* Seção: CTA */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Está pronto para calcular seus sonhos?</Text>
        <Text style={styles.ctaSubtitle}>
          Clique no botão abaixo para criar sua conta e começar a utilizar o VestMath
        </Text>
        
        <View style={styles.ctaButton}>
            <TouchableOpacity onPress={() => router.push("/cadastro/cadastro")}>
          <Text style={styles.ctaButtonText}>Utilizar o VestMath</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Seção: Onde fazemos isso */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Onde fazemos isso?</Text>
        
        <View style={styles.locationCard}>
          <Text style={styles.locationTitle}>Usamos dados de universidades públicas</Text>
          <Text style={styles.locationSubtitle}>UNIFESP</Text>
        </View>
      </View>

      {/* Seção: Olha também que legal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Olha também que legal!</Text>
        
        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>📊</Text>
          <Text style={styles.featureText}>
            Criamos um fórum onde você pode interagir e trocar ideias com 
            outros estudantes!
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureIcon}>💬</Text>
          <Text style={styles.featureText}>
            Tudo projetado para você ter uma experiência amigável e intuitiva!
          </Text>
        </View>
      </View>

      {/* Seção: Está procurando mais opções */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Está procurando mais opções?</Text>
        
        <Text style={styles.subtitle}>
          Olha a baixo algumas outras que você também projetamos!
        </Text>

        <View style={styles.optionsContainer}>
          <View style={styles.optionCard}>
            <Text style={styles.optionIcon}>📱</Text>
            <Text style={styles.optionTitle}>VestMath APP</Text>
            <Text style={styles.optionDescription}>
              O aplicativo móvel do VestMath
            </Text>
          </View>

          <View style={styles.optionCard}>
            <Text style={styles.optionIcon}>🌐</Text>
            <Text style={styles.optionTitle}>VestMath WEB</Text>
            <Text style={styles.optionDescription}>
              Acesse de qualquer navegador
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>VestMath</Text>
        <Text style={styles.footerSubtitle}>O futuro do cálculo de notas</Text>
        
        <View style={styles.footerLinks}>
          <Text style={styles.footerLink}>Sobre</Text>
          <Text style={styles.footerLink}>Contato</Text>
          <Text style={styles.footerLink}>Termos</Text>
          <Text style={styles.footerLink}>Privacidade</Text>
        </View>
        
        <Text style={styles.footerCopyright}>© 2024 VestMath</Text>
      </View>
    </ScrollView>
  );
}