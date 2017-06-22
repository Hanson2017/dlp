import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';

import Title from '../../../component/Title';

export default class Basic extends React.Component {
    render() {
        let data = this.props.data;
        return (
            <ScrollView>
                <Title titleText={'基础信息'} />
                <View style={styles.basicBox}>
                    <View style={styles.basicList}>
                        <Text style={styles.basicListLabel}>运营公司</Text>
                        <Text style={styles.basicListText}>{data.info_yygs}</Text>
                    </View>
                    <View style={styles.basicList}>
                        <Text style={styles.basicListLabel}>公司地址</Text>
                        <Text style={styles.basicListText}>{data.info_address}</Text>
                    </View>
                    <View style={styles.basicList}>
                        <Text style={styles.basicListLabel}>客服电话</Text>
                        <Text style={styles.basicListText}>{data.info_tel}</Text>
                    </View>
                    <View style={styles.basicList}>
                        <Text style={styles.basicListLabel}>邮件地址</Text>
                        <Text style={styles.basicListText}>{data.info_email}</Text>
                    </View>
                    <View style={styles.basicList}>
                        <Text style={styles.basicListLabel}>注册资金</Text>
                        <Text style={styles.basicListText}>
                            {data.info_Funds == '' || data.info_Funds == '不明' ?
                                '不明'
                                :
                                data.info_Funds + '万人民币'
                            }

                        </Text>
                    </View>
                    <View style={styles.basicList}>
                        <Text style={styles.basicListLabel}>ICP备案号</Text>
                        <Text style={styles.basicListText}>{data.info_icp}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    basicBox: {
        padding: 10,
    },
    basicList: {
        flexDirection: 'row',
        marginBottom:12,
    },
    basicListText: {
        flex: 1,
        color: '#333',
        lineHeight:22,
    },
    basicListLabel: {
        lineHeight:22,
        width: 90,
        color: '#ccc',
    },
    ListText: {
        width: 170,
        color: '#ABB7C4',
        fontSize: 12,
        lineHeight: 24,
    },
})