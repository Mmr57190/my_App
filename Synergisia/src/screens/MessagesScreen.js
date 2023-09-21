import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';

const MessagesScreen = () => {
    return (
        <View style={styles.container}>
        <Text>MessagesScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F3F9',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MessagesScreen;
