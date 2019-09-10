import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, ART } from 'react-native';
import Theme from '../../../util/theme';
import Util from '../../../util/util';
import Title from '../../../component/title';

import DashLine from '../../../component/dashLine';



export default class Dapan extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'热门活动'} mfTag={true} navigation={navigation} screenUrlInfo={{screenUrl:'FlmfList',tabId:null}} />
                <ScrollView horizontal={true} style={styles.content} showsHorizontalScrollIndicator={false}>
                    {
                        data.map((item, i) => {
                            const url = 'http://m.fanlimofang.com/Activity/Detail/' + item.activityid
                            return (
                                <TouchableOpacity key={i} style={styles.item} activeOpacity={0.6}
                                    onPress={() => {
                                        Util.Linked(url)
                                    }}
                                >
                                    <View style={styles.arrow}></View>
                                    <View style={styles.header}>
                                        <Text style={styles.headerText}>{item.platname}</Text>
                                    </View>

                                    <DashLine width={128} />
                                    <View style={styles.body}>
                                        <Text style={styles.bodyText}>{item.investtype == 0 ? '首投' : '复投'}{item.invest}</Text>
                                        <Text style={styles.bodyText}>获得{item.rebate}</Text>
                                    </View>
                                    {
                                        item.keywords.split(',')[0] !== ''?
                                        <View style={styles.keywords}>
                                        <Text style={styles.keywordsText}>{item.keywords.split(',')[0]}</Text>
                                    </View>
                                    :
                                    null
                                    }
                                    
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
    content: {
        paddingTop:5,
        paddingLeft: 15,
        marginTop: 10,
    },
    item: {
        position: 'relative',
        marginRight: 15,
        width: 130,
        height: 125,
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
        width: 128,
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
        width: 128,
        paddingTop: 5,
        fontSize: 14,
        color: '#666',
        fontWeight: 'bold',
        textAlign:'center',
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

