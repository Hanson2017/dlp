import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Theme from '../../../../util/theme';
import Fenxi from './fenxi';
import Top from './top';

export default class DetailHealth extends React.Component {
    render(){
        const {data,platName,platstatus}=this.props;
        return(
            <ScrollView contentContainerStyle={styles.container}>
                <Top data={data} platName={platName} platstatus={platstatus} />
                <Fenxi data={data} platstatus={platstatus} />
            </ScrollView>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        backgroundColor: Theme.bgColor,
    }
})