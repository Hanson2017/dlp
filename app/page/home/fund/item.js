import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Theme from '../../../util/theme';
import Title from '../../../component/title';

export default class HomeFundItem extends React.Component {
    render() {
        const {typeNo,type,navigation,data,borderBottomNot}=this.props;
        return (
            <View style={styles.fundList}>
                <TouchableOpacity style={styles.fundLeft}
                    onPress={() => { navigation.navigate('Fund', { tabId: typeNo }) }}
                >
                    <View style={[styles.fundType,{backgroundColor:Theme['fund'+typeNo+'Color']}]}><Text style={styles.fundTypeText}>{typeNo}号</Text></View>
                    <Text style={styles.fundTitText}>{type}</Text>
                </TouchableOpacity>
                <View style={[styles.fundRight,borderBottomNot?{borderBottomWidth:0}:null]}>
                    {
                        data.map((item, i) => {
                            return (
                                <TouchableOpacity key={i} style={styles.platName} activeOpacity={0.6}
                                    onPress={() => {
                                        navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                    }}
                                >
                                    <Text style={styles.platNameText}>{item.plat_name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    fundList: {
        marginTop: 15,
        flexDirection: 'row',
    },
    fundType: {
        marginBottom: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: 48,
        height: 24,
        borderRadius: 3,
    },
    fundLeft: {
        marginRight: 17,
        alignItems: 'center',
    },
    fundTypeText: {
        width: 48,
        textAlign:'center',
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    fundTitText: {
        fontSize: 16,
        color: '#666',
        fontWeight: 'bold',
    },
    fundRight: {
        paddingLeft: 6,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    platName: {
        width: 67,
    },
    platNameText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 24,
    }
})