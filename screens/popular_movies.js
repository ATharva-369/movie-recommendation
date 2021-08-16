import React from 'react';
import { View,Text,FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import {Card} from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';

export default class Popular_Movies extends React.Component {

constructor(props){
        super(props);
        this.state = {
            'data' : []
        }
}
componentDidMount = () =>{
    this.getMovie();
}

timeConversion = (num) =>{
    var h = Math.floor(num/60);
    var m = num%60 ;
    return `${h} hrs ${m} mins ` ;
}

getMovie = () =>{
    const URL = 'http://localhost:5000/popular';
    axios.get(URL).then((response) =>{
        this.setState({
            'data' : response.data.data
        })
    }).catch(error =>{
        console.log(error.message)
    })
}
keyExtractor = (item,index) =>{
index.toString();
}

renderItems = ({item,index}) =>{
return (
    <Card 
    key={`Card-${index}`} 
    image={{uri:item.poster_link}}
    imageProps = {{resizeMode:'cover'}}
    featuredTitle = {item.title}
    containerStyle = {s.cardContainer}
    featuredTitleStyle = {s.title}
    featuredSubtitle = {`${this.timeConversion(item.runtime)}`}
    featuredSubtitleStyle = {s.subtitle}
    ></Card>
)
}
 
render(){

    return(
        <View style={s.container} >
            <FlatList
            data = {this.state.data}
            keyExtractor = {this.keyExtractor}
            renderItem = {this.renderItems}
            />
        </View>
    )

}
}
const s = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white'
    },
    title : {
        color : 'white',
        alignSelf : 'flex-start',
        paddingLeft : RFValue(15),
        fontSize : RFValue(25),
        marginTop : RFValue(60) 
    },
    subtitle : {
        alignSelf : 'flex-start',
        paddingLeft : RFValue(15),
        fontSize : RFValue(15),     
    },
    cardContainer : {
        flex : 1,
        height : RFValue(100),
        marginBottom : RFValue(10),
        justifyContent : 'center',
        borderRadius : RFValue(10)
    }
})