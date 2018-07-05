import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../../util/theme';
import Title from '../../../../component/title';

export default class Gudong extends React.Component {
    render() {
        let data = this.props.data;
        if (data != null) {
            var gudongxinxi = data.gudongxinxi;
            var gudongchengyuan = data.zhuyaorenyuan;
            var shouyiren = data.shouyiren;
        }

        return (
            <View>
                {
                    data != null ?
                        <ScrollView contentContainerStyle={styles.container}>
                            <View style={[Theme.box]}>
                                <Title data={'股权信息'} borderNot={true} />
                                {
                                    gudongxinxi != null && gudongxinxi.length > 0 ?
                                        <View style={styles.gudongInfo}>


                                            {
                                                gudongxinxi.map((list, i) => {
                                                    return (
                                                        <View style={[styles.gudongInfoList, gudongxinxi.length - 1 == i ? { borderBottomWidth: 0 } : null]} key={i}>
                                                            <View style={styles.gudongInfoHeader}>
                                                                <Text style={styles.gudongInfoName}>{list.name}</Text>
                                                                {
                                                                    list.dagudong == 1 ?
                                                                        <View style={styles.iconGd}><Text style={styles.iconGdText}>大股东</Text></View>
                                                                        :
                                                                        null
                                                                }
                                                            </View>
                                                            <View style={styles.gudongInfotype}>
                                                                <Text style={styles.gudongInfotypeText}>[{list.type}]</Text>
                                                            </View>
                                                            <View style={styles.gudongInfoBd}>
                                                                <Text style={[styles.gudongInfoBdText, styles.gudongInfoBdTextBili]}>
                                                                    持股比例：
                                                                    <Text style={{ color: Theme.color, fontSize: 12, }}>{list.renjiaobili != '' ? list.renjiaobili : '--'}</Text>
                                                                </Text>
                                                                <Text style={[styles.gudongInfoBdText, styles.gudongInfoBdTextChuzi]}>认缴出资：{list.renjiao != '' ? list.renjiao : '--'}</Text>
                                                                {
                                                                    list.renjiaoshijian != '-' ?
                                                                        <Text style={styles.gudongInfoBdText}>{list.renjiaoshijian}</Text>
                                                                        :
                                                                        null
                                                                }
                                                            </View>

                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                        :
                                        <Text style={styles.null2}>暂无股权信息</Text>
                                }
                            </View>
                            <View style={[Theme.box, Theme.mt10, { borderBottomWidth: 0, }]}>
                                <Title data={'主要成员'} />
                                {
                                    gudongchengyuan != null && gudongchengyuan.length > 0 ?
                                        <View style={styles.memberBox}>
                                            <View style={styles.memberInfo}>
                                                {
                                                    gudongchengyuan.map((list, i) => {

                                                        return (
                                                            <View style={[styles.memberInfoList, gudongchengyuan.length - 1 == i || (gudongchengyuan.length - 2 == i && i % 2 == 0) ? { borderBottomWidth: 0 } : null]} key={i}>
                                                                <Text numberOfLines={1} style={styles.memberInfoTextName}>{list.name}</Text>
                                                                <View style={styles.memberInfoZhiwei}>
                                                                    <Text numberOfLines={1} style={styles.memberInfoTextZhiwei}>{list.zhiwei}</Text>
                                                                </View>

                                                            </View>
                                                        )

                                                    })
                                                }

                                            </View>
                                        </View>
                                        :
                                        <Text style={styles.null2}>暂无成员信息</Text>
                                }
                            </View>
                            <View style={[Theme.box, Theme.mt10, { borderBottomWidth: 0, }]}>
                                <Title data={'最终受益人'} />
                                {
                                    shouyiren != null && shouyiren.length > 0 ?
                                        <View style={styles.shouyirenBox}>
                                            <View style={styles.shouyirenInfo}>
                                                {
                                                    shouyiren.map((list, i) => {

                                                        return (
                                                            <View style={[styles.shouyirenList,shouyiren.length-1==i?{borderBottomWidth:0}:null]}>
                                                                <Text style={[styles.shouyirenListText, styles.shouyirenListNumText]}>[{list.number}]</Text>
                                                                <Text style={styles.shouyirenListText}>最终受益人：<Text style={styles.shouyirenListTextC}>{list.name}</Text></Text>
                                                                <Text style={styles.shouyirenListText}>持股比例：<Text style={styles.shouyirenListTextC}>{list.bili}</Text></Text>
                                                                <Text style={styles.shouyirenListText}>股权链：</Text>
                                                                {
                                                                    list.guquan.map((item, j) => {
                                                                        return (
                                                                            <View style={styles.guquanlianList}>
                                                                                <View style={styles.guquanlianListLujing}>
                                                                                    <Text style={styles.guquanlianListText}>路径 {item.number}（占比约 {item.bili}）</Text>
                                                                                </View>
                                                                                <View style={styles.guquanlianListCon}>
                                                                                    <Text style={styles.guquanlianBiliName}>{item.name}</Text>
                                                                                    {
                                                                                        item.guquan_detail.map((list3, z) => {
                                                                                            return (
                                                                                                <View>
                                                                                                    <View style={styles.guquanlianBili}>
                                                                                                        <Icon name={'down'} size={16} color={'#999'} />
                                                                                                        <Text style={styles.guquanlianBiliText}>{list3.bili}</Text>
                                                                                                    </View>
                                                                                                    <Text style={styles.guquanlianBiliName}>{list3.name}</Text>
                                                                                                </View>
                                                                                            )
                                                                                        })
                                                                                    }
                                                                                </View>
                                                                            </View>
                                                                        )
                                                                    })
                                                                }
                                                            </View>
                                                        )

                                                    })
                                                }

                                            </View>
                                        </View>
                                        :
                                        <Text style={styles.null2}>暂无最终受益人</Text>
                                }
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
    container: {
        backgroundColor: Theme.bgColor,
    },
    gudongInfo: {
        paddingTop: 15,
        paddingLeft: 17,
    },
    gudongInfoList: {
        marginBottom: 12,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    gudongInfoHeader: {
        flexDirection: 'row',
    },
    gudongInfoName: {
        color: '#666',
        fontSize: 14,
        lineHeight: 16,
        fontWeight: 'bold',
    },
    iconGd: {
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 16,
        backgroundColor: '#E51C23',
        borderRadius: 4,
    },
    iconGdText: {
        color: '#fff',
        fontSize: 11,
    },
    gudongInfotype: {
        paddingTop: 8,
        paddingBottom: 8,
    },
    gudongInfotypeText: {
        color: '#999',
        fontSize: 11,
    },
    gudongInfoBd: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gudongInfoBdText: {
        color: '#999',
        fontSize: 11,
    },
    gudongInfoBdTextBili: {
        width: 120,
    },
    gudongInfoBdTextChuzi: {
        width: 140,
    },

    memberBox: {
        padding: 17,
        paddingRight: 0,
    },
    memberTitle: {
        color: '#ccc',
        marginTop: 5,
        marginBottom: 15,
    },
    memberInfo: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    memberInfoList: {
        paddingBottom: 10,
        marginBottom: 10,
        width: (Theme.screenWidth - 40) / 2,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    memberInfoTextName: {
        fontSize: 14,
        color: '#666',
    },
    memberInfoZhiwei: {
        marginTop: 5,
        width: 70,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
    },
    memberInfoTextZhiwei: {
        color: '#bbb',
        fontSize: 12,
    },
    shouyirenBox: {
        padding: 17,
    },
    shouyirenList:{
        borderBottomWidth:1,
        borderBottomColor:'#eee',
        marginBottom:10,
        paddingBottom:5,
    },
    shouyirenListText: {
        paddingTop:4,
        paddingBottom:4,
        color: '#999',
        fontSize: 12,
    },
    shouyirenListNumText: {
        paddingBottom:10,
        color: '#666',
        fontSize: 14,
        fontWeight: 'bold',
    },
    shouyirenListTextC: {
        color: '#666',
        fontSize: 14,
    },
    guquanlianList: {
        marginBottom: 10,
        
        backgroundColor: '#F5F5F5',
    },
    guquanlianListLujing:{
        paddingLeft:10,
        height:30,
        backgroundColor:'#eee',
        justifyContent:'center',
    
    },
    guquanlianListCon:{
        padding:10,
    },
    guquanlianListText: {
        color: '#999',
        fontSize: 12,
    },
    guquanlianBili:{
        paddingTop:6,
        paddingBottom:6,
        flexDirection:'row',
        alignItems: 'center',
    },
    guquanlianBiliText:{
        color: Theme.color,
        fontSize: 11,
    },
    guquanlianBiliName:{
        color: '#666',
        fontSize: 12,
    },

    null: {
        paddingTop: 15,
        paddingLeft: (Theme.screenWidth - 210) / 2,
        backgroundColor: '#fff',
    },
    nullText: {
        fontSize: 14,
        color: '#bbb',
    },
    null2: {
        padding: 17,
        fontSize: 14,
        color: '#bbb',
    },

})