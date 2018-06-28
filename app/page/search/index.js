import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar, TextInput, TouchableOpacity, FlatList, ScrollView, Image, Platform, DeviceEventEmitter } from 'react-native';
import Icon from 'react-native-vector-icons/Icomoon';
import Theme from '../../util/theme';
import Api from '../../util/api';
import StorageLoginInfo from '../../config/storageLogin'


export default class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: '',
            searchText: '',
            searchHotList: [],
            searchDemoList: [],
            loading: true,
            ref: false,
        };
    }
    render() {
        const navigation = this.props.navigation;
        const { searchHotList, dataSource } = this.state;
        var searchDemoList = ''
        if (!this.state.loading) {
            for (var index = 0; index < this.state.searchDemoList.length; index++) {
                searchDemoList += '"' + this.state.searchDemoList[index].plat_name + '"'
            }
        }
        var historys = historyKeyWords.reverse();
        if (historys.length > 10) {
            historys = historys.slice(0, 10)
        }
        return (
            <View style={Theme.container}>
                <StatusBar
                    backgroundColor="#000"
                    barStyle="light-content"
                />
                <View style={[styles.headerContainer, Platform.OS == 'android' ? { marginTop: 0 } : null]}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => { navigation.goBack() }}>
                        <Icon name={'triangle-left'} size={18} color={'#fff'} />
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <View style={styles.searchInputWp}>
                            <Icon name={'ico-search'} size={13} color={'#bbb'} style={{ position: 'relative', top: -2 }} />
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={styles.searchInput}
                                placeholder={'输入你关心平台的名称，如' + searchDemoList}
                                placeholderTextColor={'#bbb'}
                                clearButtonMode={'while-editing'}
                                enablesReturnKeyAutomatically={true}

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
                <View style={styles.content}>
                    <ScrollView>
                        {
                            dataSource == '' && dataSource.length <= 0 ?
                                <View style={styles.hotplat}>
                                    <Text style={styles.hotTitle}>热门搜索：</Text>
                                    <View style={styles.hotList}>
                                        {
                                            searchHotList.map((item, i) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={styles.listHot} activeOpacity={0.4}
                                                        onPress={() => { navigation.navigate('Detail', { id: item.id, platName: item.plat_name }) }}
                                                        key={i}
                                                    >
                                                        <Text style={styles.listHotText}>{item.plat_name}</Text>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                                :
                                null
                        }
                        {
                            historys.length > 0 && dataSource.length <= 0 ?
                                <View style={styles.historyContainer}>
                                    <View style={styles.historyTitle}><Text style={styles.historyTitleText}>搜索历史：</Text></View>
                                    <View style={styles.historyListContainer}>
                                        {
                                            historys.map((item, i) => {
                                                return (
                                                    <View key={i} style={styles.historyList}

                                                    >
                                                        <TouchableOpacity
                                                            style={styles.historyListLeft}
                                                            onPress={() => {
                                                                navigation.navigate('Detail', { id: item.id, platName: item.platname });
                                                            }}
                                                        >
                                                            <Icon name={'ico-dateTime'} size={16} color={'#bbb'} />
                                                            <Text style={styles.historyListText}>{item.platname}</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => {
                                                            this.clearHistory(i)
                                                        }}>
                                                            <Icon name={'ico-closeX'} size={12} color={'#bbb'} />
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                                :
                                null
                        }


                        <FlatList
                            data={this.state.dataSource}
                            renderItem={this.renderItem.bind(this)}
                        />
                    </ScrollView>

                </View>
            </View>
        )
    }
    renderItem({ item, index }) {
        const navigation = this.props.navigation;
        return (
            <TouchableOpacity
                style={styles.listV} activeOpacity={0.4}
                onPress={() => {
                    this.storageHistory(item.id_dlp, item.plat_name);
                    navigation.navigate('Detail', { id: item.id_dlp, platName: item.plat_name });
                }}
                key={index}
            >
                <Text style={{ color: '#2a343e' }}>{item.plat_name}</Text>
            </TouchableOpacity>

        )
    }
    componentDidMount() {
        let that = this;
        this.getHotSearch();
        const { params } = this.props.navigation.state;
        if (params != null) {
            this.setState({
                searchText: params.keywords
            })
            this.getData(params.keywords)
        }
        this.subscriptionSearch = DeviceEventEmitter.addListener('storageSaveKeyWord', (data) => {
            StorageLoginInfo.storageLoadKeyWord(that)
        })
    }
    componentWillUnmount() {
        this.subscriptionSearch.remove();
    };
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
    getHotSearch() {
        let that = this;
        let url = Api.getSearchTop;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()

                        .then((responseData) => {
                            console.log(responseData)
                            that.setState({
                                searchHotList: responseData.hotplat,
                                searchDemoList: responseData.replat,
                                loading: false
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
    storageHistory(id, platname) {
        let keywords = [];
        let historyky = [];
        for (var i = 0; i < historyKeyWords.length; i++) {
            historyky.push(historyKeyWords[i].platname)
        }
        var index = historyky.indexOf(platname);

        if (index != -1) {
            historyKeyWords.splice(index, 1)
        }
        keywords = historyKeyWords.concat({ id: id, platname: platname });
        StorageLoginInfo.storageSaveKeyWord(keywords);
        DeviceEventEmitter.emit('storageSaveKeyWord', '存储历史记录')
    }
    clearHistory(index) {
        let historyky = [];
        historyky = historyKeyWords.splice(index, 1)
        StorageLoginInfo.storageSaveKeyWord(historyky);
        this.setState({
            ref: !this.state.ref
        })
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        marginTop: 23,
        height: 50,
        backgroundColor: Theme.color2,
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
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        height: 28,
        borderRadius: 20,
        backgroundColor: '#fff',
    },
    searchInput: {
        marginLeft: 8,
        padding: 0,
        flex: 1,
        height: 24,
        borderWidth: 0,
        fontSize: 12,
        color: '#bbb',
    },
    listV: {
        paddingLeft: 25,
        height: 44,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    hotplat: {
        paddingTop: 20,
        paddingLeft: 20,
    },
    hotTitle: {
        paddingLeft: 5,
        color: '#bbb',
        fontSize: 11,
    },
    hotList: {
        paddingTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    listHot: {
        marginRight: 25,
        marginBottom: 10,
        width: 90,
        height: 22,
        backgroundColor: '#E6F4FF',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listHotText: {
        color: '#6E7A86',
        fontSize: 12,
    },
    historyContainer: {
        marginTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom:30,
    },
    historyTitle: {
        marginBottom: 15,
    },
    historyTitleText: {
        color: '#bbb',
        fontSize: 11,
    },
    historyList: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 42,
    },
    historyListLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    historyListText: {
        color: '#707070',
        fontSize: 12,
        paddingLeft: 6,
    },
})
