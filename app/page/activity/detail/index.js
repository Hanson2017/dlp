import React, { Component } from 'react';
import { Text, StyleSheet, Image, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, DeviceEventEmitter, RefreshControl, ActivityIndicator, Linking, Platform } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Api from '../../../util/api';
import Theme from '../../../util/theme';
import Loading from '../../../component/loading';

import CommentItem from './comments/item';
import CommentForm from './commentForm';

import Title from '../component/title';
import Select from '../component/select';
import Calendar from '../component/selectDate';

import NavBar from './navBar';
import Top from './top';
import Plan from './plan';
import Mianze from './mianze';
import MianzePop from './mianze/pop';
import ReplyNote from './replyNote';

var dismissKeyboard = require('dismissKeyboard');

export default class DetailPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            ref: false,
            loading: true,
            isRefreshing: false,
            dataSource: null,
            commentData: null,
            commentlNum: 0,
            siteUrl: null,
            selectList: [],
            contentHeight: 0,  //ScrollView滚动容器高度
            moveH: 0,  //ScrollView滑动的距离,
            isFixed: false,
            dateDiff: 0,
            isHiddenMianze: true,
            isHiddenIntroduce: true,
        }
    }
    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.setState({
            id: params.id,
        })
    }
    render() {
        const { navigation } = this.props;
        if (this.state.loading) {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} forceInset={{ bottom: 'never' }} >
                    <View style={styles.container}>
                        <NavBar navigation={navigation} uri={null} isFixed={this.state.isFixed} />
                        <Loading />
                    </View>
                </SafeAreaView>
            )
        }
        else {
            const that = this;
            const { dataSource, commentData, siteUrl, selectList, isHiddenMianze } = this.state;
            const acinfo = dataSource.acinfo;
            const plans = dataSource.plans;
            const uri = Api.domain + acinfo.plat.platlogo;
            const comment_field = acinfo.activity.comment_field;

            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} forceInset={{ bottom: 'never' }} >
                    <View style={styles.container}>
                        <NavBar navigation={navigation} uri={uri} isFixed={this.state.isFixed}  />
                        <Select ref="select" options={selectList} />
                        <Calendar ref="Calendar" />
                        <View style={{ flex: 1 }}>
                            <ScrollView ref={'scroll'}
                                onScroll={this._onScroll.bind(this)}
                                onContentSizeChange={(contentWidth, contentHeight) => {
                                    this.setState({
                                        contentHeight: parseInt(contentHeight)
                                    })
                                }}
                                onScrollEndDrag={(e) => {
                                    this.setState({
                                        moveH: e.nativeEvent.contentOffset.y
                                    })

                                }}>
                                <View onStartShouldSetResponderCapture={(e) => { dismissKeyboard(); }}>
                                <Top data={dataSource.acinfo} that={this} />
                                 <Mianze isrepeat={dataSource.acinfo.activity.isrepeat} />
                                <Plan data={dataSource} that={this} />
                               
                                  {
                                    acinfo.activity.iscomment == 0 ?
                                        < View style={[styles.detailBox, Theme.mt15, { marginBottom: 10, }]}>
                                            <Text style={styles.ddText}>本活动仅做优惠信息推送，无需回复出借信息。</Text>
                                        </View>
                                        :
                                        <View>
                                            {acinfo.activity.img_att_h5 != null && acinfo.activity.img_att_h5 != '' ?
                                                <View style={Theme.mt15}>
                                                    <Title title={'特别事项'} />
                                                    <View style={[styles.detailBox]}>
                                                        <Image resizeMode={'center'} source={{ uri: Api.domain + acinfo.activity.img_att_h5 }} style={{ width: Theme.screenWidth - 24, height: Theme.screenWidth - 24 }} />
                                                    </View>
                                                </View>
                                                : null
                                            }
                                            {acinfo.activity.comment_pich5 ?
                                                <View style={Theme.mt15}>
                                                    <Title title={'回帖注册ID从哪儿找？'} />
                                                    <View style={[styles.detailBox]}>
                                                        <Image resizeMode={'center'} source={{ uri: Api.domain + acinfo.activity.comment_pich5 }} style={{ width: Theme.screenWidth - 24, height: Theme.screenWidth - 24 }} />
                                                    </View>
                                                </View>
                                                :
                                                null
                                            }
                                            <ReplyNote data={acinfo.activity} />

                                            {
                                                acinfo.activity.status === 1 ?
                                                <CommentForm
                                                    data={dataSource}
                                                    that={this}
                                                    navigation={navigation}
                                                    KeyboardAvoidingViewData={{
                                                        contentHeight: this.state.contentHeight,  //ScrollView滚动容器高度 
                                                        moveH: this.state.moveH,   //ScrollView滑动的距离    
                                                    }}
                                                />
                                                :
                                                null
                                            }
                                            <View style={Theme.mt15}>
                                                <Title title={'回帖记录'} />
                                                <View style={[styles.detailBox]}>
                                                    {
                                                        commentData.map((comment, i) => {
                                                            return <CommentItem key={i} index={i} commentlNum={this.state.commentlNum - i} comment={comment} commentField={comment_field} />
                                                        })
                                                    }
                                                    {
                                                        commentData.length >= 20 ?
                                                            <TouchableOpacity style={styles.moreComment} activeOpacity={0.7} onPress={this.goCommentsPage.bind(this)}>
                                                                <Text style={styles.moreCommentText}>查看更多评论</Text>
                                                            </TouchableOpacity>
                                                            :
                                                            null
                                                    }
                                                </View>
                                            </View>
                                        </View>
                                }
                                </View>
                            </ScrollView>
                        </View>
                        <TouchableOpacity
                            style={[styles.submitBtn, acinfo.activity.status == 2 ? styles.submitBtnOver : null]}
                            activeOpacity={0.7}
                            onPress={() => {
                                this.setState({
                                    isHiddenMianze: false,
                                })

                            }}
                            disabled={acinfo.activity.status == 1 ? false : true}
                        >
                            <Text style={[styles.submitBtnText]}>{acinfo.activity.status == 1 ? '直达链接' : '已结束'}</Text>
                            <Text style={styles.submitBtnTT}>（网贷有风险，出借需谨慎）</Text>
                        </TouchableOpacity>
                        {
                        isHiddenMianze ?
                            null
                            :
                            <MianzePop siteUrl={siteUrl} that={this} isrepeat={dataSource.acinfo.activity.isrepeat} />
                    }
                    </View >
                </SafeAreaView>
            )
        }
    }
    isShowSelect(selectNo, i) {
        this.refs.select.show(selectNo, i)
    }
    isShowCalendar() {
        this.refs.Calendar.show()
    }
    _onScroll(e) {

        var offsetY = e.nativeEvent.contentOffset.y;

        if (offsetY > 0) {
            this.setState({
                isFixed: true
            })
        }
        else {
            this.setState({
                isFixed: false
            })
        }
    }
    componentDidMount() {
       
        this.getData();
       
    }
    
    getData() {
        let that = this;
        let url = Api.activityDetail + 'activityid=' + this.state.id;
      
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {

                            let activity = responseData.data.acinfo.activity
                            let siteUrls = activity.siteurl.split(',')
                            let index = Math.floor((Math.random() * siteUrls.length));
                            let siteUrl = siteUrls[index];
                            let siteUrlH5 = activity.siteurl_h5;
                            let acSiteUrl = siteUrlH5 ? siteUrlH5 : siteUrl;

                            let selectList = []
                            let plans = responseData.data.plans;

                            var date = new Date();
                            var now = date.getTime();
                            var datenowServer = new Date(parseInt(responseData.datenow.replace("/Date(", "").replace(")/", "")));
                            var nowServer = datenowServer.getTime();
                            var dateDiff = nowServer - now;


                            for (let i = 0; i < plans.length; i++) {
                                selectList.push({ number: plans[i].number, value: '方案' + plans[i].number })
                            }

                            that.setState({
                                
                                dataSource: responseData.data,
                                siteUrl: acSiteUrl,
                                selectList: selectList,
                                dateDiff: dateDiff
                            })

                            this.getCommentData();
                        })
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => {
                console.log('error:', error)
            })
    }
    getCommentData() {
        let that = this;
        let memberid = 0;
        if (signState) {
            memberid = signState.r_id;
        }
        
        let url = Api.activityDetailComment + '?activityid=' + this.state.id + '&page=1&pagesize=20' + '&memberid=' + memberid;

       

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            that.setState({
                                isRefreshing: false,
                                loading: false,
                                commentData: responseData.data,
                                commentlNum: responseData.totalNum
                            })
                        })
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => {
                console.log('error:', error)
            })
    }

    goCommentsPage() {
        const comment_field = this.state.dataSource.acinfo.activity.comment_field
        const { navigation }=this.props;

        navigation.push('FlmfDetailComments',{activityid:this.state.id,comment_field:comment_field})

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.bgColor,
    },

    detailBox: {
        padding: 12,
        backgroundColor: '#fff',
    },
    ddView: {
        marginTop: 8
    },
    ddText: {
        color: '#999',
        lineHeight: 20,
        fontSize: 11
    },
    moreComment: {
        marginTop: 5,
        marginBottom: 5,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    moreCommentText: {
        color: '#E62344',
        fontSize: 11,
    },
    submitBtn: {
        position: 'relative',
        height: 46,
        backgroundColor: '#FF6666',
        alignItems: 'center',
        justifyContent: 'center',

    },
    submitBtnOver: {
        backgroundColor: '#ccc',
    },
    submitBtnText: {
        fontSize: 16,
        color: '#fff',
    },
    submitBtnTT: {
        paddingTop: 4,
        fontSize: 10,
        color: '#fff',
        opacity: 0.7
    },

})
