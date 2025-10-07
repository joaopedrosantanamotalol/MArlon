import { useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import index from "../../styles/cadastro";
export default function Index(){
    const router = useRouter();
    return(
    <>

    <View style={index.body}>

    <Text style={index.titulo}>Bem Vindo</Text>

    <Text style={index.semi_titulo}>Faça seu Cadastro</Text>

    <View style={index.body_2}>

    <TextInput placeholder="Nome" style={index.input}></TextInput>
    <TextInput placeholder="Email" style={index.input}></TextInput>
    <TextInput placeholder="Senha" style={index.input}></TextInput>

    
      <TouchableOpacity style={index.button} onPress={() => router.push("/")}>
        <Text style={index.buttonText}>Clique aqui</Text>
      </TouchableOpacity>

    </View>

    </View>

    </>
    );
}