import React from 'react';
//설치한 스택 네비게이션 라이브러리를 가져옵니다
import { createStackNavigator } from '@react-navigation/stack';

//페이지로 만든 컴포넌트들을 불러옵니다
import LoadingPage from '../pages/LoadingPage';
import FirstPage from '../pages/FirstPage';
import SecondPage from '../pages/SecondPage';

const Stack = createStackNavigator();

const StackNavigator = () =>{
    console.disableYellowBox = true;
    return(

        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >

        <Stack.Screen name="FirstPage" component={FirstPage} />
        <Stack.Screen name="LoadingPage" component={LoadingPage} />
        <Stack.Screen name="SecondPage" component={SecondPage} />
        </Stack.Navigator>
    );
}

export default StackNavigator;

