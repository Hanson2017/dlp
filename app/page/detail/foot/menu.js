import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Animated, Dimensions, Easing, Platform } from 'react-native';


const { width, height } = Dimensions.get('window');
const [aWidth, aHeight] = [width * 0.95, 253];
const [left, top] = [0, 0];


export default class Share extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            hide: true,
        }
    }
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {
        const {navigation}=this.props;
        let that = this;
        if (this.state.hide) {
            return (<View />)
        }
        else {
            return (
                <View style={[styles.container]}>
                    <Animated.View style={[styles.mask, {
                        opacity: this.state.offset.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.2]
                        })

                    }]} >
                        <TouchableOpacity style={{ flex: 1 }} onPress={this.cancel.bind(this)}></TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[
                        styles.tip,
                        {
                            transform: [{
                                translateY: this.state.offset.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [50, 0]
                                }),
                            }]
                        }
                    ]}>


                        <View style={styles.menu}>

                            <TouchableOpacity style={styles.menuItem}
                                onPress={() => {
                                    navigation.navigate('Main')
                                }}
                            >
                                <Text style={styles.menuText}>首页</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem}
                                onPress={() => {
                                    navigation.navigate('PingjiJG')
                                }}
                            >

                                <Text style={styles.menuText}>机构评级</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem}
                                onPress={() => {
                                    navigation.navigate('Health')
                                }}
                            >

                                <Text style={styles.menuText}>健康度分析</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem}
                                onPress={() => {
                                    navigation.navigate('QueryNav', { tabId: { tab1: 0, tab2: 0 } })
                                }}
                            >

                                <Text style={styles.menuText}>多维度查询</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0, }]}
                                onPress={() => {
                                    navigation.navigate('Data')
                                }}
                            >

                                <Text style={styles.menuText}>数据详情</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.triangDown}>
                            <View style={styles.triangDownN}></View>
                        </View>
                    </Animated.View>
                </View>
            )
        }
    }
    //显示动画
    inAnimated() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 300,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 300,
                    toValue: 1,
                }
            )
        ]).start();
    }
    // 隐藏动画  
    outAnimated() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 300,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 300,
                    toValue: 0,
                }
            )
        ]).start();

        this.timer = setTimeout(
            () => this.setState({ hide: true }),
            300
        );
    }
    //取消  
    cancel(event) {
        const thatt=this.props.that;
        thatt.changeMenuHide(true);
        if (!this.state.hide) {
            this.outAnimated();
        }
    }
    show() {
        const thatt=this.props.that;
        thatt.changeMenuHide(false);
        if (this.state.hide) {
            this.setState({
                hide: false,
            }, this.inAnimated);
        }
    }

}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
        justifyContent: 'center',

        zIndex: 998,
    },
    mask: {
        justifyContent: "center",
        backgroundColor: "#383838",
        opacity: 0,
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
    },
    tip: {
        position: 'absolute',
        bottom: Platform.OS == 'android' ? 80 : 70,
        right: (width / 2 - 100) / 2,
        height: 237,
        width: 100,
    },


    menu: {
        paddingLeft: 9,
        paddingRight: 9,
        position: 'relative',
        width: 100,
        height: 225,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 8,
        backgroundColor: '#fff',

    },
    triangDown: {
        position: 'absolute',
        bottom: 1,
        left: 35,
        borderTopWidth: 12,
        borderLeftWidth: 12,
        borderRightWidth: 12,
        borderTopColor: '#bbb',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',

    },
    triangDownN: {
        position: 'absolute',
        left: -11,
        top: -12,
        borderTopWidth: 11,
        borderLeftWidth: 11,
        borderRightWidth: 11,
        borderTopColor: '#fff',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    menuItem: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuText: {
        color: '#666',
        fontSize: 14,
    },
})


