import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, ScrollView, TouchableOpacity, Image, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Util from '../../../util/util'
import Theme from '../../../util/theme';
import Loading from '../../../component/loading';
import Title from '../../../component/title';
import Item from '../../activity/item';

class List extends React.Component {
    render() {
        const { data, borderNot } = this.props;
        const url = 'http://m.fanlimofang.com/Activity/Detail/' + data.activityid;
        return (
            <TouchableOpacity style={[styles.listItem, borderNot ? { borderBottomWidth: 0 } : null]}
                onPress={() => {
                    Util.Linked(url)
                }}
            >
                <View style={styles.listItemLeft}>
                    <View style={[styles.activityContainer, data.investtype == 1 ? styles.activityContainerFt : null]} >
                        <View style={styles.activityIconOut}>
                            <View style={styles.activityIconIn}></View>
                        </View>
                        <View style={styles.activityTextCon}>
                            <Text style={styles.activityText}>
                                {data.investtype == 0 ? '首投' : '复投'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.listinvest}>
                        <Text style={[styles.listinvestText,styles.listinvestText22]}>{data.invest}</Text>
                        <Text style={styles.listinvestText2}>出借金额</Text>
                    </View>
                    <View style={styles.listrebate}>
                        <Text style={[styles.listinvestText, styles.rebateText,styles.listrebateText]}>{data.rebate}</Text>
                        <Text style={styles.listinvestText2}>获取回报</Text>
                    </View>
                    <View style={styles.listrate}>
                        <Text style={[styles.listinvestText, styles.listrateText]}>{data.rate}%</Text>
                        <Text style={styles.listinvestText2}>相当于年华</Text>
                    </View>
                </View>
                <View style={styles.listIcon}>
                    <Icon name={'triangle-right22'} size={14} color={'#bbb'} />
                </View>

            </TouchableOpacity>
        )
    }
}


export default class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            isRefreshing: false,
            dataSource: [],
        }
    }
    render() {
        let platInfo = this.props.platInfo;
        if (this.state.loading) {
            return (
                <Loading />
            )
        }
        else {
            let platActivity = this.state.dataSource.dataView;
            let otherActivity = this.state.dataSource.dataList;
            return (
                <View style={{ flex: 1 }}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    >
                        <View style={[Theme.box, styles.topContainer]}>
                            <Title data={'平台当前活动'} borderNot={true} />
                            <View style={styles.listViewContentD}>
                                {
                                    platActivity.length > 0 ?
                                        platActivity.map((item, i) => {
                                            return (
                                                <List data={item} key={i} borderNot={platActivity.length - 1 == i ? true : false} />
                                            )
                                        })
                                        :
                                        <Text style={styles.null}>暂无活动</Text>
                                }
                            </View>
                        </View>

                        <View style={[Theme.box, Theme.mt10]}>
                            <Title data={'活动APP下载'} borderNot={true} />
                            <View style={styles.appDown}>
                                <View style={styles.appDownLeft}>
                                    <Image
                                        style={styles.logo}
                                        source={require('../../../../resources/images/appDown.png')}
                                    />
                                </View>
                                <View style={styles.appDownRight}>

                                    <Text style={styles.appdownText}>
                                        我们推荐使用“返利魔方APP”参加平台活动，以助于将您的投资收益最大化。
                                    </Text>
                                    <TouchableOpacity style={styles.appdownBtn}
                                        onPress={() => {
                                            let url = 'http://a.app.qq.com/o/simple.jsp?pkgname=org.zywx.wbpalmstar.widgetone.uex11575732';
                                            Util.Linked(url)
                                        }}
                                    >
                                        <Text style={styles.appdownBtnText}>前往下载</Text>
                                        <Icon name={'triangle-right22'} size={14} color={'#bbb'} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                        <View style={[Theme.box, Theme.mt10]}>
                            <Title data={'其他热门活动'} mfTag={true} borderNot={true} linkUrl={'http://m.fanlimofang.com'} />

                            <View style={styles.listViewContent}>
                                {
                                    otherActivity.length > 0 ?
                                        otherActivity.map((item, i) => {
                                            return (
                                                <Item data={item} key={i} />
                                            )
                                        })
                                        :
                                        <Text style={styles.null}>暂无活动</Text>
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }

    renderItem({ item, index }) {

    }
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        let id = this.props.platInfo.id;
        Util.getDataDetail(this, 'activity', id)
    }
    componentDidMount() {
        let id = this.props.platInfo.id;
        Util.getDataDetail(this, 'activity', id)
    }


}

const styles = StyleSheet.create({
    topContainer: {
        paddingTop: 15,
    },
    listViewContent: {
        paddingTop: 15,
        paddingLeft: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    listViewContentD: {
        paddingTop: 15,
        paddingLeft: 15,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingLeft: 10,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    listItemLeft:{
        flex: 1,
        flexDirection: 'row',
    },
    listinvest: {
        width: 85,
    },
    listinvestText22:{
        width: 85,
    },
    listrebate: {
        width: 80,
    },
    listrebateText:{
        width: 80,
    },
    listrate: {

    },
    listinvestText: {
        height: 24,
        fontSize: 20,
        color: '#101010',
        fontWeight: 'bold',
    },
    listinvestText2: {
        paddingTop: 5,
        fontSize: 12,
        color: '#999',
    },
    listrateText2: {
        paddingTop: 5,
        fontSize: 16,
        color: '#101010',
    },
    rebateText: {
        color: '#D51920'
    },

    

    listrateText: {
        width: 75,
        fontSize: 18,
        color: '#999',
    },
    listIcon: {
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    activityContainer: {
        position: 'relative',
        top: 4,
        marginRight: 20,
        width: 45,
        height: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFBC41',
        borderRadius: 4,
    },
    activityContainerFt: {
        backgroundColor: '#FF6F00',
    },
    activityIconOut: {
        width: 18,
        height: 18,
        backgroundColor: '#E30A0A',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIconIn: {
        width: 8,
        height: 8,
        backgroundColor: '#FFBC41',
        borderRadius: 4,
    },
    activityTextCon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityText: {
        fontSize: 10,
        color: '#fff',
    },
    appDown: {
        paddingTop: 15,
        paddingLeft: 30,
        paddingBottom: 20,
        flexDirection: 'row',
    },
    appDownLeft: {
        marginRight: 34,
    },
    appDownRight: {
        flex: 1,
        paddingRight: 20,
    },
    appdownText: {
        color: '#666',
        fontSize: 14,
        lineHeight: 20,
    },
    appdownBtn: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    appdownBtnText: {
        paddingRight: 5,
        color: '#A81616',
        fontSize: 14,
        fontWeight: 'bold',
    },

    logo: {
        width: 70,
        height: 94.3,
    },
    null: {
        paddingBottom: 16,
        color: '#bbb',
        fontSize: 14,
    },

})