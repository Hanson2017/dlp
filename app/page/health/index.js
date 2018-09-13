import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { SafeAreaView } from "react-navigation";
import Theme from '../../util/theme';
import Header from '../../component/navBar'
import TabBar from '../../component/tabBar';
import ListPage from '../listData';
import Update from '../listData/update';

import All from './temp/all'
import Zijin from './temp/zijin'
import Fensan from './temp/fensan'
import Liudong from './temp/liudong'
import Shouyi from './temp/shouyi'
import Renqi from './temp/renqi'
import Tiliang from './temp/tiliang'
import Zhongcheng from './temp/zhongcheng'
import Chengzhang from './temp/chengzhang'

export default class HealthScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['综指', '资金', '分散', '流动', '收益', '人气', '体量', '忠诚', '成长'],
            totalNum: [0, 0, 0, 0, 0, 0, 0, 0, 0],
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

                    <Header headerOpt={{ back: '健康度', title: '健康度分析' }} navigation={navigation} />

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
                                    type={{ column: 'health', type: 'all', dataName: 'dataList' }}
                                    isTags={true}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key2'>
                                <ListPage
                                    navigation={navigation}
                                    itemRow={Zijin}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'health', type: 'zijin', dataName: 'dataList' }}
                                    isTags={true}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key3'>
                                <ListPage
                                    navigation={navigation}
                                    itemRow={Fensan}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'health', type: 'fensan', dataName: 'dataList' }}
                                    isTags={true}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key4'>
                                <ListPage
                                    navigation={navigation}
                                    itemRow={Liudong}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'health', type: 'liudong', dataName: 'dataList' }}
                                    isTags={true}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key5'>
                                <ListPage
                                    navigation={navigation}
                                    itemRow={Shouyi}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'health', type: 'shouyi', dataName: 'dataList' }}
                                    isTags={true}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key6'>
                                <ListPage
                                    navigation={navigation}
                                    itemRow={Renqi}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'health', type: 'renqi', dataName: 'dataList' }}
                                    isTags={true}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key7'>
                                <ListPage
                                    navigation={navigation}
                                    itemRow={Tiliang}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'health', type: 'tiliang', dataName: 'dataList' }}
                                    isTags={true}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key8'>
                                <ListPage
                                    navigation={navigation}
                                    itemRow={Zhongcheng}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'health', type: 'zhongcheng', dataName: 'dataList' }}
                                    isTags={true}
                                >
                                    <Update upDateTime={upDateTime} totalNum={this.state.totalNum[this.state.index]} />
                                </ListPage>
                            </View>
                            <View style={styles.content} tabLabel='key9'>
                                <ListPage
                                    navigation={navigation}
                                    itemRow={Chengzhang}
                                    changeTotalNum={this.changeTotalNum.bind(this)}
                                    changeUpDateTime={this.changeUpDateTime.bind(this)}
                                    type={{ column: 'health', type: 'chengzhang', dataName: 'dataList' }}
                                    isTags={true}
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


