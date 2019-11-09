/**
 * Hanson 
 */

import React, { Component } from 'react';
import { AppRegistry, View, Image, TouchableOpacity,Text } from 'react-native';
import codePush from 'react-native-code-push'
import App from './app/router';
import Theme from './app/util/theme';
import Util from './app/util/util';
var BackboneEvents = require("backbone-events-standalone");
window.EventEmitter = BackboneEvents.mixin({});

export default class Dailuopan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showGG: true
        }
    }
    render() {
        if (this.state.showGG) {
            return (
                <TouchableOpacity activeOpacity={1} onPress={() => { Util.Linked('https://a.app.qq.com/o/simple.jsp?pkgname=com.hmf') }} style={{ backgroundColor: "#fff", width: Theme.screenWidth, height: Theme.screenHeight, overflow: 'hidden',position:'relative' }}>
                    <TouchableOpacity onPress={()=>{ this.setState({showGG: false});this.timer && clearTimeout(this.timer)}} style={{zIndex:99, position:'absolute',top:20,right:20, width:60,height:24,backgroundColor:'#ccc',justifyContent:'center',alignItems:'center',borderRadius:12,opacity:0.6}}>
                        <Text style={{color:'#fff',fontSize:12}}>跳过</Text>
                    </TouchableOpacity>
                    <Image style={{ width: Theme.screenWidth, height: Theme.screenWidth * (2272 / 1280) }} source={{ uri: 'http://dailuopan.com/images/advertising/tdsq_qd.png' }} />
                </TouchableOpacity>
            )
        }
        else {
            return <App />
        }

    }
    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                showGG: false
            })
        }, 5000)
        codePush.sync()
    }
    componentWillMount() {
        this.timer && clearTimeout(this.timer)
    }
}

AppRegistry.registerComponent('dlp', () => Dailuopan);
