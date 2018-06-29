import React, { Component } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Theme from '../../util/theme';
import Api from '../../util/api';
import Header from '../../component/navBar'
import Loading from '../../component/loading'

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
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <Header headerOpt={{ back: '常见问题', title: '常见问题', search: 'null' }} navigation={navigation} />
                    <View style={styles.content}>
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
            </SafeAreaView>
        )
    }
    renderItem({ item, index }) {
        let navigation = this.props.navigation;
        return (
            <TouchableOpacity style={styles.helpList}
                onPress={() => { navigation.navigate('HelpDetail', { id: item.id }) }}
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
    content: {
        paddingTop: 10,
        flex: 1,
        backgroundColor: '#fff',
    },
    help: {
        paddingLeft: 18,
    },
    helpList: {
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    helpListText: {
        color: '#3B3B3B',
        fontSize: 14,
    }
})
