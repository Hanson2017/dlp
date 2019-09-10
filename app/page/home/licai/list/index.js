import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Title from '../../title/index';

export default class HomeLicaiListComponent extends React.Component {

    render() {
        const { data, navigation } = this.props;
        return (
            <View style={[styles.container]}>
                <Title titleText={'最新发布产品'} navigation={navigation} screenUrl={'LicaiList'} />
                <View style={styles.licaiList}>
                    <View style={styles.licaiListHeader}>
                        <Text style={[styles.licaiListHeaderText, styles.wcpms]}>产品名称</Text>
                        <Text style={[styles.licaiListHeaderText, styles.wyjbjjz]}>比较基准率</Text>
                        <Text style={[styles.licaiListHeaderText, styles.wqxms]}>期限类型</Text>
                    </View>
                    <View style={styles.licaiListBody}>
                        {
                            data !== null && data.length > 0 ?
                                data.map((item, i) => {
                                    return (
                                        <TouchableOpacity onPress={() => { navigation.navigate('LicaiDetail', { id: item.id, }) }} style={[styles.item, data.length - 1 == i ? styles.notBt : null]} key={i}>
                                            <Text style={[styles.itemText, styles.wcpms]} numberOfLines={1}>{item.cpms}</Text>
                                            <Text style={[styles.itemText, styles.wyjbjjz]}>{item.yjbjjz !== '' ? item.yjbjjz + '%' : '--'}</Text>
                                            <Text style={[styles.itemText, styles.itemqxmsText, styles.wqxms]}>{item.qxms}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                                :
                                null
                        }

                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    licaiList: {
        marginTop: 15,
        paddingLeft: 17,
    },
    licaiListHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    wcpms: {
        paddingRight: 10,
        flex: 1,
    },
    wyjbjjz: {
        width: 80,
    },
    wqxms: {
        width: 85,
    },
    licaiListHeaderText: {
        fontSize: 12,
        color: '#bbb',
    },
    item: {
        height: 40,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    notBt: {
        borderBottomWidth: 0,
    },
    itemText: {
        fontSize: 12,
        color: '#666',
    },
    itemqxmsText: {
        color: '#999',
    },
})