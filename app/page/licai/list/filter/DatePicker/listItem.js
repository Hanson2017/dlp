import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icomoon from 'react-native-vector-icons/Icomoon';

const ListItem = ({ extra, onClick, children }) => (
    <TouchableOpacity onPress={onClick} style={styles.formInput}>
        <Text style={styles.formInputText}>{extra !== '请选择' ? extra : null}</Text>
    </TouchableOpacity>
);

export default ListItem;

const styles = StyleSheet.create({
    formInput: {
        width: 100,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
    formInputText:{
        color:'#999',
        fontSize:12,
    },
    
})
