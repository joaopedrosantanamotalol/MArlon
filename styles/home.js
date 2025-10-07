import { StyleSheet } from 'react-native';

export default StyleSheet.create({
header:{
alignItems: "center",
justifyContent: "flex-start",
height:250
},
  scrollContainer: {
    flexGrow: 1, // faz o conteúdo ocupar pelo menos toda a tela
},
body_2:{
flex: 1,
alignItems: "center",
justifyContent: "flex-start",
height: "100%",
backgroundColor: "#FFFFFF"
},
image_header:{
width: "100%",
height: "100%"
},
titulo:{
fontSize: 20,
color: "#000000",
textAlign: "center",
fontWeight: "bold",
marginTop:10
}
});