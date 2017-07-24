import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import stylesList from '../../css/listData';

module.exports = {
    renderItemR({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View style={(item.flmllist.length > 0) && versionStatus != 1 ? stylesList.itemRow : stylesList.itemRowNone} key={index}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}

                >
                    <View style={[stylesList.tdUp, { width: 80 }]}>
                        <Text style={[stylesList.C2D3640, { width: 42 }]}>{item.score} </Text>
                        <Icon name={item.changnum >= 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                    </View>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.inamount}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.dispersion}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.mobility}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.rate_d}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.popularity}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.stayStill}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.loyalty}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.growth}</Text>
                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '贷罗盘', width: 80 },
            { title: '资金流' },
            { title: '分散度' },
            { title: '流动性' },
            { title: '收益率' },
            { title: '人气' },
            { title: '体量' },
            { title: '忠诚度' },
            { title: '成长性' },
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
