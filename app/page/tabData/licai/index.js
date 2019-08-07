import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import Theme from '../../../util/theme';
import Title from '../../../component/title';

class List extends React.Component {
    render() {
        const { index, data, navigation, borderNot } = this.props;
        return (
            <TouchableOpacity style={[styles.item, borderNot ? { borderBottomWidth: 0 } : null]}
                onPress={() => {  navigation.navigate('LicaiDetail', { id: data.id, })}}
            >
                <Text style={[styles.itemText, styles.cpmsText, styles.wcpms]} numberOfLines={1}>{data.cpms}</Text>
                <Text style={[styles.itemText, styles.wyjbjjz]}>{data.yjbjjz !== '' ? data.yjbjjz + '%' : '--'}</Text>
                <Text style={[styles.itemText, styles.wqxms]}>{data.qxms !== '' ? data.qxms : '--'}</Text>
            </TouchableOpacity>
        )
    }
}

export default class Data extends React.Component {
    render() {
        const { navigation, data } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'银行理财概况'} navigation={navigation} screenUrlInfo={{ screenUrl: 'LicaiList', tabId: null }} />
                <View style={styles.listBox}>
                    <View style={styles.hdContainer}>
                        <Text style={[styles.headerText, styles.wcpms]}>产品名称</Text>
                        <Text style={[styles.headerText, styles.wyjbjjz]}>比较基准率</Text>
                        <Text style={[styles.headerText, styles.wqxms]}>期限类型</Text>
                    </View>
                    {
                        data.map((item, i) => {
                            return (
                                <List data={item} index={i} key={i} navigation={navigation} borderNot={data.length - 1 == i ? true : false} />
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    listBox: {
        paddingTop: 15,
        paddingLeft: 17,
        paddingBottom: 15,
    },
    hdContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 11,
        color: '#999',
    },
    wcpms: {
        paddingRight: 10,
        width: Theme.screenWidth >= 375 ? 185 : 130,
    },
    wyjbjjz: {
        width: 75,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 36,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    itemText: {
        fontSize: 12,
        color: '#999'
    },
    cpmsText: {
        color: '#333',
    },

})