import React from "react";
import { Text, StyleSheet, Pressable } from 'react-native';

const NavButton = ({ navigation, route }: { navigation: any, route: any }) => {
    return (
        <Pressable onPress={() => navigation.navigate(route)} style={styles.navButton}>
            <Text style={styles.buttonText}>{route}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    navButton: {
        backgroundColor: "lightblue",
        width: 150,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 25,
        fontWeight: "bold",
    }
});

export default NavButton;