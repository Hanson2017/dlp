import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
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
                    <View style={[stylesList.tdUp, { width: (Theme.screenWidth - 150) * 0.36 }]}>
                        <Text style={[stylesList.firstName, { width: 45 }]}>{item.score != 0 ? item.score : '暂无'} </Text>
                        {
                            item.score != 0 ?
                                <Icon name={item.changnum >= 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                                :
                                null
                        }

                    </View>
                    <Text style={[stylesList.CABB7C4, { width: (Theme.screenWidth - 150) * 0.29 }]}>{item.hasdata !== 0 ?item.inamount:'暂无'}</Text>
                    <Text style={[stylesList.CABB7C4, { width: (Theme.screenWidth - 150) * 0.29 }]}>{item.hasdata !== 0 ?item.dispersion:'暂无'}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.hasdata !== 0 ?item.mobility:'暂无'}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.hasdata !== 0 ?item.rate_d:'暂无'}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.hasdata !== 0 ?item.popularity:'暂无'}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.hasdata !== 0 ?item.stayStill:'暂无'}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.hasdata !== 0 ?item.loyalty:'暂无'}</Text>
                    <Text style={[stylesList.CABB7C4, { width: 80 }]}>{item.hasdata !== 0 ?item.growth:'暂无'}</Text>
                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '贷罗盘', width: (Theme.screenWidth - 150) * 0.36 },
            { title: '资金流', width: (Theme.screenWidth - 150) * 0.29 },
            { title: '分散度', width: (Theme.screenWidth - 150) * 0.29 },
            { title: '流动性' },
            { title: '收益率' },
            { title: '人气' },
            { title: '体量' },
            { title: '忠诚度' },
            { title: '成长性' },
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
