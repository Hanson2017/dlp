import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Theme from '../../../../util/theme';
import Title from '../../../../component/title';

export default class ZonglanGudong extends React.Component {
    render() {
        const gudongxinxi=this.props.data;
        return (
            <View style={[Theme.box,Theme.mt10]}>
                <Title data={'股东监控'} />
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
                                          
                                            <View style={styles.gudongInfoBd}>
                                                <Text style={[styles.gudongInfoBdText, styles.gudongInfoBdTextBili]}>
                                                    持股比例：
                                                                    <Text style={{ color: Theme.color, fontSize: 12, }}>{list.renjiaobili != '' ? list.renjiaobili : '--'}</Text>
                                                </Text>
                                                <Text style={[styles.gudongInfoBdText, styles.gudongInfoBdTextChuzi]}>认缴出资：{list.renjiao != '' ? list.renjiao +'万元' : '--'}</Text>
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
        marginBottom:12,
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


    null2: {
        padding: 17,
        fontSize: 14,
        color: '#bbb',
    },

})