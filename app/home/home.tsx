import { ScrollView, View, Text, ImageBackground } from "react-native";
import styles from "../../styles/home";

export default function home(){
    return(
        <>
        <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.header}>
        <ImageBackground source={require('../../assets/images/header.jpg')} resizeMode="cover" style={styles.image_header}>
        
        </ImageBackground>
        </View>

        <View style={styles.body_2}>
        <Text style={styles.titulo}>Entenda Melhor nosso Projeto</Text>
        </View>

        </ScrollView>
        </>
    )
}