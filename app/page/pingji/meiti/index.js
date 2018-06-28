import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Theme from '../../../util/theme';
import Header from '../../../component/navBar'
import TabBar from '../../../component/tabBar';
import ListPage from '../../listData';
import Update from '../../listData/update';

import Yifei from '../temp/yifei';
import Yuanwang from '../temp/yuanwang';


export default class PingjiMTScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['羿飞评级', '远望评级'],
            totalNum: [0, 0],
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
            <View style={Theme.container}>

                <Header headerOpt={{ back: '评级', title: '媒体评级' }} navigation={navigation} />

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
                                itemRow={Yifei}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'pingji', type: 'yifei', dataName: 'gradeList' }}
                                columnDb={false}
                            >
                                <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                            </ListPage>
                        </View>
                        <View style={styles.content} tabLabel='key2'>

                            <ListPage
                                navigation={navigation}
                                itemRow={Yuanwang}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'pingji', type: 'yuanwang', dataName: 'gradeList' }}
                                columnDb={false}
                            >
                                <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                            </ListPage>
                        </View>
                        
                    </ScrollableTabView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
    }
})


