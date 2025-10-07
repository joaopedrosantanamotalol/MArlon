import { useRouter } from "expo-router";
import {LinearGradient} from "expo-linear-gradient";
import { Text, TextInput, TouchableOpacity, View,ScrollView } from "react-native";
import styles from "../styles/index";
export default function Index(){
    const router = useRouter();
    return(
    <>
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <LinearGradient style={styles.body} colors={['#59c64bff', '#2f466eff']} start={{x:-1, y:0}} end={{x:0,y:1}}>

    <Text style={styles.titulo}>Bem Vindo Marlon</Text>

    <Text style={styles.semi_titulo}>Faça seu Login</Text>

    <View style={styles.body_2}>
    <TextInput placeholder="Email" style={styles.input}></TextInput>
    <TextInput placeholder="Senha" style={styles.input}></TextInput>

    
      <TouchableOpacity style={styles.button} onPress={() => router.push("/home/home")}>
        <Text style={styles.buttonText}>Logar</Text>
      </TouchableOpacity>

    </View>

    </LinearGradient>
    </ScrollView>
    </>
    );
}