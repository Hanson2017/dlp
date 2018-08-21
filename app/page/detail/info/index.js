import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Util from '../../../util/util';
import TabBar from '../../../component/tabBar/detail';
import Loading from '../../../component/loading';

import Gongshang from './gongshang';
import Gudong from './gudong';
import Jichu from './jichu';

export default class DetailInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['股东监控', '工商信息', '基础信息'],
            loading: true,
            dataSource: null
        };
    }
    render() {
        const { tabNames, dataSource, loading } = this.state;
        const { platInfo, navigation } = this.props;
        return (
            <View style={styles.container}>
                {
                    loading ?
                        <Loading />
                        :
                        <ScrollableTabView
                            renderTabBar={() => <TabBar tabNames={tabNames} />}
                        >
                            <View style={styles.content} tabLabel='key1'>
                                <Gudong data={dataSource.dataDetail} navigation={navigation} />

                            </View>
                            <View tabLabel='key2'>
                                <Gongshang data={dataSource.dataDetail} />
                            </View>
                            <View tabLabel='key3'>
                                <Jichu data={dataSource.dataDetail.baseinfo} />
                            </View>
                        </ScrollableTabView>
                }

            </View>
        )
    }
    componentDidMount() {
        let id = this.props.platInfo.id;
        Util.getDataDetail(this, 'com', id)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 25,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
    }
})