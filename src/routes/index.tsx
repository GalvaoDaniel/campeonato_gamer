import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text } from 'react-native';
import Home from '../screens/home';
import Competidor from '../screens/competidor';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Competidor" component={Competidor} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}

// import React from "react";
// import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Home } from "../screens/home";
// import { MaterialCommunityIcons } from '@expo/vector-icons'; 
// import { Usuario } from "../screens/usuario";


// export type RootTabParamList ={
//     Home: undefined;
//     Usuario: {id: string};
// }

// const Tab = createBottomTabNavigator<RootTabParamList>()

// const MyTheme = {
//     ...DefaultTheme,
//     colors:{
//         ...DefaultTheme.colors,
//         primary: 'blue',
//         backround: 'white',
//     }
// }

// export const Routes = ()=>{

//     return(
//         <NavigationContainer theme={MyTheme}>
//             <Tab.Navigator>
//                 <Tab.Screen
//                     name="Home"
//                     component={Home}
//                     options={{
//                         tabBarIcon: ({color})=> (
//                             <MaterialCommunityIcons name="home" color={color} size={26}/>                         ),
//                         title: 'Lista de Usuário'
//                     }}
//                 />
//                 <Tab.Screen
//                     name="Competido"
//                     component={Usuario}
//                     options={{
//                         tabBarIcon: ({color})=> (
//                             <MaterialCommunityIcons name="account-multiple-plus" color={color} size={26}/>                         ),
//                         title: 'Cadastro'
//                     }}
//                 />
//             </Tab.Navigator>
            
//         </NavigationContainer>


//     )
// }