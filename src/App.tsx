import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React,{useState} from 'react'
import { currencyByRupee } from './components/constants'
import Snackbar from 'react-native-snackbar'



const App = () => {
  const [userInput, setUserInput] = useState("")
const [finalResult, setFinalResult] = useState<any>("")
const [selected, setSelected] = useState<any>("")
const Pressed=(currencyValue:Currency)=>{
  

  if(!userInput){
    Snackbar.show({
      text: 'Enter some amount',
      duration: Snackbar.LENGTH_SHORT,
      textColor:"#FFFFFF"
    });
  }
  
  const input = Number(parseFloat(userInput));
  if(!isNaN(input)){
  const result = currencyValue.value * input;
  
  setFinalResult(result.toFixed(2));
  setSelected(currencyValue);
  }
  else{
    Snackbar.show({
      text: 'Enter valid amount',
      duration: Snackbar.LENGTH_SHORT,
      textColor:"#FFFFFF"
    });
  }

}  
  return (
    <>
    <View style={styles.upperContainer}>
      <View style={styles.innerContainer}>
      <Text style={styles.text}>Enter Amount</Text>
      <TextInput keyboardType='numeric' style={styles.textArea} value={userInput} onChangeText={setUserInput} placeholder='Enter any amount' />
      <Text style={styles.localCurrency}>PKR</Text> 
      </View>     
      {finalResult && 
      <Text style={styles.finalResult}> {selected.symbol} {finalResult} </Text>}
    </View>
    
    <FlatList 
    numColumns={3}
    data={currencyByRupee}
    keyExtractor={(item)=>(item.name)}
    renderItem={({item})=>(
      <Pressable style={[styles.pressable, selected.name === item.name && styles.selected]} onPress={()=>{Pressed(item)}}>
        <Text>{item.name}</Text>
        <Text>{item.flag}</Text>
      </Pressable>
    )}

    />

        </>    
  )
}

export default App

const styles = StyleSheet.create({
  innerContainer:{
    flex:1,
    gap:15, 
    flexDirection:"row",
    height:25,
    alignItems:"center"
  },
  upperContainer:{
    height:100,
    alignItems:"center",
    justifyContent:"center",
    marginTop:50

  },
  text:{
    color:"#000000"
  },
  localCurrency:{
    color:"#000000",
    fontWeight:"bold"
  },
  textArea:{
    borderRadius:8,
    borderColor:"grey",
    borderWidth:1,
    width:150,
    paddingHorizontal:10
  },
  pressable:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:8,
    margin:10
  },
  selected:{
    backgroundColor:"orange"
  },
  finalResult:{
    color:"black",
    fontWeight:"bold",
    fontSize:14,
    flex:1,
    marginTop:20
  }
})
