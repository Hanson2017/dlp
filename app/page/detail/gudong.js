import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../component/TabBar2';
import stylesList from '../../css/listData';
import Util from '../../util/util'
import Loading from '../../component/Loading';

import GudongInfo from './gudong/gudong';
import Gongshang from './gudong/gongshang';

export default class Gudong extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['股东监控', '工商信息'],
            loading: true,
            dataSource: null
        };
    }
    render() {
        let tabNames = this.state.tabNames;
        let dataSource = this.state.dataSource;
        let platInfo = this.props.platInfo;
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <View style={stylesList.update}>
                        <Text style={[stylesList.updateText, { marginRight: 10, }]}>更新时间</Text>
                        <Text style={stylesList.updateText}>{platInfo.updatetime}</Text>
                    </View>
                    <ScrollableTabView
                        renderTabBar={() => <TabBar tabNames={tabNames} />}
                    >
                        <View style={styles.content} tabLabel='key1'>
                            <GudongInfo data={dataSource.dataDetail} />
                        </View>
                        <View tabLabel='key2'>
                          <Gongshang data={dataSource.dataDetail} />
                        </View>
                    </ScrollableTabView>
                </View>
            )
        }
    }
    componentDidMount() {
        let id=this.props.platInfo.id;
        Util.getDataDetail(this, 'com', id)
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
})
