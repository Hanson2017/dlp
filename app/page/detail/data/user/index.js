import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';

import Title from '../../../../component/title';
import Theme from '../../../../util/theme';
import DashLine from '../../../../component/dashLine';

export default class DetailDataUser extends React.Component {
    render() {
        const { data, navigation, platInfo } = this.props;
        if (data != null) {
            var areaData = data.areaDetail.data;
            if (data.age != '') {
                var ageText = ['18岁及以下', '19-24岁', '25-34岁', '35-49岁', '50岁及以上'];
                var age = data.age.split(',')
                var newdata = [];
                for (const i = 0; i < age.length; i++) {
                    newdata.push(parseInt(age[i]))
                }
                age = newdata
                var maxValue = Math.max.apply(null, age);
            }
        }
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {
                    data != null ?
                        <View>
                            <View style={[Theme.box]}>
                                <Title data={'年龄/性别分布'} />
                                <View style={styles.ageDetail}>
                                    {
                                        data.age != '' ?
                                            age.map((list, i) => {
                                                return (
                                                    <View style={styles.ageDetailList} key={i}>
                                                        <Text style={styles.ageNum}>{ageText[i]}</Text>
                                                        <Text style={styles.ageBili}>{list}%</Text>
                                                        <View style={[styles.progress, styles.progressAge, { width: (Theme.screenWidth - 50) / 2 * (list / maxValue) }]}></View>
                                                    </View>
                                                )
                                            })

                                            :
                                            <Text style={styles.null}>暂无年龄数据</Text>
                                    }

                                </View>
                                <View style={styles.dashLine}>
                                    <DashLine width={Theme.screenWidth - 34} />
                                </View>
                                <View style={styles.sexDetail}>
                                    {
                                        data.male != 0 ?
                                            <View style={styles.sexBox}>
                                                <View style={styles.ageDetailList}>
                                                    <Text style={[styles.ageNum, styles.maleNum]}>男性用户</Text>
                                                    <Text style={[styles.ageBili, styles.maleBili]}>{data.male}%</Text>
                                                    <View style={[styles.progress, styles.progressSexmale, data.male >= data.female ? { width: (Theme.screenWidth - 50) / 2 } : { width: (Theme.screenWidth - 50) / 2 * (data.male / data.female) }]}></View>
                                                </View>
                                                <View style={styles.ageDetailList}>
                                                    <Text style={[styles.ageNum, styles.femaleNum]}>女性用户</Text>
                                                    <Text style={[styles.ageBili, styles.femaleBili]}>{data.female}%</Text>
                                                    <View style={[styles.progress, styles.progressSexfemale, data.male <= data.female ? { width: (Theme.screenWidth - 50) / 2 } : { width: (Theme.screenWidth - 50) / 2 * (data.female / data.male) }]}></View>
                                                </View>
                                            </View>
                                            :
                                            <Text style={styles.null}>暂无性别数据</Text>
                                    }
                                </View>
                            </View>

                            <View style={[Theme.box, Theme.mt10]}>
                                <Title data={'地区分布'} />
                                <View style={styles.areaDetail}>
                                    {
                                        areaData != null ?
                                            areaData.list.map((list, i) => {
                                                return (
                                                    <View style={styles.areaDetailList} key={i}>
                                                        <View style={[styles.number, styles['number' + i]]}><Text style={styles.numberText}>{i + 1}</Text></View>
                                                        <Text style={styles.platName}>{list.province}</Text>
                                                        <View style={[styles.progress, styles['progressArea' + i], { width: Theme.screenWidth / 2 * list.perctent }]}></View>
                                                    </View>
                                                )
                                            })
                                            :
                                            <Text style={styles.null}>暂无数据</Text>
                                    }
                                </View>
                            </View>

                            <View style={[Theme.box, Theme.mt10]}>
                                <Title data={'"' + platInfo.platName + '"' + '用户还关注'} />
                                <View style={styles.replatList}>
                                    {
                                        data.replat != null && data.replat != '' && data.replat.length > 0 ?
                                            data.replat.map((item, i) => {
                                                return (
                                                    <View style={styles.replatItemContainer} key={i} >
                                                        <TouchableOpacity style={styles.replatItem}
                                                            onPress={() => {
                                                                navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name })
                                                            }}
                                                        >
                                                            <Text style={styles.replatItemText}>{item.plat_name}</Text>
                                                        </TouchableOpacity>
                                                        {
                                                            item.fundtype ?
                                                                <View style={styles.fundtype}>
                                                                    <Icon name={'fund-icon'} size={18} color={Theme['fund' + item.fundtype + 'Color']} />
                                                                    <Text style={styles.fundtypeText}>{item.fundtype}</Text>
                                                                </View>
                                                                :
                                                                null
                                                        }
                                                    </View>
                                                )
                                            })
                                            :
                                            null
                                    }
                                </View>
                            </View>

