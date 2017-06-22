import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar } from 'react-native';

import Header from '../component/Header'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../component/TabBar';
import Theme from '../util/theme';

import ListPage from '../component/listData'

import All from './health/all'
import Zijin from './health/zijin'
import Fensan from './health/fensan'
import Liudong from './health/liudong'
import Shouyi from './health/shouyi'
import Renqi from './health/renqi'
import Tiliang from './health/tiliang'
import Zhongcheng from './health/zhongcheng'
import Chengzhang from './health/chengzhang'

export default class HealthScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['综指', '资金', '分散', '流动', '收益', '人气', '体量','忠诚','成长'],
            totalNum: [0,0,0,0,0,0,0,0,0],             
            index:0,
            ref:false
        };
    }
    changeTotalNum(totalNum) {       
        this.state.totalNum[this.state.index]=totalNum
        this.setState({
            ref:!this.state.ref
        })
    }
    render() {
        let tabNames = this.state.tabNames;
       let navigation = this.props.navigation;
        return (
            <View style={Theme.container}>

                <Header headerOpt={{ back: '健康度', title: '健康度' }} navigation={navigation} />
                <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ color: '#4C5763', fontSize: 12 }}>健康度统计平台数量：{this.state.totalNum[this.state.index]}家</Text>
                </View>
                <View style={Theme.content}>
                    <ScrollableTabView
                         renderTabBar={() => <TabBar tabNames={tabNames} />}
                         onChangeTab={(obj)=>{
                             this.setState({
                                 index:obj.i
                             })
                         }}
                     >
                         <View style={styles.content} tabLabel='key1'>
                            <ListPage
                                navigation={navigation}
                                itemRow={All}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'health', type: 'all', dataName: 'dataList' }}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key2'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Zijin}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'health', type: 'zijin', dataName: 'dataList' }}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key3'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Fensan}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'health', type: 'fensan', dataName: 'dataList' }}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key4'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Liudong}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'health', type: 'liudong', dataName: 'dataList' }}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key5'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Shouyi}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'health', type: 'shouyi', dataName: 'dataList' }}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key6'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Renqi}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'health', type: 'renqi', dataName: 'dataList' }}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key7'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Tiliang}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'health', type: 'tiliang', dataName: 'dataList' }}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key8'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Zhongcheng}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'health', type: 'zhongcheng', dataName: 'dataList' }}
                            />
                        </View>
                        <View style={styles.content} tabLabel='key9'>
                            <ListPage
                                navigation={navigation}
                                itemRow={Chengzhang}
                                changeTotalNum={this.changeTotalNum.bind(this)}
                                type={{ column: 'health', type: 'chengzhang', dataName: 'dataList' }}
                            />
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
    }
})


