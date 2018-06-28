import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Util from '../../../util/util';

export default class List extends React.Component {
    render() {
        const { data, navigation, borderNot } = this.props;
        const article = data.article;
        const plats = data.plats;
        return (
            <View style={[styles.listContainer, borderNot ? { borderBottomWidth: 0 } : null]}>
                <TouchableOpacity style={styles.listTitle}
                    onPress={() => { navigation.navigate('PingCeDetail', { id: article.id }) }}
                >
                    <Text style={styles.listTitleText}>{article.title}</Text>
                </TouchableOpacity>
                <View style={[styles.listBt]}>
                    <View style={styles.platsContainer}>
                        {
                            plats !== '' && plats.length > 0 ?
                                plats.map((item, i) => {
                                    return (
                                        <TouchableOpacity style={styles.listPlatName} key={i}
                                            onPress={() => {
                                                navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                            }}
                                        >
                                            <Text style={styles.listPlatNameText}>{item.plat_name}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                                :
                                <View style={styles.listPlatName}>
                                    <Text style={styles.listPlatNameText}>其他</Text>
                                </View>
                        }

                    </View>
                    <View style={styles.listUpdatetime}>
                        <Text style={styles.listUpdatetimeText}>{Util.formatDate(article.updatetime)}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    listContainer: {
        marginTop: 12,
        paddingBottom: 3,
        paddingRight: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',

    },
    listTitle: {
        marginBottom: 10,
    },
    listTitleText: {
        fontSize: 14,
        color: '#101010',
        lineHeight: 18,
    },
    listBt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    platsContainer:{
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    listPlatName: {
        marginBottom:5,
        marginRight:5,
        paddingLeft: 6,
        paddingRight: 6,
        height: 20,
        backgroundColor: '#f5f5f5',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listPlatNameText: {
        fontSize: 11,
        color: '#bbb',
    },
    listUpdatetime:{
        width:60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    listUpdatetimeText: {
        fontSize: 11,
        color: '#bbb',
    }
})