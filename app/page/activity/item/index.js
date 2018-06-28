import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity} from 'react-native';

import Theme from '../../../util/theme';
import Util from '../../../util/util';
import DashLine from '../../../component/dashLine';


export default class Item extends React.Component {
    render() {
        const { data } = this.props;
        const url = 'http://m.fanlimofang.com/Activity/Detail/' + data.activityid
        return (
            <TouchableOpacity style={styles.item} activeOpacity={0.6}
                onPress={() => {
                    Util.Linked(url)
                }}
            >
                <View style={styles.arrow}></View>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{data.platname}</Text>
                </View>

                <DashLine width={ (Theme.screenWidth-15*3)/2-2} />
                <View style={styles.body}>
                    <Text style={styles.bodyText}>{data.investtype == 0 ? '首投' : '复投'}{data.invest}获得{data.rebate}</Text>
                </View>
                <View style={styles.keywords}>
                    <Text style={styles.keywordsText}>{data.keywords.split(',')[0]}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
    item: {
        position: 'relative',
        marginRight: 15,
        marginBottom:15,
        width: (Theme.screenWidth-15*3)/2,
        height: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    arrow: {
        position: 'absolute',
        top: -3,
        left: -11,
        transform: [{ rotate: '135deg' }],
        borderTopWidth: 16,
        borderLeftWidth: 16,
        borderRightWidth: 16,
        borderTopColor: '#83CAFF',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    header: {
        width:  (Theme.screenWidth-15*3)/2,
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,

    },
    headerText: {
        fontSize: 14,
        color: '#101010',
    },

    body: {
        marginTop: 2,
        marginBottom: 7,
    },
    bodyText: {
        paddingTop: 5,
        fontSize: 12,
        color: '#666',
        fontWeight: 'bold',
    },
    keywords: {
        width: 100,
        height: 22,
        borderRadius: 4,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    keywordsText: {
        fontSize: 11,
        color: '#999'
    }
})

