import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Theme from '../../../util/theme';

export default class Gudong extends React.Component {
    render() {
        let data = this.props.data;
        if (data != null) {
            var gudongxinxi = data.gudongxinxi;
            var gudongchengyuan = data.zhuyaorenyuan;
        }

        return (
            <View style={{ flex: 1 }}>
                {
                    data != null ?
                        <ScrollView>
                            {
                                gudongxinxi != null && gudongxinxi.length > 0 ?
                                    <View>
                                        <View style={styles.gudongInfoTop}>
                                            <Text style={styles.gudongInfoTopT1}>股东类型</Text>
                                            <Text style={styles.gudongInfoTopT1}>股东</Text>
                                        </View>
                                        {
                                            gudongxinxi.map((list, i) => {
                                                return (
                                                    <View style={styles.gudongInfo} key={i}>
                                                        <Text style={styles.gudongInfoL} >{list.type}</Text>
                                                        <View style={styles.gudongInfoR}>
                                                            <View style={{ flexDirection: 'row', }}>
                                                                <Text style={styles.gudongInfoName}>{list.name}</Text>
                                                                {
                                                                    list.dagudong == 1 ?
                                                                        <View style={styles.iconGd}><Text style={styles.iconGdText}>大股东</Text></View>
                                                                        :
                                                                        null
                                                                }

                                                            </View>
                                                            <Text style={styles.gudongInfoJ}><Text style={{ color: '#ABB7C4' }}>持股比例</Text>    {list.renjiaobili != '' ? list.renjiaobili : '--'}</Text>
                                                            <View style={{ flexDirection: 'row', marginTop: 8, }}>
                                                                <Text style={{ fontSize: 12.5 }}><Text style={{ color: '#ABB7C4' }}>认缴出资</Text>    {list.renjiao != '' ? list.renjiao : '--'} </Text>
                                                                {
                                                                    list.renjiaoshijian != '-' ?
                                                                    <Text style={{ color: '#ccc', fontSize: 12.5,marginLeft: 30, }}>{list.renjiaoshijian}</Text>
                                                                    :
                                                                    null
                                                                }
                                                               
                                                            </View>


                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                    :
                                    <Text style={styles.null}>暂无股东信息</Text>
                            }
                            {
                                gudongchengyuan != null && gudongchengyuan.length > 0 ?
                                    <View style={styles.memberBox}>
                                        <Text style={styles.memberTitle}>主要成员</Text>
                                        <View style={styles.memberInfo}>
                                            {
                                                gudongchengyuan.map((list, i) => {
                                                    return (
                                                        <View style={styles.memberInfoList}>
                                                            <Text numberOfLines={1} style={styles.memberInfoTextName}>{list.name}</Text>
                                                            <Text numberOfLines={1} style={styles.memberInfoTextZhiwei}>{list.zhiwei}</Text>
                                                        </View>
                                                    )

                                                })
                                            }

                                        </View>
                                    </View>
                                    :
                                    <Text style={styles.null}>暂无成员信息</Text>
                            }
                        </ScrollView>
                        :
                        <Text style={styles.null}>暂无股东信息</Text>
                }

            </View>
        )
    }
}
const styles = StyleSheet.create({
    gudongInfoTop: {
        paddingLeft: 10,
        flexDirection: 'row',
    },
    gudongInfoTopT1: {
        width: 75,
        color: '#ccc',
    },
    gudongInfo: {
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    gudongInfoL: {
        width: 75,
        lineHeight: 22,
        color: '#333'
    },
    gudongInfoR: {
        flex: 1,
    },
    gudongInfoName: {
        color: '#333',
        lineHeight: 22,
    },
    gudongInfoJ: {
        marginTop: 8,
        fontSize: 12.5,
    },
    null: {
        padding: 10,
        color: '#ccc',
    },
    memberBox: {
        padding: 10,
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
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginBottom: 10,
        width: (Theme.screenWidth - 30) / 2,
        height: 50,
        backgroundColor: '#f7f7f7',
        borderColor: '#e4e4e4',
        borderWidth: 1,
    },
    memberInfoTextName: {
        color: '#2D3640',
    },
    memberInfoTextZhiwei: {
        marginTop: 5,
        color: '#ABB7C4',
        fontSize: 12
    },
    iconGd: {
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 18,
        backgroundColor: 'red',
        borderRadius: 8,
    },
    iconGdText: {

        color: '#fff',
        fontSize: 12,
    }
})