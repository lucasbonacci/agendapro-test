import { useEffect, useState } from 'react';
import { NativeModules } from 'react-native';

const { DeviceInfoModule } = NativeModules;

interface DeviceInfo {
  battery: number;
  model: string;
  os: string;
  identifier: string;
}

export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const battery = await DeviceInfoModule.getBatteryLevel();
        const model = await DeviceInfoModule.getDeviceModel();
        const os = await DeviceInfoModule.getOSVersion();
        const identifier = await DeviceInfoModule.getDeviceIdentifier();
        setDeviceInfo({ battery, model, os, identifier });

      } catch (error) {
        console.error('Error fetching device info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeviceInfo();
  }, []);

  return { ...deviceInfo, isLoading };
};
