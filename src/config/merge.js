module.exports = (customerConfig, defaultConfig) => {
    const config = { ...customerConfig, ...defaultConfig }

    config.servers.forEach(server => {
        if(!server.listen) {
            if(!server.ip) server.ip = '*'
            if(!server.port) server.port = '80'
            server.listen = `${server.ip}:${server.port}`
        }

        if(server.site) {
            server.server_name = server.site
        }

        // 错误处理
        if(server.errors) {
            server.error_pages = []
            server.errors.forEach(error => {
                let errorPage = error.code
                errorPage = errorPage + ' ' + error.file
                server.error_pages.push(errorPage)
            })
        }

        // 路由
        if(server.routes) {
            server.routes.forEach(route => {
                if(!route.headers) route.headers = []

                // url匹配
                let flag = '';
                // 不区分大小写
                if(!route.ignore_case) route.ignore_case = false
                // 完全匹配
                if(route.full_match) flag = '='
                // 内部访问
                else if(route.internal) flag = '@'
                // 前缀匹配
                else if(route.prefix_match) flag = '^~'
                // 正则 & 区分大小写
                else if(route.regular && !route.ignore_case) flag = '~'
                // 正则 & 不区分大小写
                else if(route.regular && route.ignore_case) flag = '~*'
                // 默认
                else flag = ''
                route.flag = flag

                // 直接输出
                if(route.echo) {
                    if(!route.headers.find(h => h.key == 'Content_Type')) {
                        route.headers.push({ key: 'Content_Type', value: 'text/html' })
                    }
                }
                
                // 错误处理
                if(route.errors) {
                    route.error_pages = []
                    route.errors.forEach(error => {
                        let errorPage = error.code
                        errorPage = errorPage + ' ' + error.file
                        route.error_pages.push(errorPage)
                    })
                }
            })
        }
    })

    return config
}