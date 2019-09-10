import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Theme from '../../../../../util/theme';
import Title from '../../../../../component/title';

export default class TrustDetailZonglanPingji extends React.Component {
    render() {
        const { navigation, data } = this.props;
        const nowdata = data.nowdata;
        const initdata = data.initdata;
        return (
            <View style={[Theme.box, Theme.mt10]}>
                <Title data={'数据跟踪'} navigation={navigation} />
                <View style={styles.listContainer}>
                    <View style={styles.list}>
                        <Text style={[styles.name, styles.nameZh]}>{nowdata.year}年净利润</Text>

                        <View style={styles.listCon}>
                            <Text style={[styles.score, styles.scoreZh]}>{nowdata.profit_sum}亿</Text>
                            <Text style={[styles.totalNum, styles.totalNumZh]}>统计{initdata.platnum}家信托公司排</Text>
                            <Text style={[styles.ordernum, styles.ordernumZh]}>{nowdata.profit_order}</Text>
                        </View>

                    </View>
                    <View style={styles.list}>
                        <Text style={styles.name}>{nowdata.year}年营业收入</Text>
                        <View style={styles.listCon}>
                            <Text style={styles.score}>{nowdata.incom_sum}亿</Text>
                            <Text style={styles.totalNum}>统计{initdata.platnum}家信托公司排</Text>
                            <Text style={styles.ordernum}>{nowdata.incom_order}</Text>
                        </View>
                    </View>
                    <View style={styles.list}>
                        <Text style={styles.name}>{nowdata.year}年总资产</Text>
                        <View style={styles.listCon}>
                            <Text style={styles.score}>{nowdata.assets_sum}亿</Text>
                            <Text style={styles.totalNum}>统计{initdata.platnum}家信托公司排</Text>
                            <Text style={styles.ordernum}>{nowdata.assets_order}</Text>
                        </View>
                    </View>
                    <View style={styles.list}>
                        <Text style={styles.name}>{nowdata.year}年管理信托资产</Text>
                        <View style={styles.listCon}>
                            <Text style={styles.score}>{nowdata.trust_sum}亿</Text>
                            <Text style={styles.totalNum}>统计{initdata.platnum}家信托公司排</Text>
                            <Text style={styles.ordernum}>{nowdata.trust_order}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingLeft: 17,
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listCon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        width: 110,
        fontSize: 11,
        color: '#999',
    },
    score: {
        width: 75,
        fontSize: 14,
        color: '#666',
    },
    totalNum: {
        width: 120,
        fontSize: 11,
        color: '#999',
    },
    ordernum: {
        width: 40,
        fontSize: 14,
        color: Theme.color,
    },
    nameZh: {
        fontSize: 12,
        color: '#303030',
    },
    scoreZh: {
        fontSize: 18,
        color: Theme.color2,
        fontWeight: 'bold',
    },
    totalNumZh: {
        fontSize: 12,
    },
    ordernumZh: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    null: {
        fontSize: 12,
        color: '#ccc',
    },
})

