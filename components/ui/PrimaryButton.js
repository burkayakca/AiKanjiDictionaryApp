import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import colors from './CustomColors';

function PrimaryButton({onPress,children}) {

    return (
        <View style={styles.buttonOuterContainer}>
                <Pressable style = {({pressed}) => 
                    pressed ? [styles.buttonInnerContainer, styles.pressed]: styles.buttonInnerContainer }
                    onPress={onPress} 
                    android_ripple={{color: colors.bs.primary}}
                    >
                        <Text style={styles.buttonText}>{children}</Text>
                </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: "hidden",
        elevation: 2,
    },
    buttonInnerContainer: {
        backgroundColor: colors.bs.primary,
        paddingVertical:10,
        paddingHorizontal: 24,
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    },
    pressed : {
        opacity: 0.75,
    }
});

export default PrimaryButton;

