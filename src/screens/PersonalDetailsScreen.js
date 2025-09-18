import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { COLORS, SHADOWS } from '../styles/colors';
import { AuthContext } from '../../App';

const PersonalDetailsScreen = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const { login, updateUserData } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    companyName: '',
    gstNumber: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'pincode'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to save user details
    setTimeout(() => {
      setIsLoading(false);
      // Store user data in context
      const userDetails = { 
        phoneNumber, 
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        id: Math.floor(Math.random() * 1000000).toString() // Generate random ID
      };
      console.log('User details saved:', userDetails);
      updateUserData(userDetails);
      login(userDetails);
    }, 2000);
  };

  const inputFields = [
    { key: 'firstName', label: 'First Name', placeholder: 'Enter your first name', required: true },
    { key: 'lastName', label: 'Last Name', placeholder: 'Enter your last name', required: true },
    { key: 'email', label: 'Email Address', placeholder: 'Enter your email', required: true, keyboardType: 'email-address' },
    { key: 'address', label: 'Address', placeholder: 'Enter your address', required: true, multiline: true },
    { key: 'city', label: 'City', placeholder: 'Enter your city', required: true },
    { key: 'state', label: 'State', placeholder: 'Enter your state', required: true },
    { key: 'pincode', label: 'Pincode', placeholder: 'Enter pincode', required: true, keyboardType: 'numeric', maxLength: 6 },
    { key: 'companyName', label: 'Company Name', placeholder: 'Enter company name (optional)', required: false },
    { key: 'gstNumber', label: 'GST Number', placeholder: 'Enter GST number (optional)', required: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header with Logo */}
          <View style={styles.header}>
            <Image 
              source={require('../assest/CarsBazarlogo.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Complete Your Profile</Text>
            <Text style={styles.subtitle}>
              Please provide your personal details to continue
            </Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {inputFields.map((field) => (
              <View key={field.key} style={styles.inputGroup}>
                <Text style={styles.label}>
                  {field.label}
                  {field.required && <Text style={styles.required}> *</Text>}
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    field.multiline && styles.multilineInput
                  ]}
                  placeholder={field.placeholder}
                  placeholderTextColor={COLORS.gray}
                  value={formData[field.key]}
                  onChangeText={(value) => handleInputChange(field.key, value)}
                  keyboardType={field.keyboardType || 'default'}
                  maxLength={field.maxLength}
                  multiline={field.multiline}
                  numberOfLines={field.multiline ? 3 : 1}
                />
              </View>
            ))}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Saving Details...' : 'Complete Registration'}
            </Text>
          </TouchableOpacity>

          {/* Terms */}
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.linkText} onPress={() => navigation.navigate('TermsOfService')}>
              Terms of Service
            </Text> and{' '}
            <Text style={styles.linkText} onPress={() => navigation.navigate('PrivacyPolicy')}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffcef',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.subText,
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  required: {
    color: COLORS.error,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: COLORS.text,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 24,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.gray,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 14,
    color: COLORS.subText,
    textAlign: 'center',
    lineHeight: 20,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
});

export default PersonalDetailsScreen;
