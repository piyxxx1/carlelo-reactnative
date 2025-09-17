import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import PhoneLoginScreen from './src/screens/PhoneLoginScreen';
import OTPVerificationScreen from './src/screens/OTPVerificationScreen';
import PersonalDetailsScreen from './src/screens/PersonalDetailsScreen';
import InspectionLoginScreen from './src/screens/InspectionLoginScreen';
import TermsOfServiceScreen from './src/screens/TermsOfServiceScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import MainAppNavigator from './src/components/MainAppNavigator';

const Stack = createStackNavigator();

// Create Auth Context
export const AuthContext = createContext();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  const logout = () => {
    console.log('Logout called, setting isAuthenticated to false');
    setIsAuthenticated(false);
    setUserData(null); // Clear user data on logout
  };

  const login = (userDetails = null) => {
    console.log('Login called, setting isAuthenticated to true');
    setIsAuthenticated(true);
    if (userDetails) {
      setUserData(userDetails);
    }
  };

  const updateUserData = (newUserData) => {
    setUserData(prev => ({ ...prev, ...newUserData }));
  };

  return (
    <AuthContext.Provider value={{ 
      logout, 
      login, 
      isAuthenticated, 
      userData, 
      updateUserData 
    }}>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor="#ffffff" />
        <Stack.Navigator 
          screenOptions={{ headerShown: false }}
          key={isAuthenticated ? 'authenticated' : 'unauthenticated'}
        >
          {!isAuthenticated ? (
            // Authentication flow
            <>
              <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} />
              <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
              <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
              <Stack.Screen name="InspectionLogin" component={InspectionLoginScreen} />
              <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            </>
          ) : (
            // Authenticated user sees main app
            <Stack.Screen name="MainApp" component={MainAppNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
