import React from 'react';
import { View,Text } from 'react-native';
import Home from './screens/home';
import Recommend from './screens/recommended';
import Popular_Movies from './screens/popular_movies';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';

export default class App extends React.Component {
render(){
    return(
        <AC/>
    )
}
}
const TN = createMaterialTopTabNavigator({
    'Recommended' : {
        screen : Recommend,
        navigationOptions : {
            tabBarLabel : 'Recommended',
            tabBarOptions : {
                tabStyle : {backgroundColor : 'white'},
                labelStyle : {color: 'black'},
                indicatorStyle : {backgroundColor : 'black'}
            }
        }
    },
    'Popular' : {
        screen : Popular_Movies,
        navigationOptions : {
            tabBarLabel : 'Popular',
            tabBarOptions : {
                tabStyle : {backgroundColor : 'white'},
                labelStyle : {color: 'black'},
                indicatorStyle : {backgroundColor : 'black'}
            }
        }
    }

})
const AS = createStackNavigator({
Home : {screen : Home , navigationOptions : {headerShown : false} },
TN : {screen : TN , navigationOptions : {headerShown : false} }
},{initialRouteName : 'Home'})

const AC = createAppContainer(AS) ;
