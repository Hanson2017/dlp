import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../util/theme';

export default class Toast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hide: true,
            opacity: new Animated.Value(0),
            toastText:''
        };
    }
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {
        let toastText = this.state.toastText;
        if (this.state.hide) {
            return (<View />)
        }
        else {
            return (
                <Animated.View style={[styles.toast, {
                    opacity: this.state.opacity.interpolate({
                        inputRange: [0, 0.9],
                        outputRange: [0,0.9]
                    })
                }]} >
                    <Icon name={'ok'} size={30} color={'#2bbf55'} />
                    <Text style={styles.toastText}>{toastText}</Text>
                </Animated.View>
            )
        }
    }
    //显示动画
    inAnimated() {
        Animated.timing(
            this.state.opacity,
            {
                toValue: 1,
            }
        ).start();
    }
    // 隐藏动画  
    outAnimated() {
        Animated.timing(
            this.state.opacity,
            {
                toValue: 0,
            }
        ).start();

        this.timer = setTimeout(
            () =>{ 
                this.setState({ hide: true })
            },
            500
        );
    }
    // 隐藏
    cancel() {
        if (!this.state.hide) {
            this.outAnimated();
        }
    }
    // 显示
    show(data) {
        if (this.state.hide) {
            this.setState({
                hide: false,
                toastText:data
            }, this.inAnimated);
        }
    }
}

const styles = StyleSheet.create({
    toast: {
        paddingTop: 25,
        width: 230,
        height: 110,
        alignItems: 'center',
        borderRadius: 7,
        backgroundColor: '#39404b',
        position: 'absolute',
        top: Theme.screenHeight / 2,
        left: Theme.screenWidth / 2,
        marginLeft: -115,
        marginTop: -55,
        zIndex: 1100,
        opacity: 0.9
    },
    toastText: {
        paddingTop: 10,
        color: '#fff',
        fontSize: 16,
    }
})