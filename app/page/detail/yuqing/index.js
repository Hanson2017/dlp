import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Util from '../../../util/util';
import TabBar from '../../../component/tabBar/detail';
import Loading from '../../../component/loading';

import Pingce from './pingce';
import Yulun from './yulun';
import Comments from './comments';

export default class DetailData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['评测监控', '舆论监控', '点评监控'],
        };
    }
    render() {
        const { tabNames, dataSource, loading } = this.state;
        const { platInfo, navigation } = this.props;
        return (
            <View style={styles.container}>
               <ScrollableTabView
                        renderTabBar={() => <TabBar tabNames={tabNames} />}
                    >
                    <View style={styles.content} tabLabel='key1'>
                        
                        <Pingce navigation={navigation} platInfo={platInfo} />
                    </View>
                    <View tabLabel='key2'>
                        <Yulun navigation={navigation} platInfo={platInfo} />
                    </View>
                    <View tabLabel='key3'>
                        <Comments navigation={navigation} platInfo={platInfo} />
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