import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { SafeAreaView } from "react-navigation";
import Theme from '../../../util/theme';
import Header from '../../../component/navBar';
import TabBar from '../../../component/tabBar';
import Toast from '../../../component/toast';

import Guanzhu from './guanzhu';
import Comments from './comments';
import Collection from './collection';
import Set from './set';

export default class AccountScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['关注平台', '我的评论', '收藏夹', '个人设置'],
            index: 0,
            guanzhuDel: false,
            collectionDel: false,
        };
    }
    componentWillMount() {
        const { navigation } = this.props;
        const { params } = navigation.state;
        let tab = 0
        if (params != undefined) {
            tab = params.tabId
        }
        this.setState({
            index: tab,
        })
    }
    render() {
        const { tabNames, guanzhuDel, collectionDel, index } = this.state;
        const { navigation } = this.props;
        const { params } = navigation.state;
        let tab = 0
        if (params != undefined) {
            tab = params.tabId
        }
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '个人中心', title: '个人中心', search: true }} navigation={navigation}>
                        {
                            index == 0 ?
                                <TouchableOpacity style={styles.headerRight}
                                    onPress={() => {
                                        this.setState({
                                            guanzhuDel: !guanzhuDel,
                                        })
                                    }}
                                >
                                    <Text style={styles.headerRightText}>{guanzhuDel ? '完成' : '编辑'}</Text>
                                </TouchableOpacity>
                                :
                                index == 2 ?
                                    <TouchableOpacity style={styles.headerRight}
                                        onPress={() => {
                                            this.setState({
                                                collectionDel: !collectionDel,
                                            })
                                        }}
                                    >
                                        <Text style={styles.headerRightText}>{collectionDel ? '完成' : '编辑'}</Text>
                                    </TouchableOpacity>
                                    :
                                    null
                        }
                    </Header>
                    <View style={Theme.content}>
                        <ScrollableTabView
                            initialPage={tab}
                            renderTabBar={() => <TabBar tabNames={tabNames} />}
                            onChangeTab={(obj) => {
                                this.setState({
                                    index: obj.i
                                })

                            }}
                        >

                            <View style={styles.content} tabLabel='key1'>
                                <Guanzhu navigation={navigation} guanzhuDel={guanzhuDel} that={this} />
                            </View>
                            <View style={styles.content} tabLabel='key2'>
                                <Comments navigation={navigation} />
                            </View>
                            <View style={styles.content} tabLabel='key3'>
                                <Collection navigation={navigation} collectionDel={collectionDel} that={this} />
                            </View>

                            <View style={styles.content} tabLabel='key4'>
                                <Set navigation={navigation} />
                            </View>
                        </ScrollableTabView>
                    </View>
                    <Toast ref={'Toast'} />
                </View>
            </SafeAreaView>
        );
    }
    toastShow(data) {
        this.refs.Toast.show(data)
    }
    toastHide() {
        this.refs.Toast.cancel();
    }
}
const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    headerRight: {
        width: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerRightText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})