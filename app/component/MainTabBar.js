import React, { Component } from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Icomoon';

import Home from '../page/Home'
import Pingji from '../page/Pingji'
import Data from '../page/Data'
import Account from '../page/account/account'
import Login from '../page/Login'
import Health from '../page/Health'

export default class TabBar extends Component {
    static defaultProps = {
        selectedColor: '#dd0000',
        normalColor: '#888',
        size: 22,
        normalColorText: '#666'
    };
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'home',
            tabName: ['首页', '评级', '数据', '健康度', '我的']
        }
    }
    render() {

        let screenProps = this.props.screenProps;
        let navigation = screenProps.navigation;

        const { selectedColor, normalColor, size, normalColorText } = this.props;
        return (
            <TabNavigator>
                <TabNavigator.Item
                    title={this.state.tabName[0]}
                    renderIcon={() => <Icon name='home' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='home' size={size} color={selectedColor} />}
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
                    renderIcon={() => <Icon name='pingji' size={23} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='pingji' size={23} color={selectedColor} />}
                    selected={this.state.selectedTab === 'pingji'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'pingji'
                        })
                    }}
                >

                    <Pingji navigation={navigation} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[2]}
                    renderIcon={() => <Icon name='data' size={24} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='data' size={24} color={selectedColor} />}
                    selected={this.state.selectedTab === 'data'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'data'
                        })
                    }}
                >                  
                    <Data navigation={navigation} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[3]}
                    renderIcon={() => <Icon name='health' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='health' size={size} color={selectedColor} />}
                    selected={this.state.selectedTab === 'health'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'health'
                        })
                    }}
                >                  
                    <Health navigation={navigation} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[4]}
                    renderIcon={() => <Icon name='user' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='user' size={size} color={selectedColor} />}
                    selected={this.state.selectedTab === 'user'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'user'
                        })
                    }}
                >
                     {signState ?
                        <Account navigation={navigation} />
                        :
                        <Login navigation={navigation} />
                    }                    
                </TabNavigator.Item>
            </TabNavigator>
        )
    }
}
