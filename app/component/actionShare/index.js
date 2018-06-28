import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Animated, Dimensions, Easing ,Platform} from 'react-native';

import Icon from 'react-native-vector-icons/Icomoon';
import * as QQAPI from 'react-native-qq';
import * as WechatAPI from 'react-native-wx';

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
            data: null
        }
    }
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
    }
    render() {

        let that = this;
        if (this.state.hide) {
            return (<View />)
        }
        else {
            return (
                <View style={[styles.container,Platform.OS == 'android' ? { paddingBottom: 35 } : null]}>
                    <Animated.View style={[styles.mask, {
                        opacity: this.state.offset.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.5]
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
                                    outputRange: [aHeight, 0]
                                }),
                            }]
                        }
                    ]}>

                        <View style={styles.shareBox}>
                            <TouchableOpacity
                                style={styles.shareBtn}
                                onPress={this.shareToQQ.bind(this)}
                            >
                                <Icon name={'share-qq'} size={44} color={'#45b7ee'} />
                                <Text style={styles.shareText}>QQ</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.shareBtn}
                                onPress={this.shareToQzone.bind(this)}
                            >
                                <Icon name={'share-kongjian'} size={44} color={'#efbc4e'} />
                                <Text style={styles.shareText}>QQ空间</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.shareBtn}
                                onPress={this.shareToSession.bind(this)}
                            >
                                <Icon name={'share-wechat'} size={40} color={'#00d10d'} />
                                <Text style={styles.shareText}>微信</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.shareBtn}
                                onPress={this.shareToTimeline.bind(this)}
                            >
                                <Icon name={'share-friends'} size={44} color={'#9ad122'} />
                                <Text style={styles.shareText}>朋友圈</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.tipBtn} onPress={this.cancel.bind(this)}>
                            <Text style={styles.cancelText}>取消</Text>
                        </TouchableOpacity>
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
    cancel(event) {
        if (!this.state.hide) {
            this.outAnimated();
        }
    }
    show(dataS) {
        if (this.state.hide) {
            this.setState({
                hide: false,
                data: {
                    type: 'news',
                    title: dataS.plat_name + '评级／数据／健康度／流量（每日更新）',
                    description: '包含：1.各个主流评级机构对' + dataS.plat_name + '的评级数据；2.' + dataS.plat_name + '运营数据监控、分析、诊断及未来趋势预测；' + '3.' + dataS.plat_name + '网站流量分析',
                    webpageUrl: 'http://m.dailuopan.com/p2p/' + dataS.pre_id,
                    imageUrl: 'http://dailuopan.com/images/shareDlp.png',
                }
            }, this.inAnimated);


        }
    }
    shareToQQ() {
        let data = this.state.data;
        QQAPI.shareToQQ(data)
            .then((result) => {
                console.log(result)
            })
    }
    shareToQzone() {
        let data = this.state.data;
        QQAPI.shareToQzone(data)
            .then((result) => {
                console.log(result)
            })
    }
    shareToSession() {
        let data = this.state.data;
        WechatAPI.shareToSession(data)
            .then((result) => {
                console.log(result)
            })
    }
    shareToTimeline() {
        let data = this.state.data;
        WechatAPI.shareToTimeline(data)
            .then((result) => {
                console.log(result)
            })
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: width,
        height: height,
        left: left,
        top: top,
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 1002,
       
        paddingBottom:10,
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
        width: aWidth,
    },
    tipBtn: {
        marginTop: 10,
        height: 53,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    cancelText: {
        color: "#0179fb",
        fontSize: 18,
    },
    shareBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        height: 120,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    shareBtn: {
        width:(aWidth-20)/4,
       
        alignItems: 'center',
        justifyContent: 'center'
    },
    shareText: {
        paddingTop: 5,
        color: '#999'
    }
})


