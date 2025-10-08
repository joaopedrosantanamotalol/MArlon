import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: 250,
  },
  scrollContainer: {
    flexGrow: 1, // Faz o conteúdo ocupar pelo menos toda a tela
  },
  body_2: {
    height:"15%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "yellow",
    padding: 0, // Ajustando o padding para um melhor controle
  },
  image_header: {
    width: "100%",
    height: "100%",
  },
  titulo: {
    fontSize: 20,
    color: "#000000",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: "auto",
  },
  container: {
    justifyContent: "center",
    alignItems: "center", // Centraliza horizontalmente
    backgroundColor: "red",
    height: "5%",
  },
  card: {
    height: 100,
    width: "auto",
    maxWidth:350,
    backgroundColor: "#33313B",
    color: "white",
    textAlign: "center",
    verticalAlign: "middle",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 400,
    borderRadius: 30,
    marginTop:15,
  },
  card2: {
    height: 50,
    maxWidth:300,
    width: "auto",
    backgroundColor: "#33313B",
    color: "white",
    textAlign: "center",
    verticalAlign: "middle",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom:15,
    borderRadius: 30,
    marginTop:15,
  },
  card_lateral: {
    height: 50,
    maxWidth:250,
    width: "auto",
    backgroundColor: "#33313B",
    color: "white",
    textAlign: "center",
    verticalAlign: "middle",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 400,
    borderRadius: 30,
    marginTop:15,
  },
});
