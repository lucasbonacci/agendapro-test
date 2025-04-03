import React, {useState} from 'react';
import {View, StyleSheet, Text, LayoutChangeEvent} from 'react-native';

interface BatteryBarProps {
  level: number;
}

const BatteryBar: React.FC<BatteryBarProps> = ({level}) => {
  const [barWidth, setBarWidth] = useState(0);
  const totalBlocks = 100;
  const gap = 0.000009;
  const totalGapWidth = gap * (totalBlocks - 1);
  const filledBlocks = Math.min(Math.max(level, 0), 100);

  const handleLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setBarWidth(width);
  };

  const blockWidth = barWidth ? (barWidth - totalGapWidth) / totalBlocks : 0;

  return (
    <>
      <View style={styles.barContainer} onLayout={handleLayout}>
        {Array.from({length: totalBlocks}).map((_, i) => (
          <View
            key={i}
            style={[
              styles.block,
              {
                width: blockWidth,
                marginRight: i !== totalBlocks - 1 ? gap : 0,
              },
              i < filledBlocks ? styles.filled : styles.empty,
            ]}
          />
        ))}
      </View>

      <Text style={styles.batteryText}>{level}%</Text>
    </>
  );
};

export default BatteryBar;

const styles = StyleSheet.create({
  barContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 8,
  },
  block: {
    height: 90,
  },
  filled: {
    backgroundColor: '#10B981',
  },
  empty: {
    backgroundColor: 'lightgray',
  },
  batteryText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    position: 'absolute',
    top: '85%',
    left: '8%',
  },
});


