import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import { SafeAreaView } from "react-navigation";
import Theme from '../../../../util/theme';
import Util from '../../../../util/util';
import Header from '../../../../component/navBar/detail';
import Title from '../../../../component/title';

export default class Gudongbiangeng extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: [],
            ref: false,
            data: '',
        };
    }
    componentWillMount() {
        const { data } = this.props;
        const isHiddenNew = [];
        for (let i = 0; i < data.length; i++) {
            isHiddenNew.push(true)
        }
        this.setState({
            isHidden: isHiddenNew,
            data: data
        })

    }
    render() {
        const { navigation } = this.props;
        const { data, isHidden } = this.state;
        return (
            <View style={[Theme.box, Theme.mt10]}>
                <Title data={'工商变更监控'} navigation={navigation} screenUrlInfo={data.length > 5 ? { screenUrl: 'DetailBiangeng', tabId: data } : null} />
                {
                    data.map((item, i) => {
                        if (i < 5) {
                            return (
                                <View style={styles.biangengBox} key={i}>
                                    <View style={styles.biangengBoxHd}>
                                        <View style={styles.biangengBoxHdLeft}>
                                            <Text style={styles.biangengNo}>[{i + 1}]</Text>
                                            <Text style={styles.biangengName}>{item.type == 'gudong' ? '股东变更' : '法定代表人变更'}</Text>
                                        </View>
                                        <View style={styles.biangengBoxHdRight}>
                                            <Text style={styles.biangengDate}>{Util.formatDate2(item.updatetime)}</Text>
                                            <TouchableOpacity onPress={() => {
                                                isHidden[i] = !this.state.isHidden[i]
                                                this.setState({
                                                    ref: !this.state.ref
                                                })
                                            }}>
                                                <Icon name={'triangleCircle-down'} size={22} color={'#bbb'} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {
                                        isHidden[i] ?
                                            null
                                            :
                                            <View style={styles.biangengBoxBd}>
                                                <Text style={styles.biangengNote}>带有*标记的为法定代表人</Text>
                                                <View style={styles.biangengBoxBdCon}>
                                                    <View style={styles.biangengBoxBdConL}>
                                                        <View style={styles.biangengBoxBdConHd}><Text style={styles.biangengBoxBdConHdText}>变更前</Text></View>
                                                        <View style={styles.biangengBoxBdConLBd}>
                                                            {
                                                                item.detail_pre.length > 0 ?
                                                                    item.detail_pre.map((list, j) => {
                                                                        return (
                                                                            <Text style={[styles.biangengBoxBdConBdText, list.type !== 0 ? styles.red : null]} key={j}>{list.detail}{list.type !== 0 ? '[退出]' : null}</Text>
                                                                        )
                                                                    })
                                                                    :
                                                                    null
                                                            }
                                                        </View>
                                                    </View>
                                                    <View style={styles.biangengBoxBdConR}>
                                                        <View style={styles.biangengBoxBdConHd}><Text style={styles.biangengBoxBdConHdText}>变更后</Text></View>
                                                        <View style={styles.biangengBoxBdConRBd}>
                                                            {
                                                                item.detail.length > 0 ?
                                                                    item.detail.map((list, j) => {
                                                                        return (
                                                                            <Text style={[styles.biangengBoxBdConBdText, list.type !== 0 ? styles.red : null]} key={j}>{list.detail}{list.type !== 0 ? '[新增]' : null}</Text>
                                                                        )
                                                                    })
                                                                    :
                                                                    null
                                                            }
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                    }
                                </View>
                            )
                        }

                    })
                }

            </View>
        )
    }
}
const styles = StyleSheet.create({

    biangengBox: {
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 17,
        paddingRight: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    biangengBoxHd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    biangengBoxHdLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    biangengBoxHdRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    biangengNo: {
        paddingRight: 6,
        fontSize: 14,
        color: '#666',
        fontWeight: 'bold',
    },
    biangengName: {
        fontSize: 14,
        color: '#666',
    },
    biangengDate: {
        paddingRight: 6,
        fontSize: 11,
        color: '#999',
    },
    biangengBoxBd: {
        marginTop: 20,
    },
    biangengNote: {
        paddingLeft: 10,
        paddingBottom: 15,
        fontSize: 12,
        color: '#999',
    },
    biangengBoxBdCon: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5'
    },
    biangengBoxBdConHd: {
        height: 28,
        justifyContent: 'center',
        backgroundColor: '#eee',
        paddingLeft: 10,
    },
    biangengBoxBdConHdText: {
        fontSize: 12,
        color: '#999',
    },
    biangengBoxBdConL: {
        borderRightWidth: 1,
        borderRightColor: '#ddd',
        width: (Theme.screenWidth - 34) / 2,
    },
    biangengBoxBdConR: {

        width: (Theme.screenWidth - 34) / 2,
    },
    biangengBoxBdConLBd: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
    },
    biangengBoxBdConRBd: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15,
    },
    biangengBoxBdConBdText: {
        marginBottom: 8,
        fontSize: 12,
        color: '#666',
    },
    red: {
        color: '#0096E6',
    }
})