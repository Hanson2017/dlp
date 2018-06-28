import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Util from '../../../util/util';

export default class List extends React.Component {
    render() {
        const { data, navigation ,borderNot} = this.props;
        return (
            <View style={[styles.listContainer,borderNot?{borderBottomWidth:0}:null]}>
                <TouchableOpacity style={styles.listTitle}
                    onPress={() => { navigation.navigate('YulunDetail', { url: data.siteurl }) }}
                >
                    <Text style={styles.listTitleText}>{data.title}</Text>
                </TouchableOpacity>
                <View style={[styles.listBt]}>
                    <TouchableOpacity style={styles.listPlatName}
                        onPress={() => {
                            navigation.navigate('Detail', { id: data.id_dlp, platName: data.platname })
                        }}
                    >
                        <Text style={styles.listPlatNameText}>{data.platname}</Text>
                    </TouchableOpacity>
                    <View style={styles.listUpdatetime}>
                        <Text style={styles.listUpdatetimeText}>{Util.formatDate(data.pubtime)}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    listContainer: {
        marginTop: 12,
        paddingBottom: 8,
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
    listPlatName: {
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
    listUpdatetimeText: {
        fontSize: 11,
        color: '#bbb',
    }
})