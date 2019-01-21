import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Util from '../../../util/util'
import stylesList from '../../../css/listData';

export default class Left extends React.Component {
    
    render() {
        return (
            <FlatList
                ListHeaderComponent={this.ListHeaderComponentL.bind(this)}
                data={this.props.data}
                renderItem={this.renderItemL.bind(this)}
            />
        )
    }
    ListHeaderComponentL() {

        return (
            <View style={stylesList.headerRow}>
                <Text style={[stylesList.tdID, stylesList.headerRowText]}>排名</Text>
                <Text style={[stylesList.tdName, stylesList.headerRowText]}>平台名称</Text>
            </View>
        )
    }
    renderItemL({ item, index }) {
        let navigation = this.props.navigation;
        let flmllist = item.flmllist;
        return (
            <View style={[stylesList.itemRow2,Util.isbest(item.goodtag) ?{backgroundColor:'#E3F3FB'}:{backgroundColor:null}]} key={index}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name}) }}

                >
                    <Text style={[stylesList.tdID, stylesList.C666]}>{index + 1}</Text>
                    <Text style={[stylesList.tdName, stylesList.C666,Util.isbest(item.goodtag) ?{fontWeight:'bold'}:null]}>{item.plat_name} {Util.isbest(item.goodtag) ?<Ionicons name={'md-star'} size={14} color={'#DBAF74'} />:null}</Text>
                </TouchableOpacity>
                {
                    (this.props.Ttype || flmllist.length) && versionStatus != 1 > 0 ?

                        <View style={{ position: 'absolute', bottom: 10, left: 10, flexDirection: 'row', }}>
                            {
                                this.props.Ttype ?
                                    <View style={stylesList.Ttype}>
                                        <Text style={stylesList.TtypeText}>{this.props.Ttype}</Text>
                                    </View>
                                    :
                                    null
                            }

                            {flmllist.length > 0 ?
                                flmllist.map((list, i) => {
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
    }
}

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        height: 55,
        paddingTop: 10,
        borderBottomColor: '#e1e6eb',
        borderBottomWidth: 1
    }
})
