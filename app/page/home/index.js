import React, { Component } from 'react';
import { Text, StyleSheet, View, StatusBar, ScrollView, RefreshControl, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from "react-navigation";
import Api from '../../util/api';
import Theme from '../../util/theme';
import Util from '../../util/util';
import Header from '../../component/navBar';
import Loading from '../../component/loading';
import Nav from './nav';
import P2P from './p2p';
import Licai from './licai';
import Trust from './trust';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: null,
            ref: false,
            loading: true,
            isRefreshing: false,
        };
    }
    render() {
        const { navigation, loginState } = this.props;
        const { loading, dataSource, } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Theme.color2 }}>
                <View style={Theme.container}>
                    <StatusBar
                        backgroundColor={Theme.color2}
                        barStyle="light-content"
                    />
                    <Header headerOpt={{ back: 'home' }} navigation={navigation} openControlPanel={this.props.openControlPanel} loginState={loginState} />
                    <View style={Theme.content}>
                        {
                            loading ?
                                <Loading />
                                :
                                <ScrollView
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.isRefreshing}
                                            onRefresh={this.onRefresh.bind(this)}
                                        />
                                    }
                                >
                                    <Nav navigation={navigation} />
                                    <P2P navigation={navigation} data={{ inamount: dataSource.inamount, markent: dataSource.markent, homenum:dataSource.homenum,news:dataSource.mplisttop }} />
                                    <Licai navigation={navigation} data={{base:dataSource.lc_info_index,list:dataSource.lc_info_list}} />
                                    <Trust navigation={navigation} data={{nums:dataSource.trust_info_index,list:dataSource.trust_info_list,news:dataSource.trust_mp_list}}  />
                                </ScrollView>
                        }
                    </View>
                </View>
            </SafeAreaView>

        );
    }
    componentDidMount() {
        this.getData();

    }
    openControlPanel() {
        this.props.openControlPanel();
    }
    onRefresh() {
        this.setState({
            isRefreshing: true,
        })
        this.getData();
    }
    getData() {
        let that = this;
        let url = Api.home_all;

        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            console.log(responseData)
                            that.setState({
                                dataSource: responseData,
                                loading: false,
                                isRefreshing: false,
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

})



