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

import Yulun from '../page/Yulun'
import Fund from '../page/Fund'
import FlmfList from '../page/FlmfList'

export default class TabBar extends Component {
    static defaultProps = {
        selectedColor: '#5a6067',
        normalColor: '#7a7e84',
        size: 22,
        normalColorText: '#666'
    };
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'home',
            tabName: ['首页', '舆情', '示范', '活动', '我']
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
                    renderIcon={() => <Icon name='navhome' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='navhome2' size={size} color={selectedColor} />}
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
                    renderIcon={() => <Icon name='navyuqing' size={23} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='navyuqing2' size={23} color={selectedColor} />}
                    selected={this.state.selectedTab === 'pingji'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'pingji'
                        })
                    }}
                >

                    <Yulun navigation={navigation} />
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[2]}
                    renderIcon={() => <Icon name='navfund' size={24} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='navfund2' size={24} color={selectedColor} />}
                    selected={this.state.selectedTab === 'data'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'data'
                        })
                    }}
                >         
                    {
                        versionStatus != 1 ?  
                         <Fund navigation={navigation} />
                         :
                         <Pingji navigation={navigation} />
                    }         
                   
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[3]}
                    renderIcon={() => <Icon name='navhuodong' size={23} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='navhuodong2' size={23} color={selectedColor} />}
                    selected={this.state.selectedTab === 'health'}
                    titleStyle={{ color: normalColorText }}
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'health'
                        })
                    }}
                >                
                     {
                        versionStatus != 1 ?  
                         <FlmfList navigation={navigation} />
                         :
                         <Data navigation={navigation} />
                    }        
                    
                </TabNavigator.Item>
                <TabNavigator.Item
                    title={this.state.tabName[4]}
                    renderIcon={() => <Icon name='navmy' size={size} color={normalColor} />}
                    renderSelectedIcon={() => <Icon name='navmy2' size={size} color={selectedColor} />}
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
    componentDidMount() {
        if(versionStatus == 1){
            this.setState({
                 tabName: ['首页', '舆情', '评级', '数据', '我']
            })
        }
    }
    
}
