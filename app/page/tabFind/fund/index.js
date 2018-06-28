import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import Theme from '../../../util/theme';
import Title from '../../../component/title';

export default class Fund extends React.Component {
    render() {
        const { navigation, data } = this.props;
        return (
            <View style={[styles.container, Theme.box]}>
                <Title data={'示范投资'} navigation={navigation} screenUrlInfo={{ screenUrl: 'Fund', tabId: null }} />
                <View style={styles.fundContainer}>
                    <View style={styles.fundNav}>
                        <TouchableOpacity style={styles.nav}
                            onPress={() => { navigation.navigate('Fund', { tabId: 1 }) }}
                        >
                            <View style={[styles.fundNo, styles.fundNo1]}><Text style={styles.fundNoText}>1号</Text></View>
                            <Text style={styles.fundTypeText}>稳健型</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nav}
                            onPress={() => { navigation.navigate('Fund', { tabId: 2 }) }}
                        >
                            <View style={[styles.fundNo, styles.fundNo2]}><Text style={styles.fundNoText}>2号</Text></View>
                            <Text style={styles.fundTypeText}>平衡型</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.nav}
                            onPress={() => { navigation.navigate('Fund', { tabId: 3 }) }}
                        >
                            <View style={[styles.fundNo, styles.fundNo3]}><Text style={styles.fundNoText}>3号</Text></View>
                            <Text style={styles.fundTypeText}>收益型</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.fundIntroduce}>
                        <Text style={styles.fundIntroduceText}>示范投资是贷罗盘运营团队发起的网贷领投基金，按照风险评估分为“稳健型”、“平衡型”、“收益型”三种，可供广大投资人参考。</Text>
                        <Text style={styles.fundIntroduceText}>示范投资目前投资总额为 <Text style={{ color: Theme.color }}>{data}万</Text></Text>
                    </View>
                    <View style={styles.fundNote}>
                        <Text style={styles.fundNoteText}>※ 建议合理分配资金，选择优质平台分散投资</Text>
                        <Text style={styles.fundNoteText}>※ 示范投资仅起到参考作用</Text>
                    </View>
                </View>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
    fundContainer: {
        paddingLeft: 17,
    },
    fundNav: {
        paddingTop: 15,
        marginBottom: 8,
        flexDirection: 'row',
    },
    nav: {
        marginRight: 25,
        justifyContent: 'center',
    },
    fundNo: {
        marginBottom: 8,
        width: 48,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#4AB3FF',
    },
    fundNo1: {
        backgroundColor: '#4AB3FF',
    },
    fundNo2: {
        backgroundColor: '#D9B966',
    },
    fundNo3: {
        backgroundColor: '#784CF5',
    },
    fundNoText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    fundTypeText: {
        color: '#666',
        fontSize: 16,
        fontWeight: 'bold',
    },
    fundIntroduceText: {
        paddingTop: 6,
        color: '#999',
        fontSize: 11,
        lineHeight: 16,
    },
    fundNote: {
        marginTop: 8,
        paddingTop: 6,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    fundNoteText: {
        lineHeight: 16,
        color: '#bbb',
        fontSize: 10,
    },
})
