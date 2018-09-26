import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, } from 'react-native';
import Util from '../../../../util/util'

export default class Item extends React.Component {
    render() {
        const {navigation,item}=this.props;
        return (
            <TouchableOpacity
                style={styles.list}
                onPress={() => { navigation.navigate('YulunDetail', { url: item.siteurl }) }}
            >
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listDate}>{Util.formatDate(item.pubtime)}</Text>
            </ TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
   

    list: {
        flexDirection:'row',
        padding: 10,
        paddingLeft: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    listTitle: {
        paddingRight:15,
        flex:1,
        lineHeight: 20,
        color: '#101010',
        fontSize: 14,
    },
    listDate: {
        lineHeight: 20,
        color: '#bbb',
        fontSize: 11,
    },
   
})