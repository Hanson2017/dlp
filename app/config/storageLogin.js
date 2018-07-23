
module.exports = {
    // 保存，存储
    storageSave(data) {
        storage.save({
            key: 'loginState',
            data: data,
            // 如果设为null，则永不过期
            expires: null
        })
    },
    // 读取
    storageLoad(that) {
        storage.load({
            key: 'loginState',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true,
        }).then(ret => {
            // 如果找到数据，则在then方法中返回           
            signState=ret;
            that.setState({
                loginState: true
            })
            console.log(signState)
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            that.setState({
                loginState: false
            })
            console.log('error:', err.message);  
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
    },
    storageRemove() {
        storage.remove({
            key: 'loginState'
        })
    },
    storageSaveKeyWord(rawData) {
        storage.save({
            key: 'keyword',
            rawData: rawData,
            // 如果设为null，则永不过期
            expires: null
        })
    },
    storageLoadKeyWord(that) {
        storage.load({
            key: 'keyword',
            // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
            autoSync: true,
            // syncInBackground(默认为true)意味着如果数据过期，
            // 在调用sync方法的同时先返回已经过期的数据。
            // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
            syncInBackground: true,
        }).then(ret => {

            // 如果找到数据，则在then方法中返回
            
            historyKeyWords=ret;
        }).catch(err => {
            //如果没有找到数据且没有sync方法，
            //或者有其他异常，则在catch中返回
            console.log('error:', err.message);  
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
    },
    storageRemoveKeyWord() {
        storage.remove({
            key: 'keyword'
        })
    }
}