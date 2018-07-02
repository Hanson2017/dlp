import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import stylesList from '../../../css/listData';
import Theme from '../../../util/theme';

module.exports = {
    renderItemR({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View style={(item.flmllist.length > 0) && versionStatus != 1 ? stylesList.itemRow : stylesList.itemRowNone} keys={index}>
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name, fundType: item.fund_type }) }}

                >
                    <Text style={[stylesList.tdID, stylesList.firstName]}></Text>
                    <Text style={[stylesList.tdName, stylesList.C2D3640]}></Text>
                    <View style={[stylesList.tdUp, { width: (Theme.screenWidth - 150) * 0.4 }]}>
                        <Text style={[stylesList.firstName, { width: 45 }]}>{item.score} </Text>
                        <Icon name={item.changnum >= 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                    </View>
                    <Text style={[stylesList.CABB7C4, { width: (Theme.screenWidth - 150) * 0.27 }]}>{item.score_wdzj != 0 ? item.score_wdzj : '暂无'}</Text>
                    <Text style={[stylesList.CABB7C4, { width: (Theme.screenWidth - 150) * 0.27 }]}>{item.score_p2peye != 0 ? item.score_p2peye : '暂无'}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.score_dlp != 0 ? item.score_dlp : '暂无'}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.level_r360 != null ? item.level_r360 : '暂无'}</Text>
                   
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.score_yifei != '' ? item.score_yifei : '暂无'}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.level_xinghuo != null ? item.level_xinghuo : '暂无'}</Text>
                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '综指', width: (Theme.screenWidth - 150) * 0.4 },
            { title: '之家', width: (Theme.screenWidth - 150) * 0.27 },
            { title: '天眼', width: (Theme.screenWidth - 150) * 0.27 },
            { title: '贷罗盘' },
            { title: '融360' },
           
            { title: '羿飞' },
            { title: '星火' },
        ]
        return (
            <View style={stylesList.headerRow}>
                <Text style={[stylesList.tdID, stylesList.headerRowText]}></Text>
                <Text style={[stylesList.tdName, stylesList.headerRowText]}></Text>
                {listTitle.map((text, i) => {
                    let width = text.width ? text.width : 80
                    return (
                        <Text style={[stylesList.headerRowText, { width: width }]} key={i}>{text.title}</Text>
                    )
                })}
            </View>
        )

    }

}
