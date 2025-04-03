import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {useDeviceInfo} from '@/hooks/useDeviceInfo';
import BatteryBar from './components/BatteryBar';
import {deviceModels} from '@/constants/deviceModels';

const SettingsScreen = () => {
  const {battery, model, os, identifier, isLoading} = useDeviceInfo();
  const deviceName =
    identifier && identifier !== 'Unavailable' && deviceModels[identifier]
      ? deviceModels[identifier]
      : model;

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardRow}>
        <View style={[styles.card, {flexGrow: 1}]}>
          <Text style={styles.cardTitle}>Modelo</Text>
          <Text style={styles.cardValue}>{deviceName}</Text>
        </View>

        <View style={[styles.card, {flexGrow: 1}]}>
          <Text style={styles.cardTitle}>Sistema operativo</Text>
          <Text style={styles.cardValue}>{os}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Batería</Text>
        <BatteryBar level={battery ?? 0} />
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardTitle: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
