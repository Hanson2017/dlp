import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SafeAreaView } from "react-navigation";
import Theme from '../../../util/theme';
import Api from '../../../util/api';
import Util from '../../../util/util';
import Header from '../../../component/navBar/detail';
import Title from '../../../component/title';
import Loading from '../../../component/loading';
import ActionShare from '../../../component/actionShare';
import Liucheng from '../../fund/liucheng';


export default class DetailFund extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: null,
            isRefreshing: false,
        };
    }
    render() {
        const { navigation } = this.props;
        const { loading, dataSource } = this.state;
        const { params } = this.props.navigation.state;
        const platName = params.tabId.platName;

        if (!loading) {
            var firmDetail = dataSource.firmDetail;
            var processlist = dataSource.processlist;
            var firmfile = dataSource.firmfile;
        }

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#1A1A1A' }}>
                <View style={[styles.container]}>
                    <Header headerOpt={{ title: platName + ' 示范出借', noBack: true, search: 'null' }} navigation={navigation} />
                    <ActionShare ref={'ActionShare'} />
                    <View style={Theme.content}>
                        {
                            loading ?
                                <Loading />
                                :
                                <ScrollView style={Theme.content}>
                                    <View style={[Theme.box, styles.headBox]}>
                                        <View style={[styles.titleContainer]}>
                                            <View style={styles.titleLeft}>
                                                <View style={styles.titleIcon}></View>
                                                <View style={styles.titleLeftCon}><Text style={styles.titleLeftText}>示范出借概况</Text></View>

                                            </View>
                                            <TouchableOpacity
                                                style={styles.titleRight}
                                                activeOpacity={0.5}
                                                onPress={() => {
                                                    navigation.navigate('Fund')
                                                }}
                                            >
                                                {/* <View style={[styles.titleTypeNum, styles['fundType' + firmDetail.type]]}><Text style={styles.titleTypeNumText}></Text></View> */}
                                                <Text style={styles.titleMoreText}>{firmDetail.type}号
                                                    {
                                                        firmDetail.type == 1 ?
                                                            '稳健型'
                                                            :
                                                            firmDetail.type == 2 ?
                                                                '平衡型'
                                                                :
                                                                '收益型'
                                                    }
                                                    示范出借</Text>
                                                <Icon name={'triangle-right22'} size={14} color={'#bbb'} />
                                            </TouchableOpacity>
                                        </View>

                                        <View style={styles.fundInfo}>
                                            <View style={styles.fundInfoState}>
                                                <View style={[styles.fundInfoStateIcon, styles.bgColorNomal, firmDetail.status_color == 'red' ? styles.bgColorZy : firmDetail.status_color == 'black' ? styles.bgColorBlack : null]}>
                                                    {
                                                        firmDetail.status_color == 'green' ?
                                                            <Icon name={'zb-zijin'} size={32} color={'#fff'} />
                                                            :
                                                            <MaterialCommunityIcons name={'alert-circle-outline'} size={32} color={firmDetail.status_color == 'red' ? '#a81616' : '#333'} />
                                                    }

                                                </View>
                                                <View style={styles.fundInfoStateR}>
                                                    <Text style={[styles.fundInfoStateRText1, styles.fColorNomal]}>{firmDetail.status_info}</Text>

                                                </View>
                                            </View>
                                            <View style={styles.fundInfoList}>
                                                <View style={styles.fundInfoListCon}>
                                                    <View style={styles.fundInfoListHd}>
                                                        <Text style={[styles.fundInfoListHdText, styles.listIc1]}>出借本金</Text>
                                                        <Text style={[styles.fundInfoListHdText, styles.listIc2]}>出借项目</Text>
                                                        <Text style={[styles.fundInfoListHdText, styles.listIc3]}>年华收益率</Text>
                                                        <Text style={[styles.fundInfoListHdText, styles.listIc4]}>已重复出借</Text>
                                                    </View>
                                                    <View style={styles.fundInfoListBd}>
                                                        <Text style={[styles.fundInfoListBdText, styles.listIc1]}>{firmDetail.invest_num}万</Text>
                                                        <Text style={[styles.fundInfoListBdText, styles.listIc2]}>{firmDetail.invest_obj}</Text>
                                                        <Text style={[styles.fundInfoListBdText, styles.listIc3]}>{firmDetail.invest_rate}%</Text>
                                                        <Text style={[styles.fundInfoListBdText, styles.listIc4]}>{firmDetail.invest_renum}</Text>
                                                    </View>
                                                </View>
                                                <View style={[styles.fundInfoListCon, { marginTop: 20, }]}>
                                                    <View style={styles.fundInfoListHd}>
                                                        <Text style={[styles.fundInfoListHdText, styles.listIc1]}>已回收</Text>
                                                        <Text style={[styles.fundInfoListHdText, styles.listIc2]}>首次出借日期</Text>
                                                        <Text style={[styles.fundInfoListHdText, styles.listIc3]}>本金到期日期</Text>
                                                    </View>
                                                    <View style={styles.fundInfoListBd}>
                                                        <Text style={[styles.fundInfoListBdText, styles.listIc1]}>{firmDetail.invest_back}元</Text>
                                                        <Text style={[styles.fundInfoListBdText, styles.listIc2]}>{Util.formatDate2(firmDetail.invest_startday)}</Text>
                                                        <Text style={[styles.fundInfoListBdText, styles.listIc3]}>{Util.formatDate2(firmDetail.invest_endday)}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.fundReason}>

                                                <Text style={styles.fundReasonText}>出借理由：</Text>
                                                <Text style={styles.fundReasonText}>{firmDetail.invest_reason}</Text>

                                            </View>
                                            <TouchableOpacity style={styles.fundhtdown} onPress={() => {
                                                Util.Linked(Api.domain+firmfile.file_url)
                                            }}
                                            >
                                                <Text style={styles.fundhtdownText}>查看出借合同</Text>
                                                <Text style={{ color: '#bbb', fontSize: 12 }}>(将在浏览器打开)</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Liucheng data={processlist} title={'示范出借动态'} plat={true} navigation={navigation} />

                                </ScrollView>
                        }
                    </View>
                </View>
            </SafeAreaView>
        )
    }
    componentDidMount() {
        const { params } = this.props.navigation.state;
        Util.getDataDetail(this, 'firm', params.tabId.platId)
    }
    showActionSheet() {

    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1A1A',
        flex: 1,
    },
    headBox: {
        paddingTop: 12,
        paddingBottom: 15,
    },
    titleContainer: {
        paddingLeft: 10,
        paddingTop: 12,
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    titleLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleIcon: {
        marginRight: 5,
        width: 2,
        height: 14,
        backgroundColor: Theme.color
    },
    titleLeftText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
    titleRight: {
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    titleMoreText: {
        color: '#999',
        fontSize: 12,
    },
    titleTypeNum: {
        marginRight: 4,
        width: 20,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    fundType1: {
        backgroundColor: Theme.fund1Color,
    },
    fundType2: {
        backgroundColor: Theme.fund2Color,
    },
    fundType3: {
        backgroundColor: Theme.fund3Color,
    },
    titleTypeNumText: {
        fontSize: 10,
        color: '#fff',
    },
    fundInfo: {
        paddingLeft: 10,
    },
    fundInfoState: {

        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 7,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    fundInfoStateIcon: {
        marginRight: 8,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    fundInfoStateR: {
        justifyContent: 'center',
    },
    fundInfoStateRText1: {
        fontSize: 14,
    },
    fundInfoStateRText2: {
        paddingTop: 7,
        fontSize: 12,
    },
    fColorNomal: {
        color: '#15BE6E',
    },
    fColorZy: {
        color: '#A81611',
    },
    fColorBlack: {
        color: '#090000',
    },
    bgColorNomal: {
        backgroundColor: '#15BE6E',
    },
    bgColorZy: {
        backgroundColor: '#A81611',
    },
    bgColorBlack: {
        backgroundColor: '#090000',
    },

    fundInfoList: {
        marginBottom: 15,
        paddingTop: 15,
        paddingBottom: 20,
        paddingLeft: 7,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    fundInfoListHd: {
        marginBottom: 6,
        flexDirection: 'row',
    },
    fundInfoListHdText: {
        fontSize: 11,
        color: '#999',
    },
    fundInfoListBd: {
        flexDirection: 'row',
    },
    fundInfoListBdText: {
        fontSize: 14,
        color: '#666',
    },
    listIc1: {
        width: 80,
    },
    listIc2: {
        width: 100,
    },
    listIc3: {
        width: 100,

    },
    fundReason: {
        marginBottom: 15,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#F5F5F5',
    },
    fundReasonText: {
        fontSize: 12,
        color: '#707070',
        lineHeight: 20,
    },
    fundhtdown: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fundhtdownText: {
        fontSize: 12,
        color: '#999',
        textDecorationLine: 'underline',
    },

})
