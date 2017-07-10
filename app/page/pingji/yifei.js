import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import stylesList from '../../css/listData';

module.exports = {
    renderItemR({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View style={(item.fund_type != 0 || item.flmllist.length > 0) && versionStatus != 1 ? stylesList.itemRow : stylesList.itemRowNone} key={index}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name, fundType: item.fund_type }) }}

                >
                    <View style={[stylesList.tdUp, { width: 80 }]}>
                        <Text style={[stylesList.C2D3640, { width: 30 }]}>{item.score} </Text>
                        <Icon name={item.changnum >= 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                    </View>
                    <Text style={[stylesList.CABB7C4, { width: 90 }]}>{item.star_level}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.rate}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.amount}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 90 }]}>{item.brand}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.period}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 60 }]}>{item.security_level}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.invest}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.avg_invest}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.loan}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.avg_loan}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 60 }]}>{item.service_level}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.increase}</Text>
                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '羿飞评级', width: 80 },
            { title: '星级', width: 90 },
            { title: '利率' },
            { title: '成交' },
            { title: '品牌', width: 90 },
            { title: '周期', width: 70 },
            { title: '风控', width: 60 },
            { title: '投资人' },
            { title: '均投' },
            { title: '借款人' },
            { title: '均借' },
            { title: '服务', width: 60 },
            { title: '成交增长' },
        ]
        return (
            <View style={stylesList.headerRow}>
                {listTitle.map((text, i) => {
                    let width = text.width ? text.width : 80
                    return (
                        <Text style={[stylesList.C2D3640, { width: width }]} key={i}>{text.title}</Text>
                    )
                })}
            </View>
        )

    }

}
