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
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={styles.tabsWrap}>
                <View style={[styles.tabsContainer]}>
                    {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabsWrap: {
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 16,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabsContainer: {
        borderWidth: 1,
        borderColor: '#14191e',
        borderRightWidth: 0,
        height: 30,
        backgroundColor: '#f2f2f2',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tab: {
        flex: 1,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#14191e'
    },
    tabText: {
        color: '#666',
        fontSize: 12
    },
    tabActive: {
        position: 'relative',
        flex: 1,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#14191e'
    },
    tabActiveText: {
        color: '#fff',
        fontSize: 12,

    },
});
