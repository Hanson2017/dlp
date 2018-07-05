import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../../util/theme';
import Util from '../../../../util/util';

export default class Jichu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMore: [false, false],
            ref: false,
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
                                <Text style={styles.label}>运营公司：</Text>
                                <Text style={styles.text}>{data.info_yygs}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>ICP备案号 ：</Text>
                                <Text style={styles.text}>{data.info_icp}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>客服电话 ：</Text>
                                <Text style={styles.text}>{data.info_tel}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>电子邮件：</Text>
                                <Text style={styles.text}>{data.info_email}</Text>
                            </View>
                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>公司地址：</Text>
                                <Text style={styles.text}>{data.info_address}</Text>
                            </View>

                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>平台介绍 ：</Text>
                            </View>
                            <View style={styles.jingyingfanweiContainer}>
                                <View style={styles.jingyingfanwei}>
                                    <Text style={styles.jingyingfanweiText}>
                                        {this.state.isShowMore[0] ? Util.delHtmlTag(data.info_plat) : Util.delHtmlTag(data.info_plat).substr(0, 74) + '...'}
                                    </Text>
                                </View>
                                <View style={styles.openContainer}>
                                    <TouchableOpacity style={styles.openBtn}
                                        onPress={() => {
                                            this.state.isShowMore[0] = !this.state.isShowMore[0]
                                            this.setState({
                                                ref: !this.state.ref
                                            })
                                        }}>
                                        <Icon name={this.state.isShowMore[0] ? 'triangleHollow-up' : 'triangleHollow-down'} size={14} color={!this.state.isShowMore[0]?'#bbb':Theme.color} />
                                        <Text style={[styles.openBtnText,this.state.isShowMore[0]?{color:Theme.color}:null]}>{this.state.isShowMore[0] ? '收起' : '展开'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.GongshangList}>
                                <Text style={styles.label}>团队介绍 ：</Text>
                            </View>
                            <View style={styles.jingyingfanweiContainer}>
                                <View style={styles.jingyingfanwei}>
                                    <Text style={styles.jingyingfanweiText}>
                                        {this.state.isShowMore[1] ? Util.delHtmlTag(data.info_team) : Util.delHtmlTag(data.info_team).substr(0, 74) + '...'}
                                    </Text>
                                </View>
                                <View style={styles.openContainer}>
                                    <TouchableOpacity style={styles.openBtn}
                                        onPress={() => {
                                            this.state.isShowMore[1] = !this.state.isShowMore[1]
                                            this.setState({
                                                ref: !this.state.ref
                                            })
                                        }}>
                                        <Icon name={this.state.isShowMore[1] ? 'triangleHollow-up' : 'triangleHollow-down'} size={14} color={!this.state.isShowMore[1]?'#bbb':Theme.color} />
                                        <Text style={[styles.openBtnText,this.state.isShowMore[1]?{color:Theme.color}:null]}>{this.state.isShowMore[1] ? '收起' : '展开'}</Text>
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
    jingyingfanweiContainer: {
        paddingBottom: 10,
    },
    jingyingfanwei: {
        padding: 8,
        backgroundColor: '#f5f5f5',
    },
    jingyingfanweiText: {
        fontSize: 12,
        color: '#707070',
        lineHeight: 20,
    },
    openContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    openBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    openBtnText: {
        paddingLeft: 4,
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