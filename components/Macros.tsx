import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RootStackParamList } from "../types/ReactTypes";

type SearchScreenProps = NativeStackScreenProps<RootStackParamList, 'Macros'>

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