import React from 'react';
import { StyleSheet, Text, View ,TextInput , ScrollView , TouchableOpacity , Image } from 'react-native';
import Note from './Note';
import * as Speech from 'expo-speech';

export default class Main extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
            placeHolder:'',
        }
        this.addNote = this.addNote.bind(this);
    }

//TextInput באלמנט placeholder ומכניסה אותם לתוך words הפונקציה עוברת על כל התווים במערך  
    componentDidMount(){
        let i = 0;
        const words = ['I','n','s','e','r','t',' ','S','o','m','e','t','h','i','n','g',' ',' ',' '];
        let w = ""
        setInterval(() => {
          w += words[i];
          this.setState({placeHolder: w});
          i++;
          if(i == words.length){
              i = 0;
              w = "";
            }
          }
          , 150);
  }
    
    render(){
    
      //notes לתוך המשתנה  Note החזרת קומפוננטות 
        let notes = this.state.noteArray.map((val , key) => {
                return< Note  key = {key} keyval ={key} val ={val} 
                        deleteMethod ={() => this.deleteNote(key)}
                        speakerAgain ={() => this.speakNote(key)}
                        />
        });
    
    return (
      <View style={styles.container}>

          <View style ={styles.header}>
            <Text style ={styles.headerText}>
                    ToDo...
            </Text>
          </View>
       {/* + לאחר לחיצה על כפתור ה  Note מקבל את כל קומפוננטות ScrollView */}
          <ScrollView  style = {styles.arrNotes}>
                {notes}
          </ScrollView>

          <TouchableOpacity style ={styles.addButton} onPress ={this.addNote}>
                    <Image style ={styles.img} source ={require('../img/icons8-plus.gif')}/>
          </TouchableOpacity>

          <View style ={styles.footer}>
              <TextInput 
                style ={styles.textInput}
                onChangeText = {(noteText) => this.setState({noteText})}
                value ={this.state.noteText}
                placeholder = {this.state.placeHolder} 
                placeholderTextColor = "#fff"
                underlineColorAndroid = "transparent">
              </TextInput>
          </View>
       
      </View>
    );
  }

  //noteArray לתוך המערך Note הפונקציה מוסיפה קומפוננטת 
  addNote (){
    let thingToSay = this.state.noteText;
     if(thingToSay === '' ){
        Speech.speak("Empty, insert something" ,{
          language: 'en',
          pitch: 1,
          rate: 1,
        });
     }
     if(thingToSay){
            var date = new Date();
            var day = date.getDate();
            var month = (date.getMonth() + 1);
            var hour = date.getHours();
            var minutes = date.getMinutes();
            if(day < 10 ){
                day = "0" + day;
            }
            if(month < 10 ){
                month = "0" + month;
            }
            if(hour < 10 ){
                hour = "0" + hour;
            }
            if(minutes < 10 ){
                minutes = "0" + minutes;
            }
            this.state.noteArray.push({
                'date': day +
                "/" + month +
                "/" + date.getFullYear(),
                'time': hour +
                ":" + minutes,
                'note': this.state.noteText,
              
            });
            this.setState({noteArray: this.state.noteArray})
            this.setState({noteText: ''})
        }
        thingToSay = this.state.noteText;
        Speech.speak(thingToSay ,{
          language: 'en',
          pitch: 1,
          rate: 1,
        });
  }

  //Note הפונקציה מסירה מהמערך קומפוננטות 
  deleteNote(key){
    let thingToSay = `The note ${this.state.noteArray[key].note} was deleted `;
      this.state.noteArray.splice(key , 1);
      this.setState({noteArray: this.state.noteArray})
      Speech.speak(thingToSay ,{
        language: 'en',
        pitch: 1,
        rate: 1,
      });
  }

  //Note הפונקציה משמיעה את שם ה 
  speakNote(key){
    let thingToSay = this.state.noteArray[key].note;
    Speech.speak(thingToSay ,{
      language: 'en',
      pitch: 1,
      rate: 1,
    });
  }
}


// Main עבור קומפוננטת css
const styles = StyleSheet.create({
  container: {
    flex:1,
  },

  header:{
        backgroundColor: '#F7D737',
        alignItems: 'center',
        justifyContent:'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
  },

  headerText:{
      color:'blue',
      fontSize: 30,
      padding: 26 ,
      letterSpacing: 3,
      fontWeight: '900',
  },

  arrNotes:{
        flex: 1,
        marginBottom: 100,
  },

  footer:{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0 ,
      zIndex: 10,
  },

  textInput:{
        color : '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#F7D737',
  },
  
  addButton:{
      position: 'absolute',
      zIndex: 11,
      left: 20,
      bottom: 90,
      width: 90,
      height: 90,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
  },

  img:{
    width: 55,
    height: 55,
    borderRadius: 50,
  },
});
