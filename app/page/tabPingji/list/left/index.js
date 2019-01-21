import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import stylesList from '../../../../css/listData';
import Util from '../../../../util/util';

export default class TabPingjiListLeft extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={stylesList.headerRow}>
                    <Text style={[stylesList.tdID, stylesList.headerRowText, styles.tdID]}>排名</Text>
                    <Text style={[styles.tdName, stylesList.tdName, stylesList.headerRowText]}>平台名称</Text>
                </View>
                {
                    data.map((item, i) => {
                        return (
                            <View style={[stylesList.itemRow2,Util.isbest(item.goodtag) ?{backgroundColor:'#E3F3FB'}:{backgroundColor:null}]} key={i}>
                                <TouchableOpacity key={i} style={{ flexDirection: 'row' }}
                                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}
                                >
                                    <Text style={[stylesList.tdID, stylesList.C666, styles.tdID]}>{i + 1}</Text>
                                    <Text style={[stylesList.tdName, stylesList.C666,Util.isbest(item.goodtag) ?{fontWeight:'bold'}:null]}>{item.plat_name} {Util.isbest(item.goodtag) ?<Ionicons name={'md-star'} size={14} color={'#DBAF74'} />:null}</Text>
                                </TouchableOpacity>
                                {
                                    item.flmllist.length && versionStatus != 1 > 0 ?

                                        <View style={{ position: 'absolute', bottom: 11, left: 10, flexDirection: 'row', }}>
     
                                            {item.flmllist.length > 0 ?
                                                item.flmllist.map((list, i) => {
                                                    let url = 'http://m.fanlimofang.com/Activity/Detail/' + list.activityid
                                                    return (
                                                        list.investtype == 1 ? null :
                                                            <TouchableOpacity
                                                                key={i}
                                                                style={stylesList.hongbao}
                                                                onPress={() => {
                                                                    Util.Linked(url)
                                                                }}
                                                            >
                                                                <Text style={stylesList.hongbaoText}>{list.invest}奖{list.rebate}</Text>
                                                            </TouchableOpacity>
                                                    )

                                                })
                                                : null
                                            }

                                        </View>
                                        :
                                        null
                                }
                            </View>

                        )
                    })
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    tdID: {
        paddingLeft: 17,
    },
})