import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../../util/theme';
import Title from '../../../../component/title';

export default class ZonglanShouyiren extends React.Component {
    render() {
        const shouyiren = this.props.data;
        return (
            <View style={[Theme.box, Theme.mt10]}>
                <Title data={'最终受益人'} />
                {
                    shouyiren != null && shouyiren.length > 0 ?
                        <View style={styles.shouyirenBox}>
                            <View style={styles.shouyirenInfo}>
                                {
                                    shouyiren.map((list, i) => {

                                        return (
                                            <View style={[styles.shouyirenList, shouyiren.length - 1 == i ? { borderBottomWidth: 0 } : null]} key={i}>
                                                <Text style={[styles.shouyirenListText, styles.shouyirenListNumText]}>[{list.number}]</Text>
                                                <Text style={styles.shouyirenListText}>最终受益人：<Text style={styles.shouyirenListTextC}>{list.name}</Text></Text>
                                                <Text style={styles.shouyirenListText}>持股比例：<Text style={styles.shouyirenListTextC}>{list.bili}</Text></Text>
                                                <Text style={styles.shouyirenListText}>股权链：</Text>
                                                {
                                                    list.guquan.map((item, j) => {
                                                        return (
                                                            <View style={styles.guquanlianList} key={j}>
                                                                <View style={styles.guquanlianListLujing}>
                                                                    <Text style={styles.guquanlianListText}>路径 {item.number}（占比约 {item.bili}）</Text>
                                                                </View>
                                                                <View style={styles.guquanlianListCon}>
                                                                    <Text style={styles.guquanlianBiliName}>{item.name}</Text>
                                                                    {
                                                                        item.guquan_detail.map((list3, z) => {
                                                                            return (
                                                                                <View key={z}>
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
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.bgColor,
    },
    shouyirenBox: {
        padding: 17,
    },
    shouyirenList: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: 10,
        paddingBottom: 5,
    },
    shouyirenListText: {
        paddingTop: 4,
        paddingBottom: 4,
        color: '#999',
        fontSize: 12,
    },
    shouyirenListNumText: {
        paddingBottom: 10,
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
    guquanlianListLujing: {
        paddingLeft: 10,
        height: 30,
        backgroundColor: '#eee',
        justifyContent: 'center',

    },
    guquanlianListCon: {
        padding: 10,
    },
    guquanlianListText: {
        color: '#999',
        fontSize: 12,
    },
    guquanlianBili: {
        paddingTop: 6,
        paddingBottom: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    guquanlianBiliText: {
        color: Theme.color,
        fontSize: 11,
    },
    guquanlianBiliName: {
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