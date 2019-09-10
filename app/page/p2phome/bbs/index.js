import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Api from '../../../util/api';
import Util from '../../../util/util';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import Item from '../../bbs/item/index';


export default class HomeBBs extends React.Component {
    render() {
        const { data, bbsDataNum1, bbsDataNum2, navigation } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'论坛动态'} navigation={navigation} />
                <View style={styles.bbsContainer}>
                    <View style={styles.bbsHead}>
                        
                        <TouchableOpacity style={styles.bbsHeadLink}
                            onPress={() => {
                                Util.goBBs(navigation,Api.bbsBgtUrl,'bgt');
                            }}
                        >
                            <View style={styles.bbsHeadLinkLeft}>
                                <Image source={{ uri: Api.bbsBgtIconUrl }} style={styles.iconImg} />
                            </View>
                            <View style={styles.bbsHeadLinkRight}>
                                <Text style={styles.bbsHeadTitText}>曝光台</Text>
                                {/* <Text style={styles.bbsHeadNumText}>今日: {bbsDataNum2}</Text> */}
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        data.map((item, i) => {
                            return (
                                <Item key={i} data={item} navigation={navigation} borderNot={data.length - 1 == i ? true : false} />
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
    },
    bbsContainer: {
        paddingTop: 20,
        paddingLeft: 17,
    },
    bbsHead: {
        paddingBottom: 20,
        flexDirection: 'row',
    },
    bbsHeadLink: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bbsHeadLinkHej: {
        marginRight: 20,
        borderRightWidth: 1,
        borderRightColor: '#eee',
    },
    bbsHeadLinkLeft: {
        marginRight: 10,
    },
    iconImg: {
        width: 40,
        height: 40,
    },
    bbsHeadTitText: {
        fontSize: 16,
        color: '#515151',
        fontWeight: 'bold',
    },
    bbsHeadNumText: {
        fontSize: 11,
        color: '#0096E6',
    },

})