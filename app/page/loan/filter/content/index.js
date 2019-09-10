import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, Easing, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
const { width, height } = Dimensions.get('window');

export default class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            hide: true,
            index: 0,
            orderList: [
                { label: '综合排序', select: true },
                { label: '放款速度', select: false },
                { label: '贷款利率', select: false },
                { label: '贷款额度', select: false }
            ],
            conditionList: [
                { label: '金额不限', select: true },
                { label: '2000以下', select: false },
                { label: '2000-5000', select: false },
                { label: '5000-10000', select: false },
                { label: '10000-50000', select: false },
                { label: '50000以上', select: false },
            ]
        }
    }
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {
        if (this.state.hide) {
            return (<View />)
        }
        else {
            const that = this.props.that;
            return (
                <View style={styles.container}>
                    <Animated.View style={[styles.mask, {
                        opacity: this.state.offset.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.5]
                        })

                    }]} >
                        <TouchableOpacity style={{ flex: 1 }} onPress={this.cancel.bind(this)}></TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[
                        styles.content,
                        {
                            transform: [{
                                translateY: this.state.offset.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-200, 0]
                                }),
                            }]
                        }
                    ]}>
                        {
                            this.state.index == 0 ?
                                <View style={styles.orderList}>
                                    {
                                        this.state.orderList.map((item, i) => {
                                            return (
                                                <TouchableOpacity key={i} style={styles.orderListBtn} onPress={() => {
                                                    that.changefilter(0, item.label)
                                                    for (var x = 0; x < this.state.orderList.length; x++) {
                                                        if (x != i) {
                                                            this.state.orderList[x].select = false
                                                        }
                                                        else {
                                                            this.state.orderList[x].select = true
                                                        }
                                                    }
                                                    this.cancel()
                                                }}>
                                                    <Text style={[styles.orderListBtnText, item.select ? styles.orderListBtnTextActive : null]}>{item.label}</Text>
                                                    {
                                                        item.select ?
                                                            <Icon name={'tick'} size={13} color={'#507ee1'} style={{ marginLeft: 5, }} />
                                                            :
                                                            null
                                                    }
                                                </TouchableOpacity>
                                            )
                                        })
                                    }

                                </View>
                                :
                                this.state.index == 1 ?
                                    <View style={styles.conditionList}>
                                        {
                                            this.state.conditionList.map((item, i) => {
                                                return (
                                                    <TouchableOpacity key={i} style={[styles.conditionListBtn, item.select ? styles.conditionListBtnActive : null]} onPress={() => {
                                                        that.changefilter(1, item.label)
                                                        for (var x = 0; x < this.state.conditionList.length; x++) {
                                                            if (x != i) {
                                                                this.state.conditionList[x].select = false
                                                            }
                                                            else {
                                                                this.state.conditionList[x].select = true
                                                            }
                                                        }
                                                        this.cancel()
                                                    }}>
                                                        {
                                                            item.select ?
                                                                <Icon name={'tick'} size={12} color={'#507ee1'} style={{ marginRight: 3 }} />
                                                                :
                                                                null
                                                        }
                                                        <Text style={[styles.conditionListBtnText, item.select ? styles.conditionListBtnTextActive : null]}>{item.label}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                    :
                                    <View><Text>类型</Text></View>
                        }

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
            500
        );
    }
    //取消  
    cancel(that) {
        that = this.props.that;
        const index = this.state.index;
        this.outAnimated();
        that.outAnimated(index)
    }
    show(index) {
        this.setState({
            hide: false,
            index: index
        }, this.inAnimated);
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: width,
        height: height,
        left: 0,
        top: 40,
        alignItems: 'center',
        zIndex: 998,
    },
    mask: {
        justifyContent: "center",
        backgroundColor: "#383838",
        opacity: 0.5,
        position: "absolute",
        width: width,
        height: height,
        left: 0,
        top: 0,
    },
    content: {
        width: width,
        height: 200,
        backgroundColor: "#fff",
        zIndex: 99,
    },
    orderList: {
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
    },
    orderListBtn: {
        paddingLeft: 15,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    orderListBtnText: {
        fontSize: 13,
        color: '#666'
    },
    orderListBtnTextActive: {
        color: '#3e80cc'
    },
    conditionList: {
        borderTopWidth: 1,
        borderTopColor: '#f2f2f2',
        paddingLeft: 15,
        paddingTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    conditionListBtn: {
        marginRight: 10,
        marginBottom: 10,
        height: 30,
        width: (width - 30 - 10 * 2) / 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#f2f2f2',
        borderWidth: 1,
    },
    conditionListBtnText: {
        fontSize: 12,
        color: '#666'
    },
    conditionListBtnActive: {
        borderColor: '#3e80cc',
    },
    conditionListBtnTextActive: {
        color: '#3e80cc'
    }
})