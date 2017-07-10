import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, Button, DeviceEventEmitter,Platform } from 'react-native';
import { StackNavigator, TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Icomoon';
import Drawer from 'react-native-drawer';
import '../config/asyncStorage';
import StorageLoginInfo from '../config/storageLogin';

import Loading from './Loading'
import ControlPanel from './ControlPanel'
import MainTabBar from './MainTabBar'

import Home from '../page/Home'
import Pingji from '../page/Pingji'
import Data from '../page/Data'
import Health from '../page/Health'
import Login from '../page/Login'
import Account from '../page/account/account'
import Flow from '../page/Flow'
import Black from '../page/Black'
import Zhengyi from '../page/Zhengyi'
import FlmfList from '../page/FlmfList'
import Yulun from '../page/Yulun'
import FiveYears from '../page/FiveYears'
import Fund from '../page/Fund'
import Query from '../page/Query'
import Detail from '../page/Detail'
import Search from '../page/Search'
import Help from '../page/Help'
import HelpDetail from '../page/HelpDetail'

class DrawerScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginState: false,
            loading: false,
            status: 0,
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
        let status = this.state.status;
        if (this.state.loading) {
            if (status == 1 && Platform.OS != 'android') {
                versionStatus=1
            }
            return (
                <Drawer
                    ref={(ref) => this._drawer = ref}
                    type="overlay"
                    content={<ControlPanel ref={'ControlPanel'} screenProps={{ loginState: this.state.loginState, navigation: this.props.navigation }} />}
                    openDrawerOffset={0.1}
                    closedDrawerOffset={0}
                    styles={drawerStyles}
                    tapToClose={true}
                    panCloseMask={0.13}
                >
                    <MainTabBar screenProps={{ openControlPanel: this.openControlPanel.bind(this), loginState: this.state.loginState, navigation: this.props.navigation }} />

                </Drawer>
            )
        }
        else {
            return (
                <Loading />
            )
        }

    }
    componentDidMount() {
        let that = this;
        let url = 'http://www.dailuopan.com/MPAPI/GetVersion?version=2.0.1'
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            that.setState({
                                status: responseData,
                                loading: true
                            })
                        })
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => {
                console.log('error:', error)
            })

        StorageLoginInfo.storageLoad(this)
        this.subscriptions = [
            window.EventEmitter.on('loginState', (data) => {
                StorageLoginInfo.storageLoad(this)
                this.refs.ControlPanel.loginData()
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
    Home: {
        screen: Home
    },
    Pingji: {
        screen: Pingji
    },
    Data: {
        screen: Data
    },
    Health: {
        screen: Health
    },
    Account: {
        screen: Account
    },
    Login: {
        screen: Login
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
    FiveYears: {
        screen: FiveYears
    },
    Fund: {
        screen: Fund
    },
    Help: {
        screen: Help
    },
    HelpDetail: {
        screen: HelpDetail
    }
}, {
        headerMode: 'none'
    })


module.exports = AppDlp;

const drawerStyles = {
    drawer: { shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 3, backgroundColor: '#1d2225', opacity: 0.99 },
    main: {},
}    