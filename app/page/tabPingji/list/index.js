import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Left from './left';


export default class TabPingjiList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFixed: false,
        };
    }
    render() {
        const { data, navigation } = this.props;
        return (
            <View style={styles.container}>
                <View style={[styles.leftContainer, this.state.isFixed ? styles.fixed : null]}>
                    <Left data={data} navigation={navigation} />
                </View>
                <View style={[styles.rightContainer]}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} onScroll={this._onScroll.bind(this)}>
                        {this.props.children}
                    </ScrollView>
                </View>
            </View>
        )
    }
    _onScroll(e) {
        var offsetX = e.nativeEvent.contentOffset.x;
        if (offsetX > 0) {
            this.setState({
                isFixed: true
            })
        }
        else {
            this.setState({
                isFixed: false
            })
        }
    }

}

const styles = StyleSheet.create({
    container: {
        paddingTop:10,
        flexDirection: 'row',
        position: 'relative',
    },
    leftContainer: {
        position: 'absolute',
        left: 0,
        top: 10,
        zIndex: 99,
        backgroundColor:'#fff',
    },
    rightContainer: {
        flex: 1,
    },
    fixed: {
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.9,
        shadowRadius: 2,
    }
})