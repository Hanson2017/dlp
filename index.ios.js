/**
 * Hanson 
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import codePush from 'react-native-code-push'
import App from './app/router';
var BackboneEvents = require("backbone-events-standalone");
window.EventEmitter = BackboneEvents.mixin({});

export default class Dailuopan extends Component {
    render() {
        return (
            <App />
        );
    }
    componentDidMount() {
        codePush.sync()
    }

}

AppRegistry.registerComponent('dlp', () => Dailuopan);
