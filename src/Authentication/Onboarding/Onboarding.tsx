import React, {useRef} from 'react';
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { divide, multiply, Extrapolate, interpolate } from 'react-native-reanimated';
import Subslide from './SubsSlide';
import Slide, {SLIDE_HEIGHT} from './Slide';
import { useValue, onScrollEvent, interpolateColor, useScrollHandler } from 'react-native-redash';
import Dot from "./Dot";
import {AuthNavigationProps} from "../../components/Navigation";
import { theme } from "../../components";


const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: theme.colors.background
    },
    underlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        justifyContent: "flex-end",
        borderTopLeftRadius: theme.borderRadii.xl,
        overflow: "hidden"
    },
    slider: {
        height: SLIDE_HEIGHT,
        borderBottomRightRadius: theme.borderRadii.xl,
    },
    footer: {
        flex: 1,
    },
    footerContainer: {
        flex: 1,
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: theme.borderRadii.xl
    },
    pagination: {
        ...StyleSheet.absoluteFillObject,
        height: theme.borderRadii.xl,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    }
});
const slides = [
    {
        title: "Relaxed",
        color: "#BFEAF5",
        subtitle: 'Find Your Outfit',
        description: "Confused about your outfit? Don't worry! Find the best outfit here!",
        picture: {
            src: require("./assets/1.png"),
            width: 730,
            height: 1095
        },
    },
    {
        title: "Playfull",
        color: "#BEECC4",
        subtitle: 'Hear it First, Wear it First',
        description: 'Hating the clothes in your wardrobe? Explore hundreds of outfit ideas',
        picture: {
            src: require("./assets/2.png"),
            width: 690,
            height: 1070
        },
    },
    {
        title: "Excentric",
        color: "#FFE4D9",
        subtitle: 'Your Style, Your Way',
        description: 'Create your individual & unique style and look amazing everyday',
        picture: {
            src: require("./assets/3.png"),
            width: 730,
            height: 1095
        },
    },
    {
        title: "Funky",
        color: "#FFDDDD",
        subtitle: 'Look Good, Feel Good',
        description: 'Discover the latest trends in fashion and explore your personality',
        picture: {
            src: require("./assets/4.png"),
            width: 616,
            height: 898
        }
    },
]

export const assets = slides.map(slide => slide.picture.src);

const Onboarding  = ({ navigation }: AuthNavigationProps<"Onboarding">) => {
    const scroll = useRef<Animated>(null);
    const {scrollHandler, x} = useScrollHandler();
    const backgroundColor = interpolateColor(x, {
        inputRange: slides.map((_, i) => i* width),
        outputRange: slides.map(slide => slide.color)
    });
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.slider, {backgroundColor}]}>
                {slides.map(({picture}, index) => {
                    const opacity = interpolate(x, {
                        inputRange: [(index - 0.5) * width, index * width, (index + 0.5) * width],
                        outputRange: [0, 1, 0],
                        extrapolate: Extrapolate.CLAMP
                    })
                    return (
                        <Animated.View key={index} style={[styles.underlay, { opacity }]}>
                            <Image source={picture.src} style={{
                                width: width - theme.borderRadii.xl,
                                height: ((width - theme.borderRadii.xl) * picture.height) / picture.width,
                        }} />
                        </Animated.View>
                    );
                })}
                <Animated.ScrollView
                ref={scroll}
                horizontal
                snapToInterval={width}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                bounces={false}
                {...scrollHandler}
                >
                    {slides.map(({ title, picture },index) => (
                        <Slide key={index} right={!!(index % 2)} {...{title, picture}} />
                    ))}
                </Animated.ScrollView>
            </Animated.View>
            <View style={styles.footer}>
                <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor }} />
                <View style={styles.footerContainer}>
                    <View style={styles.pagination}>
                        {slides.map((_, index) => (
                        <Dot key={index} currentIndex={divide(x, width)} {...{index}} />)
                        )}
                    </View>
                    <Animated.View style={{
                        flex: 1,
                        width: width * slides.length,
                        flexDirection: "row",
                        transform: [{ translateX: multiply(x, -1)}],
                    }}>

                    {slides.map(({ subtitle, description }, index) => {
                        const last = index === (slides.length - 1);
                        return (
                            <Subslide
                                key={index}
                                onPress={() => {
                                    if (last) {
                                        navigation.navigate("Welcome");
                                    } else {
                                        scroll.current
                                            ?.getNode()
                                            .scrollTo({ x: width * (index + 1), animated: true })
                                    }
                                }}
                                { ...{ subtitle, description, last } }
                            />
                        )
                    })}
                    </Animated.View>
                </View>
            </View>
        </View>
    )
}

export default Onboarding;
