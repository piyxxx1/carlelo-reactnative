import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';

const CarDetailsInspection = ({ navigation, route }) => {
  const [formData, setFormData] = useState({
    // Basic Details
    name: '',
    model: '',
    yearOfManufacturing: '',
    numberOfOwners: '',
    duplicateKey: '',
    km: '',
    fuelType: '',
    regState: '',
    regCity: '',
    
    // Insurance Details
    insuranceType: '',
    insuranceExpiry: '',
    
    // RC Details
    rcAvailability: '',
    roadTaxPaid: '',
    roadTaxDate: '',
    cngLpgFitment: '',
    
    // Registration Details
    registrationNumber: '',
    rto: '',
    city: '',
    rtoNocIssued: '',
    inspectionAtDoorstep: '',
    branch: '',
    toBeScrapped: '',
    chassisNumber: '',
    embossing: '',
    manufacturingMonth: '',
    registrationYear: '',
    registrationMonth: '',
    fitnessUpto: '',
    rcCondition: '',
    mismatchInRc: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error for this field when user starts typing
    if (hasAttemptedSubmit && validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: false
      }));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'name', 'model', 'yearOfManufacturing', 'numberOfOwners', 'duplicateKey', 
      'km', 'fuelType', 'regState', 'regCity', 'insuranceType', 'insuranceExpiry',
      'rcAvailability', 'roadTaxPaid', 'roadTaxDate', 'cngLpgFitment',
      'registrationNumber', 'rto', 'city', 'rtoNocIssued', 'inspectionAtDoorstep',
      'branch', 'toBeScrapped', 'chassisNumber', 'embossing', 'manufacturingMonth',
      'registrationYear', 'registrationMonth', 'fitnessUpto', 'rcCondition', 'mismatchInRc'
    ];

    const errors = {};
    const emptyFields = [];

    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        errors[field] = true;
        emptyFields.push(field);
      } else {
        errors[field] = false;
      }
    });

    setValidationErrors(errors);
    setHasAttemptedSubmit(true);

    return {
      isValid: emptyFields.length === 0,
      emptyFields: emptyFields
    };
  };

  const handleSubmit = () => {
    const validation = validateForm();
    
    if (!validation.isValid) {
      const fieldNames = validation.emptyFields.map(field => {
        // Convert field names to readable format
        return field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      });
      
      Alert.alert(
        'Required Fields Missing',
        `Please fill in the following required fields:\n\n${fieldNames.join(', ')}`,
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Submit Inspection',
      'Are you sure you want to submit this car details inspection?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Submit', 
          onPress: () => {
            console.log('Car details inspection submitted:', formData);
            Alert.alert('Success', 'Car details inspection submitted successfully!');
            // Call the completion callback if provided
            if (route?.params?.onComplete) {
              route.params.onComplete();
            }
            // Navigate back with completion status
            navigation.navigate('Inspection', { carDetailsCompleted: true });
          }
        }
      ]
    );
  };

  const FormSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const FormField = ({ label, value, onChangeText, placeholder, keyboardType = 'default', fieldName }) => {
    const hasError = hasAttemptedSubmit && validationErrors[fieldName];
    
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>
          {label} <Text style={styles.requiredIndicator}>*</Text>
        </Text>
        <TextInput
          style={[
            styles.textInput, 
            hasError && styles.errorField
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          placeholderTextColor={COLORS.gray}
          blurOnSubmit={false}
          returnKeyType="default"
          multiline={false}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Car Details Inspection</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Basic Details Section */}
          <FormSection title="Basic Details">
            <FormField
              label="Name"
              value={formData.name}
              onChangeText={(value) => updateField('name', value)}
              placeholder="Enter car name"
              fieldName="name"
            />
            <FormField
              label="Model"
              value={formData.model}
              onChangeText={(value) => updateField('model', value)}
              placeholder="Enter car model"
              fieldName="model"
            />
            <FormField
              label="Year Of Manufacturing"
              value={formData.yearOfManufacturing}
              onChangeText={(value) => updateField('yearOfManufacturing', value)}
              placeholder="Enter manufacturing year"
              fieldName="yearOfManufacturing"
            />
            <FormField
              label="No. Of Owner(S)"
              value={formData.numberOfOwners}
              onChangeText={(value) => updateField('numberOfOwners', value)}
              placeholder="Enter number of owners"
              keyboardType="numeric"
              fieldName="numberOfOwners"
            />
            <FormField
              label="Duplicate Key"
              value={formData.duplicateKey}
              onChangeText={(value) => updateField('duplicateKey', value)}
              placeholder="Yes/No"
              fieldName="duplicateKey"
            />
            <FormField
              label="KM"
              value={formData.km}
              onChangeText={(value) => updateField('km', value)}
              placeholder="Enter kilometers"
              keyboardType="numeric"
              fieldName="km"
            />
            <FormField
              label="Fuel Type"
              value={formData.fuelType}
              onChangeText={(value) => updateField('fuelType', value)}
              placeholder="Enter fuel type"
              fieldName="fuelType"
            />
            <FormField
              label="Reg. State"
              value={formData.regState}
              onChangeText={(value) => updateField('regState', value)}
              placeholder="Enter registration state"
              fieldName="regState"
            />
            <FormField
              label="Reg. City"
              value={formData.regCity}
              onChangeText={(value) => updateField('regCity', value)}
              placeholder="Enter registration city"
              fieldName="regCity"
            />
          </FormSection>

          {/* Insurance Details Section */}
          <FormSection title="Insurance Details">
            <FormField
              label="Insurance Type"
              value={formData.insuranceType}
              onChangeText={(value) => updateField('insuranceType', value)}
              placeholder="Enter insurance type"
              fieldName="insuranceType"
            />
            <FormField
              label="Insurance Expiry"
              value={formData.insuranceExpiry}
              onChangeText={(value) => updateField('insuranceExpiry', value)}
              placeholder="Enter expiry date"
              fieldName="insuranceExpiry"
            />
          </FormSection>

          {/* RC Details Section */}
          <FormSection title="RC Details">
            <FormField
              label="RC Availability"
              value={formData.rcAvailability}
              onChangeText={(value) => updateField('rcAvailability', value)}
              placeholder="Original/Duplicate"
              fieldName="rcAvailability"
            />
            <FormField
              label="Road Tax Paid"
              value={formData.roadTaxPaid}
              onChangeText={(value) => updateField('roadTaxPaid', value)}
              placeholder="Enter road tax status"
              fieldName="roadTaxPaid"
            />
            <FormField
              label="Road Tax Date (Validity)"
              value={formData.roadTaxDate}
              onChangeText={(value) => updateField('roadTaxDate', value)}
              placeholder="Enter validity date"
              fieldName="roadTaxDate"
            />
            <FormField
              label="CNG/LPG Fitment In RC"
              value={formData.cngLpgFitment}
              onChangeText={(value) => updateField('cngLpgFitment', value)}
              placeholder="Yes/No/N/A"
              fieldName="cngLpgFitment"
            />
          </FormSection>

          {/* Registration Details Section */}
          <FormSection title="Registration Details">
            <FormField
              label="Registration Number"
              value={formData.registrationNumber}
              onChangeText={(value) => updateField('registrationNumber', value)}
              placeholder="Enter registration number"
              fieldName="registrationNumber"
            />
            <FormField
              label="RTO"
              value={formData.rto}
              onChangeText={(value) => updateField('rto', value)}
              placeholder="Enter RTO details"
              fieldName="rto"
            />
            <FormField
              label="City"
              value={formData.city}
              onChangeText={(value) => updateField('city', value)}
              placeholder="Enter city"
              fieldName="city"
            />
            <FormField
              label="RTO NOC Issued"
              value={formData.rtoNocIssued}
              onChangeText={(value) => updateField('rtoNocIssued', value)}
              placeholder="Yes/No"
              fieldName="rtoNocIssued"
            />
            <FormField
              label="Inspection At Doorstep"
              value={formData.inspectionAtDoorstep}
              onChangeText={(value) => updateField('inspectionAtDoorstep', value)}
              placeholder="Enter inspection status"
              fieldName="inspectionAtDoorstep"
            />
            <FormField
              label="Branch"
              value={formData.branch}
              onChangeText={(value) => updateField('branch', value)}
              placeholder="Enter branch details"
              fieldName="branch"
            />
            <FormField
              label="To Be Scrapped"
              value={formData.toBeScrapped}
              onChangeText={(value) => updateField('toBeScrapped', value)}
              placeholder="Yes/No"
              fieldName="toBeScrapped"
            />
            <FormField
              label="Chassis Number"
              value={formData.chassisNumber}
              onChangeText={(value) => updateField('chassisNumber', value)}
              placeholder="Enter chassis number"
              fieldName="chassisNumber"
            />
            <FormField
              label="Embossing"
              value={formData.embossing}
              onChangeText={(value) => updateField('embossing', value)}
              placeholder="Enter embossing status"
              fieldName="embossing"
            />
            <FormField
              label="Manufacturing Month"
              value={formData.manufacturingMonth}
              onChangeText={(value) => updateField('manufacturingMonth', value)}
              placeholder="Enter manufacturing month"
              fieldName="manufacturingMonth"
            />
            <FormField
              label="Registration Year"
              value={formData.registrationYear}
              onChangeText={(value) => updateField('registrationYear', value)}
              placeholder="Enter registration year"
              keyboardType="numeric"
              fieldName="registrationYear"
            />
            <FormField
              label="Registration Month"
              value={formData.registrationMonth}
              onChangeText={(value) => updateField('registrationMonth', value)}
              placeholder="Enter registration month"
              fieldName="registrationMonth"
            />
            <FormField
              label="Fitness Upto"
              value={formData.fitnessUpto}
              onChangeText={(value) => updateField('fitnessUpto', value)}
              placeholder="Enter fitness validity"
              fieldName="fitnessUpto"
            />
            <FormField
              label="RC Condition"
              value={formData.rcCondition}
              onChangeText={(value) => updateField('rcCondition', value)}
              placeholder="Enter RC condition"
              fieldName="rcCondition"
            />
            <FormField
              label="Mismatch In RC"
              value={formData.mismatchInRc}
              onChangeText={(value) => updateField('mismatchInRc', value)}
              placeholder="Enter mismatch status"
              fieldName="mismatchInRc"
            />
          </FormSection>

          {/* Note Section */}
          <View style={styles.noteSection}>
            <Text style={styles.noteText}>
              PLEASE REVIEW DETAILS AND SUBMIT
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Inspection</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1e3a8a',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#1e3a8a',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 6,
  },
  requiredIndicator: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: COLORS.text,
  },
  requiredField: {
    borderColor: '#ef4444',
    borderWidth: 2,
  },
  errorField: {
    borderColor: '#ef4444',
    borderWidth: 2,
    backgroundColor: '#fef2f2',
  },
  noteSection: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    marginTop: 16,
  },
  noteText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
    textAlign: 'center',
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  submitButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CarDetailsInspection;
