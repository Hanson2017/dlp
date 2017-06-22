import React, { Component } from 'react';
import { Text, View, TouchableOpacity ,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import stylesList from '../../css/listData';

module.exports = {
    renderItemR({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View style={styles.itemRow} key={index}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name, fundType: item.fund_type }) }}

                >
                    <View style={{ width: 110 }}>
                        <Text style={[stylesList.CABB7C4]}>{item.amount}</Text>
                        <Text style={[stylesList.CABB7C4,styles.mtT]}>{item.inamount}</Text>
                    </View>
                     <View style={{ width: 150 }}>
                        <Text style={[stylesList.CABB7C4]}>{item.stayStill}</Text>
                        <Text style={[stylesList.CABB7C4,styles.mtT]}>{item.stayStillOfTotal}</Text>
                    </View>
                     <View style={{ width: 140 }}>
                        <Text style={[stylesList.CABB7C4]}>{item.avgBidMoney}</Text>
                        <Text style={[stylesList.CABB7C4,styles.mtT]}>{item.avgBorrowMoney}</Text>
                    </View>
                     <View style={{ width: 140 }}>
                        <Text style={[stylesList.CABB7C4]}>{item.bidderNum}</Text>
                        <Text style={[stylesList.CABB7C4,styles.mtT]}>{item.borrowerNum}</Text>
                    </View>
                    <View style={{ width: 140 }}>
                        <Text style={[stylesList.CABB7C4]}>{item.bidderWaitNum}</Text>
                        <Text style={[stylesList.CABB7C4,styles.mtT]}>{item.borrowWaitNum}</Text>
                    </View>
                     <View style={{ width: 180 }}>
                        <Text style={[stylesList.CABB7C4]}>{item.top10DueInProportion}%</Text>
                        <Text style={[stylesList.CABB7C4,styles.mtT]}>{item.top10StayStillProportion}%</Text>
                    </View>
                     <View style={{ width: 100 }}>
                        <Text style={[stylesList.CABB7C4]}>{item.rate}%</Text>
                        <Text style={[stylesList.CABB7C4,styles.mtT]}>{item.fullloanTime}分钟</Text>
                    </View>
                     <View style={{ width: 140 }}>
                        <Text style={[stylesList.CABB7C4]}>{item.loanPeriod} </Text>
                        <Text style={[stylesList.CABB7C4,styles.mtT]}></Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '成交量(万)', title2: '资金流(万)' ,width:110},
            { title: '当日待还金额(万)', title2: '累计待还金额(万)',width:150},
            { title: '平均投资金额(万)', title2: '平均借款金额(万)' },
            { title: '当日投资人数(人)', title2: '当日借款人数(人)' },
            { title: '待收投资人数(人)', title2: '待还借款人数(人)' },
            { title: '前10大投资人待收占比', title2: '前10大借款人待还占比',width:180},
            { title: '收益率', title2: '满标用时',width:100},
            { title: '平均借款期限(月)', title2: '' },
        ]
        return (
            <View style={[styles.headerRow]}>
                {listTitle.map((text, i) => {
                    let width = text.width ? text.width : 140
                    return (
                        <View>
                            <Text style={[stylesList.C2D3640, { width: width}]} key={i + 10000}>{text.title}</Text>
                            <Text style={[stylesList.C2D3640, { width: width ,marginTop:8}]} key={i}>{text.title2}</Text>
                        </View>
                    )
                })}
            </View>
        )

    }

}
const styles = StyleSheet.create({
    headerRow:{
         flexDirection: 'row',
         backgroundColor: '#e0e5ea',
         height:55,
         paddingTop:10,
    },
    itemRow:{
        paddingTop: 15,
        position: 'relative',
        height: 70,
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1
    },
    mtT:{
        marginTop:8
    }
})
