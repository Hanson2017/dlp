import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, WebView, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Icon from 'react-native-vector-icons/Icomoon';
import ActionShare from '../../../component/actionShare';
import Theme from '../../../util/theme';
import Api from '../../../util/api';
import Header from '../../../component/navBar'
import Loading from '../../../component/loading'


export default class YulunDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: null,
            shareUrl: '',
            type: '',
        };
    }
    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            url: params.url,
            shareUrl: params.shareUrl,
            type: params.type,
        })
    }
    render() {
        let navigation = this.props.navigation;
        let { url } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#8F6546' }}>
                <View style={Theme.container}>
                    <StatusBar
                        backgroundColor={'#8F6546'}
                        barStyle="light-content"
                    />
                    <View style={styles.headerContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.headerText}>贷罗盘论坛</Text>
                        </View>
                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                                <Text style={styles.backBtnText}>返回APP</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.shareBtn} onPress={() => {
                                this.showActionSheet()
                            }}>
                                <Icon name={'ico-share'} size={22} color={'#fff'} />
                            </TouchableOpacity>
                        </View>


                    </View>
                    <View style={Theme.content}>
                        <WebView
                            source={{ uri: url }}
                            renderLoading={this.renderLoading.bind(this)}
                            scalesPageToFit={true}

                        />
                    </View>
                </View>
                <ActionShare ref={'ActionShare'} />
            </SafeAreaView>
        )
    }
    renderLoading() {
        return (
            <Loading />
        )
    }
    showActionSheet() {
        var description;
        var title;
        var webpageUrl;
        const { shareUrl, type } = this.state;
        if (signState) {
            description = '我是' + signState.r_username + '，我在看贷罗盘论坛，优质的网贷行业交流社区，一起来看吧。'
        }
        else {
            description = '我在看贷罗盘论坛，优质的网贷行业交流社区，一起来看吧。'
        }

        if (type == 'hej') {
            title = '我正在看贷罗盘论坛-华尔街的旗帜。推荐你也看看！';
            webpageUrl = shareUrl;
        }
        else if (type == 'bgt') {
            title = '我正在看贷罗盘论坛-曝光台。推荐你也看看！';
            webpageUrl = shareUrl;
        }
        else {
            title = '我正在看贷罗盘论坛。推荐你也看看！';
            webpageUrl = Api.bbsHome;
        }

        let data = {
            type: 'news',
            title: title,
            description: description,
            webpageUrl: webpageUrl,
            imageUrl: 'http://dailuopan.com/images/shareDlpBBs.jpg',
        }

        this.refs.ActionShare.show(data)

    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 42,
        backgroundColor: '#8F6546',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        paddingLeft: 100,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 16.5,
        fontWeight: 'bold',
    },
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    },
    shareBtn: {
        paddingRight: 5,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backBtn: {
        width: 60,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
    },
    backBtnText: {
        fontSize: 12,
        color: '#fff',
    },

})
