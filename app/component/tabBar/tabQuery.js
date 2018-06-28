'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';

import Theme from '../../util/theme';

export default class TabBar extends Component {
    static propTypes = {
        goToPage: React.PropTypes.func, // 跳转到对应tab的方法
        activeTab: React.PropTypes.number, // 当前被选中的tab下标
        tabs: React.PropTypes.array, // 所有tabs集合
        tabNames: React.PropTypes.array, // 保存Tab名称
    }
    setAnimationValue({ value }) {

    }
    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(this.setAnimationValue);
    }
    renderTabOption(tab, i) {
        let tabSty = this.props.activeTab == i ? styles.tabActive : styles.tab;
        let tabText = this.props.activeTab == i ? styles.tabActiveText : styles.tabText;
        return (
            <TouchableOpacity onPress={() => this.props.goToPage(i)} style={tabSty} key={i}>
                <Text style={tabText}>{this.props.tabNames[i]}</Text>
                {this.props.activeTab == i ?
                    <Icon style={{ position: 'absolute', bottom: -5 }} name={'triangle-up22'} size={15} color={'#f2f2f2'} />
                    :
                    null
                }
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={[styles.tabsContainer]}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabsContainer: {
        height: 35,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    tab: {
        flex: 1,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabText: {
        color: '#707070',
        fontSize: 11
    },
    tabActive: {
        position: 'relative',
        flex: 1,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabActiveText: {
        color: '#262626',
        fontSize: 11,
    },
});
