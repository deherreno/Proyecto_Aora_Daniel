import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();
  const { isDarkMode, toggleTheme, theme } = useTheme();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Loader isLoading={loading} />

      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View style={styles.innerContainer}>
          <Image source={images.logo} style={styles.logo} resizeMode="contain" />
          <Image source={images.cards} style={styles.cards} resizeMode="contain" />
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: theme.color }]}>
              Discover Endless{"\n"}Possibilities with{" "}
              <Text style={{ color: theme.color }}>Aora</Text> {/* Cambia el color aquí */}
            </Text>
            <Image source={images.path} style={styles.path} resizeMode="contain" />
          </View>
          <Text style={[styles.description, { color: theme.color }]}>
            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
          <Button
            title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
            onPress={toggleTheme}
          />
        </View>
      </ScrollView>

      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 130,
    height: 84,
  },
  cards: {
    maxWidth: 380,
    width: '100%',
    height: 298,
  },
  textContainer: {
    position: 'relative',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  path: {
    width: 136,
    height: 15,
    position: 'absolute',
    bottom: -2,
    right: -8,
  },
  description: {
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
});

export default Welcome;
