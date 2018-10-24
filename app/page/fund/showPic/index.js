import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from "react-navigation";
import { Carousel } from 'antd-mobile';
import Api from '../../../util/api';
import Theme from '../../../util/theme';
const { width, height } = Dimensions.get('window');

export default class ShowPic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            imgHeight: 176,
            index: 0
        }
    }
    componentWillMount() {
        const { navigation } = this.props;
        const { params } = navigation.state;
        let tab = 0
        if (params != undefined) {
            tab = params.index
        }
        this.setState({
            data: params.data,
            index: tab,
        })
    }
    componentDidMount() {

    }
    render() {
        const { navigation } = this.props;
        const { index, data } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
                <StatusBar
                    backgroundColor={'#000'}
                    barStyle="light-content"
                />
                <View style={styles.container}>
                    <View style={[styles.mask,]} >
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => { navigation.goBack() }}></TouchableOpacity>
                    </View>
                    <View style={styles.page}>
                        <Text style={styles.pageText}>{this.state.index + 1}/{data.length}</Text>
                    </View>
                    {
                        data.length == 1 ?
                            <Image source={{ uri: Api.domain + data[0].file_url }} style={styles.pic} resizeMode={'contain'} />
                            :
                            <Carousel
                                selectedIndex={index}
                                // dots={false}
                                autoplay={false}
                                infinite
                                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                                afterChange={index => { this.setState({ index: index }) }}
                            >
                                {data.map((val, i) => (
                                    <Image source={{ uri: Api.domain + val.file_url }} style={styles.pic} key={i} resizeMode={'contain'} />
                                ))}
                            </Carousel>
                    }

                </View>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#007DDC',
        justifyContent: 'center',
    },
    mask: {
        justifyContent: "center",
        position: "absolute",
        width: width,
        height: height,
        left: 0,
        top: 0,
        backgroundColor: '#000'
    },
    page: {
        width: width,
        alignItems: 'center',
        position: 'absolute',
        top: 20,
        backgroundColor: '#000',
    },
    pageText: {
        color: '#fff',
        fontSize: 14,
    },
    pic: {
        width: Theme.screenWidth,
        height: 300,
    }
})