
import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../component/TabBar2';
import Util from '../../util/util';
import Theme from '../../util/theme';
import stylesList from '../../css/listData';

import ListPage from '../../component/listData'
import List from './list'


export default class QueryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['风投系', '上市系', '国资系', '银行系', '民营系'],
            upDateTime: Util.setDate(new Date()),
        };
    }
    changeUpDateTime(update) {
        this.setState({
            upDateTime: update
        })
    }
    render() {
        let tabNames = this.state.tabNames;
        let navigation = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <View style={stylesList.update}>
                    <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                    <Text style={stylesList.updateText}>{this.state.upDateTime}</Text>
                </View>
                <ScrollableTabView
                    locked={true}
                    renderTabBar={() => <TabBar tabNames={tabNames} />}
                    initialPage={this.props.initialPage}
                    onChangeTab={(obj) => {
                        this.props.changeIndex( obj.i)
                    }}
                >
                    <View style={styles.content} tabLabel='key1'>
                        <ListPage
                            navigation={navigation}
                            itemRow={List}
                            changeTotalNum={this.props.changeTotalNum.bind(this)}
                            changeUpDateTime={this.changeUpDateTime.bind(this)}
                            type={{ column: 'rongzi', type: 'rongzi', dataName: 'dataList' }}
                            columnDb={false}
                            update={true}
                            Ttype={'风投'}
                        />
                    </View>
                    <View style={styles.content} tabLabel='key2'>
                        <ListPage
                            navigation={navigation}
                            itemRow={List}
                            changeTotalNum={this.props.changeTotalNum.bind(this)}
                            changeUpDateTime={this.changeUpDateTime.bind(this)}
                            type={{ column: 'rongzi', type: 'shangshi', dataName: 'dataList' }}
                            columnDb={false}
                            update={true}
                            Ttype={'上市'}
                        />
                    </View>
                    <View style={styles.content} tabLabel='key3'>
                        <ListPage
                            navigation={navigation}
                            itemRow={List}
                            changeTotalNum={this.props.changeTotalNum.bind(this)}
                            changeUpDateTime={this.changeUpDateTime.bind(this)}
                            type={{ column: 'rongzi', type: 'guozi', dataName: 'dataList' }}
                            columnDb={false}
                            update={true}
                            Ttype={'国资'}
                        />
                    </View>
                    <View style={styles.content} tabLabel='key4'>
                        <ListPage
                            navigation={navigation}
                            itemRow={List}
                            changeTotalNum={this.props.changeTotalNum.bind(this)}
                            changeUpDateTime={this.changeUpDateTime.bind(this)}
                            type={{ column: 'rongzi', type: 'yinhang', dataName: 'dataList' }}
                            columnDb={false}
                            update={true}
                            Ttype={'银行'}
                        />
                    </View>
                    <View style={styles.content} tabLabel='key4'>
                        <ListPage
                            navigation={navigation}
                            itemRow={List}
                            changeTotalNum={this.props.changeTotalNum.bind(this)}
                            changeUpDateTime={this.changeUpDateTime.bind(this)}
                            type={{ column: 'rongzi', type: 'minying', dataName: 'dataList' }}
                            columnDb={false}
                            update={true}
                            Ttype={'民营'}
                        />
                    </View>
                </ScrollableTabView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    }
})


