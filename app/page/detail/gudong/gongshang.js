import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';

export default class Gongshang extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMore: false
        };
    }
    render() {
        let data = this.props.data;
        var cutWord = data.jingyingfanwei.substr(0, 40) + '...'
        return (
            <View>
                {
                    data != null ?
                        <ScrollView style={styles.GongshangBox}>

                            <Text style={styles.GongshangTitle}>基本信息( {data.companyname} )</Text>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>社会信用代码：</Text>
                                <Text style={styles.text}>{data.xinyongdaima}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>注册号：</Text>
                                <Text style={styles.text}>{data.zhucehao}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>组织机构代码：</Text>
                                <Text style={styles.text}>{data.zuzhidaima}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>公司类型：</Text>
                                <Text style={styles.text}>{data.gongshileixing}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>经营状态：</Text>
                                <Text style={styles.text}>{data.jingyingzhuangtai}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>法定代表人：</Text>
                                <Text style={styles.text}>{data.faren}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>成立日期：</Text>
                                <Text style={styles.text}>{data.chengliriqi}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>营业期限：</Text>
                                <Text style={styles.text}>{data.zhuceziben} 万人民币</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>注册资本：</Text>
                                <Text style={styles.text}>{data.xinyongdaima}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>核准日期：</Text>
                                <Text style={styles.text}>{data.fazhaoriqi}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>登记机关：</Text>
                                <Text style={styles.text}>{data.dengjijiguan}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>企业地址：</Text>
                                <Text style={styles.text}>{data.qiyedizhi}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>经营范围：</Text>
                                <View style={styles.text}>
                                    <Text style={styles.jingyingfanwei}>{this.state.isShowMore?data.jingyingfanwei:cutWord}</Text>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({
                                            isShowMore: !this.state.isShowMore
                                        })
                                    }}>
                                        <Text style={styles.openMore}>{this.state.isShowMore?'点击收起':'展开更多'}</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </ScrollView>
                        :
                        <Text style={styles.null}>暂无工商信息</Text>
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    GongshangBox: {
        padding: 10,
        marginBottom: 20,
    },
    GongshangTitle: {
        color: '#333',
        lineHeight: 20,
        marginBottom: 10,
    },
    GongshangList: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    label: {
        width: 120,
        color: '#abb7c4',
        lineHeight: 20,
    },
    text: {
        flex: 1,
        color: '#333',
        lineHeight: 20,
    },
    jingyingfanwei: {
        lineHeight: 20,
        color: '#333',
    },
    openMore: {
        marginTop: 10,
        color: '#ABB7C4',
    },
    null: {
        padding: 10,
        color: '#ccc'
    }
})