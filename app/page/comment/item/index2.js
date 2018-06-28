import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Util from '../../../util/util';
import Theme from '../../../util/theme';
import Icon from 'react-native-vector-icons/Icomoon';

export default class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        }
    }
    render() {
        const { data, navigation, borderNot, leftNo } = this.props;
        const { isHidden } = this.state;
        return (
            <View style={[styles.listContainer, borderNot ? { borderBottomWidth: 0 } : null]}>
                {
                    !leftNo ?
                        <View style={styles.left}>
                            <TouchableOpacity style={styles.listPlatName}
                                onPress={() => {
                                    navigation.navigate('Detail', { id: data.cid, platName: data.title })
                                }}
                            >
                                <Text style={styles.listPlatNameText}>{data.title}</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        null
                }

                <View style={styles.right}>
                    <View style={styles.header}>
                        <View style={styles.username}>
                            <Icon name='ico-portrait' size={12} color={'#73C3FF'} />
                            <Text style={styles.usernameText}>{data.username}</Text>
                        </View>
                        <View style={styles.dateTime}>
                            <Text style={styles.dateTimeText}>{Util.formatDate(data.updatetime)}</Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.bodyText}>
                            {
                                isHidden ?
                                    Util.cutText(Util.delHtmlTag(data.detail), 60)
                                    :
                                    Util.delHtmlTag(data.detail)
                            }
                        </Text>
                    </View>
                    {
                        Util.delHtmlTag(data.detail).length > 60 ?
                            <View style={styles.openContainer}>
                                <TouchableOpacity style={styles.openBtn}
                                    onPress={() => {
                                        this.setState({
                                            isHidden: !this.state.isHidden
                                        })

                                    }}
                                >
                                    <Icon name={isHidden ? 'triangleHollow-down' : 'triangleHollow-up'} size={12} color={isHidden?'#bbb':Theme.color} />
                                    <Text style={[styles.openText,!isHidden?{color:Theme.color}:null]}>{isHidden ? '展开' : '收起'}</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            null
                    }

                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({

    listContainer: {
        flexDirection: 'row',
        marginTop: 12,
        paddingBottom: 8,
        paddingRight: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',

    },
    left: {
        paddingTop: 26,
        flexDirection: 'row',
        width: 80,
    },
    right: {
        flex: 1,
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
    header: {
        height: 16,
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
        fontSize: 12,
        lineHeight: 18,
    },
    openContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    openBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    openText: {
        paddingLeft: 4,
        color: '#bbb',
        fontSize: 11,
    }


})