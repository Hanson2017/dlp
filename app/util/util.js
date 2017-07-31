import React, { Component } from 'react';
import { Linking } from 'react-native';

import Api from './api';

module.exports = {
    Linked(url) {
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    },
    setDate(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        return year + '-' + month + '-' + day
    },
    formatDate(date) {
        let d = this.setDate(new Date(parseInt(date.replace("/Date(", "").replace(")/", ""))));
        return d;
    },
    // 去掉所有的html标记
    delHtmlTag(str) {
        var strH = str.replace(/<[^>]+>/g, "");
        var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
        strH = strH.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
        return strH;
    },
    getDataList(that, ApiType, type, id) {

        let pageCount = that.state.pageCount;

        if (type == 1) {
            that.page = 1;
            that.setState({
                loading: true
            })
        }
        else if (type == 2) {

            if (pageCount > that.page) {
                that.page++;
                that.setState({
                    isLoadMoreIng: true
                })
            }
            else {
                that.setState({
                    isLoadMore: false,
                })
            }

        }
        else if (type == 3) {
            that.page = 1;
            that.setState({
                isLoadMore: true,
            })
        }
        let url;
        if (id) {

            if (ApiType.type != 'comment') {
                url = Api[ApiType.column] + '?type=' + ApiType.type + '&id_dlp=' + id + '&page=' + that.page + '&pagesize=' + 50;
            }
            else {
                url = Api[ApiType.column] + id + '&page=' + that.page + '&pagesize=' + 10;
            }
        }
        else {
            url = Api[ApiType.column] + '?type=' + ApiType.type + '&page=' + that.page + '&pagesize=' + 50;
        }

        fetch(url)
            .then((response) => {

                if (response.ok) {
                    response.json()
                        .then((responseData) => {

                            if (type == 3) {
                                that.setState({
                                    dataSource: []
                                })
                            }
                            let dataSource = that.state.dataSource;
                            dataSource = dataSource.concat(responseData[ApiType.dataName]);
                            that.setState({
                                loading: false,
                                isLoadMoreIng: false,
                                isRefreshing: false,
                                dataSource: dataSource,
                                pageCount: responseData.pageCount,
                                totalNum: responseData.totalNum,
                                pageSize: responseData.pageSize,
                                updatetime: responseData.updatetime
                            })
                            if (that.props.changeTotalNum) {
                                that.props.changeTotalNum(that.state.totalNum)
                            }

                            if (that.props.changeUpDateTime) {
                                that.props.changeUpDateTime(that.state.updatetime)
                            }
                            if (that.state.pageCount == that.page) {
                                that.setState({
                                    isLoadMore: false
                                })
                            }
                        })
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => {
                console.log('error:', error)
            })
    },
    getDataListTab(that, ApiType) {
        let url = Api[ApiType.column] + '?type=' + ApiType.type;
        let tabNameFj = '';
        switch (that.props.tabIndex) {
            case 2:
                tabNameFj = '省';
                break;
            case 3:
                tabNameFj = '年';
                break;
            default:
                break;
        }

        fetch(url)
            .then((response) => {

                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            let dataSource = responseData[ApiType.dataName];
                            console.log(responseData)
                            that.setState({
                                loading: false,
                                dataSource: dataSource,
                                dataSourceTab: dataSource[0],
                                totalNum: responseData.totalNum,
                                updatetime: responseData.updatetime,
                                tablNum: responseData.dataList[0].count,
                                tabName: responseData.dataList[0].name
                            })
                            that.props.changeTotalNum(responseData.dataList[0].name+tabNameFj, responseData.dataList[0].count, that.props.tabIndex)

                        })
                }
                else {
                    console.log('网络请求失败')
                }
            })
            .catch((error) => {
                console.log('error:', error)
            })
    },
    getDataDetail(that, type, id) {
        let url = Api['detail'] + '?type=' + type + '&id_dlp=' + id
        console.log(url)
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            that.setState({
                                loading: false,
                                dataSource: responseData,
                            })
                            console.log('responseData', responseData)
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