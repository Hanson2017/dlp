import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import stylesList from '../../../../css/listData';
import Theme from '../../../../util/theme';

export default class TabPingjiListPJ extends React.Component {
    render() {
        const { data, navigation,field,fieldText,width } = this.props;
        return (
            <View>
                <View style={stylesList.headerRow}>
                    <Text style={[stylesList.tdID, stylesList.headerRowText]}></Text>
                    <Text style={[stylesList.tdName, stylesList.headerRowText]}></Text>
                    <Text style={[stylesList.headerRowText, styles.td1]}>{fieldText}</Text>
                    <Text style={[stylesList.headerRowText, styles.td2]}>关键字</Text>
                </View>
                {
                    data.map((item, i) => {
                        return (
                            <View style={stylesList.itemRow2} key={i} >
                                <TouchableOpacity style={{ flexDirection: 'row', }}
                                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}
                                >
                                    <Text style={[stylesList.tdID, stylesList.firstName]}></Text>
                                    <Text style={[stylesList.tdName, stylesList.C2D3640]}></Text>
                                    <View style={[stylesList.tdUp2, styles.td1]}>
                                        <Text style={[stylesList.firstName, { width: width }]}>{item[field]} </Text>
                                        <Icon style={stylesList.iconArrow} name={item.changnum >= 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                                    </View>

                                    {
                                        (item.goodtag !== null && item.goodtag !== '' && item.goodtag.length > 0) || (item.badtag !== null && item.badtag !== '' && item.badtag.length > 0) ?
                                            <View style={stylesList.tagsNewContainer}>
                                                <View style={stylesList.tagsNew}>
                                                    <View style={stylesList.tagsNewIcon}>
                                                        <Image source={{ uri: 'http://m.dailuopan.com/images/icon-gtag.png?20190929' }} style={stylesList.icontag} />
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
                    })
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    td1: {
        width: (Theme.screenWidth - 150) * 0.4,
    },

    td3: {
        width: (Theme.screenWidth - 150) * 0.27,
    },
    td4: {
        width: 80,
    },
    td5: {
        width: 80,
    },
    td6: {
        width: 80,
    },
    td7: {
        width: 60,
    },

})