import * as React from 'react';
import { Header, Component } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

export default function DetailsScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
        </View>
    );

}

