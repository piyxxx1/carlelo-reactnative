import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../styles/colors';

const { width, height } = Dimensions.get('window');

const CarDetailsScreen = ({ route, navigation }) => {
  // Debug logging
  console.log('CarDetailsScreen - route:', route);
  console.log('CarDetailsScreen - navigation:', navigation);
  
  const car = route?.params?.car || {
    id: 'N/A',
    name: 'Car Name',
    variant: 'Variant',
    year: 2023,
    location: 'Location',
    engine: '1.0',
    mileage: '0 km',
    owner: 'Owner',
    fuelType: 'Petrol',
    images: ['https://via.placeholder.com/400x300?text=Car+Image'],
    highestBid: 0,
    fairMarketValue: 0,
    timeRemaining: '00h 00m 00s',
    status: 'accepting',
  };
  
  console.log('CarDetailsScreen - car data:', car);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const formatCurrency = (amount) => {
    return `₹ ${amount.toLocaleString('en-IN')}`;
  };

  const getStatusColor = () => {
    switch (car.status) {
      case 'accepting':
        return COLORS.green;
      case 'ending':
        return COLORS.orange;
      default:
        return COLORS.green;
    }
  };

  const handleBidPress = () => {
    Alert.alert(
      'Place Bid',
      `Place a bid for ${car.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Place Bid', onPress: () => console.log('Bid placed for:', car.name) }
      ]
    );
  };

  const handleHeartPress = () => {
    setIsLiked(!isLiked);
  };

  const nextImage = () => {
    if (currentImageIndex < car.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Car Details</Text>
        <TouchableOpacity style={styles.heartButton} onPress={handleHeartPress}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={isLiked ? COLORS.primary : COLORS.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Car Images */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: car.images[currentImageIndex] || 'https://via.placeholder.com/400x300?text=Car+Image' }}
            style={styles.carImage}
            resizeMode="cover"
          />
          
          {/* Image Navigation */}
          {car.images.length > 1 && (
            <>
              <TouchableOpacity 
                style={[styles.imageNavButton, styles.prevButton]} 
                onPress={prevImage}
                disabled={currentImageIndex === 0}
              >
                <Ionicons name="chevron-back" size={24} color={COLORS.white} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.imageNavButton, styles.nextButton]} 
                onPress={nextImage}
                disabled={currentImageIndex === car.images.length - 1}
              >
                <Ionicons name="chevron-forward" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </>
          )}

          {/* Image Counter */}
          <View style={styles.imageCounter}>
            <Text style={styles.imageCounterText}>
              {currentImageIndex + 1}/{car.images.length}
            </Text>
          </View>

          {/* Car ID and Location */}
          <View style={styles.carIdContainer}>
            <Text style={styles.carId}>{car.id}</Text>
            <Ionicons name="location-outline" size={16} color={COLORS.white} />
            <Text style={styles.locationText}>{car.location}</Text>
          </View>

          {/* Status Badge */}
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusText}>
              {car.status === 'accepting' ? 'Accepting Bids' : 'Ending Soon'}
            </Text>
          </View>
        </View>

        {/* Car Information */}
        <View style={styles.content}>
          {/* Car Name and Variant */}
          <View style={styles.carInfo}>
            <Text style={styles.carName}>{car.name}</Text>
            <Text style={styles.carVariant}>{car.variant}</Text>
            <Text style={styles.carYear}>Year: {car.year}</Text>
          </View>

          {/* Car Specifications */}
          <View style={styles.specsSection}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specsGrid}>
              <View style={styles.specItem}>
                <Ionicons name="speedometer-outline" size={20} color={COLORS.primary} />
                <Text style={styles.specLabel}>Mileage</Text>
                <Text style={styles.specValue}>{car.mileage}</Text>
              </View>
              
              <View style={styles.specItem}>
                <Ionicons name="settings-outline" size={20} color={COLORS.primary} />
                <Text style={styles.specLabel}>Engine</Text>
                <Text style={styles.specValue}>{car.engine}L</Text>
              </View>
              
              <View style={styles.specItem}>
                <Ionicons name="person-outline" size={20} color={COLORS.primary} />
                <Text style={styles.specLabel}>Owner</Text>
                <Text style={styles.specValue}>{car.owner}</Text>
              </View>
              
              <View style={styles.specItem}>
                <Ionicons name="car-outline" size={20} color={COLORS.primary} />
                <Text style={styles.specLabel}>Fuel Type</Text>
                <Text style={styles.specValue}>{car.fuelType}</Text>
              </View>
            </View>
          </View>

          {/* Bidding Information */}
          <View style={styles.biddingSection}>
            <Text style={styles.sectionTitle}>Bidding Information</Text>
            
            <View style={styles.bidContainer}>
              <View style={styles.bidItem}>
                <Text style={styles.bidLabel}>Highest Bid</Text>
                <Text style={styles.bidAmount}>{formatCurrency(car.highestBid)}</Text>
              </View>
              
              <View style={styles.bidItem}>
                <Text style={styles.bidLabel}>Fair Market Value</Text>
                <Text style={styles.fairValue}>{formatCurrency(car.fairMarketValue)}</Text>
              </View>
              
              <View style={styles.bidItem}>
                <Text style={styles.bidLabel}>Time Remaining</Text>
                <Text style={styles.timeRemaining}>{car.timeRemaining}</Text>
              </View>
            </View>
          </View>

          {/* Additional Information */}
          <View style={styles.additionalInfo}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
            <View style={styles.infoItem}>
              <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.green} />
              <Text style={styles.infoText}>Verified by Carsbazar</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="document-text-outline" size={20} color={COLORS.blue} />
              <Text style={styles.infoText}>All documents verified</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="car-sport-outline" size={20} color={COLORS.orange} />
              <Text style={styles.infoText}>No major accidents reported</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceInfo}>
          <Text style={styles.currentBidLabel}>Current Bid</Text>
          <Text style={styles.currentBidAmount}>{formatCurrency(car.highestBid)}</Text>
        </View>
        
        <TouchableOpacity style={styles.bidButton} onPress={handleBidPress}>
          <Text style={styles.bidButtonText}>Place Bid</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  heartButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: height * 0.4,
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  imageNavButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevButton: {
    left: 16,
  },
  nextButton: {
    right: 16,
  },
  imageCounter: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  imageCounterText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
  },
  carIdContainer: {
    position: 'absolute',
    bottom: 60,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  carId: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  locationText: {
    color: COLORS.white,
    fontSize: 14,
    marginLeft: 4,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  carInfo: {
    marginBottom: 24,
  },
  carName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  carVariant: {
    fontSize: 16,
    color: COLORS.gray,
    marginBottom: 8,
  },
  carYear: {
    fontSize: 14,
    color: COLORS.subText,
  },
  specsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  specsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  specItem: {
    width: '48%',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  specLabel: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 8,
    marginBottom: 4,
  },
  specValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  biddingSection: {
    marginBottom: 24,
  },
  bidContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    ...SHADOWS.small,
  },
  bidItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  bidLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  bidAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  fairValue: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.orange,
  },
  timeRemaining: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
  },
  additionalInfo: {
    marginBottom: 100,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text,
    marginLeft: 12,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceInfo: {
    flex: 1,
  },
  currentBidLabel: {
    fontSize: 12,
    color: COLORS.gray,
  },
  currentBidAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  bidButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bidButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CarDetailsScreen;
