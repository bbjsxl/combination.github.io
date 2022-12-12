import axios from 'axios';
import md5 from 'js-md5';
let reqUrl = 'https://db.api.orght.cn/users';

//注册用户
export function postUser(id, name, password, email, phone, address, sex) {
    axios({
        method: 'post',
        url: 'https://db.api.orght.cn/users',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            'id': id,
            'name': name,
            'password': password,
            'email': email,
            'phone': phone,
            'address': address,
            'sex': sex
        })
    }).then(res => {
        console.log('res=>', res);
        alert(`恭喜${id}注册成功`);
    })
}
//获取所有用户
export async function getUser() {
    let res = await axios.get(`https://db.api.orght.cn/users`);
    return res.data;
}
//获取用户通过id
export async function getUserById(id) {
    let res = await axios.get(`https://db.api.orght.cn/users/${id}`);
    return res.data;
}
//添加笔记
export function addNote(id, texts) {
    axios({
        method: 'post',
        url: 'https://db.api.orght.cn/notes',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            'id': id,
            'texts': texts,
        })
    }).then(res => {
        console.log('res=>', res);
        alert(`添加成功`);
    })
}
//修改信息
export async function updateUserNoteList(user) {
    let reqUrl = 'https://db.api.orght.cn/users/' + user.id;
    await axios({
        url: reqUrl,
        method: 'put',
        data:user,
    }).then(response => {
        console.log('/posts put请求', response.data)
    })
}

//修改笔记
export function updateNote(id, texts) {
    axios({
        url: `https://db.api.orght.cn/notes/${id}`,
        method: 'put',
        data: {
            "id": id,
            "texts": texts,
        }
    }).then(response => {
        console.log('/posts put请求', response.data)

    })
}
//获取笔记通过id
export async function getNoteById(id) {
    let res = await axios.get(`https://db.api.orght.cn/notes/${id}`);
    return res.data.texts;
}

//校验登录名：只能输入6-15个以字母开头、可带数字、“_”、“.”的字串
export function isRegisterUserName(s) {
    var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){5,14}$/;
    if (patrn.exec(s) == null) return false
    return true
}
//校验密码：只能输入6-20个字母、数字下划线
export function isPassword(s) {
    var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){5,19}$/;
    if (!patrn.exec(s)) return false
    return true
}
//校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”  
export function isTel(s) {
    if (s.length != 11) return false;
    //var patrn=/{0,1}(\d){1,3}[ ]?([-]?(\d){1,12})+$/;  
    var patrn = /^[]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
    if (!patrn.exec(s)) return false
    return true
}
//检验邮箱格式
export function isEmail(s) {
    var patrn = /^[\w\-\.]+@[a-z0-9]+(\-[a-z0-9]+)?(\.[a-z0-9]+(\-[a-z0-9]+)?)*\.[a-z]{2,4}$/i;
    if (!patrn.exec(s)) return false
    return true
}
