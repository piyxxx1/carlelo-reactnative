import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../styles/colors';
import { AuthContext } from '../../App';

const AccountScreen = () => {
  const { logout, userData } = useContext(AuthContext);
  
  const handleCallAgent = () => {
    console.log('Calling agent...');
  };

  const handleRecharge = () => {
    console.log('Recharge pressed...');
  };

  const handleRCTransfer = () => {
    console.log('RC Transfer pressed...');
  };

  const handleUpdates = () => {
    console.log('Updates pressed...');
  };

  const handleFollowInstagram = () => {
    console.log('Follow Instagram pressed...');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            console.log('Logout button pressed, calling logout function');
            logout();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerRight}>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={32} color={COLORS.blue} />
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>
                {userData?.fullName || 'User Name'}
              </Text>
              {userData?.companyName && (
                <Text style={styles.profileName}>{userData.companyName}</Text>
              )}
              <Text style={styles.profilePhone}>
                {userData?.phoneNumber || 'Phone Number'}
              </Text>
              <Text style={styles.profileId}>
                ID: {userData?.id || 'N/A'}
              </Text>
            </View>
            <TouchableOpacity style={styles.profileArrow}>
              <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment and Sales Agent Row */}
        <View style={styles.rowContainer}>
          {/* Payment Details */}
          <View style={styles.card}>
            <View style={styles.cardIcon}>
              <Ionicons name="card-outline" size={24} color={COLORS.gray} />
            </View>
            <Text style={styles.cardTitle}>Payment details</Text>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceAmount}>₹10,000</Text>
            </View>
            <TouchableOpacity style={styles.rechargeButton} onPress={handleRecharge}>
              <Text style={styles.rechargeButtonText}>Recharge more →</Text>
            </TouchableOpacity>
          </View>

          {/* Sales Agent */}
          <View style={styles.card}>
            <View style={styles.cardIcon}>
              <Ionicons name="person-outline" size={24} color={COLORS.gray} />
            </View>
            <View style={styles.agentHeader}>
              <Text style={styles.cardTitle}>Sales agent</Text>
              <View style={styles.currentBadge}>
                <Text style={styles.currentBadgeText}>Current</Text>
              </View>
            </View>
            <Text style={styles.agentName}>Jalpa Deshani</Text>
            <TouchableOpacity style={styles.callButton} onPress={handleCallAgent}>
              <Ionicons name="call" size={16} color={COLORS.primary} />
              <Text style={styles.callButtonText}>Call agent</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Instagram Promotion Banner */}
        <View style={styles.instagramBanner}>
          <View style={styles.instagramContent}>
            <Text style={styles.instagramTitle}>Your stores now have a new destination</Text>
            <Text style={styles.instagramSubtitle}>Follow Carsbazar Partners</Text>
            <TouchableOpacity style={styles.followButton} onPress={handleFollowInstagram}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.instagramIcon}>
            <View style={styles.phoneContainer}>
              <View style={styles.phoneIcon}>
                <Ionicons name="logo-instagram" size={24} color={COLORS.primary} />
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {/* RC Transfer Statement */}
          <TouchableOpacity style={styles.menuItem} onPress={handleRCTransfer}>
            <View style={styles.menuIcon}>
              <Ionicons name="document-text-outline" size={24} color={COLORS.gray} />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>RC transfer statement</Text>
              <Text style={styles.menuSubtitle}>Track your RC transfer</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>

          {/* Carsbazar Updates */}
          <TouchableOpacity style={styles.menuItem} onPress={handleUpdates}>
            <View style={styles.menuIcon}>
              <Ionicons name="notifications-outline" size={24} color={COLORS.gray} />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Carsbazar updates</Text>
              <Text style={styles.menuSubtitle}>View updates</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity style={[styles.menuItem, styles.logoutMenuItem]} onPress={handleLogout}>
            <View style={styles.menuIcon}>
              <Ionicons name="log-out-outline" size={24} color={COLORS.error} />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, styles.logoutText]}>Logout</Text>
              <Text style={styles.menuSubtitle}>Sign out of your account</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.error} />
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
  },
  headerRight: {
    width: 40,
    alignItems: 'flex-end',
  },
  daysText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    ...SHADOWS.small,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 22,
  },
  profilePhone: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  profileId: {
    fontSize: 14,
    color: COLORS.gray,
  },
  profileArrow: {
    padding: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    ...SHADOWS.small,
  },
  cardIcon: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 8,
  },
  balanceContainer: {
    marginBottom: 12,
  },
  balanceAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
    backgroundColor: COLORS.green,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  rechargeButton: {
    marginTop: 8,
  },
  rechargeButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  agentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  currentBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  currentBadgeText: {
    fontSize: 12,
    color: COLORS.blue,
    fontWeight: '500',
  },
  agentName: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 12,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callButtonText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
  instagramBanner: {
    backgroundColor: '#fce4ec',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  instagramContent: {
    flex: 1,
    marginRight: 16,
  },
  instagramTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  instagramSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 12,
  },
  followButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  followButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  instagramIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneContainer: {
    width: 60,
    height: 80,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  phoneIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#fff3e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 12,
    ...SHADOWS.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: COLORS.gray,
  },
  logoutMenuItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: COLORS.error,
  },
});

export default AccountScreen;
