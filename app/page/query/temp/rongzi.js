
import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';

import Util from '../../../util/util';
import Loading from '../../../component/loading';
import TabBar from '../../../component/tabBar/tabQuery';
import ListPage from '../../listData'
import Update from './update'

import List from '../../pingji/temp/All'


export default class QueryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['风投系', '上市系', '国资系', '银行系', '民营系'],
            upDateTime: Util.setDate(new Date()),
            loading: true,
            totalNum: [
                { type: '风投系', num: 0 },
                { type: '上市系', num: 0 },
                { type: '国资系', num: 0 },
                { type: '银行系', num: 0 },
                { type: '民营系', num: 0 }
            ],
            index: 0,
        };
    }
    changeUpDateTime(update) {
        this.setState({
            upDateTime: update
        })
    }
    changeTotalNum(totalNum) {
        this.state.totalNum[this.state.index].num = totalNum
        this.setState({
            ref: !this.state.ref
        })
        this.props.changeTotalNum(this.state.totalNum[this.state.index].type, totalNum, 0)
    }
    render() {
        let tabNames = this.state.tabNames;
        let navigation = this.props.navigation;
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <View style={{ flex: 1, }}>
                    <ScrollableTabView
                        locked={true}
                        renderTabBar={() => <TabBar tabNames={tabNames} />}
                        initialPage={this.props.initialPage?this.props.initialPage:0}
                        onChangeTab={(obj) => {
                            this.setState({
                                index: obj.i
                            })
                            this.props.changeTotalNum(this.state.totalNum[obj.i].type, this.state.totalNum[obj.i].num, 0)
                        }}
                    >

                        <View style={styles.content} tabLabel='key11'>

                            <ListPage
                                navigation={navigation}
                                itemRow={List}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'rongzi', type: 'rongzi', dataName: 'dataList' }}
                                columnDb={false}
                                update={true}
                                Ttype={'风投'}
                            >
                                <Update upDateTime={this.state.upDateTime} />
                            </ListPage>
                        </View>
                        <View style={styles.content} tabLabel='key12'>
                            <ListPage
                                navigation={navigation}
                                itemRow={List}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'rongzi', type: 'shangshi', dataName: 'dataList' }}
                                columnDb={false}
                                update={true}
                                Ttype={'上市'}
                            >
                                <Update upDateTime={this.state.upDateTime} />
                            </ListPage>
                        </View>
                        <View style={styles.content} tabLabel='key13'>
                            <ListPage
                                navigation={navigation}
                                itemRow={List}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'rongzi', type: 'guozi', dataName: 'dataList' }}
                                columnDb={false}
                                update={true}
                                Ttype={'国资'}
                            >
                                <Update upDateTime={this.state.upDateTime} />
                            </ListPage>
                        </View>
                        <View style={styles.content} tabLabel='key14'>
                            <ListPage
                                navigation={navigation}
                                itemRow={List}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'rongzi', type: 'yinhang', dataName: 'dataList' }}
                                columnDb={false}
                                update={true}
                                Ttype={'银行'}
                            >
                                <Update upDateTime={this.state.upDateTime} />
                            </ListPage>
                        </View>
                        <View style={styles.content} tabLabel='key15'>
                            <ListPage
                                navigation={navigation}
                                itemRow={List}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                changeUpDateTime={this.changeUpDateTime.bind(this)}
                                type={{ column: 'rongzi', type: 'minying', dataName: 'dataList' }}
                                columnDb={false}
                                update={true}
                                Ttype={'民营'}
                            >
                                <Update upDateTime={this.state.upDateTime} />
                            </ListPage>
                        </View>
                    </ScrollableTabView>

                </View>
            );
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false,
                index: this.props.initialPage ? this.props.initialPage : 0,
            })
        }, 10)
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    }
})


