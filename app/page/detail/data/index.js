import React, { Component } from 'react';
import { Text, StyleSheet, View} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Util from '../../../util/util';
import TabBar from '../../../component/tabBar/detail';
import Loading from '../../../component/loading';

import Yunying from './yunying/index';
import Flow from './liuliang';
import User from './user';

export default class DetailData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['运营数据', '流量监控', '用户监控'],
            loading: true,
            dataSource: null
        };
    }
    render() {
        const { tabNames, dataSource, loading } = this.state;
        const { platInfo ,navigation} = this.props;
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
                                <Yunying data={dataSource.dataDetail} />
                            </View>
                            <View tabLabel='key2'>
                                <Flow platInfo={this.props.platInfo} />
                            </View>
                            <View tabLabel='key3'>
                                <User data={dataSource.userDetail} navigation={navigation} platInfo={platInfo} />
                            </View>
                        </ScrollableTabView>
                }

            </View>
        )
    }
    componentDidMount() {
        let id = this.props.platInfo.id;
        Util.getDataDetail(this, 'data', id)
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