import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Util from '../../../util/util';

export default class List extends React.Component {

    render() {
        const { navigation, data ,borderNot} = this.props;
        return (
            <TouchableOpacity style={[styles.list,borderNot?{borderBottomWidth:0}:null]}
                onPress={() => { navigation.navigate('ReportsDetail', { id: data.id, type: data.type }) }}
            >
                <Text style={styles.titleText}>{data.title}</Text>
                <Text style={styles.addtime}>发布时间：{Util.formatDate(data.addtime)}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        paddingTop: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    titleText:{
        lineHeight:18,
        fontSize:14,
        color:'#333',
    },
    addtime:{
        paddingTop:5,
        fontSize:11,
        color:'#bbb',
    },
})
