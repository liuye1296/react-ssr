import axios from 'axios'//加载数据请求
import { serviceURL } from '../../config'
axios.defaults.headers.post['Accept'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
const ajax = function (url, data, method = 'post') {
    return axios({
        method,
        params: data,
        url: serviceURL + url,
    })
}
export default {
    ajax
}