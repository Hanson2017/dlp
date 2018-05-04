import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, Button, DeviceEventEmitter } from 'react-native';
import { StackNavigator, TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Icomoon';
import Drawer from 'react-native-drawer'
import '../config/asyncStorage'
import StorageLoginInfo from '../config/storageLogin'

import ControlPanel from './ControlPanel'
import Home from '../page/Home'
import Pingji from '../page/Pingji'
import Data from '../page/Data'
import Account from '../page/Account'
import Login from '../page/Login'
import AccountL from '../page/account/account'
import Health from '../page/Health'
import Flow from '../page/Flow'
import Black from '../page/Black'
import Zhengyi from '../page/Zhengyi'
import FlmfList from '../page/FlmfList'
import Yulun from '../page/Yulun'
import YulunDetail from '../page/YulunDetail'
import FiveYears from '../page/FiveYears'
import Fund from '../page/Fund'

import Search from '../page/Search'
import Detail from '../page/Detail'
import Query from '../page/Query'

const MainScreenNavigator = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: '首页',
            tabBarIcon: ({ tintColor }) => (
                <Icon name={'home'} size={22} color={tintColor} />
            ),
        }
    },
    Pingji: {
        screen: Pingji,
        navigationOptions: {
            tabBarLabel: '评级',
            tabBarIcon: ({ tintColor }) => (
                <Icon name={'pingji'} size={23} color={tintColor} />
            ),
        }
    },
    Data: {
        screen: Data,
        navigationOptions: {
            tabBarLabel: '数据',
            tabBarIcon: ({ tintColor }) => (
                <Icon name={'data'} size={23} color={tintColor} />
            ),
        }
    },
    Health: {
        screen: Health,
        navigationOptions: {
            tabBarLabel: '健康度',
            tabBarIcon: ({ tintColor }) => (
                <Icon name={'health'} size={22} color={tintColor} />
            ),
        }
    },
     Account: {
        screen: Account,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor }) => (
                <Icon name={'user'} size={22} color={tintColor} />
            ),
        }
    }
},
    {
        animationEnabled: true, // 切换页面时不显示动画
        tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
        swipeEnabled: false, // 禁止左右滑动
        // backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
        tabBarOptions: {
            activeTintColor: '#e91e63', // 文字和图片选中颜色
            // inactiveTintColor: '#000', // 文字和图片默认颜色
            showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
            indicatorStyle: { height: 0 }, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
            style: {
                // backgroundColor: '#f4f4f4', // TabBar 背景色
            },
            labelStyle: {
                // fontSize: 12, // 文字大小
            },
        },
    }
);

class DrawerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginState: false,
            ref: false
        };
    }
    closeControlPanel = () => {
        this._drawer.close()
    };
    openControlPanel = () => {
        this._drawer.open()
    };
    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<ControlPanel loginState={this.state.loginState} navigation={this.props.navigation} />}
                openDrawerOffset={0.1}
                closedDrawerOffset={0}
                styles={drawerStyles}
                tapToClose={true}
                panCloseMask={0.13}
            >
                <MainScreenNavigator screenProps={{openControlPanel: this.openControlPanel.bind(this), loginState: this.state.loginState ,navigation:this.props.navigation}} />
            </Drawer>
        )
    }
    componentDidMount() {
        let that = this;
        StorageLoginInfo.storageLoad(this)
        this.subscriptions = [
            window.EventEmitter.on('loginState', (data) => {
                StorageLoginInfo.storageLoad(this)
                console.log('登陆', signState)
            }),
            window.EventEmitter.on('logout', (data) => {
                that.setState({
                    loginState: false
                })
                console.log('退出登陆', signState)
            })
        ]
    }
    componentWillUnmount() {
        this.subscriptions.forEach((sub) => sub.off());
    }
}

const AppDlp = StackNavigator({
    Main: {
        screen: DrawerScreen,
        navigationOptions: {
            headerMode: 'none',
        }
    },
    Home:{
       screen: Home
    },
    Pingji:{
       screen: Pingji
    },
    Data:{
       screen: Data
    },
    Health:{
       screen: Data
    },
    Account:{
       screen: Account
    },
    AccountL:{
        screen:AccountL
    },
    Login:{
        screen:Login
    },
    Search: {
        screen: Search
    },
    Detail: {
        screen: Detail
    },
    Query: {
        screen: Query
    },
    Flow: {
        screen: Flow
    },
    Black: {
        screen: Black
    },
    Zhengyi: {
        screen: Zhengyi
    },
    FlmfList: {
        screen: FlmfList
    },
    Yulun: {
        screen: Yulun
    },
    YulunDetail:{
        screen:YulunDetail
    },
    FiveYears: {
        screen: FiveYears
    },
    Fund: {
        screen: Fund
    },
    
}, {
        headerMode: 'none'
    })


module.exports = AppDlp;

const drawerStyles = {
    drawer: { shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#1d2225', opacity: 0.99 },
    main: {},
}



