import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';

const ElectricalInteriorInspection = ({ navigation, route }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    // Power Windows
    powerWindowsLhsFront: null,
    powerWindowsLhsRear: null,
    powerWindowsRhsFront: null,
    powerWindowsRhsRear: null,
    powerWindowsRemark: '', // Remark box for Power Windows
    
    // Airbags
    airbagFeature: null,
    
    // Electrical Systems
    musicSystem: null,
    steeringMountedAudioControl: null,
    abs: null,
    rearDefogger: null,
    reverseCamera: null,
    
    // Interior Features
    leatherSeat: null,
    fabricSeat: null,
    sunroof: null,
  });

  const componentCategories = [
    {
      title: 'Power Windows',
      components: [
        { key: 'powerWindowsLhsFront', label: 'LHS Front Power Window' },
        { key: 'powerWindowsLhsRear', label: 'LHS Rear Power Window' },
        { key: 'powerWindowsRhsFront', label: 'RHS Front Power Window' },
        { key: 'powerWindowsRhsRear', label: 'RHS Rear Power Window' },
      ]
    },
    {
      title: 'Safety Features',
      components: [
        { key: 'airbagFeature', label: 'Airbag Feature' },
        { key: 'abs', label: 'ABS' },
      ]
    },
    {
      title: 'Audio & Entertainment',
      components: [
        { key: 'musicSystem', label: 'Music System' },
        { key: 'steeringMountedAudioControl', label: 'Steering Mounted Audio Control' },
      ]
    },
    {
      title: 'Interior Features',
      components: [
        { key: 'leatherSeat', label: 'Leather Seat' },
        { key: 'fabricSeat', label: 'Fabric Seat' },
        { key: 'sunroof', label: 'Sunroof' },
      ]
    },
    {
      title: 'Visibility & Safety',
      components: [
        { key: 'rearDefogger', label: 'Rear Defogger' },
        { key: 'reverseCamera', label: 'Reverse Camera' },
      ]
    },
  ];

  const handleOptionSelect = (componentKey, option) => {
    // If user selects "No", navigate to ComponentIssueScreen first
    if (option === 'No') {
      const componentName = componentCategories
        .flatMap(category => category.components)
        .find(comp => comp.key === componentKey)?.label || componentKey;
      
      navigation.navigate('ComponentIssueScreen', {
        componentName,
        componentKey,
        tabName: 'Electrical + Interior',
        onIssueSaved: (issueData) => {
          // Only mark as "No" if issue was properly saved with photo
          setSelectedOptions(prev => ({
            ...prev,
            [componentKey]: 'No',
          }));
        },
        onCancel: () => {
          // Keep component unselected if user cancels
          console.log('Issue recording cancelled, component remains unselected');
        }
      });
    } else {
      // For "Yes" selection, mark immediately
      setSelectedOptions(prev => ({
        ...prev,
        [componentKey]: option,
      }));
    }
  };

  const validateAllComponents = () => {
    const allComponents = componentCategories.flatMap(category => category.components);
    const missingComponents = [];

    allComponents.forEach(component => {
      if (selectedOptions[component.key] === null) {
        missingComponents.push(component.label);
      }
    });

    return missingComponents;
  };

  const handleNext = () => {
    const missingComponents = validateAllComponents();
    
    if (missingComponents.length > 0) {
      Alert.alert(
        'Incomplete Inspection',
        `Please complete the following components before proceeding:\n\n${missingComponents.join(', ')}`,
        [{ text: 'OK' }]
      );
      return;
    }

    // Call the completion callback if provided
    if (route?.params?.onComplete) {
      route.params.onComplete();
    }
    // Navigate back to main inspection
    navigation.goBack();
  };

  const YesNoButton = ({ label, componentKey, selectedValue }) => (
    <View style={styles.componentContainer}>
      <Text style={styles.componentLabel}>{label}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedValue === 'Yes' && styles.selectedButton,
          ]}
          onPress={() => handleOptionSelect(componentKey, 'Yes')}
        >
          <Text
            style={[
              styles.optionButtonText,
              selectedValue === 'Yes' && styles.selectedButtonText,
            ]}
          >
            Yes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedValue === 'No' && styles.selectedButton,
          ]}
          onPress={() => handleOptionSelect(componentKey, 'No')}
        >
          <Text
            style={[
              styles.optionButtonText,
              selectedValue === 'No' && styles.selectedButtonText,
            ]}
          >
            No
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const RemarkBox = ({ value, onChangeText, placeholder }) => (
    <View style={styles.remarkContainer}>
      <Text style={styles.remarkLabel}>Remark</Text>
      <TextInput
        style={styles.remarkInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />
    </View>
  );

  const ComponentCategory = ({ title, components }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{title}</Text>
      {components.map((component) => (
        <YesNoButton
          key={component.key}
          label={component.label}
          componentKey={component.key}
          selectedValue={selectedOptions[component.key]}
        />
      ))}
      {/* Add remark box only for Power Windows section */}
      {title === 'Power Windows' && (
        <RemarkBox
          value={selectedOptions.powerWindowsRemark}
          onChangeText={(text) => setSelectedOptions(prev => ({
            ...prev,
            powerWindowsRemark: text
          }))}
          placeholder="Enter any remarks about power windows..."
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Electrical + Interior</Text>
          <Text style={styles.apptId}>Appt ID- 11479802757</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.componentsContainer}>
          {componentCategories.map((category, index) => (
            <ComponentCategory
              key={index}
              title={category.title}
              components={category.components}
            />
          ))}
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>NEXT</Text>
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
    backgroundColor: '#1e3a8a',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  apptId: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  headerRight: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  componentsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  categoryContainer: {
    marginBottom: 32,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#e5e7eb',
  },
  componentContainer: {
    marginBottom: 20,
  },
  componentLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#1e3a8a',
    borderColor: '#1e3a8a',
  },
  optionButtonText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  selectedButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  nextButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 30,
  },
  nextButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  remarkContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  remarkLabel: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
    marginBottom: 8,
  },
  remarkInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#374151',
    backgroundColor: '#ffffff',
    minHeight: 80,
  },
});

export default ElectricalInteriorInspection;
