import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 23,
        height: 50,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backBtn: {
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    portrait:{
       width: 54, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#fff',
        fontSize: 16,
    },
    headerRight: {
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

module.exports = styles
