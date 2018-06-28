import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../util/theme';
import Util from '../../util/util';

export default class Title extends React.Component {
    render() {
        const { data, borderNot, navigation, screenUrlInfo, mfTag, linkUrl } = this.props;
        return (
            <View style={[styles.container, borderNot ? { borderBottomWidth: 0 } : null]}>
                <View style={styles.left}>
                    <View style={styles.icon}></View>
                    <View style={styles.textCon}><Text style={styles.text}>{data}</Text></View>
                    {
                        mfTag ?
                            <View style={styles.mfTag}><Text style={styles.mfTagText}>全网最高</Text></View>
                            :
                            null
                    }
                    {
                        mfTag ?
                            <View style={styles.mfTag}><Text style={styles.mfTagText}>魔方保障</Text></View>
                            :
                            null
                    }
                </View>
                {
                    screenUrlInfo || linkUrl ?
                        <TouchableOpacity
                            style={styles.right}
                            activeOpacity={0.5}
                            onPress={() => {
                                if (linkUrl) {
                                    Util.Linked(linkUrl);
                                }
                                if (screenUrlInfo) {
                                    navigation.navigate(screenUrlInfo.screenUrl, { tabId: screenUrlInfo.tabId })
                                }

                            }}
                        >
                            <Icon name={'triangle-right22'} size={14} color={'#bbb'} />
                        </TouchableOpacity>
                        :
                        null
                }

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingTop: 12,
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    left: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 5,
        width: 2,
        height: 14,
        backgroundColor: Theme.color
    },
    text: {
        color: '#515151',
        fontSize: 16,
        fontWeight:'bold',
    },
    right: {
        paddingRight:10,
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mfTag: {
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 20,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    mfTagText: {
        color: '#bbb',
        fontSize: 10,
    },
})