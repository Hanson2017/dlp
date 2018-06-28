import React, { Component } from 'react';
import { StackNavigator } from "react-navigation";


import DrawerScreen from '../page/MainNavigator';

import Home from '../page/home';
import PingjiJG from '../page/pingji/jigou';
import PingjiMT from '../page/pingji/meiti';
import Health from '../page/health';
import Flow from '../page/flow';
import Data from '../page/data';
import ReportsList from '../page/report';
import ReportsDetail from '../page/report/detail';
import Query from '../page/query';
import QueryNav from '../page/query/entry';
import PingCe from '../page/pingCe';
import PingCeDetail from '../page/pingCe/detail';
import PingCeCommentList from '../page/pingCe/comments'
import Yulun from '../page/yulun';
import YulunDetail from '../page/yulun/detail';
import CommentPlat from '../page/comment';
import FlmfList from '../page/activity';
import Fund from '../page/fund';
import Zhengyi from '../page/zhengyi';
import Black from '../page/black';
import Account from '../page/account';
import Help from '../page/help';
import HelpDetail from '../page/help/detail';
import About from '../page/about';
import FriendsShare from '../page/friendsShare';
import Search from '../page/search';
import Detail from '../page/detail';
import DetailFund from '../page/detail/fund';
import CommentForm from '../page/detail/yuqing/comments/form';
import PingCeCommentForm from '../page/pingCe/comments/footForm/index'

import Login from '../page/account/login';

const AppDlp = StackNavigator({
    Main: {
        screen: DrawerScreen,
        navigationOptions: {
            headerMode: 'none',
        }
    },
    Home: {
        screen: Home
    },
    PingjiJG: {
        screen: PingjiJG
    },
    PingjiMT: {
        screen: PingjiMT
    },
    Health: {
        screen: Health
    },
    Flow: {
        screen: Flow
    },
    Data: {
        screen: Data
    },
    ReportsList: {
        screen: ReportsList
    },
    ReportsDetail: {
        screen: ReportsDetail
    },
    Query: {
        screen: Query
    },
    QueryNav: {
        screen: QueryNav
    },
    PingCe: {
        screen: PingCe
    },
    PingCeDetail: {
        screen: PingCeDetail
    },
    PingCeCommentList: {
        screen: PingCeCommentList
    },
    Yulun: {
        screen: Yulun
    },
    YulunDetail: {
        screen: YulunDetail
    },
    CommentPlat: {
        screen: CommentPlat
    },
    FlmfList: {
        screen: FlmfList
    },
    Fund: {
        screen: Fund
    },
    Zhengyi: {
        screen: Zhengyi
    },
    Black: {
        screen: Black
    },
    Account: {
        screen: Account
    },
    Help: {
        screen: Help
    },
    HelpDetail: {
        screen: HelpDetail
    },
    About:{
        screen: About
    },
    FriendsShare: {
        screen: FriendsShare
    },
    Search: {
        screen: Search
    },
    Detail: {
        screen: Detail
    },
    DetailFund: {
        screen: DetailFund
    },
    CommentForm: {
        screen: CommentForm
    },
    PingCeCommentForm: {
        screen: PingCeCommentForm
    },
    
    Login: {
        screen: Login
    },
   
}, {
        headerMode: 'none'
    })


module.exports = AppDlp;
