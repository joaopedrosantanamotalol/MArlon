import React from "react";
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

        <View style={styles.container}>

        <Text style={styles.card}>o VestMath é um projeto que surgiu com a ideia de ajudar estudantes
que gostariam de  verificar as chances que possuem 
para entrar na faculdade ou universidade de seus sonhos 
através de um calculo matemático</Text>

        
        </View>

        <View style={styles.body_2}>
        <Text style={styles.titulo}>Como funciona nosso Calculo?</Text>
        </View>

        </ScrollView>

        </>
    )
}