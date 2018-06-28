import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Animated, Dimensions, Easing, Platform, Clipboard } from 'react-native';

import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../util/theme';
import * as QQAPI from 'react-native-qq';
import * as WechatAPI from 'react-native-wx';
import Toast from '../../component/toast';

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
    async _setClipboardContent() {
        let that = this;
        Clipboard.setString(this.state.data.webpageUrl);
        try {
            var content = await Clipboard.getString();
            that.toastShow('复制链接成功！')
            setTimeout(
                () => {
                    that.toastHide()
                },
                1500
            );
        } catch (e) {
            console.log(e.message)
        }
    }
    componentWillUnMount() {
        this.timer && clearTimeout(this.timer);
    }
    componentDidMount() {
        this.show()
    }
    render() {

        let that = this;
        if (this.state.hide) {
            return (<View />)
        }
        else {
            return (
                <Animated.View style={[styles.container
                ]}>
                    <Animated.View style={[styles.mask, ]} >
                        <TouchableOpacity style={{ flex: 1 }} onPress={this.cancel.bind(this)}></TouchableOpacity>
                    </Animated.View>
                    <View style={styles.shareBox}>
                        <TouchableOpacity
                            style={styles.shareBtn}
                            onPress={this.shareToQQ.bind(this)}
                        >
                            <Icon name={'share-qq'} size={54} color={'#45b7ee'} />
                            <Text style={styles.shareText}>QQ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.shareBtn}
                            onPress={this.shareToQzone.bind(this)}
                        >
                            <Icon name={'share-kongjian'} size={54} color={'#efbc4e'} />
                            <Text style={styles.shareText}>QQ空间</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.shareBtn}
                            onPress={this.shareToSession.bind(this)}
                        >
                            <Icon name={'share-wechat'} size={50} color={'#00d10d'} />
                            <Text style={styles.shareText}>微信</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.shareBtn}
                            onPress={this.shareToTimeline.bind(this)}
                        >
                            <Icon name={'share-friends'} size={54} color={'#9ad122'} />
                            <Text style={styles.shareText}>朋友圈</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.shareBtn}
                            onPress={this._setClipboardContent.bind(this)}
                        >
                            <Icon name={'share-fuzhi'} size={54} color={'#999'} />
                            <Text style={styles.shareText}>复制链接</Text>
                        </TouchableOpacity>
                        <View style={styles.shareBtn}></View>
                    </View>
                    <TouchableOpacity
                        style={styles.shareClose}
                        onPress={this.cancel.bind(this)}
                    >
                        <Icon name={'ico-close'} size={54} color={'#bbb'} />
                    </TouchableOpacity>
                    <Toast ref={'Toast'} />
                </Animated.View>
            )
        }
    }
    toastShow(data) {
        this.refs.Toast.show(data)
    }
    toastHide() {
        this.refs.Toast.cancel();
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
            this.props.navigation.goBack();
            // this.outAnimated();
        }
    }
    show() {
        const { params } = this.props.navigation.state;
        if (this.state.hide) {
            this.setState({
                hide: false,
                data: params.data
            });
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
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
        backgroundColor: "#fff",
        paddingBottom: 10,
        zIndex: 999,
    },
    mask: {
        justifyContent: "center",

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

    shareMask: {
        justifyContent: "center",
        backgroundColor: "#cdcdce",
        opacity: 1,
        position: "absolute",
        width: Theme.screenWidth,
        height: Theme.screenHeight,
        left: 0,
        top: 0,
        zIndex: 1101
    },
    shareBox: {
        paddingBottom: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shareBtn: {
        marginBottom: 20,
        width: (aWidth - 20) / 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shareText: {
        paddingTop: 8,
        color: '#8c96a0',
        fontSize: 12,
    },
    shareClose: {
        position: 'absolute',
        bottom: 60,
    },
})
