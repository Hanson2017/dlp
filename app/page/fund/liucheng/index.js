import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import Util from '../../../util/util';
import Api from '../../../util/api';

export default class FundLiuc extends React.Component {
    render() {
        const { navigation, title, plat, data } = this.props;
        return (
            <View style={[Theme.mt10]}>
                <View style={[Theme.box, styles.fundLiuc]}>
                    <Title data={title} />
                </View>
                {
                    data.map((item, i) => {
                        return (
                            <View style={[Theme.box, styles.fundLiucList, i !== 0 ? Theme.mt10 : null]} key={i}>
                                <View style={styles.fundLiucListDate}>
                                    <FontAwesome name={'calendar'} size={15} color={'#999'} />
                                    <Text style={styles.fundLiucListDateText}>{Util.formatDate2(item.showday)}</Text>
                                </View>
                                <View style={styles.fundLiucListContent}>
                                    {
                                        plat ?
                                            null
                                            :
                                            <TouchableOpacity style={styles.platNameLc}
                                                onPress={() => {
                                                    navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                                }}
                                            >
                                                <Text style={styles.platNameLcText}>{item.plat_name}</Text>
                                            </TouchableOpacity>
                                    }
                                    <View style={styles.fundLiucListCC}>
                                        <Text style={styles.fundLiucListCCText}>
                                            {Util.delHtmlTag(item.detailinfo)}
                                        </Text>

                                    </View>
                                    {
                                        item.imglist !== null && item.imglist.length > 0 ?
                                            <View style={styles.fundLiucListPic}>
                                                <View style={styles.fundLiucListPicTit}>
                                                    <Text style={styles.fundLiucListPicTitText}>相关截图</Text>
                                                </View>
                                                <View style={styles.fundLiucListPicCon}>
                                                    {
                                                        item.imglist.map((list, j) => {
                                                            return (
                                                                <TouchableOpacity style={styles.fundLiucListPicLi} activeOpacity={0.4}
                                                                    onPress={() => {
                                                                        navigation.navigate('ShowPic', { data: item.imglist, index: j })
                                                                    }}
                                                                >
                                                                    <Image source={{ uri: Api.domain + list.file_url }} style={styles.pic} />
                                                                </TouchableOpacity>
                                                            )
                                                        })
                                                    }

                                                </View>
                                            </View>
                                            :
                                            null
                                    }
                                    {
                                        item.filelist !== null && item.filelist.length > 0 ?
                                            <View style={styles.fundLiucListHt}>
                                                <View style={styles.fundLiucListPicTit}>
                                                    <Text style={styles.fundLiucListPicTitText}>相关合同</Text>
                                                </View>
                                                <TouchableOpacity style={styles.fundhtdown}
                                                    onPress={() => {
                                                        Util.Linked(Api.domain + item.filelist[0].file_url)
                                                    }}
                                                >
                                                    <Text style={styles.fundhtdownText}>查看出借合同</Text>
                                                    <Text style={{ color: '#bbb', fontSize: 12 }}>(将在浏览器打开)</Text>
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            null
                                    }

                                </View>
                            </View>
                        )
                    })
                }

            </View>
        )
    }

}

const styles = StyleSheet.create({

    fundLiuc: {
        paddingBottom: 10,
    },
    fundLiucListDate: {
        paddingLeft: 17,
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    fundLiucListDateText: {
        paddingLeft: 5,
        color: '#A1A1A1',
        fontSize: 12,
    },
    fundLiucListContent: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 17,
        paddingRight: 15,
    },
    fundLiucListCCText: {
        fontSize: 12,
        color: '#666',
        fontWeight: 'bold',
        lineHeight: 18,
    },
    fundLiucListBz: {
        paddingTop: 15,
        marginTop: 15,
        borderTopColor: '#eee',
        borderTopWidth: 1,
    },
    fundLiucListBzText: {
        color: '#999',
        fontSize: 12,
        lineHeight: 18,
    },
    fundLiucListPic: {
        paddingTop: 15,
        marginTop: 15,
        borderTopColor: '#eee',
        borderTopWidth: 1,
    },
    fundLiucListPicTit: {
        marginBottom: 8,
    },
    fundLiucListPicTitText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#666',
    },
    fundLiucListPicCon: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    pic: {
        marginRight: 10,
        marginBottom: 10,
        width: (Theme.screenWidth - 70) / 3,
        height: (Theme.screenWidth - 70) / 3,
        borderWidth: 1,
        borderColor: '#eee',
    },
    fundLiucListPicMore: {
        width: (Theme.screenWidth - 70) / 3,
        height: (Theme.screenWidth - 70) / 3,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fundLiucListPicMoreText: {
        color: '#999',
        fontSize: 12,
        lineHeight: 20,
    },
    fundLiucListHt: {
        marginTop: 25,
    },
    fundhtdown: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fundhtdownText: {
        fontSize: 12,
        color: '#999',
        textDecorationLine: 'underline',
    },
    platNameLc: {
        marginBottom: 15,
    },
    platNameLcText: {
        fontSize: 16,
        color: '#0096E6',
        fontWeight: 'bold',
    }
})