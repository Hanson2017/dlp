import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default class Update extends React.Component {
    render() {
        const {upDateTime}=this.props;
        return (
            <View style={styles.updateContainer}>
                <Text style={styles.updateContainerText}>更新时间：{upDateTime}</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    updateContainer:{
        backgroundColor: '#f2f2f2',
        height:30,
        justifyContent:'center',
        paddingLeft:10,
    },
    updateContainerText:{
        fontSize:10,
        color:'#AFAFAF'
    }
})