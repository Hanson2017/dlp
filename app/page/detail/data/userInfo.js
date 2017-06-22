import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';

import Title from '../../../component/Title';


export default class Basic extends React.Component {
    render() {
        let data = this.props.data;
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
            <ScrollView>
                {
                    data != null ?
                        <View>
                            <Title titleText={'投资人地域分布'} />
                            <View style={styles.areaDetail}>
                                {
                                    areaData != null ?
                                        areaData.list.map((list, i) => {
                                            return (
                                                <View style={styles.areaDetailList}>
                                                    <View style={[styles.number, styles['number' + i]]}><Text style={styles.numberText}>{i + 1}</Text></View>
                                                    <Text style={styles.platName}>{list.province}</Text>
                                                    <View style={[styles.progress, { width: 240 * list.perctent }]}></View>
                                                </View>
                                            )
                                        })
                                        :
                                        <Text style={styles.null}>暂无数据</Text>
                                }
                            </View>
                            <Title titleText={'投资人年龄占比'} />
                            <View style={styles.ageDetail}>
                                {
                                    data.age != '' ?
                                        age.map((list, i) => {
                                            return (
                                                <View style={styles.ageDetailList}>
                                                    <Text style={styles.ageNum}>{ageText[i]}</Text>
                                                    <Text style={styles.ageBili}>{list}%</Text>
                                                    <View style={[styles.progress, styles.progressAge, { width: 180 * (list / maxValue) }]}></View>
                                                </View>
                                            )
                                        })

                                        :
                                        <Text style={styles.null}>暂无数据</Text>
                                }
                            </View>

                            <Title titleText={'投资人性别占比'} />
                            <View style={styles.sexDetail}>
                                {
                                    data.male != 0 ?
                                        <View style={styles.sexBox}>
                                            <View style={[styles.sex, styles.sexMale]}>
                                                <Text style={[styles.sexText, styles.sexMaleText]}>男{data.male}%</Text>
                                                <View style={[styles.sexProgress, styles.sexProgressMale,
                                                data.male > data.female ?
                                                    null
                                                    :
                                                    { height: 160 * (data.female / data.male) }
                                                ]}></View>
                                            </View>
                                            <View style={[styles.sex, styles.sexFemale]}>
                                                <Text style={[styles.sexText, styles.sexFemaleText]}>女{data.female}%</Text>
                                                <View style={[styles.sexProgress, styles.sexProgressFemale,
                                                data.male < data.female ?
                                                    null
                                                    :
                                                    { height: 160 * (data.female / data.male) }
                                                ]}></View>
                                            </View>
                                        </View>
                                        :
                                        <Text style={styles.null}>暂无数据</Text>
                                }
                            </View>
                        </View>
                        :
                        <Text style={[styles.null,{paddingLeft:10,}]}>暂无用户数据</Text>
                }
                
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    areaDetail: {
        padding: 10,
    },
    areaDetailList: {
        marginBottom: 6,
        marginTop: 6,
        flexDirection: 'row',
        height: 22,
        alignItems: 'center',
    },
    number: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 26,
        height: 22,
        backgroundColor: '#a9b7c5',
    },
    number0: {
        backgroundColor: '#000',
    },
    number1: {
        backgroundColor: '#000',
    },
    number2: {
        backgroundColor: '#000',
    },
    numberText: {
        color: '#fff'
    },
    platName: {
        marginLeft: 20,
        marginRight: 20,
        lineHeight: 22,
        color: '#ABB7C4',
    },
    progress: {
        width: 240,
        height: 20,
        backgroundColor: '#ccc',
    },
    null: {
        paddingTop: 10,
        paddingBottom: 10,
        color: '#ccc',
    },
    ageDetail: {
        padding: 10,
    },
    ageDetailList: {
        paddingRight: 30,
        marginBottom: 6,
        marginTop: 6,
        flexDirection: 'row',
        height: 22,
        alignItems: 'center',
    },
    ageNum: {
        width: 90,
        color: '#ABB7C4',
    },
    ageBili: {
        width: 65,
        color: '#ABB7C4',
    },
    progressAge: {
        width: 180,
    },
    sexDetail: {
        padding: 10,
    },
    sexBox: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    sex: {
        height: 200,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    sexMale: {
        marginRight: 30,
    },
    sexProgress: {
        marginTop: 8,
        width: 50,
        height: 160,
        backgroundColor: '#ccc',
    },
    sexProgressMale: {
        backgroundColor: '#00757d',
    },
    sexProgressFemale: {
        backgroundColor: '#ff7557',
    },
    sexMaleText: {
        color: '#00757d',
    },
    sexFemaleText: {
        color: '#ff7557',
    }
})