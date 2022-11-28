import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native'
import Adicionar from './screens/Adicionar'
import Detalhes from './screens/Detalhes'
import Editar from './screens/Editar'
import Home from './screens/Home'

const Stack = createStackNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Detalhes' component={Detalhes} />
                <Stack.Screen name='Editar' component={Editar} />
                <Stack.Screen name='Adicionar' component={Adicionar} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
