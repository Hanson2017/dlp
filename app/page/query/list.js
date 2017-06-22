import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import stylesList from '../../css/listData';

module.exports = {
    renderItemR({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View style={stylesList.itemRow} key={index}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name,fundType:item.fund_type }) }}

                >
                    <View style={[stylesList.tdUp, { width: 80 }]}>
                        <Text style={[stylesList.C2D3640, { width: 42 }]}>{item.score} </Text>
                        <Icon name={item.changnum >= 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                    </View>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.score_wdzj != 0 ? item.score_wdzj : '暂无'}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.score_p2peye != 0 ? item.score_p2peye : '暂无'}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.score_dlp}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.level_r360 != null ? item.level_r360 : '暂无'}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.level_xinghuo != null ? item.level_xinghuo : '暂无'}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.score_yifei != '' ? item.score_yifei : '暂无'}</Text>
                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '综指', width: 80 },
            { title: '之家' },
            { title: '天眼' },
            { title: '贷罗盘' },
            { title: '融360' },
            { title: '星火' },
            { title: '羿飞' },
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
