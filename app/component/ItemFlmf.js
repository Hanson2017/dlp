import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import Util from '../util/util';

export default class Item extends React.Component {
    render() {
        let item=this.props.data.item;
        let index=this.props.data.index;
        let url = 'http://m.fanlimofang.com/Activity/Detail/' + item.activityid
        return (
            <TouchableOpacity style={styles.listT} activeOpacity={0.4}
                key={index}
                onPress={() => {
                    Util.Linked(url)
                }}
            >
                <View style={styles.listTT}>
                    <Text style={styles.listText}>
                        {item.platname}
                    </Text>
                    <Text style={[styles.listText, { paddingLeft: 5, }]}>
                        {item.investtype == 0 ? '首投' : '复投'}
                        {item.invest}获
                        {item.rebate}
                    </Text>
                </View>
                <View style={styles.keywordsWp}>
                    <Text style={styles.keywords}>
                        {item.keywords}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({

    listT: {
        marginRight: 10,
        marginBottom: 12,
        width: 168,
        height: 54,
        backgroundColor: '#f7f7f7',
        borderWidth: 1,
        borderColor: '#e4e4e4'
    },
    listTT: {
        paddingLeft: 6,
        paddingTop: 9,
        flexDirection: 'row',
    },
    listText: {

        fontSize: 12,
        color: '#2D3640',
    },
    keywordsWp: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    keywords: {
        color: '#ABB7C4',
        fontSize: 12,
    }
})

