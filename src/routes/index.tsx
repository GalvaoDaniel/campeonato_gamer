import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from '../screens/home';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Competidor } from '../screens/competidor';

export type RootTabParamList ={
     Home: undefined;
     Competidor: {id: string};
}

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={Home}
          options={{
              tabBarIcon: ({color})=> (
                  <MaterialCommunityIcons name="home" color={color} size={26}/>                         ),
              title: 'Lista de Competidores'
          }}
        />
        <Tab.Screen
          name="Competidor"
          component={Competidor}
          options={{
            tabBarIcon: ({color})=> (
                <MaterialCommunityIcons name="account" color={color} size={26}/>                         ),
            title: 'Cadastro de competidor'
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}