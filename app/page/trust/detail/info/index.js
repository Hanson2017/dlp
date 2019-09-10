import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Util from '../../../../util/util';
import TabBar from '../../../../component/tabBar/detail';
import Loading from '../../../../component/loading';

import Gongshang from './gongshang';
import Gudong from './gudong';
import Jichu from './jichu';

export default class DetailInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['股东监控', '工商信息', '基础信息'],
        };
    }
    render() {
        const { tabNames } = this.state;
        const { navigation, data } = this.props;
        return (
            <View style={styles.container}>

                <ScrollableTabView
                    renderTabBar={() => <TabBar tabNames={tabNames} />}
                >
                    <View style={styles.content} tabLabel='key1'>
                        <Gudong data={{gudong:data.gudong,changelist:data.changelist,renyuan:data.renyuan,shouyirenlist:data.shouyirenlist}} navigation={navigation} />
                    </View>
                    <View tabLabel='key2'>
                        <Gongshang data={data.companyinfo} />
                    </View>
                    <View tabLabel='key3'>
                        <Jichu data={data.trinfo} />
                    </View>
                </ScrollableTabView>


            </View>
        )
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