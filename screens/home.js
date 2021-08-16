import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Image } from 'react-native';
import { Header,AirbnbRating, Icon } from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import axios from 'axios';

export default class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            'movieDetails' : {}
        }
    }

    componentDidMount = () =>{
        this.getMovie();
    }

    timeConversion = (num) =>{
        var h = Math.floor(num/60);
        var m = num%60 ;
        return `${h} hrs ${m} mins `
    }

    getMovie = () =>{
        const URL = 'http://localhost:5000/movies';
        axios.get(URL).then((response) =>{
            let details = response.data.data ;
            details['runtime']=this.timeConversion(details.runtime) ;
            this.setState({
                'movieDetails' : details
            })
        }).catch(error =>{
            console.log(error.message)
        })
    }

    likedMovie = () =>{
        const URL = 'http://localhost:5000/liked';
        axios.post(URL).then((response) =>{
            this.getMovie()   
        }).catch(error =>{
            console.log(error.message)
        })
    }

    dislikedMovie = () =>{
        const URL = 'http://localhost:5000/disliked';
        axios.post(URL).then((response) =>{
            this.getMovie()   
        }).catch(error =>{
            console.log(error.message)
        })
    }

    unwatchedMovie = () =>{
        const URL = 'http://localhost:5000/unwatched';
        axios.post(URL).then((response) =>{
            this.getMovie()   
        }).catch(error =>{
            console.log(error.message)
        })
    }

render(){
    return(
        <View style={s.container} >

            <View style={s.headerContainer}>
                <Header centerComponent = {
                    {
                        'text' : 'Recommend Movies',
                        'style' : s.headerTitle,
                    }
                }
                        rightComponent = {{
                            'icon' : 'search',
                            'color' : 'white',
                        }}
                        backgroundColor = {'#D600F9'}
                        containerStyle = {{
                            flex:1,
                        }}
                />
            </View>
            <View style = {s.subContainer}>
                <View style = {s.subTopContainer}> 

                        <Image style={s.poster} source = {{uri:this.state.movieDetails.poster_link}} />

                </View>
                <View style = {s.subBottomContainer}>
                    <View style = {s.upperBottomContainer}>

                        <Text style = {s.title} >{this.state.movieDetails.original_title}</Text>
                        <Text style = {s.subtitle} >{`${this.state.movieDetails.runtime}`}</Text>

                    </View>
                    <View style = {s.middleBottomContainer}>
                        <View style={{flex:0.3}}>
                            <AirbnbRating count = {10} reviews = {['','','','','']} defaultRating={this.state.movieDetails.rating} isDisabled={true} size={RFValue(25)} 
                             starContainerStyle={{marginTop : -30}} />
                        </View>
                    <View style={{flex:0.7, padding:15}}><Text style ={s.overview}>{this.state.movieDetails.overview}</Text> </View>
                    </View>
                    <View style = {s.lowerBottomContainer}>

                        <View style={s.iconButtoncontainer}> 
                            <TouchableOpacity onPress={this.likedMovie } >
                            <Icon name={'cross'} type={'entypo'} size={RFValue(30)} color={'#ff1144'} />                            
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.dislikedMovie } >
                            <Icon name={'cross'} type={'entypo'} size={RFValue(30)} color={'#ff1144'} />
                            </TouchableOpacity>     

                        </View>
                        <View style={s.buttonContainer}>

                            <TouchableOpacity onPress={this.unwatchedMovie} style={s.button} >
                                <Text style={s.buttonText} >Did not watch</Text>
                            </TouchableOpacity>

                        </View>     

                    </View>
                </View>
           </View>

        </View>
    )
    return null;
}
}

const s = StyleSheet.create({
    'container' : {
        flex: 1,
    },

    'headerContainer' : {
        flex : 0.1,
    },

    'headerTitle' : {
        color : 'white',
        fontWeight : 'bold',
        fontSize : RFValue(18),
    },

    'subContainer' : {
        flex : 0.9,
    },

    'subTopContainer' : {
        flex : 0.4,
        alignItems : 'center',
        justifyContent : 'center',
    },

    'poster' : {
        width : '60%',
        height : '90%',
        resizeMode : 'stretch',
        borderRadius : RFValue(30),
        marginHorizontal : RFValue(10),
    },
    'iconButtoncontainer' : {

    },
    'buttonContainer' : {

    },
    'button' : {

    },
    'buttonContainer' : {

    },
    'buttonText' : {
        
    }
})