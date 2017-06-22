/**
 * Hanson 
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './app/component/MainNavigator';
var BackboneEvents = require("backbone-events-standalone");
window.EventEmitter = BackboneEvents.mixin({});

AppRegistry.registerComponent('dlp', () => App);
