import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Home,
  Board,
  Finish
} from './screens'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Start" component={Home} />
          <Stack.Screen name="Board" component={Board} />
          <Stack.Screen name="Finish" component={Finish} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}