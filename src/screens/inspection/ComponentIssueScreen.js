import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/colors';

const ComponentIssueScreen = ({ navigation, route }) => {
  const { componentName, componentKey, tabName, onIssueSaved, onCancel } = route.params || {};
  const [reason, setReason] = useState('');
  const [photoTaken, setPhotoTaken] = useState(false);

  const handleTakePhoto = () => {
    // TODO: Implement camera functionality
    Alert.alert(
      'Camera',
      'Camera functionality will be implemented here',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Take Photo',
          onPress: () => {
            setPhotoTaken(true);
            Alert.alert('Success', 'Photo captured successfully!');
          },
        },
      ]
    );
  };

  const handleSave = () => {
    if (!reason.trim()) {
      Alert.alert('Required', 'Please provide a reason for the issue.');
      return;
    }

    if (!photoTaken) {
      Alert.alert('Required', 'Please take a photo of the issue.');
      return;
    }

    // TODO: Save the issue data
    const issueData = {
      componentName,
      componentKey,
      tabName,
      reason,
      photoTaken,
      timestamp: new Date().toISOString(),
    };

    // Call the callback to mark component as "No" in the inspection
    if (onIssueSaved) {
      onIssueSaved(issueData);
    }

    Alert.alert(
      'Success',
      'Issue recorded successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const handleCancel = () => {
    // Call the callback to keep component unselected
    if (onCancel) {
      onCancel();
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleCancel}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Component Issue</Text>
          <Text style={styles.componentTitle}>{componentName}</Text>
        </View>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* Component Info */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Component:</Text>
              <Text style={styles.infoValue}>{componentName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Location:</Text>
              <Text style={styles.infoValue}>{tabName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status:</Text>
              <Text style={[styles.infoValue, styles.issueStatus]}>Issue Found</Text>
            </View>
          </View>

          {/* Photo Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Photo Evidence</Text>
            <Text style={styles.sectionSubtitle}>
              Take a photo to document the issue
            </Text>
            
            <TouchableOpacity 
              style={[styles.photoButton, photoTaken && styles.photoButtonTaken]} 
              onPress={handleTakePhoto}
            >
              <Ionicons 
                name={photoTaken ? "checkmark-circle" : "camera"} 
                size={32} 
                color={photoTaken ? "#10b981" : "#6b7280"} 
              />
              <Text style={[styles.photoButtonText, photoTaken && styles.photoButtonTextTaken]}>
                {photoTaken ? 'Photo Taken' : 'Take Photo'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Reason Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reason for Issue</Text>
            <Text style={styles.sectionSubtitle}>
              Please describe what issue was found with this component
            </Text>
            
            <TextInput
              style={styles.reasonInput}
              placeholder="Enter the reason for the issue..."
              placeholderTextColor="#9ca3af"
              value={reason}
              onChangeText={setReason}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.saveButton} 
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Save Issue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
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
  componentTitle: {
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
  contentContainer: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '600',
  },
  issueStatus: {
    color: '#ef4444',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  photoButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoButtonTaken: {
    borderColor: '#10b981',
    borderStyle: 'solid',
    backgroundColor: '#f0fdf4',
  },
  photoButtonText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
    marginTop: 8,
  },
  photoButtonTextTaken: {
    color: '#10b981',
  },
  reasonInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#374151',
    minHeight: 120,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#1e3a8a',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ComponentIssueScreen;
