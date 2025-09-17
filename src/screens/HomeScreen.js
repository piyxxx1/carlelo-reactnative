import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import CarCard from '../components/CarCard';
import { COLORS } from '../styles/colors';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [likedCars, setLikedCars] = useState(new Set());

  // Sample car data based on the screenshots
  const [cars] = useState([
    {
      id: 'GJ01KRXXXX',
      name: '2012 Alto',
      variant: 'LXI',
      year: 2012,
      location: 'Ahmedabad',
      engine: '3.5',
      mileage: '88,040 km',
      owner: '1st owner',
      fuelType: 'Petrol',
      images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400'],
      highestBid: 133000,
      fairMarketValue: 212831,
      timeRemaining: '00h 19m 54s',
      status: 'accepting',
    },
    {
      id: 'GJ01KRXXXX',
      name: '2012 Sunny',
      variant: 'XV PETROL [2011 - 2014]',
      year: 2012,
      location: 'Ahmedabad',
      engine: '1.5',
      mileage: '95,000 km',
      owner: '1st owner',
      fuelType: 'Petrol',
      images: ['https://images.unsplash.com/photo-1549317336-206569e8475c?w=400'],
      highestBid: 105000,
      fairMarketValue: 120706,
      timeRemaining: '09h 42m 19s',
      status: 'accepting',
    },
  ]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCarPress = (car) => {
    console.log('Car pressed:', car.name);
  };

  const handleBidPress = (car) => {
    console.log('Bid pressed for:', car.name);
  };

  const handleHeartPress = (carId) => {
    const newLikedCars = new Set(likedCars);
    if (newLikedCars.has(carId)) {
      newLikedCars.delete(carId);
    } else {
      newLikedCars.add(carId);
    }
    setLikedCars(newLikedCars);
  };

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.variant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        onSearch={handleSearch}
        onFilterPress={() => console.log('Filter pressed')}
        onSortPress={() => console.log('Sort pressed')}
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.carsSection}>
          <Text style={styles.sectionTitle}>Live cars</Text>
          
          {filteredCars.map((car, index) => (
            <CarCard
              key={`${car.id}-${index}`}
              car={{
                ...car,
                isLiked: likedCars.has(car.id),
              }}
              onPress={() => handleCarPress(car)}
              onBidPress={() => handleBidPress(car)}
              onHeartPress={() => handleHeartPress(car.id)}
            />
          ))}
          
          {filteredCars.length === 0 && (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No cars found</Text>
              <Text style={styles.noResultsSubtext}>
                Try adjusting your search or filters
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  carsSection: {
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsSubtext: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HomeScreen;
