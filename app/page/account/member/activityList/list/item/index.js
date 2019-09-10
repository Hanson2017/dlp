import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import Theme from '../../../../../../util/theme';
import Api from '../../../../../../util/api';
import Util from '../../../../../../util/util';

export default class ActicityRecordItemComponent extends Component {
    render() {
        const { data, navigation } = this.props;
        const activity = data.activity;
        const comment = data.comment;
        const plat = data.plat;
        const plan = data.plan;
        const comment_field = data.activity.comment_field;
        return (
            <View style={styles.list}>
                <View style={styles.listHd}>
                    <View style={styles.platName}>
                        <TouchableOpacity style={styles.name} onPress={() => {
                            navigation.push('FlmfDetail', { id: activity.id })
                        }}  >
                            <Text style={styles.nameText}>{plat.platname}</Text>
                        </TouchableOpacity>
                        <View style={[styles.type, activity.isrepeat === 0 ? styles.typeFirst : styles.typeRepeat]}>
                            <Text style={[styles.typeText, styles.font11, activity.isrepeat === 0 ? styles.typeFirstText : styles.typeRepeatText]}>
                                {activity.isrepeat === 0 ?
                                    '首次出借'
                                    :
                                    '多次出借'
                                }
                            </Text>
                        </View>
                    </View>
                    <View style={[comment.status == 0 ? styles.state : styles.state2]}>
                        <Text style={[styles.stateText, styles.font11]}>状态 | </Text>
                        <Text style={[styles.stateText, styles.font11, comment.status === 0 ? styles.stateTextDsh : comment.status === 1 ? styles.stateTextTg : styles.stateTextBh]}>
                            {
                                comment.status === 0 ?
                                    '待审核'
                                    :

                                    comment.status === 1 ?
                                        '已通过' + '（' + comment.paymoney + '元' + '）'
                                        :
                                        '已驳回' + '（' + comment.checkinfo + '）'

                            }
                        </Text>
                    </View>
                    {
                        comment.status === 0 ?
                            <View style={styles.action}>
                                <TouchableOpacity style={styles.actionEdit} onPress={this.goActiveRecordEdit}>
                                    <Text style={[styles.actionEditText, styles.font11]}>编辑</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionDel} onPress={this.onPressDel}>
                                    <Text style={[styles.actionDelText, styles.font11]}>删除</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            null
                    }

                </View>
                <View style={styles.listBd}>
                    {
                        comment_field.indexOf('c_userid') >= 0 ?
                            <View style={styles.single}>
                                <View style={styles.label}><Text style={[styles.labelText, styles.font11]}>注册ID</Text></View>
                                <View style={styles.labelCon}><Text style={[styles.labelConText, styles.font11]}>{comment.c_userid}</Text></View>
                            </View>
                            :
                            null
                    }
                    {
                        comment_field.indexOf('c_phone') >= 0 ?
                            <View style={styles.single}>
                                <View style={styles.label}><Text style={[styles.labelText, styles.font11]}>注册手机号</Text></View>
                                <View style={styles.labelCon}><Text style={[styles.labelConText, styles.font11]}>{comment.c_phone}</Text></View>
                            </View>
                            :
                            null
                    }
                    <View style={styles.single}>
                        <View style={styles.label}><Text style={[styles.labelText, styles.font11]}>支付宝账号</Text></View>
                        <View style={styles.labelCon}><Text style={[styles.labelConText, styles.font11]}>{comment.alipayid}</Text></View>
                    </View>

                    <View style={styles.double}>
                        <View style={styles.listBdList}>
                            <View style={styles.label}><Text style={[styles.labelText, styles.font11]}>出借方案</Text></View>
                            <View style={styles.labelCon}><Text style={[styles.labelConText, styles.font11]}>{'第' + comment.periodnumber + '期,方案' + comment.plannumber}</Text></View>
                        </View>
                        {
                            comment_field.indexOf('investdate') >= 0 ?
                                <View style={styles.listBdList}>
                                    <View style={styles.label}><Text style={[styles.labelText, styles.font11]}>出借日期</Text></View>
                                    <View style={styles.labelCon}><Text style={[styles.labelConText, styles.font11]}>{Util.formatDate(comment.investdate)}</Text></View>
                                </View>
                                :
                                null
                        }

                    </View>

                    <View style={styles.double}>
                        {
                            comment.status !== 0 ?
                                null
                                :
                                <View style={styles.listBdList}>
                                    <View style={styles.label}><Text style={[styles.labelText, styles.font11]}>预计返利</Text></View>
                                    <View style={styles.labelCon}><Text style={[styles.labelConText, styles.font11]}>{plan.mfrebate + ''}元</Text></View>
                                </View>
                        }
                        {
                            comment_field.indexOf('c_username') >= 0 ?
                                <View style={styles.listBdList}>
                                    <View style={styles.label}><Text style={[styles.labelText, styles.font11]}>真实姓名</Text></View>
                                    <View style={styles.labelCon}><Text style={[styles.labelConText, styles.font11]}>{comment.c_username}</Text></View>
                                </View>
                                :
                                null
                        }
                    </View>
                    {
                        comment.status !== 0 ?
                            null
                            :
                            <View style={styles.single}>
                                <View style={styles.label}><Text style={[styles.labelText, styles.font11]}>预计返利日</Text></View>
                                <View style={styles.labelCon}>
                                    <Text style={[styles.labelConText, styles.font11]}>
                                        {
                                            plan.repaydayelse != null && plan.repaydayelse != '' ?
                                                plan.repaydayelse
                                                :
                                                plan.repayday == 0 ?
                                                    '当日返现（周末和节假日顺延）'
                                                    :
                                                    plan.repaydaytype == 0 ?
                                                        '自' + Util.formatDate(comment.addtime) + '起' + plan.repayday + '个工作日内'
                                                        :
                                                        '自' + Util.formatDate(comment.addtime) + '起' + plan.repayday + '个自然日内'
                                        }
                                    </Text>
                                </View>
                            </View>
                    }
                </View>
                {
                    data.comment.status !== 0 ?
                        null
                        :
                        <View style={styles.listNote}>
                            <Text style={[styles.listNoteText, styles.font11]}>
                                {
                                    plan.repaydayelse != null && plan.repaydayelse != '' ?
                                        '备注：自' + Util.formatDate(comment.addtime) + '起' + plan.repaydayelse + '返利之前，审核状态可能为“待审核”，请耐心等待'
                                        :
                                        plan.repayday == 0 ?
                                            '备注：' + Util.formatDate(comment.addtime) + '当日24:00返现之前，审核状态可能为“待审核”，请耐心等待'
                                            :
                                            plan.repaydaytype == 0 ?
                                                '备注：自' + Util.formatDate(comment.addtime) + '起' + plan.repayday + '个工作日内，审核状态可能为“待审核”，请耐心等待'
                                                :
                                                '备注：自' + Util.formatDate(comment.addtime) + '起' + plan.repayday + '个自然日内，审核状态可能为“待审核”，请耐心等待'
                                }
                            </Text>
                        </View>
                }

            </View>
        )
    }
    goActiveRecordEdit=() =>{
        const { data, navigation } = this.props;
        navigation.push('ActivityRecordEdit',{id: data.comment.id,comment_field:data.activity.comment_field})
    }
    onPressDel = () => {
        Alert.alert(
            null,
            '你确认要删除本条回帖信息吗？',
            [
                { text: '取消' },
                { text: '确认', onPress: this.delComment },
            ]
        )
    }
    delComment = () => {
        let { that, data } = this.props;
        let memberId = signState.r_id;
        let commentid = data.comment.id;
        let url = Api.delActivityComment + '?memberid=' + memberId + '&commentid=' + commentid;

        fetch(url)
            .then((response) => {

                if (response.ok) {

                    response.json()
                        .then((responseData) => {

                            if (responseData.result == 1) {

                                Alert.alert(null, '删除成功',
                                    [

                                        {
                                            text: '确认', onPress: () => { that.getData(1) }
                                        },
                                    ])

                            }
                            else {
                                Alert.alert('提示', responseData.resultmsg)
                            }

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
}

const styles = StyleSheet.create({

    font11: {
        fontSize: 11,
    },
    list: {
        padding: 12,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    listHd: {
        flexDirection: 'row',
    },
    platName: {
        width: 110,
    },
    nameText: {
        color: '#666',
        fontSize: 12,
    },
    type: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 4,
        width: 55,
        height: 16,
    },
    typeText: {
        color: '#ccc',
    },
    typeFirst: {
        borderColor: '#67CBDB',
    },
    typeRepeat: {
        borderColor: '#ff9900',
    },
    typeFirstText: {
        color: '#67CBDB',
    },
    typeRepeatText: {
        color: '#ff9900',
    },
    state: {
        width: 160,
        flexDirection: 'row',
    },
    state2: {
        flexDirection: 'row',
    },
    stateText: {
        color: '#C9C9C9',
    },
    stateTextDsh: {
        color: '#868686',
    },
    stateTextBh: {
        color: '#E62344',
    },
    stateTextTg: {
        color: '#C9C9C9',
    },
    action: {
        flexDirection: 'row',
    },
    actionEdit: {
        marginRight: 15,
    },
    actionEditText: {
        color: '#E62344',
    },
    actionDelText: {
        color: '#868686',
    },
    listBd: {
        marginTop: 12,
        paddingBottom: 4,
    },
    single: {
        marginBottom: 6,
        flexDirection: 'row',
    },
    double: {
        marginBottom: 6,
        flexDirection: 'row',
    },
    listBdList: {
        width: (Theme.screenWidth - 24) / 2,
        flexDirection: 'row',
    },
    label: {
        width: 65,
    },
    labelCon: {
        flex: 1,
    },
    labelText: {
        color: '#999',
    },
    labelConText: {
        color: '#666',
    },
    listNote: {
        paddingTop: 8,
        borderTopColor: '#f2f2f2',
        borderTopWidth: 1,
    },
    listNoteText: {
        color: '#AEAEAE',
    },
    loadMore: {
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    loadMoreText: {
        color: '#999',
    },
    null: {
        padding: 12,
        fontSize: 11,
        color: '#999',
    }
})

