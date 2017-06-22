import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default class Hexin extends React.Component {
    render() {
        let titleText=this.props.titleText;
        return (
            <View style={styles.Title}>
                <View style={styles.TitleIcon}></View>
                <Text style={styles.TitleText}>{titleText}</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    Title: {
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 34,
        backgroundColor: '#dfe5ea'
    },
    TitleIcon: {
        marginRight: 8,
        width: 4,
        height: 16,
        backgroundColor: '#2c3641',
    },
    TitleText: {
        color: '#2D3640',
    },

})
