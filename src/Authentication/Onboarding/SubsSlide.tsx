import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from "../../components";


interface SubSlideProps {
    subtitle: string;
    description: string;
    last?: boolean;
    onPress: () => void;
}

const Subslide = ({ subtitle, description, last, onPress}: SubSlideProps) => {

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Text style={styles.description}>{description}</Text>
            <Button
            label={last ? "Let's get started": "Next"}
            variant={last ? "primary": "default"}
            {...{onPress}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        padding: 44,
        flex: 1
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
