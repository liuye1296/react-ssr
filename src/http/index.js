import clientHttp from '../http/client'
import serverHttp from '../http/server'
let http = function () {
    const _http = typeof window === 'undefined' ? serverHttp : clientHttp
    http = function () {
        //好处在于 如果不使用http()  不用执行判断  使用了一次之后也不用多次判断 所谓惰性
        return _http
    }
    return http()
}
//用于请求数据 只负责请求接口
export default http