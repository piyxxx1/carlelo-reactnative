import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';

const InspectionScreen = ({ navigation, route }) => {
  const [loadingStates, setLoadingStates] = useState({
    imageReview: true,
  });

  const [completedSections, setCompletedSections] = useState({
    carDetails: false,
    exteriorTyres: false,
    electricalInterior: false,
    engineTransmission: false,
    steeringSuspension: false,
    airConditioning: false,
    summary: false,
    imageReview: false,
  });

  // Check if car details was completed from navigation params
  React.useEffect(() => {
    if (route?.params?.carDetailsCompleted) {
      setCompletedSections(prev => ({
        ...prev,
        carDetails: true
      }));
    }
  }, [route?.params?.carDetailsCompleted]);

  const inspectionCategories = [
    { id: 1, name: 'CAR DETAILS', completed: completedSections.carDetails },
    { id: 2, name: 'EXTERIOR + TYRES', completed: completedSections.exteriorTyres },
    { id: 3, name: 'ELECTRICAL + INTERIOR', completed: completedSections.electricalInterior },
    { id: 4, name: 'ENGINE + TRANSMISSION', completed: completedSections.engineTransmission },
    { id: 5, name: 'STEERING/SUSPENSION + BRAKES', completed: completedSections.steeringSuspension },
    { id: 6, name: 'AIR CONDITIONING', completed: completedSections.airConditioning },
    { id: 7, name: 'SUMMARY', completed: completedSections.summary },
    { id: 8, name: 'IMAGE REVIEW', completed: completedSections.imageReview, loading: false },
  ];

  const handleCategoryPress = (category) => {
    console.log('Category pressed:', category.name);
    
    // Navigate to specific inspection category
    switch (category.name) {
      case 'CAR DETAILS':
        navigation.navigate('CarDetailsInspection', {
          onComplete: () => markSectionCompleted('carDetails')
        });
        break;
      case 'EXTERIOR + TYRES':
        navigation.navigate('ExteriorTyresInspection', {
          onComplete: () => markSectionCompleted('exteriorTyres')
        });
        break;
      case 'ELECTRICAL + INTERIOR':
        navigation.navigate('ElectricalInteriorInspection', {
          onComplete: () => markSectionCompleted('electricalInterior')
        });
        break;
      case 'ENGINE + TRANSMISSION':
        navigation.navigate('EngineTransmissionInspection', {
          onComplete: () => markSectionCompleted('engineTransmission')
        });
        break;
      case 'STEERING/SUSPENSION + BRAKES':
        navigation.navigate('SteeringSuspensionBrakesInspection', {
          onComplete: () => markSectionCompleted('steeringSuspension')
        });
        break;
      case 'AIR CONDITIONING':
        navigation.navigate('AirConditioningInspection', {
          onComplete: () => markSectionCompleted('airConditioning')
        });
        break;
      case 'SUMMARY':
        console.log('Navigate to Summary Inspection');
        break;
      case 'IMAGE REVIEW':
        console.log('Navigate to Image Review Inspection');
        break;
      default:
        console.log('Unknown category:', category.name);
    }
  };

  const markSectionCompleted = (sectionKey) => {
    setCompletedSections(prev => ({
      ...prev,
      [sectionKey]: true
    }));
  };

  const handleSubmit = () => {
    console.log('Submit inspection');
    // Handle submission logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.inspectionId}>Inspection Id: 9036340</Text>
        <Text style={styles.apptId}>Appt ID- 11479802757</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Inspection Categories */}
        <View style={styles.categoriesContainer}>
          {inspectionCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryItem}
              onPress={() => handleCategoryPress(category)}
            >
              <View style={styles.categoryContent}>
                {category.completed && (
                  <View style={styles.completedIcon}>
                    <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                  </View>
                )}
                <Text style={[styles.categoryText, category.completed && styles.completedText]}>
                  {category.name}
                </Text>
                {category.loading && (
                  <View style={styles.loadingContainer}>
                    <View style={styles.loadingSpinner}>
                      <Ionicons name="hourglass" size={16} color="#f97316" />
                    </View>
                  </View>
                )}
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6b7280" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Submit Button */}
        <View style={styles.submitContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  inspectionId: {
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
  scrollView: {
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  completedIcon: {
    marginRight: 12,
  },
  categoryText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  completedText: {
    color: '#10b981',
    fontWeight: '600',
  },
  loadingContainer: {
    marginLeft: 12,
  },
  loadingSpinner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f97316',
  },
  submitContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  submitButton: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InspectionScreen;
