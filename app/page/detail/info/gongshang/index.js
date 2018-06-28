import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../../util/theme';

export default class Gongshang extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMore: false
        };
    }
    render() {
        let data = this.props.data;

        return (
            <View>
                {
                    data != null ?
                        <ScrollView contentContainerStyle={styles.GongshangBox}>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>公司名称：</Text>
                                <Text style={styles.text}>{data.companyname}</Text>
                            </View>
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
                                <Text style={styles.text}>{data.yingyeqixian}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>注册资本：</Text>
                                <Text style={styles.text}>{data.zhuceziben} 万人民币</Text>
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
                            </View>
                            <View style={styles.jingyingfanweiContainer}>
                                <View style={styles.jingyingfanwei}>
                                    <Text style={styles.jingyingfanweiText}>
                                        {this.state.isShowMore ? data.jingyingfanwei : data.jingyingfanwei.substr(0, 74) + '...'}
                                    </Text>
                                </View>
                                <View style={styles.openContainer}>
                                    <TouchableOpacity style={styles.openBtn}
                                        onPress={() => {
                                            this.setState({
                                                isShowMore: !this.state.isShowMore
                                            })
                                        }}>
                                         <Icon name={this.state.isShowMore?'triangleHollow-up':'triangleHollow-down'} size={14} color={!this.state.isShowMore?'#bbb':Theme.color} />
                                        <Text style={[styles.openBtnText,this.state.isShowMore?{color:Theme.color}:null]}>{this.state.isShowMore ? '收起' : '展开'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                        :
                        <View style={styles.null}>
                            <Text style={styles.nullText}>暂无数据</Text>
                        </View>
                }
            </View>

        )
    }
}

const styles = StyleSheet.create({
    GongshangBox: {
        marginBottom: 15,
        padding: 15,
        paddingBottom: 0,
        marginBottom: 20,
    },
    GongshangList: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        paddingLeft: 10,
        width: 100,
        color: '#707070',
        fontSize: 12,
        lineHeight: 18,
    },
    text: {
        flex: 1,
        color: '#101010',
        fontSize: 12,
        lineHeight: 18,
    },
    jingyingfanweiContainer:{
        paddingBottom:20,
    },
    jingyingfanwei: {
        padding: 8,
        color: '#333',
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#E6E6E6',
    },
    jingyingfanweiText: {
        fontSize: 12,
        color: '#707070',
        lineHeight: 20,
    },
    openContainer:{
        paddingTop:15,
        paddingBottom:15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    openBtn:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    openBtnText:{
        paddingLeft:4,
        fontSize: 11,
        color: '#bbb',
    },
    null: {
        paddingTop: 15,
        paddingLeft: (Theme.screenWidth - 210) / 2,
        backgroundColor: '#fff',
    },
    nullText: {
        fontSize: 14,
        color: '#bbb',
    }
})