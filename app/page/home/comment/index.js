import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Util from '../../../util/util';
import Theme from '../../../util/theme';
import Title from '../../../component/title';
import Item from '../../comment/item';


export default class Pingce extends React.Component {
    render() {
        const { data, navigation } = this.props;
        return (
            <View style={[styles.container, Theme.box, Theme.mt10]}>
                <Title data={'点评监控'} navigation={navigation} screenUrlInfo={{screenUrl:'CommentPlat',tabId:null}}  />
                <View style={styles.commentContainer}>
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
    commentContainer: {
        paddingLeft: 17,
    },

})