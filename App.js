/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,FlatList,Image,Alert,Button} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Next from "./Next";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


type Props = {};
class App extends Component<Props> {
  REQUEST_URL =
        "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

  constructor(){
    super();
    this.state={data:null}
    this.selectMovies=this.selectMovies.bind(this)
  }

    componentDidMount() {
      this.selectMovies()
    }

    selectMovies() {
        fetch(this.REQUEST_URL)
            .then(resp=>{
              return resp.json();
            })
            .then(respJson=>{
              this.setState({data:respJson.movies})
            })
            .catch(error=>{
              console.error('请求异常！')
            })
    }

  render() {
      let {navigate} = this.props.navigation;
    return (
        <View style={{flex:1}}>
            <Button title={'跳转'} onPress={()=>{return navigate('next')}}/>
      <FlatList style={styles.list} data={this.state.data} renderItem ={this.renderTextModel}/>
        </View>
            );
  }

  renderTextModel({item}){
    return(
      <View style={styles.box}>
          <Image source={{uri: item.posters.thumbnail}} style={styles.image} />
          <View style={styles.msg}>
              <Text style={styles.texts}>{item.title}</Text>
              <Text style={styles.texts}>{item.year}</Text>
          </View>
      </View>
    )
  }
}

const screens = StackNavigator(
    {
        home:{screen: App},
        next:{screen:Next},
    },
);

export default screens;

const styles = StyleSheet.create({
    list:{
      backgroundColor:'skyblue',
    },
    box:{
      backgroundColor: 'rgba(0,0,0,.1)',
      flexDirection: 'row',
        marginTop: 20
    },
    image:{
      width:150,
      height:200
    },
    msg:{
      flexDirection: 'column',
       flex:1
    },
    texts:{
      fontSize:25,
      color:'white'
    }
});
