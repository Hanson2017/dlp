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
        return year + '/' + month + '/' + day
    },
    setDate2(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        return year + '-' + month + '-' + day
    },
    formatDate(date) {
        let d = this.setDate(new Date(parseInt(date.replace("/Date(", "").replace(")/", ""))));
        return d;
    },
    formatDate2(date) {
        let d = this.setDate2(new Date(parseInt(date.replace("/Date(", "").replace(")/", ""))));
        return d;
    },
    cutText(str, word) {
        if (str.length > word) return str.substr(0, word) + "...";
        return str;
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
                dataSource: [],
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
            url = Api[ApiType.column] + '?type=' + ApiType.type + '&id_dlp=' + id + '&page=' + that.page + '&pagesize=' + 50;
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
                           
                            dataSource = responseData[ApiType.dataName] ? dataSource.concat(responseData[ApiType.dataName]) : dataSource;
                            console.log(responseData)
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
    getDataListTab(that, ApiType,tabN) {
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
                           
                            that.setState({
                                loading: false,
                                dataSource: dataSource,
                                dataSourceTab: dataSource[tabN],
                                totalNum: responseData.totalNum,
                                updatetime: responseData.updatetime,
                                tablNum: responseData.dataList[tabN].count,
                                tabName: responseData.dataList[tabN].name,
                                isRefreshing: false,
                            })
                            that.props.changeTotalNum(responseData.totalNum)

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
        let url = Api['detail'] + '?type=' + type + '&id_dlp=' + id;
        console.log(url)
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    response.json()
                        .then((responseData) => {
                            console.log(responseData)
                            that.setState({
                                loading: false,
                                dataSource: responseData,
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