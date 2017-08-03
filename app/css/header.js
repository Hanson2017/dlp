import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 23,
        height: 41,
        backgroundColor: '#14191e',
        // backgroundColor:'red',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    backBtn: {
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    portrait: {
        paddingTop: 1,
        width: 54,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainerTx: {
        paddingTop: 7,
        alignItems: 'flex-start',
    },
    headerText: {
        color: '#fff',
        fontSize: 16.5,
        fontWeight: 'bold',
    },
    headerRight: {
        paddingTop: 8,
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerRightAndorid: {
        alignItems: 'center',
        paddingTop: 0,
        justifyContent: 'center',
    },
    avatar: {
        width: 33,
        height: 33,
        borderRadius: 16.5,
    }
})

module.exports = styles
