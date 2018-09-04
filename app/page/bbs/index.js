
import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { SafeAreaView } from "react-navigation";
import Api from '../../util/api';
import Util from '../../util/util';
import Theme from '../../util/theme';
import Header from '../../component/navBar'
import TabBar from '../../component/tabBar';

import List from './list';


export default class PingceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['热门话题', '华尔街的旗帜', '曝光台'],
            ref: false,
            updatetime: Util.setDate(new Date())
        };
    }
    render() {
        const { navigation } = this.props;
        const { tabNames, updatetime } = this.state;
        const { params } = this.props.navigation.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '论坛动态', title: '论坛动态' }} navigation={navigation} />
                    <View style={styles.update}>
                        <Text style={[styles.updateText]}>更新时间：{updatetime}</Text>
                    </View>
                    <View style={Theme.content}>
                        <ScrollableTabView
                            renderTabBar={() => <TabBar tabNames={tabNames} />}

                            onChangeTab={(obj) => {
                                this.setState({
                                    index: obj.i
                                })
                            }}
                        >
                            <View style={styles.content} tabLabel='key1'>
                                <List navigation={navigation} tType={'forumhot'} />
                            </View>
                            <View style={styles.content} tabLabel='key2'>
                                <List navigation={navigation} tType={'forum1'}>
                                    <TouchableOpacity style={styles.barTit}
                                        onPress={() => { 
                                            Util.goBBs(navigation,Api.bbsHejUrl); 
                                        }}
                                    >
                                        <View style={styles.barTitLeft}>
                                            <Image source={{ uri: Api.bbsHejIconUrl }} style={styles.iconImg} />
                                            <Text style={styles.barTitText}>华尔街的旗帜</Text>
                                        </View>
                                        <View style={styles.barTitRight}>
                                            <Text style={styles.barMoreText}>前往论坛交流</Text>
                                            <Icon name={'triangle-right22'} size={12} color={'#C8AF95'} />
                                        </View>
                                    </TouchableOpacity>
                                </List>
                            </View>
                            <View style={styles.content} tabLabel='key3'>
                                <List navigation={navigation} tType={'forum2'}>
                                    <TouchableOpacity style={styles.barTit}
                                        onPress={() => { 
                                            Util.goBBs(navigation,Api.bbsBgtUrl); 
                                        }}
                                    >
                                        <View style={styles.barTitLeft}>
                                            <Image source={{ uri: Api.bbsBgtIconUrl }} style={styles.iconImg} />
                                            <Text style={styles.barTitText}>曝光台</Text>
                                        </View>
                                        <View style={styles.barTitRight}>
                                            <Text style={styles.barMoreText}>前往论坛交流</Text>
                                            <Icon name={'triangle-right22'} size={12} color={'#C8AF95'} />
                                        </View>
                                    </TouchableOpacity>
                                </List>
                            </View>
                        </ScrollableTabView>

                    </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    update: {
        position: 'relative',
        top: -7,
        paddingBottom: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    updateText: {
        fontSize: 10,
        color: '#83CAFF',
    },
    barTit: {
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    iconImg: {
        width: 30,
        height: 30,
    },
    barTitText: {
        paddingLeft: 5,
        fontSize: 16,
        color: '#515151',
        fontWeight: 'bold',
    },
    barTitLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    barTitRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    barMoreText: {
        paddingRight: 3,
        color: '#C8AF95',
        fontSize: 11,
    },

})