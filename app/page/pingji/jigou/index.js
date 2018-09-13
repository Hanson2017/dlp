import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { SafeAreaView } from "react-navigation";

import Theme from '../../../util/theme';
import Header from '../../../component/navBar'
import TabBar from '../../../component/tabBar';
import ListPage from '../../listData';
import Update from '../../listData/update';

import All from '../temp/All'
import Wdzj from '../temp/wdzj'
import P2peye from '../temp/p2peye'
import Dlp from '../temp/dlp'
import R360 from '../temp/r360'

export default class PingjiScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['综合', '之家', '天眼', '贷罗盘', '融360'],
            totalNum: [0, 0, 0, 0, 0, 0, 0],
            index: 0,
            upDateTime: '',
            ref: false
        };
    }
    changeTotalNum(totalNum) {
        this.state.totalNum[this.state.index] = totalNum
        this.setState({
            ref: !this.state.ref
        })
    }
    changeUpDateTime(upDateTime) {
        this.setState({
            upDateTime: upDateTime
        })
    }

    render() {
        let { tabNames, upDateTime } = this.state;
        let navigation = this.props.navigation;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>

                    <Header headerOpt={{ back: '评级', title: '机构评级' }} navigation={navigation} />

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

                                <ListPage
                                    navigation={navigation}
                                    itemRow={All}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'pingji', type: 'all', dataName: 'gradeList' }}
                                    columnDb={false}
                                    isTags={true}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key2'>

                                <ListPage
                                    navigation={navigation}
                                    itemRow={Wdzj}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'pingji', type: 'wdzj', dataName: 'gradeList' }}
                                    columnDb={false}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key3'>
                                <ListPage
                                    navigation={navigation}
                                    itemRow={P2peye}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'pingji', type: 'p2peye', dataName: 'gradeList' }}
                                    columnDb={false}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key4'>
                                <ListPage
                                    navigation={navigation}
                                    itemRow={Dlp}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'pingji', type: 'dlp', dataName: 'gradeList' }}
                                    columnDb={false}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key5'>
                                <ListPage
                                    navigation={navigation}
                                    itemRow={R360}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'pingji', type: 'rong360', dataName: 'gradeList' }}
                                    columnDb={false}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                        

                        </ScrollableTabView>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
    }
})


