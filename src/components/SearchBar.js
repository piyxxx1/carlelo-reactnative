import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../styles/colors';

const SearchBar = ({ onSearch, onFilterPress, onSortPress }) => {
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState('PA Recommended');

  const filters = ['PA Recommended', 'Premium car', 'No Structural Damage'];

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch && onSearch(text);
  };

  return (
    <View style={styles.container}>
      {/* Location and Search */}
      <View style={styles.headerRow}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color={COLORS.gray} />
          <Text style={styles.locationText}>GJ</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.gray} />
        </View>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.gray} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Make, model, year, Appt. id"
            placeholderTextColor={COLORS.gray}
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {/* Live and OCB Tabs */}
      <View style={styles.tabsContainer}>
        <View style={styles.tab}>
          <Text style={styles.activeTabText}>LIVE</Text>
          <View style={styles.tabBadge}>
            <Text style={styles.tabBadgeText}>67</Text>
          </View>
        </View>
        <View style={styles.inactiveTab}>
          <Text style={styles.inactiveTabText}>OCB</Text>
          <Text style={styles.inactiveTabCount}>492</Text>
        </View>
      </View>

      {/* Loan Banner */}
      <View style={styles.loanBanner}>
        <View style={styles.loanContent}>
          <View style={styles.loanTextContainer}>
            <Text style={styles.loanBadge}>New launch</Text>
            <Text style={styles.loanTitle}>Get used car loan for your customers</Text>
            <Text style={styles.loanSubtitle}>Instant valuation | 100% digital</Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explore →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.loanImageContainer}>
            <Text style={styles.loanImagePlaceholder}>🚗</Text>
          </View>
        </View>
      </View>

      {/* Filter and Sort */}
      <View style={styles.filterSortContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
          <Ionicons name="options-outline" size={18} color={COLORS.text} />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.sortButton} onPress={onSortPress}>
          <Ionicons name="swap-vertical-outline" size={18} color={COLORS.text} />
          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tags */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterTagsContainer}
      >
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterTag,
              activeFilter === filter && styles.activeFilterTag
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[
              styles.filterTagText,
              activeFilter === filter && styles.activeFilterTagText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    ...SHADOWS.small,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginHorizontal: 4,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
    marginRight: 32,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.blue,
  },
  activeTabText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.blue,
    marginRight: 8,
  },
  tabBadge: {
    backgroundColor: COLORS.blue,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tabBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  inactiveTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },
  inactiveTabText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray,
    marginRight: 8,
  },
  inactiveTabCount: {
    fontSize: 16,
    color: COLORS.gray,
  },
  loanBanner: {
    backgroundColor: '#4a90e2',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  loanContent: {
    flexDirection: 'row',
    padding: 16,
  },
  loanTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  loanBadge: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  loanTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  loanSubtitle: {
    color: COLORS.white,
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 12,
  },
  exploreButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  exploreButtonText: {
    color: '#4a90e2',
    fontSize: 14,
    fontWeight: '600',
  },
  loanImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loanImagePlaceholder: {
    fontSize: 40,
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginRight: 8,
  },
  filterText: {
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.text,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginLeft: 8,
  },
  sortText: {
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.text,
  },
  filterTagsContainer: {
    marginBottom: 8,
  },
  filterTag: {
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeFilterTag: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterTagText: {
    fontSize: 14,
    color: COLORS.text,
  },
  activeFilterTagText: {
    color: COLORS.white,
    fontWeight: '500',
  },
});

export default SearchBar;
