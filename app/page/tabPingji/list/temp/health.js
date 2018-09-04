import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import stylesList from '../../../../css/listData';
import Theme from '../../../../util/theme';

export default class TabPingjiListHealth extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View>
                <View style={stylesList.headerRow}>
                    <Text style={[stylesList.tdID, stylesList.headerRowText]}></Text>
                    <Text style={[stylesList.tdName, stylesList.headerRowText]}></Text>
                    <Text style={[stylesList.headerRowText, styles.td1]}>健康度综指</Text>
                    <Text style={[stylesList.headerRowText, styles.td2]}>变化幅度</Text>
                </View>
                {
                    data.map((item, i) => {
                        return (
                            <View style={stylesList.itemRowNone} key={i}>
                                <TouchableOpacity style={{ flexDirection: 'row', }}
                                    onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}
                                >
                                    <Text style={[stylesList.tdID, stylesList.firstName]}></Text>
                                    <Text style={[stylesList.tdName, stylesList.C2D3640]}></Text>
                                    <Text style={[stylesList.firstName, styles.td1]}>{item.score}</Text>
                                    <View style={[stylesList.tdUp, styles.td1]}>
                                        <Text style={[stylesList.CABB7C4, { width: 50 }]}>{item.changnum >= 0 ? item.changnum : -item.changnum}%</Text>
                                        <Icon name={item.changnum >= 0 ? 'up' : 'down'} size={12} color={item.changnum >= 0 ? '#ff0063' : '#009963'} />
                                    </View>
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
        width: (Theme.screenWidth - 150) / 2,
    },
    td2: {
        width: (Theme.screenWidth - 150) / 2,
    },
})