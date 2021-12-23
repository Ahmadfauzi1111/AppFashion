import React from 'react';
import {StyleSheet, View, Text, Button} from "react-native";
import Animated from 'react-native-reanimated';

interface SubSlideProps {
    subtitle: string;
    description: string;
    last?: boolean;
}

const Subslide = ({ subtitle, description, last}: SubSlideProps) => {

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.description}>{description}</Text>
            <Button label={last ? "Let's get started": "Next"} primary={last} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 44
    },
    subtitle: {
        fontFamily: "SFProText-Semibold",
        textAlign: "center",
        fontSize: 24,
        color: "#0C0D34",
        lineHeight: 30,
        marginBottom: 12
    },
    description: {
        fontFamily: "SFProText-Regular",
        color: "#0C0D34",
        textAlign: "center",
        lineHeight: 24,
        fontSize: 16,
        marginBottom: 40
    }
});

export default Subslide;
