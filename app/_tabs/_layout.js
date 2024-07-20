import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme as usePaperTheme } from 'react-native-paper';
import { useTheme } from '../../context/ThemeContext';

const Layout = () => {
  const { theme } = useTheme();
  const paperTheme = usePaperTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false, // Hide the header for all screens
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'index') {
            iconName = 'home';
          } else if (route.name === 'movies') {
            iconName = 'movie';
          } else if (route.name === 'tvshows') {
            iconName = 'television';
          } else if (route.name === 'user') {
            iconName = 'account';
          } else if (route.name === 'detail') {
            iconName = 'information';
          }

          return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: theme === 'dark' ? paperTheme.colors.primary : paperTheme.colors.accent,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: paperTheme.colors.background },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="movies" options={{ title: 'Movies' }} />
      <Tabs.Screen name="tvshows" options={{ title: 'TV Shows' }} />
      <Tabs.Screen name="user" options={{ title: 'Profile' }} />
      <Tabs.Screen name="detail" options={{ title: 'Details', tabBarButton: () => null }} />
    </Tabs>
  );
};

export default Layout;
