import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../styles/colors';

const { width } = Dimensions.get('window');

const CarCard = ({ car, onPress, onBidPress, onHeartPress }) => {
  const {
    id,
    name,
    variant,
    year,
    location,
    engine,
    mileage,
    owner,
    fuelType,
    images,
    highestBid,
    fairMarketValue,
    timeRemaining,
    status,
    isLiked = false,
  } = car;

  const formatCurrency = (amount) => {
    return `₹ ${amount.toLocaleString('en-IN')}`;
  };

  const getStatusColor = () => {
    switch (status) {
      case 'accepting':
        return COLORS.green;
      case 'ending':
        return COLORS.orange;
      default:
        return COLORS.green;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Car Image with Controls */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: images?.[0] || 'https://via.placeholder.com/300x200?text=Car+Image' }}
          style={styles.carImage}
          resizeMode="cover"
        />
        
        {/* Heart Icon */}
        <TouchableOpacity style={styles.heartButton} onPress={onHeartPress}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={isLiked ? COLORS.primary : COLORS.white}
          />
        </TouchableOpacity>

        {/* Cars24 Badge */}
        <View style={styles.cars24Badge}>
          <Text style={styles.cars24Text}>CARS24</Text>
        </View>

        {/* Car ID */}
        <View style={styles.carIdContainer}>
          <Text style={styles.carId}>{id}</Text>
          <Ionicons name="location-outline" size={16} color={COLORS.white} />
          <Text style={styles.locationText}>{location}</Text>
        </View>

        {/* Image Counter */}
        <View style={styles.imageCounter}>
          <Text style={styles.imageCounterText}>1/5</Text>
          <View style={styles.dots}>
            {[...Array(5)].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === 0 && styles.activeDot
                ]}
              />
            ))}
          </View>
        </View>
      </View>

      {/* Car Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.carInfo}>
          <Text style={styles.carName}>{name}</Text>
          <Text style={styles.carVariant}>{variant}</Text>
        </View>

        {/* Car Specs */}
        <View style={styles.specsContainer}>
          <View style={styles.spec}>
            <View style={styles.engineBadge}>
              <Text style={styles.engineText}>Engine {engine}</Text>
              <Ionicons name="star" size={12} color={COLORS.white} />
            </View>
          </View>
          <View style={styles.spec}>
            <Text style={styles.specText}>{mileage}</Text>
          </View>
          <View style={styles.spec}>
            <Text style={styles.specText}>{owner}</Text>
          </View>
          <View style={styles.spec}>
            <Text style={styles.specText}>{fuelType}</Text>
          </View>
        </View>
      </View>

      {/* Bidding Section */}
      <View style={styles.biddingSection}>
        {/* Status and Time */}
        <View style={styles.statusContainer}>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {status === 'accepting' ? 'Accepting Bids' : 'Ending Soon'}
            </Text>
          </View>
          <Text style={styles.timeRemaining}>{timeRemaining}</Text>
        </View>

        {/* Highest Bid */}
        <View style={styles.bidContainer}>
          <Text style={styles.highestBidLabel}>Highest Bid</Text>
          <Text style={styles.highestBidAmount}>{formatCurrency(highestBid)}</Text>
        </View>

        {/* Fair Market Value */}
        <View style={styles.fairValueContainer}>
          <Ionicons name="flash" size={16} color={COLORS.orange} />
          <Text style={styles.fairValueLabel}>Fair market value:</Text>
          <Text style={styles.fairValueAmount}>{formatCurrency(fairMarketValue)}</Text>
          <TouchableOpacity style={styles.infoButton}>
            <Ionicons name="information-circle-outline" size={16} color={COLORS.gray} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cars24Badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: COLORS.blue,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cars24Text: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '600',
  },
  carIdContainer: {
    position: 'absolute',
    bottom: 48,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  carId: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  locationText: {
    color: COLORS.white,
    fontSize: 14,
    marginLeft: 4,
  },
  imageCounter: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageCounterText: {
    color: COLORS.white,
    fontSize: 12,
    marginRight: 8,
  },
  dots: {
    flexDirection: 'row',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 1,
  },
  activeDot: {
    backgroundColor: COLORS.white,
  },
  detailsContainer: {
    padding: 16,
  },
  carInfo: {
    marginBottom: 12,
  },
  carName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  carVariant: {
    fontSize: 14,
    color: COLORS.gray,
  },
  specsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  spec: {
    marginRight: 16,
    marginBottom: 4,
  },
  engineBadge: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  engineText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  specText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  biddingSection: {
    padding: 16,
    paddingTop: 0,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  timeRemaining: {
    fontSize: 14,
    color: COLORS.gray,
  },
  bidContainer: {
    backgroundColor: '#2c2c2e',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  highestBidLabel: {
    color: COLORS.white,
    fontSize: 14,
    marginBottom: 4,
  },
  highestBidAmount: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '600',
  },
  fairValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  fairValueLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 4,
    marginRight: 8,
  },
  fairValueAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginRight: 8,
  },
  infoButton: {
    marginLeft: 'auto',
  },
});

export default CarCard;
