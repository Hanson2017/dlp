import React, { Component } from 'react';
import { Text, StyleSheet, View, } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from '../../../component/tabBar/detail';

import All from './all';
import Pingce from './pingce';
import Yulun from './yulun';
import Comments from './comments';

export default class DetailData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['全部', '评测监控', '舆论监控', '点评监控'],
        };
    }
    render() {
        const { tabNames, dataSource, loading } = this.state;
        const { platInfo, navigation } = this.props;
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    renderTabBar={() => <TabBar tabNames={tabNames} />}
                    onChangeTab={(obj) => {
                        if (obj.i == (tabNames.length - 1)) {
                            this.props.isFootNot('null')
                        }
                        else{
                            this.props.isFootNot(obj.i)
                        }
                        
                    }}
                >
                    <View style={styles.content} tabLabel='key1'>
                        <All navigation={navigation} platInfo={platInfo} />
                    </View>
                    <View style={styles.content} tabLabel='key2'>

                        <Pingce navigation={navigation} platInfo={platInfo} />
                    </View>
                    <View style={styles.content} tabLabel='key3'>
                        <Yulun navigation={navigation} platInfo={platInfo} />
                    </View>
                    <View style={styles.content} tabLabel='key4'>
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