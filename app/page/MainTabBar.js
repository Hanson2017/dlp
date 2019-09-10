import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, Platform } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Icomoon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Theme from '../util/theme';

import Home from './home/';
import Loan from './loan';
import Activity from './activity';
import Account from './account';


export default class TabBar extends Component {
    static defaultProps = {
        selectedColor: Theme.color2,
        normalColor: '#7a7e84',
        size: 23,
        normalColorText: '#666'
    };
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'home',
            tabName: ['首页', '我要贷款', '我要返利', '个人中心']
        }
    }
    render() {
        let screenProps = this.props.screenProps;
        let navigation = screenProps.navigation;

        const { selectedColor, normalColor, size, normalColorText } = this.props;
        return (
            <TabNavigator tabBarShadowStyle={{ height: 0 }}>
                <TabNavigator.Item
                    title={this.state.tabName[0]}
                    renderIcon={() => <Icon name='tab-homeOn' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='tab-homeOn' size={size} color={selectedColor} />}
                    selected={this.state.selectedTab === 'home'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'home'
                        })
                    }}
                >

                    <Home navigation={navigation} openControlPanel={screenProps.openControlPanel} loginState={screenProps.loginState} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[1]}
                    renderIcon={() => <View style={styles.transform}><MaterialCommunityIcons name='stop-circle' size={size} color={normalColor} /></View> }
                    renderSelectedIcon={() => <View style={styles.transform}><MaterialCommunityIcons name='stop-circle' size={size} color={selectedColor} /></View> }
                    selected={this.state.selectedTab === 'Loan'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Loan'
                        })
                    }}
                >

                    <Loan navigation={navigation} openControlPanel={screenProps.openControlPanel} loginState={screenProps.loginState} />
                </TabNavigator.Item>

                <TabNavigator.Item
                    title={this.state.tabName[2]}
                    renderIcon={() => <MaterialCommunityIcons name='wallet' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <MaterialCommunityIcons name='wallet' size={size} color={selectedColor} />}
                    selected={this.state.selectedTab === 'Activity'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'Activity'
                        })
                    }}
                >
                    <Activity navigation={navigation} openControlPanel={screenProps.openControlPanel} loginState={screenProps.loginState} />
                </TabNavigator.Item>

                <TabNavigator.Item
                    title={this.state.tabName[3]}
                    renderIcon={() => <MaterialCommunityIcons name='account-circle' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <MaterialCommunityIcons name='account-circle' size={size} color={selectedColor} />}
                    selected={this.state.selectedTab === 'user'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'user'
                        })
                    }}
                >
                    <Account navigation={navigation} openControlPanel={screenProps.openControlPanel} loginState={screenProps.loginState} />
                </TabNavigator.Item>


            </TabNavigator>
        )
    }
    componentDidMount() {
        if (versionStatus == 1) {
            this.setState({
                tabName: ['首页', '排行', '数据', '舆情']
            })
        }
    }

}

const styles = StyleSheet.create({
    iconCon: {
        width: Platform.OS == 'android' ? 30 : 40,
        height: Platform.OS == 'android' ? 30 : 40,
        backgroundColor: Theme.color,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    transform:{
        transform: [{rotate:'45deg'}]
    }
})