                        </View>
                        :
                        <View style={styles.null}>
                            <Text style={styles.nullText}>暂无数据</Text>
                        </View>
                }

            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Theme.bgColor,
    },

    areaDetailList: {
        marginBottom: 6,
        marginTop: 6,
        flexDirection: 'row',
        height: 16,
        alignItems: 'center',
    },
    progress: {
        width: (Theme.screenWidth) / 2,
        height: 16,
        backgroundColor: '#E3E3E3',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },

    ageDetail: {
        padding: 17,
    },
    ageDetailList: {
        marginBottom: 5,
        marginTop: 5,
        flexDirection: 'row',
        height: 16,
        alignItems: 'center',
    },

    ageNum: {
        width: 65,
        color: '#666',
        fontSize: 11,
    },
    ageBili: {
        paddingRight: 8,
        textAlign: 'right',
        width: 40,
        fontSize: 14,
        color: '#4AB3FF',
    },

    progressAge: {
        width: (Theme.screenWidth - 50) / 2,
        backgroundColor: '#4AB3FF',
        borderColor: '#41a2e8',
    },
    progressSexmale: {
        backgroundColor: '#66a8e9',
        borderColor: '#1ba1e9',
    },
    progressSexfemale: {
        backgroundColor: '#f2528c',
        borderColor: '#d03676',
    },
    sexDetail: {
        padding: 17,
    },
    maleNum: {
        color: '#66a8e9',
    },
    femaleNum: {
        color: '#f2528c',
    },
    maleBili: {
        color: '#66a8e9',
    },
    femaleBili: {
        color: '#f2528c',
    },
    dashLine: {
        justifyContent: 'center',
        alignItems: 'center',
    },


    areaDetail: {
        padding: 17,
    },
    progressArea0: {
        backgroundColor: '#bbb',
        borderColor: '#bbb',
    },
    progressArea1: {
        backgroundColor: '#bbb',
        borderColor: '#bbb',
    },
    progressArea2: {
        backgroundColor: '#bbb',
        borderColor: '#bbb',
    },
    number: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 20,
        backgroundColor: '#E3E3E3',
        borderRadius: 4,
    },
    number0: {
        backgroundColor: '#bbb',
    },
    number1: {
        backgroundColor: '#bbb',
    },
    number2: {
        backgroundColor: '#bbb',
    },
    numberText: {
        color: '#fff',
        fontSize: 11,
    },
    platName: {
        marginLeft: 15,
        marginRight: 15,
        lineHeight: 20,
        color: '#bbb',
        fontSize: 12,
    },
    replatList: {
        paddingTop: 20,
        paddingLeft: 17,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    replatItemContainer: {
        width: (Theme.screenWidth - 35) / 3,
        height: 22,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    replatItem: {
        position: 'relative',

        justifyContent: 'center',
        alignItems: 'center',
        height: 22,
        width: (Theme.screenWidth - 105) / 3,
        backgroundColor: '#f5f5f5',
        borderRadius: 4,
    },
    replatItemText: {
        fontSize: 11,
        color: '#bbb',
    },
    fundtype: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    fundtypeText: {
        position: 'absolute',
        top: 1,
        left: 5,
        fontSize: 11,
        color: '#fff',
    },
    null: {
        paddingTop: 15,
        paddingLeft: (Theme.screenWidth - 210) / 2,
        backgroundColor: '#fff',
    },
    nullText: {
        fontSize: 14,
        color: '#bbb',
    }



})