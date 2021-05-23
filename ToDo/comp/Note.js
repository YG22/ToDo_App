import React from 'react';
import {StyleSheet, Text, View , TouchableOpacity , Image,} from 'react-native';

export default class Note extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            styleNote:{
                backgroundColor: '#fff',
                position: 'relative',
                padding: 20,
                //paddingRight: 10,
                width: '80%',
                marginTop: 20,
                marginLeft: 65,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,
                elevation: 5,
            },
            dis: false,
        }
        this.disabledNote = this.disabledNote.bind(this);
    }
  render(){

    return (
    <View >
      <View key = {this.props.keyval} style ={this.state.styleNote} >
          <Text style ={styles.noteText}>
              {this.props.val.date}
          </Text>
          <Text style ={styles.noteText}>
              {this.props.val.time}
          </Text>
          <Text style ={styles.noteText}>
              {this.props.val.note}
          </Text>
          
          <TouchableOpacity onPress ={this.props.deleteMethod} style = {styles.noteDelete}>
                    <Image style ={styles.img} source ={require('../img/delete.gif')}/>
          </TouchableOpacity>

          <TouchableOpacity onPress ={this.props.speakerAgain} style = {styles.speaker}>
                    <Image style ={styles.img} source ={require('../img/speaker.gif')}/>
          </TouchableOpacity>
      </View>

      <View style={styles.btn}>
                <TouchableOpacity  onPress ={this.disabledNote}>
                        <Image style ={styles.img} source ={require('../img/checkbox.gif')}/>
                </TouchableOpacity>
        </View>
    </View>
    );
  }
  disabledNote(){
    if(!this.state.dis){
        this.setState({
            styleNote:{
                opacity: 0.3,
                position: 'relative',
                padding: 20,
                paddingRight: 10,
                borderBottomWidth: 1,
                width: '80%',
                marginLeft: -150,
                marginTop: 20,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,
                elevation: 25,
            },
            dis: true,
        })
    }
    else{
        this.setState({
            styleNote:{
                backgroundColor: '#fff',
                position: 'relative',
                padding: 20,
                //paddingRight: 10,
                width: '80%',
                marginTop: 20,
                marginLeft: 65,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 7,
                },
                shadowOpacity: 0.43,
                shadowRadius: 9.51,
                elevation: 5,
            },
            dis: false,
        })
    }
}
}


// Note עבור קומפוננטת css

const styles = StyleSheet.create({

    noteText:{
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#3333FF',
    },

    noteDelete:{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ededed82',
        padding: 10,
        top: 10,
        bottom: 10,
        left: 10,
    },

    speaker:{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        top: 10,
        bottom: 10,
        left: 70,
    },

    img:{
        width: 35,
        height: 35,
    },

    btn:{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        top: 40,
        bottom: 10,
        left: 5,
        //left: 5
    },
});
