
import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Theme from '../../util/theme';
import Header from '../../component/navBar'
import TabBar from '../../component/tabBar';

import Rongzi from './temp/rongzi'
import Yewu from './temp/yewu'
import ListTab from './temp/listTab'

export default class QueryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['融资背景', '业务类型', '地区', '上线时间', '银行存管'],
            totalNum: [
                { type: '多维度', num: 0 },
                { type: '多维度', num: 0 },
                { type: '多维度', num: 0 },
                { type: '多维度', num: 0 },
                { type: '多维度', num: 0 }
            ],
            index: 0,
            type: '多维度',
            ref: false,
            tabN: null
        };
    }
    changeTotalNum(type, totalNum, index) {
        this.state.totalNum[index].num = totalNum
        this.state.totalNum[index].type = type
        this.setState({
            ref: !this.state.ref
        })
    }

    componentWillMount() {
        const navigation = this.props.navigation;
        this.setState({
            tabN: navigation.state.params.tabId.tab2
        })
    }
    render() {
        const { tabNames, tabN } = this.state
        const navigation = this.props.navigation;
        const { params } = navigation.state;
        return (
            <View style={Theme.container}>
                <Header headerOpt={{ title: '多维度查询', }} navigation={this.props.navigation} />
                <View style={Theme.content}>

                    <ScrollableTabView
                        locked={true}
                        renderTabBar={() => <TabBar tabNames={tabNames} />}
                        initialPage={params.tabId.tab1}
                        onChangeTab={(obj) => {
                            this.setState({
                                index: obj.i
                            })

                        }}
                    >
                        <View style={styles.content} tabLabel='key1'>
                            <Rongzi
                                navigation={navigation}
                                initialPage={params.tabId.tab1 == 0 ? params.tabId.tab2 : 0}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key2'>
                            <Yewu
                                navigation={navigation}
                                initialPage={params.tabId.tab1 == 1 ? params.tabId.tab2 : 0}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key3'>
                            <ListTab
                                navigation={navigation}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'diqu', type: 'diqu', dataName: 'dataList' }}
                                tabWidth={{ width: (Theme.screenWidth - 70) / 6 }}
                                tabN={params.tabId.tab1 == 2 ? params.tabId.tab2 : null}
                                tabIndex={2}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                            <ListTab
                                navigation={navigation}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'diqu', type: 'shangxian', dataName: 'dataList' }}
                                titleText={'年'}
                                tabWidth={{ width: (Theme.screenWidth - 50) / 4 }}
                                tabN={params.tabId.tab1 == 3 ? params.tabId.tab2 : null}
                                tabIndex={3}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key5'>
                            <ListTab
                                navigation={navigation}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'diqu', type: 'cunguan', dataName: 'dataList' }}
                                tabWidth={{ width: (Theme.screenWidth - 40) / 3 }}
                                tabIndex={4}
                                tabN={params.tabId.tab1 == 4 ? params.tabId.tab2 : null}
                            />
                        </View>
                    </ScrollableTabView>
                </View>
            </View>
        );
    }
    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            index: params.tabId.tab1
        })
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
    }
})


