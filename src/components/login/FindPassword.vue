<template>
    <form id="findForm">
        <div id="findTitle">
            <img src="../../assets/img/monkey.png" alt="">
            <h1 style="color:#fff;">找回密码</h1>
        </div>
        <div id="nicheng">
            <span>用户名：</span><input autocomplete type="text" v-model="username" name="username"
                placeholder="请输入修改的用户名">
            <span>{{ errUsername }}</span>
        </div>
        <div id="email">
            <span>邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</span><input autocomplete type="text" v-model="email" name="email"
                placeholder="请输入邮箱">
            <span>{{ errEmail }}</span>
        </div>
        <div id="password">
            <span>密&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
            <input autocomplete type="password" name="password" v-model="password" placeholder="输入密码">
            <span>{{ errPassword }}</span>
        </div>
        <div id="repeatPassword">
            <span>密&nbsp;&nbsp;&nbsp;&nbsp;码：</span><input autocomplete type="password" v-model="repeatPassword"
                name="repeatPassword" placeholder="再次输入">
            <span>{{ errRepeatPassword }}</span>
        </div>
        <div id="yzm">
            <span>验证码：</span><input autocomplete type="text" name="yzm" v-model="inputYzm" placeholder="请输入验证码">
            <div @click="send">发送</div>
            <span>{{ errYzm }}</span>
        </div>
        <div>
            <div class="button" @click="toLogin">返回</div>
            <div class="button" @click="check">重置</div>
        </div>
    </form>
</template>
<script>
import axios from 'axios';
import { isEmail, isPassword } from '@/api/index.js';
import md5 from 'js-md5';
import { getUserById } from '@/api/index.js';
export default {
    data() {
        return {
            email: '',
            //返回的验证码
            yzm: '',
            //输入的验证码
            inputYzm: '',
            password: '',
            repeatPassword: '',
            username:"",
            users:[],
            
            errUsername:"",
            errEmail: "",
            errPassword: "",
            errYzm: '',
            errRepeatPassword: ""
        }
    },
    methods: {
        toLogin() {
            this.$router.push('/');
        },
        async send() {
            if(!isEmail(this.email)){
                this.errEmail = "请输入正确的邮箱！";
                return;
            }
            let res = await axios.get(`http://43.142.81.251:3000/`, {
                params: {
                    email: this.email
                }
            });
            // let res = await axios.get(`http://127.0.0.1:8080/`, {
            //     params: {
            //         email: this.email
            //     }
            // });
            console.log(res.data);
            this.yzm = res.data;
            alert("发送验证码成功");
        },
        async getUser(){
            let res = await getUserById(this.username);
            return res;
        },
        async check() {
            let res = await this.getUser();
            console.log(res.name);
            if (!this.checkItem()) return;
            if (this.yzm == this.inputYzm) {
                let reqUrl = 'https://db.api.orght.cn/users/'+this.username;
                await axios({
                    url: reqUrl,   
                    method: 'put',
                    data: {
                        "name": res.name,
                        "password": md5(this.password),
                        "email":this.email,
                        "noteList":res.noteList
                    },
                }).then(response => {
                    console.log('/posts put请求', response.data)
                    alert("修改成功");
                    this.$router.push("/")
                })

            } else {
                this.errYzm = '验证码错误';
            }
        },
        checkItem() {
            this.errEmail = "";
            this.errPassword = "";
            this.errYzm = '';
            this.errRepeatPassword = "";
            if (!isEmail(this.email)) {
                this.errEmail = "请输入正确的邮箱！";
                return false;
            }
            if (!isPassword(this.password)) {
                this.errPassword = "密码由数字字母下划线组成6-20位";
                return false;
            }
            if (this.password != this.repeatPassword) {
                this.errRepeatPassword = "两次输入的密码不一致";
                return false;
            }
            if(this.yzm==''){
                this.errYzm = "请发送验证码";
                return false;
            }
            if(this.inputYzm==''){
                this.errYzm='验证码不能为空';
                return false;
            }
            return true;
        },
    },
}
</script>
<style scoped>
#findForm {
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    box-shadow: 3px 3px 15px rgba(129, 128, 128, 0.485),
        -3px -3px 15px rgba(129, 128, 128, 0.485);
    border-radius: 10px;
    background-color: rgba(98, 98, 98, 0.624);
}

#findForm>div {
    font-size: 16px;
}

#findTitle>h1 {
    font-family: '隶书'
}

#findForm>div>span {
    color: #fff;
}

#findForm>div>input {
    outline: none;
    box-sizing: border-box;
    padding: 0 10px;
    width: 200px;
    height: 40px;
    font-size: 16px;
    border: 1px solid rgb(89, 89, 89);
    border-radius: 5px;
}

#findForm>div>input:focus {
    border: 1px solid rgb(137, 233, 253);
}

#findForm>div:last-child>div {
    width: 70px;
    height: 35px;
    padding: 5px 10px;
    box-sizing: border-box;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
    display: inline;
    border-radius: 3px;
    outline: none;
    margin: 0 20px;
    font-size: 16px;
}

#findTitle {
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
}

#findTitle img {
    position: absolute;
    width: 50px;
    height: 50px;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
}

#password {
    position: relative;
}

#password>a {
    color: rgb(108, 202, 202);
    font-size: 15px;
    position: absolute;
    right: 0;
    top: 100%;
}

#password>a:hover {
    background-color: rgba(215, 251, 206, 0);
    color: rgb(147, 238, 238);
}

#findForm>#yzm>input {
    width: 150px;
    height: 40px;
    font-size: 16px;
}

#yzm {
    display: flex;
    align-items: center;
    justify-content: center;
}

#yzm>div:hover {
    background-color: rgb(220, 219, 219);
}

#yzm>div:active {
    background-color: #ccc;
}

#yzm>div {
    width: 50px;
    height: 35px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
    line-height: 35px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    background-color: rgb(240, 239, 239);
}

#findForm>div>span:last-child {
    position: absolute;
    top: 100%;
    left: 65px;
    color: red;
    font-size: 14px;
}
</style>
  