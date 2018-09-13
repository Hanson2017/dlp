import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import stylesList from '../../../css/listData';
import Theme from '../../../util/theme';
module.exports = {
    renderItemR({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <View style={stylesList.itemRow2} key={index} >
                <TouchableOpacity
                    style={{ flexDirection: 'row', }}
                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}

                >
                    <Text style={[stylesList.tdID, stylesList.headerRowText]}></Text>
                    <Text style={[stylesList.tdName, stylesList.headerRowText]}></Text>
                    <View style={{ width: 90, }}>
                        <Text style={[stylesList.firstName,]}>{item.score}</Text>
                        <View style={[stylesList.tdUp2, { marginTop: 14, }]}>
                            <Text style={[stylesList.CABB7C4, { width: 53 }]}>{item.changnum >= 0 ? item.changnum : -item.changnum}%</Text>
                            <Icon style={stylesList.iconArrow} name={item.changnum >= 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                        </View>
                    </View>
                    {
                        (item.goodtag !== null && item.goodtag !== '' && item.goodtag.length > 0) || (item.badtag !== null && item.badtag !== '' && item.badtag.length > 0) ?
                            <View style={stylesList.tagsNewContainer}>
                                <View style={stylesList.tagsNew}>
                                    <View style={stylesList.tagsNewIcon}>
                                        <Image source={{ uri: 'http://m.dailuopan.com/images/icon-gtag.png' }} style={stylesList.icontag} />
                                    </View>
                                    <View style={stylesList.tagsNewCon}>
                                        {
                                            item.goodtag !== null && item.goodtag !== '' && item.goodtag.length > 0 ?
                                                item.goodtag.map((item, i) => {
                                                    return (
                                                        <View style={stylesList.tagNew}>
                                                            <Text style={stylesList.tagNewText}>{item.tags}</Text>
                                                            {
                                                                item.tags == '一线平台' ?
                                                                    <Ionicons name={'md-thumbs-up'} size={12} color={'#fff'} />
                                                                    :
                                                                    null
                                                            }

                                                        </View>
                                                    )
                                                })
                                                :
                                                <Text style={stylesList.tagNull}>暂无</Text>
                                        }

                                    </View>
                                </View>
                                <View style={[stylesList.tagsNew, stylesList.tagsNewBad]}>
                                    <View style={stylesList.tagsNewIcon}>
                                        <Image source={{ uri: 'http://m.dailuopan.com/images/icon-btag.png' }} style={stylesList.icontag2} />
                                    </View>
                                    <View style={stylesList.tagsNewCon}>
                                        {
                                            item.badtag !== null && item.badtag !== '' && item.badtag.length > 0 ?
                                                item.badtag.map((item, i) => {
                                                    return (
                                                        <View style={[stylesList.tagNew, stylesList.tagNewBad]}><Text style={stylesList.tagNewText}>{item.tags}</Text></View>
                                                    )
                                                })
                                                :
                                                <Text style={stylesList.tagNull}>暂无</Text>
                                        }

                                    </View>
                                </View>
                            </View>
                            :
                            null
                    }

                </TouchableOpacity>
            </View>
        )
    },
    ListHeaderComponentR() {
        let listTitle = [
            { title: '成长性', width: 90 },
            { title: '关键字' },
        ]
        return (
            <View style={stylesList.headerRow}>
                <Text style={[stylesList.tdID, stylesList.headerRowText]}></Text>
                <Text style={[stylesList.tdName, stylesList.headerRowText]}></Text>
                {listTitle.map((text, i) => {
                    let width = text.width ? text.width : null
                    return (
                        <Text style={[stylesList.headerRowText, { width: width }]} key={i}>{text.title}</Text>
                    )
                })}
            </View>
        )

    }

}
