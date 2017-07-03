import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar, TextInput, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import Header from '../component/Header'
import Theme from '../util/theme';
import Api from '../util/api';
import Icon from 'react-native-vector-icons/Icomoon';

export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: '',
            searchText: ''
        };
    }
    render() {
        const navigation = this.props.navigation;
        return (
            <View style={Theme.container}>
                <StatusBar
                    backgroundColor="#000"
                    barStyle="light-content"
                />
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                        <Icon name={'back'} size={18} color={'#fff'} />
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <View style={styles.searchInputWp}>
                            <Icon name={'search'} size={13} color={'#536171'} style={{ position: 'relative', top: -2 }} />
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={styles.searchInput}
                                placeholder={'输入你关心平台的名称，如“人人贷”'}
                                placeholderTextColor={'#536171'}
                                clearButtonMode={'while-editing'}
                                enablesReturnKeyAutomatically={true}
                                autoFocus={true}
                                defaultValue={this.state.searchText}
                                onChangeText={(text) => {
                                    this.setState({
                                        searchText: text
                                    })
                                    this.getData(text)
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={Theme.content}>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={this.renderItem.bind(this)}
                        />
                    </View>
                </View>
            </View>
        )
    }
    renderItem({ item, index }) {
        const navigation = this.props.navigation;
        return (
            <TouchableOpacity
                style={styles.listV} activeOpacity={0.4}
                onPress={() => { navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name }) }}
                key={index}
            >
                <Text style={{ color: '#2a343e' }}>{item.plat_name}</Text>
            </TouchableOpacity>

        )
    }
    componentDidMount() {
        const { params } = this.props.navigation.state;
        if (params != null) {
            this.setState({
                searchText: params.keywords
            })
            this.getData(params.keywords)
        }
    }
    getData(keywords) {
        let that = this;
        let url = Api.search + '?keywords=' + keywords;
        if (keywords != '') {
            fetch(url)
                .then((response) => {

                    if (response.ok) {
                        response.json()
                            .then((responseData) => {
                                that.setState({
                                    dataSource: responseData
                                })
                                console.log(that.state.dataSource)
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
        else {
            that.setState({
                dataSource: []
            })
        }

    }
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 23,
        height: 50,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backBtn: {
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',

    },
    searchInputWp: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        paddingTop: 4,
        paddingLeft: 10,
        paddingRight: 10,
        height: 32,
        borderRadius: 5,
        backgroundColor: '#1e252d',
    },
    searchInput: {
        marginLeft: 8,
        padding: 0,
        flex: 1,
        height: 24,
        borderWidth: 0,
        fontSize: 13,
        color: '#536171',
    },
    listV: {
        paddingLeft: 25,
        height: 44,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e6eb'
    },
})
