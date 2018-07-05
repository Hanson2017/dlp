import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';

import Theme from '../../../util/theme';
import Title from '../../../component/title';

class List extends React.Component {
    render() {
        const { index, data, navigation, borderNot } = this.props;
        return (
            <TouchableOpacity style={[styles.listContainer, borderNot ? { borderBottomWidth: 0 } : null]}
                onPress={() => { navigation.navigate('Detail', { id: data.id_dlp, platName: data.plat_name }) }}
            >
                <View style={styles.listNo}><Text style={styles.listNoText}>{index + 1}</Text></View>
                <View style={styles.listplatName}><Text style={styles.listplatNameText}>{data.plat_name}</Text></View>
                <View style={styles.listChengjiao}><Text style={styles.listText}>{data.amount}</Text></View>
                <View style={styles.listRate}><Text style={styles.listText}>{data.rate}%</Text></View>
                <View style={styles.listLimit}><Text style={styles.listText}>{data.loanPeriod}月</Text></View>


            </TouchableOpacity>
        )
    }
}




export default class Data extends React.Component {
    render() {
        const { navigation, data } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'数据概况'} navigation={navigation} screenUrlInfo={{ screenUrl: 'Data', tabId: null }} />
                <View style={styles.listBox}>
                    <View style={styles.hdContainer}>
                        <View style={styles.listNo}><Text style={styles.hdText}>排名</Text></View>
                        <View style={styles.listplatName}><Text style={styles.hdText}>平台名称</Text></View>
                        <View style={styles.listChengjiao}><Text style={styles.hdText}>成交量(万元)</Text></View>
                        <View style={styles.listRate}><Text style={styles.hdText}>综合利率</Text></View>
                        <View style={styles.listLimit}><Text style={styles.hdText}>平均借款期限</Text></View>
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
    hdText: {
        fontSize: 11,
        color: '#999',
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 36,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    listNo: {
        paddingRight: 10,
        width: 34,
        alignItems: 'center',
    },
    listNoText: {
        fontSize: 12,
        color: '#666',
    },
    listplatName: {
        paddingRight: 6,
        width: 76,
        width: Theme.screenWidth >= 375 ? 76 : 60,
    },
    listplatNameText: {
        fontSize: Theme.screenWidth >= 375 ? 12 : 11,
        color: '#666',
    },
    listText: {
        fontSize: Theme.screenWidth >= 375 ? 14 : 12,
        color: '#999'
    },
    listChengjiao: {
        width: Theme.screenWidth >= 375 ? 86 : 70,
    },
    listRate: {
        width: 70,
    }
})