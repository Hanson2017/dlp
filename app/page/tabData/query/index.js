import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';

import Theme from '../../../util/theme';
import Title from '../../../component/title';


const dataList = [
    { title: '风投系', tabId: { tab1: 0, tab2: 0 } },
    { title: '上市系', tabId: { tab1: 0, tab2: 1 } },
    { title: '国资系', tabId: { tab1: 0, tab2: 2 } },
    { title: '银行系', tabId: { tab1: 0, tab2: 3 } },
    { title: '民营系', tabId: { tab1: 0, tab2: 4 } },
    { title: '车贷类', tabId: { tab1: 1, tab2: 0 } },
    { title: '房贷类', tabId: { tab1: 1, tab2: 1 } },
    { title: '票据类', tabId: { tab1: 1, tab2: 2 } },
    { title: '个信类', tabId: { tab1: 1, tab2: 3 } },
    { title: '企业类', tabId: { tab1: 1, tab2: 4 } },
    { title: '网基类', tabId: { tab1: 1, tab2: 5 } },
    { title: '其他类', tabId: { tab1: 1, tab2: 6 } },
    { title: '银行直连', tabId: { tab1: 4, tab2: 0 } },
    { title: '直接存管', tabId: { tab1: 4, tab2: 1 } },
    { title: '联合存管', tabId: { tab1: 4, tab2: 2 } },
]


export default class Data extends React.Component {

    render() {
        const { navigation } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'多维度分析'} navigation={navigation} screenUrlInfo={{ screenUrl: 'QueryNav', tabId: null }} />
                <View style={styles.queryContainer}>
                    {
                        dataList.map((item, i) => {
                            return (
                                <TouchableOpacity key={i} style={[styles.itemBtn, styles['itemBtn' + i]]}
                                    onPress={() => { navigation.navigate('Query', { tabId: item.tabId }) }}
                                >
                                    <Text style={styles.itemBtnText}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    <TouchableOpacity style={[styles.itemBtn, styles.itemBtnMore]}
                        onPress={() => { navigation.navigate('QueryNav', { tabId: null }) }}
                    >
                        <Text style={[styles.itemBtnText, styles.itemBtnMoreText]}>更多</Text>
                    </TouchableOpacity>

                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    queryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: Theme.screenWidth / 4,
        borderRightWidth: 1,
        borderRightColor: '#eee',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemBtn3: {
        borderRightWidth: 0,
    },
    itemBtn7: {
        borderRightWidth: 0,
    },
    itemBtn11: {
        borderRightWidth: 0,
    },
    itemBtn12: {
        borderBottomWidth: 0,
    },
    itemBtn13: {
        borderBottomWidth: 0,
    },
    itemBtn14: {
        borderBottomWidth: 0,
    },
    itemBtnMore: {
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    itemBtnText: {
        fontSize: 14,
        color: '#333',
    },
    itemBtnMoreText: {
        color: '#999',
    },
})