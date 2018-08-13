import React,{Component} from 'react';
import {Text,StyleSheet} from 'react-native';

export default class Next extends Component{
    render(){
        return(
            <Text style={styles.text}>Next page</Text>
        );
    }
}

const styles = StyleSheet.create({
    text:{
        fontSize:40,
        color:'red'
    }
})