import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import index from "../styles/index";
export default function Index(){
    const router = useRouter();
    return(
    <>

    <View style={index.body}>

    <Text style={index.titulo}>Bem Vindo Marlon</Text>

    <Text style={index.semi_titulo}>Faça seu Login</Text>

    <View style={index.body_2}>
    <TextInput placeholder="Email" style={index.input}></TextInput>
    <TextInput placeholder="Senha" style={index.input}></TextInput>

    
      <TouchableOpacity style={index.button} onPress={() => router.push("/cadastro/cadastro")}>
        <Text style={index.buttonText}>Clique aqui</Text>
      </TouchableOpacity>

    </View>

    </View>

    </>
    );
}