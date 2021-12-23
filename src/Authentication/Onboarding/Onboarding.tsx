import React from 'react';
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { multiply } from 'react-native-reanimated';
import Subslide from './SubsSlide';
import Slide, {SLIDE_HEIGHT} from './Slide';
import { useValue, onScrollEvent, interpolateColor } from 'react-native-redash';

const { width } = Dimensions.get("window");

const BORDER_RADIUS =75;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "white"
    },
    slider: {
        height: SLIDE_HEIGHT,
        borderBottomRightRadius: BORDER_RADIUS,
    },
    footer: {
        flex: 1,
    },
    footerContainer: {
        flexDirection: "row",
        backgroundColor: "white",
        borderTopLeftRadius: BORDER_RADIUS
    }
});
const slides = [
    {
        title: "Relaxed",
        color: "#BFEAF5",
        subtitle: 'Find Your Outfit',
        description: "Confused about your outfit? Don't worry! Find the best outfit here!",
        picture: {
            src: require("../assets/1.png"),
            width: 730,
            height: 1095
        }
    },
    {
        title: "Playfull",
        color: "#BEECC4",
        subtitle: 'Hear it First, Wear it First',
        description: 'Hating the clothes in your wardrobe? Explore hundreds of outfit ideas',
        picture: {
            src: require("../assets/2.png"),
            width: 690,
            height: 1070
        }
    },
    {
        title: "Excentric",
        color: "#FFE4D9",
        subtitle: 'Your Style, Your Way',
        description: 'Create your individual & unique style and look amazing everyday',
        picture: {
            src: require("../assets/3.png"),
            width: 730,
            height: 1095
        }
    },
    {
        title: "Funky",
        color: "#FFDDDD",
        subtitle: 'Look Good, Feel Good',
        description: 'Discover the latest trends in fashion and explore your personality',
        picture: {
            src: require("../assets/4.png"),
            width: 616,
            height: 898
        }
    },
]

const Onboarding = () => {
    const x = useValue(0);
    const onScroll = onScrollEvent({ x });
    const backgroundColor = interpolateColor(x, {
        inputRange: slides.map((_, i) => i* width),
        outputRange: slides.map(slide => slide.color)
    });
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.slider, {backgroundColor}]}>
                <Animated.ScrollView
                horizontal
                snapToInterval={width}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={1}
                {...{ onScroll }}
                >
                    {slides.map(({ title },index) => (
                        <Slide key={index} right={!!(index % 2)} {...{title}} />
                    ))
                    }
                </Animated.ScrollView>
            </Animated.View>
            <View style={styles.footer}>
                <Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor }} />
                <Animated.View
                style={[
                    styles.footerContainer,
                    {width: width * slides.length, flex: 1, transform: [{
                        translateX: multiply(x, -1)
                    }]}
                ]}>
                    {slides.map(({ subtitle, description },index) => (
                        <Subslide key={index} last={index === slides.length -1}
                        {...{subtitle, description}} />
                    ))
                    }
                </Animated.View>
            </View>
        </View>
    )
}

export default Onboarding;
