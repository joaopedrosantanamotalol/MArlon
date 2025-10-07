import { StyleSheet } from "react-native";

export default StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop:100
  },
  body_2:{
   flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    height: "auto",
    marginTop:150
  },
  titulo: {
    fontSize: 30,
    color: "#fff",
    textAlign: "center", // centraliza o texto
  },
  semi_titulo:{
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    marginTop: 10
  },
  input:{
    backgroundColor: "#ede1e1ff",
    borderWidth: 2,
    borderColor: "#59c64bff",
    minWidth:250,
    width: "100%",
    height: 55,
    borderRadius: 30,
    paddingLeft: 10,
    marginBottom:60
  },
 container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#1e3c72",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});