import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-navigation";
import { Carousel } from 'antd-mobile';
import Theme from '../../../util/theme';
const { width, height } = Dimensions.get('window');

export default class ShowPic extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 176,
            index: 0
        }
    }
    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
                <View style={styles.container}>
                    <View style={[styles.mask,]} >
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => { navigation.goBack() }}></TouchableOpacity>
                    </View>
                    <View style={styles.page}>
                        <Text style={styles.pageText}>{this.state.index + 1}/3</Text>
                    </View>
                    <Carousel
                        // dots={false}
                        autoplay={false}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => { this.setState({ index: index }) }}
                    >
                        {this.state.data.map(val => (
                            <Image source={{ uri: `https://zos.alipayobjects.com/rmsportal/${val}.png` }} style={styles.pic} />
                        ))}
                    </Carousel>
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
        height: 200,
    }
})