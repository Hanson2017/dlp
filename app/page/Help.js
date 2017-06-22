import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar, FlatList, TouchableOpacity } from 'react-native';

import Header from '../component/Header'
import Loading from '../component/Loading'
import Theme from '../util/theme';
import Api from '../util/api';

export default class Help extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            dataSource: []
        };
    }
    render() {
        let navigation = this.props.navigation;
        return (
            <View style={Theme.container}>
                <Header headerOpt={{ back: '常见问题', title: '常见问题', search: 'null' }} navigation={navigation} />
                <View style={Theme.content}>
                    {
                        this.state.loading ?
                            <Loading />
                            :
                            <FlatList
                                style={styles.help}
                                data={this.state.dataSource}
                                renderItem={this.renderItem.bind(this)}
                            />
                    }

                </View>
            </View>
        )
    }
    renderItem({ item, index }) {
        let navigation = this.props.navigation; 
        return (
            <TouchableOpacity style={styles.helpList}
                onPress={() => { navigation.navigate('HelpDetail', { id: item.id}) }}
            >
                <Text style={styles.helpListText}>{item.title}</Text>
            </TouchableOpacity>
        )
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        let that = this;
        let url = Api.helpList
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            that.setState({
                                loading: false,
                                dataSource: responseData.data,
                            })
                        })
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => {
                console.log('error:', error)
            })

    }
}

const styles = StyleSheet.create({
    help:{
        paddingLeft:15,
          paddingRight:15
    },
    helpList: {
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    helpListText: {
        color: '#666',
    }
})
