import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Util from '../../../util/util';
import Icon from 'react-native-vector-icons/Icomoon';

export default class List extends React.Component {
    render() {
        const { data, navigation, borderNot } = this.props;
        return (
            <View style={[styles.listContainer, borderNot ? { borderBottomWidth: 0 } : null]}>
                <View style={styles.header}>
                    <View style={styles.username}>
                        <Icon name='ico-portrait' size={15} color={'#73C3FF'} />
                        <Text style={styles.usernameText}>{data.username}</Text>
                    </View>
                    <View style={styles.dateTime}>
                        <Text style={styles.dateTimeText}>{Util.formatDate(data.updatetime)}</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <Text style={styles.bodyText}>{Util.cutText(Util.delHtmlTag(data.detail), 50)}</Text>
                </View>
                {
                    data.title ?
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.listPlatName}
                                onPress={() => {
                                    navigation.navigate('Detail', { id: data.cid, platName: data.title })
                                }}
                            >
                                <Text style={styles.listPlatNameText}>{data.title}</Text>
                            </TouchableOpacity>
                        </View> :
                        null
                }

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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    username: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    usernameText: {
        paddingLeft: 3,
        color: '#999',
        fontSize: 11,
    },
    dateTimeText: {
        color: '#bbb',
        fontSize: 11,
    },
    body: {
        marginTop: 6,
        marginBottom: 8,
    },
    bodyText: {
        color: '#666',
        fontSize: 14,
        lineHeight: 18,
    },
    footer: {
        flexDirection: 'row',
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

})