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
height: 60,
backgroundColor: "yellow"
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
marginTop:10,
},
container:{
  justifyContent: "center",
  alignItems: "center",  // <- centraliza horizontalmente
  flex:1,
  backgroundColor: "red",
  height:0         
},
card:{
  height:100,
  width:"80%",
backgroundColor:"#33313B",
color: "white",
textAlign:"center",
verticalAlign:"middle",
paddingLeft:20,
paddingRight:20,
marginBottom:400,
borderRadius:30,
},
});