import React, { Component } from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../util/theme';

import Home from './home';
import PingjiTab from './tabPingji';
import DataTab from './tabData';
import YulunTab from './tabYulun';
import FindTab from './tabFind';



export default class TabBar extends Component {
    static defaultProps = {
        selectedColor: Theme.color,
        normalColor: '#7a7e84',
        size: 23,
        normalColorText: '#666'
    };
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'home',
            tabName: ['首页', '排行', '数据', '舆情', '发现']
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
                    renderIcon={() => <Icon name='tab-home' size={size} color={normalColor} />}
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
                    renderIcon={() => <Icon name='tab-rank' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='tab-rankOn' size={size} color={selectedColor} />}
                    selected={this.state.selectedTab === 'pingjiTab'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'pingjiTab'
                        })
                    }}
                >

                    <PingjiTab navigation={navigation} openControlPanel={screenProps.openControlPanel} loginState={screenProps.loginState} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[2]}
                    renderIcon={() => <Icon name='tab-data' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='tab-dataOn' size={size} color={selectedColor} />}
                    selected={this.state.selectedTab === 'data'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'data'
                        })
                    }}
                >
                    <DataTab navigation={navigation} openControlPanel={screenProps.openControlPanel} loginState={screenProps.loginState} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[3]}
                    renderIcon={() => <Icon name='tab-yulun' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='tab-yulunOn' size={size} color={selectedColor} />}
                    selected={this.state.selectedTab === 'health'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'health'
                        })
                    }}
                >
                    <YulunTab navigation={navigation} openControlPanel={screenProps.openControlPanel} loginState={screenProps.loginState} />

                </TabNavigator.Item>
                {
                    versionStatus != 1 ?
                        <TabNavigator.Item
                            title={this.state.tabName[4]}
                            renderIcon={() => <Icon name='tab-find' size={size} color={normalColor} />}
                            renderSelectedIcon={() => <Icon name='tab-findOn' size={size} color={selectedColor} />}
                            selected={this.state.selectedTab === 'user'}
                            titleStyle={{ color: normalColorText }}
                            selectedTitleStyle={{ color: selectedColor }}
                            onPress={() => {
                                this.setState({
                                    selectedTab: 'user'
                                })
                            }}
                        >
                            <FindTab navigation={navigation} openControlPanel={screenProps.openControlPanel} loginState={screenProps.loginState} />
                        </TabNavigator.Item>
                        :
                        null
                }

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
