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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';

const ExteriorTyresInspection = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Front');
  const [selectedOptions, setSelectedOptions] = useState({
    Front: {
      frontWindshield: null,
      frontBumper: null,
      bonnetHood: null,
      lhsHeadlight: null,
      lhsFogLight: null,
      lhsApronLeg: null,
      rhsApronLeg: null,
      grill: null,
      firewall: null,
      cowlTop: null,
      lowerCrossMember: null,
      upperCrossMember: null,
      headLightSupport: null,
      radiatorSupport: null,
      alloyWheel: null,
    },
    Left: {
      lhsFender: null,
      lhsTyre: null,
      lhsOrvm: null,
      lhsFrontDoor: null,
      lhsRearDoor: null,
      lhsPillarA: null,
      lhsPillarB: null,
      lhsPillarC: null,
      lhsRunningBorder: null,
      lhsQuarterPanel: null,
    },
    Rear: {
      rearWindshield: null,
      rearBumper: null,
      bootTrunk: null,
      dickyDoor: null,
      bootFloor: null,
      lhsTaillight: null,
      rhsTaillight: null,
      spareTyre: null,
    },
    Right: {
      rhsFender: null,
      rhsTyre: null,
      rhsOrvm: null,
      rhsFrontDoor: null,
      rhsRearDoor: null,
      rhsPillarA: null,
      rhsPillarB: null,
      rhsPillarC: null,
      rhsRunningBorder: null,
      rhsQuarterPanel: null,
    },
  });

  const tabs = ['Front', 'Left', 'Rear', 'Right'];

  const frontComponents = [
    // Windshield
    { key: 'frontWindshield', label: 'Front Windshield' },
    
    // Bumper & Hood
    { key: 'frontBumper', label: 'Front Bumper' },
    { key: 'bonnetHood', label: 'Bonnet/Hood' },
    
    // Headlights
    { key: 'lhsHeadlight', label: 'Head Light' },
    
    // Fog Lights
    { key: 'lhsFogLight', label: 'Fog Light' },
    
    // Apron Legs
    { key: 'lhsApronLeg', label: 'LHS Apron Leg' },
    { key: 'rhsApronLeg', label: 'RHS Apron Leg' },
    
    // Grill
    { key: 'grill', label: 'Grill' },
    
    // Engine Bay Components
    { key: 'firewall', label: 'Firewall' },
    { key: 'cowlTop', label: 'Cowl Top' },
    { key: 'lowerCrossMember', label: 'Lower Cross Member' },
    { key: 'upperCrossMember', label: 'Upper Cross Member' },
    { key: 'headLightSupport', label: 'Head Light Support' },
    { key: 'radiatorSupport', label: 'Radiator Support' },
    
    // Wheels
    { key: 'alloyWheel', label: 'Alloy Wheel' },
  ];

  const leftComponents = [
    // Following the specified sequence
    { key: 'lhsFender', label: 'LHS Fender' },
    { key: 'lhsTyre', label: 'LHS Tyre' },
    { key: 'lhsOrvm', label: 'LHS ORVM' },
    { key: 'lhsFrontDoor', label: 'LHS Front Door' },
    { key: 'lhsRearDoor', label: 'LHS Rear Door' },
    { key: 'lhsPillarA', label: 'LHS Pillar A' },
    { key: 'lhsPillarB', label: 'LHS Pillar B' },
    { key: 'lhsPillarC', label: 'LHS Pillar C' },
    { key: 'lhsRunningBorder', label: 'LHS Running Border' },
    { key: 'lhsQuarterPanel', label: 'LHS Quarter Panel' },
  ];

  const rearComponents = [
    // Windshield & Bumper
    { key: 'rearWindshield', label: 'Rear Windshield' },
    { key: 'rearBumper', label: 'Rear Bumper' },
    
    // Boot/Trunk
    { key: 'bootTrunk', label: 'Boot/Trunk' },
    { key: 'dickyDoor', label: 'Dicky Door' },
    { key: 'bootFloor', label: 'Boot Floor' },
    
    // Taillights
    { key: 'lhsTaillight', label: 'LHS Taillight' },
    { key: 'rhsTaillight', label: 'RHS Taillight' },
    
    // Tyres
    { key: 'spareTyre', label: 'Spare Tyre' },
  ];

  const rightComponents = [
    // Following the specified sequence
    { key: 'rhsFender', label: 'RHS Fender' },
    { key: 'rhsTyre', label: 'RHS Tyre' },
    { key: 'rhsOrvm', label: 'RHS ORVM' },
    { key: 'rhsFrontDoor', label: 'RHS Front Door' },
    { key: 'rhsRearDoor', label: 'RHS Rear Door' },
    { key: 'rhsPillarA', label: 'RHS Pillar A' },
    { key: 'rhsPillarB', label: 'RHS Pillar B' },
    { key: 'rhsPillarC', label: 'RHS Pillar C' },
    { key: 'rhsRunningBorder', label: 'RHS Running Border' },
    { key: 'rhsQuarterPanel', label: 'RHS Quarter Panel' },
  ];

  const getCurrentComponents = () => {
    switch (activeTab) {
      case 'Front':
        return frontComponents;
      case 'Left':
        return leftComponents;
      case 'Rear':
        return rearComponents;
      case 'Right':
        return rightComponents;
      default:
        return frontComponents;
    }
  };

  const handleOptionSelect = (componentKey, option) => {
    // If user selects "No", navigate to ComponentIssueScreen first
    if (option === 'No') {
      const componentName = getCurrentComponents().find(comp => comp.key === componentKey)?.label || componentKey;
      navigation.navigate('ComponentIssueScreen', {
        componentName,
        componentKey,
        tabName: activeTab,
        onIssueSaved: (issueData) => {
          // Only mark as "No" if issue was properly saved with photo
          setSelectedOptions(prev => ({
            ...prev,
            [activeTab]: {
              ...prev[activeTab],
              [componentKey]: 'No',
            },
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
        [activeTab]: {
          ...prev[activeTab],
          [componentKey]: option,
        },
      }));
    }
  };

  const validateAllComponents = () => {
    const missingComponents = [];

    // Check Front tab components
    frontComponents.forEach(component => {
      if (selectedOptions.Front[component.key] === null) {
        missingComponents.push(component.label);
      }
    });

    // Check Left tab components
    leftComponents.forEach(component => {
      if (selectedOptions.Left[component.key] === null) {
        missingComponents.push(component.label);
      }
    });

    // Check Rear tab components
    rearComponents.forEach(component => {
      if (selectedOptions.Rear[component.key] === null) {
        missingComponents.push(component.label);
      }
    });

    // Check Right tab components
    rightComponents.forEach(component => {
      if (selectedOptions.Right[component.key] === null) {
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
          <Text style={styles.headerTitle}>Exterior + Tyres</Text>
          <Text style={styles.apptId}>Appt ID- 11479802757</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.componentsContainer}>
          {getCurrentComponents().map((component) => (
            <YesNoButton
              key={component.key}
              label={component.label}
              componentKey={component.key}
              selectedValue={selectedOptions[activeTab][component.key]}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    // Active tab styling
  },
  tabText: {
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#1e3a8a',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#1e3a8a',
  },
  content: {
    flex: 1,
  },
  componentsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  componentContainer: {
    marginBottom: 24,
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
});

export default ExteriorTyresInspection;
