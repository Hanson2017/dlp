import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Util from '../../../util/util';
import Theme from '../../../util/theme';
import Title from '../../../component/title';

class List extends React.Component {
    render() {
        const { data, navigation } = this.props;
        const url = 'http://m.fanlimofang.com/Activity/Detail/' + data.activityid
        return (
            <TouchableOpacity style={styles.list}
                onPress={() => {
                    Util.Linked(url)
                }}
            >
                <Text style={styles.platnameText}>{data.platname}</Text>
                <Text style={styles.investInfoText}>{data.investtype == 0 ? '首投' : '复投'}{data.invest}获得{data.rebate}</Text>
                <View style={styles.keywords}>
                    <Text style={styles.keywordsText}>{data.keywords.split(',')[0]}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


export default class Activity extends React.Component {
    render() {
        const { navigation, data } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'热门活动'} mfTag={true} navigation={navigation} screenUrlInfo={{ screenUrl: 'FlmfList', tabId: null }} />
                <View style={styles.activityContainer}>
                    {
                        data.map((item, i) => {
                            return (
                                <List data={item} key={i} navigation={navigation} />
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    activityContainer: {
        paddingBottom: 20,
        paddingLeft: 17,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    list: {
        marginRight: 30,
        paddingTop: 18,
        paddingBottom: 10,
        width: (Theme.screenWidth - 17 - 30 * 2) / 2,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    platnameText: {
        fontSize: 14,
        color: '#101010'
    },
    investInfoText: {
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 14,
        color: '#0096E6',
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
