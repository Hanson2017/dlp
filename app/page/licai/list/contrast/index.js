import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Animated, Dimensions, Easing, Platform } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Util from '../../../../util/util';
import Api from '../../../../util/api';

const { width, height } = Dimensions.get('window');

export default class ContrastComponent extends Component {
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
        const { navigation, contrastList,that } = this.props;
        if (this.state.hide) {
            return (<View />)
        }
        else {
            return (
                <View style={[styles.container]}>
                    <Animated.View style={[styles.mask, {
                        opacity: this.state.offset.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.6]
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
                        <View style={styles.contrastList}>
                            {
                                contrastList.map((item, i) => {
                                    return (
                                        <View style={styles.item} key={i}>
                                            <TouchableOpacity style={styles.remove} onPress={()=>{
                                                that.delContrast(i);
                                            }}>
                                                <EvilIcons name={'minus'} size={32} color={'#0096E6'} />
                                            </TouchableOpacity>
                                            <View style={styles.itemTitle}>
                                                <Text style={styles.itemTitleText} numberOfLines={2}>{item.cpms}</Text>
                                            </View>
                                            <View style={styles.bjjzl}>
                                                <Text style={styles.bjjzlNum}>{item.yjbjjz !== ''?item.yjbjjz+'%':'--'}</Text>
                                                <Text style={styles.bjjzlLabel}>比较基准率</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            

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
                    duration: 100,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 100,
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
                    duration: 100,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 100,
                    toValue: 0,
                }
            )
        ]).start();

        this.timer = setTimeout(
            () => this.setState({ hide: true }),
            100
        );
    }
    //取消  
    cancel(event) {

        if (!this.state.hide) {
            this.outAnimated();
        }
    }
    show() {

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
        left: 0,
        bottom: 50,
        justifyContent: 'center',
        zIndex: 0,
    },
    mask: {
        justifyContent: "center",
        backgroundColor: "#383838",
        opacity: 0,
        position: "absolute",
        width: width,
        height: height,
        left: 0,
        bottom: 0,
    },
    tip: {
        position: 'absolute',
        bottom: 5,
        right: width * 0.03,
        width: width * 0.94,
    },
    contrastList: {
        paddingLeft: 5,
        paddingRight: 5,
        position: 'relative',
        width: width * 0.94,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    item: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btNone: {
        borderBottomWidth: 0,
    },
    remove: {
        width: 35,

    },
    itemTitle: {
        paddingRight: 10,
        flex: 1,
    },
    itemTitleText: {
        fontSize: 12,
        color: '#101010',
        lineHeight: 16,
    },
    bjjzl: {
        width: 74,
        alignItems: 'center',
    },
    bjjzlNum: {
        fontSize: 18,
        color: '#0096E6',
    },
    bjjzlLabel: {
        marginTop: 5,
        fontSize: 12,
        color: '#999'
    },
})


