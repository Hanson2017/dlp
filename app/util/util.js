import React, { Component } from 'react';
import { Linking } from 'react-native';

import Api from './api';

module.exports = {
    goBBs(navigation, seturl,type) {
        var url = '';
        if (signState) {
            var memberid = '';
            var Userid = '';
            var password = '';
            memberid = signState.r_id ? signState.r_id : 0;
            Userid = signState.r_Userid ? signState.r_Userid : '';
            password = signState.r_password ? signState.r_password : '';

            url = Api.synLogin + 'memberid=' + memberid + '&Userid=' + Userid + '&password=' + password + '&reurl=' + encodeURIComponent(seturl)

        }
        else {
            url = seturl;
        }
        navigation.navigate('BBsDetail', { url: url, shareUrl: seturl,type:type })
    },
    Linked(url) {
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    },
    setDate(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return year + '/' + month + '/' + day
    },
    setDate2(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day
    },
    setDate3(date) {
        var month = date.getMonth() + 1
        var day = date.getDate()
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return month + '-' + day
    },
    formatDate(date) {
        let d = this.setDate(new Date(parseInt(date.replace("/Date(", "").replace(")/", ""))));
        return d;
    },
    formatDate2(date) {
        let d = this.setDate2(new Date(parseInt(date.replace("/Date(", "").replace(")/", ""))));
        return d;
    },
    formatDate3(date) {
        let d = this.setDate3(new Date(parseInt(date.replace("/Date(", "").replace(")/", ""))));
        return d;
    },
    getDateTimeStamp(dateStr) {
        return Date.parse(dateStr.replace(/-/gi, "/"));
    },
    getDateDiff(dateStr) {
        var publishTime = this.getDateTimeStamp(dateStr) / 1000,
            d_seconds,
            d_minutes,
            d_hours,
            d_days,
            timeNow = parseInt(new Date().getTime() / 1000),
            d,

            date = new Date(publishTime * 1000),
            Y = date.getFullYear(),
            M = date.getMonth() + 1,
            D = date.getDate(),
            H = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();
        //小于10的在前面补0
        if (M < 10) {
            M = '0' + M;
        }
        if (D < 10) {
            D = '0' + D;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (m < 10) {
            m = '0' + m;
        }
        if (s < 10) {
            s = '0' + s;
        }

        d = timeNow - publishTime;
        d_days = parseInt(d / 86400);
        d_hours = parseInt(d / 3600);
        d_minutes = parseInt(d / 60);
        d_seconds = parseInt(d);

        if (d_days > 0 && d_days < 3) {
            return d_days + '天前';
        } else if (d_days <= 0 && d_hours > 0) {
            return d_hours + '小时前';
        } else if (d_hours <= 0 && d_minutes > 0) {
            return d_minutes + '分钟前';
        } else if (d_seconds < 60) {
            if (d_seconds <= 0) {
                return '刚刚发表';
            } else {
                return d_seconds + '秒前';
            }
        } else if (d_days >= 3 && d_days < 30) {
            return M + '-' + D + '&nbsp;' + H + ':' + m;
        } else if (d_days >= 30) {
            return Y + '-' + M + '-' + D + '&nbsp;' + H + ':' + m;
        }
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
    getDataListTab(that, ApiType, tabN) {
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