import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import stylesList from '../../../../css/listData';

export default class TabPingjiListLeft extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={stylesList.headerRow}>
                    <Text style={[stylesList.tdID, stylesList.headerRowText,styles.tdID]}>排名</Text>
                    <Text style={[styles.tdName,stylesList.tdName, stylesList.headerRowText]}>平台名称</Text>
                </View>
                {
                    data.map((item, i) => {
                        return (
                            <View style={stylesList.itemRowNone}>
                                <TouchableOpacity key={i} style={{ flexDirection: 'row' }}
                                     onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name}) }}
                                >
                                    <Text style={[stylesList.tdID, stylesList.C666,styles.tdID]}>{i + 1}</Text>
                                    <Text style={[stylesList.tdName, stylesList.C666]}>{item.plat_name}</Text>
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
    tdID:{
        paddingLeft:17,
    },
})