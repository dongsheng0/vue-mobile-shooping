let baseurl = {
    'development': 'https://xiaoxue-live.test-dahai.com',
    'testing': 'https://s4.test-v2-live.qdsay.com',
    'production': 'https://v2-live.dahai.com'
}
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: baseurl[process.env.NODE_ENV],
                changeOrigin: true,
                secure: false
            },
            '/passport': {
                target: baseurl[process.env.NODE_ENV],
                secure: false,
                changeOrigin: true,
            }
        }
    }
}
