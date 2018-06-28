import React, { Component } from 'react';
import { Text, StyleSheet, DeviceEventEmitter, Platform, BackAndroid, ToastAndroid } from 'react-native';
import { StackNavigator, TabNavigator } from "react-navigation";
import Icon from 'react-native-vector-icons/Icomoon';
import Drawer from 'react-native-drawer';
import '../config/asyncStorage';
import StorageLoginInfo from '../config/storageLogin';

import Loading from '../component/loading'
import ControlPanel from './sidebar'
import MainTabBar from './MainTabBar'


export default class DrawerScreen extends React.Component {
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
                versionStatus = 1
            }
            return (
                <Drawer
                    ref={(ref) => this._drawer = ref}
                    type="overlay"
                    content={<ControlPanel ref={'ControlPanel'} screenProps={{ loginState: this.state.loginState, navigation: this.props.navigation }} />}
                    openDrawerOffset={0.2}
                    closedDrawerOffset={-3}
                    styles={drawerStyles}
                    tapToClose={true}
                    panCloseMask={0.2}
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
        let url = 'http://www.dailuopan.com/MPAPI/GetVersion?version=3.0.0'
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
        StorageLoginInfo.storageLoadKeyWord()
        
        this.subscriptions = [
            window.EventEmitter.on('loginState', (data) => {
                StorageLoginInfo.storageLoad(this)
                this.refs.ControlPanel.loginData()
                console.log('登陆111111', signState)
            }),
            window.EventEmitter.on('logout', (data) => {
                that.setState({
                    loginState: false
                })
                console.log('退出登陆', signState)
            })
        ]
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentWillUnmount() {
        this.subscriptions.forEach((sub) => sub.off());
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 4000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;

    }
}


const drawerStyles = {
    drawer: { shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 3, backgroundColor: '#fff', opacity: 1  },
    main: {},
}    