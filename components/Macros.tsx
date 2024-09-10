import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";


export default function Macros() {
  
    return (
      <View style={styles.container}>
        <Text>Here are all macros in  your group</Text>
        <StatusBar style="auto" />
      </View>
    );
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });