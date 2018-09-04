import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../../util/theme';
import Api from '../../../util/api';
import Util from '../../../util/util';
import Title from '../../../component/title';

export default class Report extends React.Component {

    render() {
        const { navigation, data } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'论坛热帖'} navigation={navigation} />
                <View style={styles.bbsContainer}>
                    <TouchableOpacity style={styles.bbshead}
                        onPress={() => { 
                            Util.goBBs(navigation,Api.bbsHejUrl);
                        }}
                    >
                        <View style={styles.iconL}>
                            <Image source={{ uri: Api.bbsHejIconUrl }} style={styles.iconImg} />
                        </View>
                        <View style={styles.bbsheadRight}>
                            <Text style={styles.bbsheadRightHd}>华尔街的旗帜</Text>
                            <Text style={styles.bbsheadRightNote}>综合讨论区，主要讨论关于P2P平台的风控内容，严禁吹子和黑子。</Text>
                            <View style={styles.bbsheadRightBt}>
                                <View style={styles.bbsheadRightBtL}>
                                    {/* <Text style={styles.bbsheadRightBtText}>今日: {data.bbsHejtoday}</Text>
                                    <Text style={[styles.bbsheadRightBtText, styles.bbsheadRightBtTextthread]}>主题: {data.bbsHejthread}</Text> */}
                                </View>
                                <View style={styles.bbsGoIn} >
                                    <Text style={styles.bbsheadRightBtText}>进入板块</Text>
                                    <Icon name={'triangle-right22'} size={11} color={'#0096E6'} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.bbsListCon}>
                        {
                            data.bbsHejList.map((item, i) => {
                                return (
                                    <TouchableOpacity onPress={() => { 
                                        Util.goBBs(navigation,item.linkurl); 
                                    }}
                                        style={[styles.bbsList, data.bbsHejList.length - 1 == i ? { borderBottomWidth: 0 } : null]} key={i}>
                                        <Text style={styles.bbsListText}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </View>
                    <TouchableOpacity style={styles.bbshead}
                        onPress={() => { 
                            Util.goBBs(navigation,Api.bbsBgtUrl);
                         }}
                    >
                        <View style={styles.iconL}>
                            <Image source={{ uri: Api.bbsBgtIconUrl}} style={styles.iconImg} />
                        </View>
                        <View style={styles.bbsheadRight}>
                            <Text style={styles.bbsheadRightHd}>曝光台</Text>
                            <Text style={styles.bbsheadRightNote}>各类投资信息曝光，由管理员审核真实证据后进行发布。</Text>
                            <View style={styles.bbsheadRightBt}>
                                <View style={styles.bbsheadRightBtL}>
                                    {/* <Text style={styles.bbsheadRightBtText}>今日: {data.bbsBgttoday}</Text>
                                    <Text style={[styles.bbsheadRightBtText, styles.bbsheadRightBtTextthread]}>主题: {data.bbsBgtthread}</Text> */}
                                </View>
                                <View style={styles.bbsGoIn}>
                                    <Text style={styles.bbsheadRightBtText}>进入板块</Text>
                                    <Icon name={'triangle-right22'} size={11} color={'#0096E6'} />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.bbsListCon}>
                        {
                            data.bbsBgtList.map((item, i) => {
                                return (
                                    <TouchableOpacity onPress={() => { 
                                        Util.goBBs(navigation,item.linkurl); 
                                     }}
                                        style={[styles.bbsList, data.bbsHejList.length - 1 == i ? { borderBottomWidth: 0 } : null]} key={i}>
                                        <Text style={styles.bbsListText}>{item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bbsContainer: {
        paddingLeft: 17,
        paddingBottom: 15,
    },
    bbshead: {
        marginTop: 20,
        marginBottom: 10,
        padding: 10,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 8,
        flexDirection: 'row',
    },
    iconL: {
        width: 77,
        height: 77,
    },
    iconImg: {
        width: 77,
        height: 77,
    },
    bbsheadRight: {
        marginLeft: 15,
        flex: 1,
    },
    bbsheadRightHd: {
        fontSize: 16,
        color: '#515151',
        fontWeight: 'bold',
    },
    bbsheadRightNote: {
        paddingTop: 6,
        paddingBottom: 10,
        fontSize: 11,
        color: '#999',
        lineHeight: 14,
    },
    bbsheadRightBt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bbsheadRightBtL: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bbsGoIn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bbsheadRightBtText: {
        fontSize: 11,
        color: '#0096E6',
    },
    bbsList: {
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    bbsListText: {
        lineHeight: 18,
        color: '#101010',
        fontSize: 14,
    },
    bbsheadRightBtTextthread: {
        paddingLeft: 12,
    },
})