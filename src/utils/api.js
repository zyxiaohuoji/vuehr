import axios from 'axios'
import { Message } from 'element-ui';

/* axios 拦截器 */
axios.interceptors.response.use(
    success => {
        //http的响应码，和自定义的响应码
        if (success.status && success.status == 200 && success.data.status == 500) {
            Message.error({message: success.data.msg});
            return;
        }
        return success.data;
    },
    error => {
        if(error.response){
            if (error.response.status == 504 || error.response.status == 404){
                Message.error({message: '服务器被吃了o (╯□╰) o'});
            } else if (error.status == 403) {
                Message.error({message: '权限不足，请联系管理员!'});
            } else if (error.status == 401) {
                Message.error({message: '尚未登录，请登录!'});
            } else {
                if (error.response.data.msg) {
                    Message.error({message: error.response.data.msg});
                } else {
                    Message.error({message: '未知错误!'});
                }
            }
        }

        return;
    }
)

/**/

let base = '';

//登录默认是不支持json 格式的传参
export const postKeyValueRequest = (url, params) => {
    let url01 = `${base}${url}`;
    console.log(url01)
    return axios({
        method: 'post',
        url: url01,
        data: params,
        transformRequest: [function (data) {
            let ret = '';
            for (let i in data){
                ret += encodeURIComponent(i) + '=' + encodeURIComponent(data[i]) + '&';
            }
            console.log(ret);
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

// export const