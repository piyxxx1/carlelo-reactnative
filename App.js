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
import { InspectionScreen, CarDetailsInspection } from './src/screens/inspection';
import ExteriorTyresInspection from './src/screens/inspection/ExteriorTyresInspection';
import ElectricalInteriorInspection from './src/screens/inspection/ElectricalInteriorInspection';
import EngineTransmissionInspection from './src/screens/inspection/EngineTransmissionInspection';
import SteeringSuspensionBrakesInspection from './src/screens/inspection/SteeringSuspensionBrakesInspection';
import AirConditioningInspection from './src/screens/inspection/AirConditioningInspection';
import ComponentIssueScreen from './src/screens/inspection/ComponentIssueScreen';

const Stack = createStackNavigator();

// Create Auth Context
export const AuthContext = createContext();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isInspectionMode, setIsInspectionMode] = useState(false);

  const logout = () => {
    console.log('Logout called, setting isAuthenticated to false');
    setIsAuthenticated(false);
    setUserData(null); // Clear user data on logout
    setIsInspectionMode(false); // Reset inspection mode
  };

  const login = (userDetails = null) => {
    console.log('Login called, setting isAuthenticated to true');
    setIsAuthenticated(true);
    if (userDetails) {
      setUserData(userDetails);
      // Check if user is inspection user
      if (userDetails.userType === 'inspection') {
        setIsInspectionMode(true);
      }
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
          key={isAuthenticated ? (isInspectionMode ? 'inspection' : 'main') : 'unauthenticated'}
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
          ) : isInspectionMode ? (
            // Inspection user sees inspection screens
            <>
              <Stack.Screen name="Inspection" component={InspectionScreen} />
              <Stack.Screen name="CarDetailsInspection" component={CarDetailsInspection} />
              <Stack.Screen name="ExteriorTyresInspection" component={ExteriorTyresInspection} />
              <Stack.Screen name="ElectricalInteriorInspection" component={ElectricalInteriorInspection} />
              <Stack.Screen name="EngineTransmissionInspection" component={EngineTransmissionInspection} />
              <Stack.Screen name="SteeringSuspensionBrakesInspection" component={SteeringSuspensionBrakesInspection} />
              <Stack.Screen name="AirConditioningInspection" component={AirConditioningInspection} />
              <Stack.Screen name="ComponentIssueScreen" component={ComponentIssueScreen} />
            </>
          ) : (
            // Regular user sees main app
            <Stack.Screen name="MainApp" component={MainAppNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
