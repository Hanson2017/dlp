import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';

import Theme from '../../../util/theme';
import Title from '../../../component/title';
import Item from '../../home/fund/item';

export default class Fund extends React.Component {
    render() {
        const { navigation, data } = this.props;
        return (
            <View style={[styles.container, Theme.box]}>
                <Title data={'示范投资'} navigation={navigation} screenUrlInfo={{ screenUrl: 'Fund', tabId: null }} />
                <View style={styles.fundContainer}>
                    <View style={styles.fundIntroduce}>
                        <Text style={styles.fundIntroduceText}>示范投资是贷罗盘运营团队发起的网贷领投项目，按照风险评估分为“稳健型”、“平衡型”、“收益型”三种，可供广大投资人参考。</Text>
                        <Text style={styles.fundIntroduceText}>示范投资目前投资总额为 <Text style={{ color: Theme.color }}>{data.count}万</Text></Text>
                    </View>

                   <View style={styles.fundList}>
                        <Item typeNo={1} type={'稳健型'} navigation={navigation} data={data.list.Listfund1} />
                        <Item typeNo={2} type={'平衡型'} navigation={navigation} data={data.list.Listfund2} />
                        <Item typeNo={3} type={'收益型'} navigation={navigation} data={data.list.Listfund3} borderBottomNot={true} />
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
    fundList:{
        marginTop:5,
        marginBottom:5,
    },
    fundIntroduceText: {
        paddingRight:15,
        paddingTop: 6,
        color: '#999',
        fontSize: 12,
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
        fontSize: 11,
    },
})
