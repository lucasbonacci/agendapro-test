import {useEffect, useState, useCallback} from 'react';
import {NativeModules} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const {DeviceInfoModule} = NativeModules;

interface DeviceInfo {
  battery: number;
  model: string;
  os: string;
  identifier: string;
}

export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStaticInfo = async () => {
    try {
      const model = await DeviceInfoModule.getDeviceModel();
      const os = await DeviceInfoModule.getOSVersion();
      const identifier = await DeviceInfoModule.getDeviceIdentifier();
      setDeviceInfo(prev => ({
        battery: prev?.battery ?? 0,
        model,
        os,
        identifier,
      }));
    } catch (error) {
      console.error('Error fetching static device info:', error);
    }
  };

  const fetchBatteryLevel = async () => {
    try {
      const battery = await DeviceInfoModule.getBatteryLevel();
      setDeviceInfo(prev =>
        prev
          ? {...prev, battery}
          : {battery, model: '', os: '', identifier: ''},
      );
    } catch (error) {
      console.error('Error fetching battery level:', error);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      await fetchStaticInfo();
      setIsLoading(false);
    };
    fetchAll();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchBatteryLevel();
    }, []),
  );

  return {...deviceInfo, isLoading};
};
