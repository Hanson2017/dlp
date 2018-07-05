import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import stylesList from '../../../css/listData';
import Theme from '../../../util/theme';

module.exports = {
    renderItemR({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View style={(item.flmllist.length > 0) && versionStatus != 1 ? stylesList.itemRow : stylesList.itemRowNone} key={index}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}

                >
                    <Text style={[stylesList.tdID, stylesList.headerRowText]}></Text>
                    <Text style={[stylesList.tdName, stylesList.headerRowText]}></Text>
                    <Text style={[stylesList.firstName, { width: Theme.screenWidth >= 375 ? (Theme.screenWidth - 150) * 0.4 : (Theme.screenWidth - 150) * 0.52 }]}>{item.level}/{item.level_p2peye}</Text>
                    <Text style={[stylesList.CABB7C4, { width: Theme.screenWidth >= 375 ? (Theme.screenWidth - 150) * 0.27 : (Theme.screenWidth - 150) * 0.31 }]}>{item.xscore}</Text>
                    <Text style={[stylesList.CABB7C4, { width: Theme.screenWidth >= 375 ? (Theme.screenWidth - 150) * 0.27 : (Theme.screenWidth - 150) * 0.31 }]}>{item.hscore}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.limit_t}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.rate}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.claims}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.standard}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.operation}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.regional}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.investment}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.borrowing}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 70 }]}>{item.liquidity}</Text>
                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '网贷天眼', width: Theme.screenWidth >= 375 ? (Theme.screenWidth - 150) * 0.4 : (Theme.screenWidth - 150) * 0.52 },
            { title: '信披', width: Theme.screenWidth >= 375 ? (Theme.screenWidth - 150) * 0.27 : (Theme.screenWidth - 150) * 0.31 },
            { title: '合规', width: Theme.screenWidth >= 375 ? (Theme.screenWidth - 150) * 0.27 : (Theme.screenWidth - 150) * 0.31 },
            { title: '期限' },
            { title: '利率' },
            { title: '偿兑性' },
            { title: '资金流入率' },
            { title: '运营' },
            { title: '地域性' },
            { title: '投资' },
            { title: '借款' },
            { title: '流动性' },
        ]
        return (
            <View style={stylesList.headerRow}>
                <Text style={[stylesList.tdID, stylesList.headerRowText]}></Text>
                <Text style={[stylesList.tdName, stylesList.headerRowText]}></Text>
                {listTitle.map((text, i) => {
                    let width = text.width ? text.width : 70
                    return (
                        <Text style={[stylesList.headerRowText, { width: width }]} key={i}>{text.title}</Text>
                    )
                })}
            </View>
        )

    }

}
