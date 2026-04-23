import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors } from '../theme';

interface Props {
  uri?: string;
  name?: string;
  size?: number;
  showOnline?: boolean;
  isOnline?: boolean;
}

export default function UserAvatar({ uri, name, size = 40, showOnline, isOnline }: Props) {
  const initials = name
    ? name.slice(0, 2).toUpperCase()
    : '??';

  return (
    <View style={{ width: size, height: size }}>
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        />
      ) : (
        <View
          style={[
            styles.placeholder,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        >
          <Text style={[styles.initials, { fontSize: size * 0.36 }]}>{initials}</Text>
        </View>
      )}
      {showOnline && (
        <View
          style={[
            styles.dot,
            {
              width: size * 0.28,
              height: size * 0.28,
              borderRadius: size * 0.14,
              backgroundColor: isOnline ? colors.online : colors.offline,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.surface,
  },
  placeholder: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: colors.text,
    fontWeight: '700',
  },
  dot: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    borderWidth: 2,
    borderColor: colors.background,
  },
});
