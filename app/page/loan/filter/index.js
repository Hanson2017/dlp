import React, { Component } from 'react';
import { StyleSheet, Text, View ,Animated, Dimensions, Easing, Platform } from 'react-native';
import FilterBtn from './header';
import FilterBody from './content';

export default class LoanFilterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ref:false,
            offset: [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)],
            isShowFilter: [true, true, true],
            filterList:['综合排序','金额不限','贷款类型']
        }
    }
    render() {
        const filterList = this.state.filterList;
        return (
            <View style={{ zIndex: 99,position:'relative'}}>
                <FilterBody ref={'Filter'} that={this} />
                <View style={styles.screenContainer}>
                    {
                        filterList.map((itme, index) => {
                            return <FilterBtn that={this} label={itme} key={index} index={index} />
                        })
                    }
                </View>
            </View>
        )
    }
    changefilter(index,text){
        this.state.filterList[index]=text;
        this.setState({
            ref:!this.state.ref
        })
    }
    showFilter(index) {
        this.refs.Filter.show(index)
    }
    cancelFilter(index) {
        this.refs.Filter.cancel(this, index)
    }
    //旋转动画180deg
    inAnimated(index) {
        Animated.parallel([

            Animated.timing(
                this.state.offset[index],
                {
                    easing: Easing.linear,
                    duration: 300,
                    toValue: 180,
                }
            )
        ]).start();
        this.state.isShowFilter[index] = false;

        for (var i = 0; i < this.props.filterList.length; i++) {
            if (i != index && this.state.isShowFilter[i] == false) {
                this.outAnimated(i);
            }
        }

        this.setState({
            ref: !this.state.ref
        })
    }
    // 旋转动画-180deg  
    outAnimated(index) {
        Animated.parallel([
            Animated.timing(
                this.state.offset[index],
                {
                    easing: Easing.linear,
                    duration: 300,
                    toValue: 0,
                }
            )
        ]).start();
        this.state.isShowFilter[index] = true;
        this.setState({
            ref: !this.state.ref
        })
    }
}

const styles = StyleSheet.create({
    screenContainer: {
        marginBottom:10,
        height: 40,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 998,
    },
})