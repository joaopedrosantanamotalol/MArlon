import {LinearGradient} from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, ScrollView } from "react-native";
import styles from "../../styles/cadastro"
export default function Cadastro(){

    const router = useRouter();
    
    return(
    <>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <LinearGradient style={styles.body} colors={['#59c64bff', '#2f466eff']} start={{x:-1, y:0}} end={{x:0,y:1}}>

    <Text style={styles.titulo}>Bem Vindo</Text>

    <Text style={styles.semi_titulo}>Faça seu Cadastro</Text>

    <View style={styles.body_2}>

    <TextInput placeholder="Nome" style={styles.input}></TextInput>
    <TextInput placeholder="Email" style={styles.input}></TextInput>
    <TextInput placeholder="Senha" style={styles.input}></TextInput>

    
      <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
        <Text style={styles.buttonText}>Clique aqui</Text>
      </TouchableOpacity>

    </View>

    </LinearGradient>
    </ScrollView>
    </>
    );
}