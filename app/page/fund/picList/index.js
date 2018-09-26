import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image,ScrollView } from 'react-native';
import { SafeAreaView } from "react-navigation";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Theme from '../../../util/theme';
import Header from '../../../component/navBar'

export default class picList extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '全部相关截图', title: '全部相关截图' }} navigation={navigation} />
                    <View style={Theme.content}>
                        <View style={styles.top}>
                            <FontAwesome name={'calendar'} size={14} color={'#999'} />
                            <Text style={styles.date}>2018.10.25</Text>
                            <Text style={styles.title}>桔子理财实盘相关截图</Text>
                        </View>
                        <ScrollView>
                            <View style={styles.piclist}>
                                <TouchableOpacity style={styles.fundLiucListPicLi} activeOpacity={0.4}
                                    onPress={() => {
                                        navigation.navigate('ShowPic', { index: 0 })
                                    }}
                                >
                                    <Image source={{ uri: 'http://www.76676.com/uploadfile/2018/0919/20180919105921181.jpg' }} style={styles.pic} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.fundLiucListPicLi} activeOpacity={0.4}
                                    onPress={() => {
                                        navigation.navigate('ShowPic', { index: 1 })
                                    }}
                                >
                                    <Image source={{ uri: 'http://www.76676.com/uploadfile/2018/0919/20180919093721871.jpg' }} style={styles.pic} />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>

                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    top: {
        paddingTop: 20,
        paddingBottom: 8,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    date: {
        paddingLeft: 3,
        color: '#A1A1A1',
        fontSize: 12,
    },
    title: {
        paddingLeft: 10,
        color: '#666',
        fontSize: 12,
        fontWeight: 'bold',
    },
    pic: {
        marginTop: 10,
        width: Theme.screenWidth,
        height: Theme.screenWidth,
    },
})