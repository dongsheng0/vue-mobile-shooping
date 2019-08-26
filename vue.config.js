let baseurl = {
    'development': 'https://xiaoxue-live.test-dahai.com',
    'testing': 'https://s4.test-v2-live.qdsay.com',
    'production': 'https://v2-live.dahai.com'
}
module.exports = {
    devServer: {
        port: 2000,
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
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    red: '#F37455',
                    blue: '#3eaf7c',
                    orange: '#F37455',
                    block: '#4D4D4D',
                    gray: '#C9C9C9',
                    'active-color': '#FF4728',
                    'text-color': '#323233'
                }
            }
        }
    }
}
