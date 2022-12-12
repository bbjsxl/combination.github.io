<template>
    <form id="registForm">
        <div id="registTitle">
            <img src="../../assets/img/monkey.png" alt="">
            <h1 style="color:#fff;">注册界面</h1>
        </div>
        <div id="username">
            <span>用户名：</span><input autocomplete v-model="username" type="text" name="username" placeholder="输入用户名">
            <span class='err'>{{ errUsername }}</span>
        </div>
        <div id="nicheng">
            <span>昵&nbsp;&nbsp;&nbsp;&nbsp;称：</span>
            <input autocomplete type="text" name="nicheng" v-model="nicheng" placeholder="请输入昵称">
            <span class='err'>{{ errNicheng }}</span>
        </div>
        <div id="password">
            <span>密&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
            <input autocomplete type="password" name="password" v-model="password" placeholder="输入密码">
            <span class='err'>{{ errPassword }}</span>
        </div>
        <div id="repeatPassword">
            <span>密&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
            <input autocomplete type="password" name="repeatPassword" v-model="repeatPassword" placeholder="再次输入">
            <span class='err'>{{ errRepeatPassword }}</span>
        </div>
        <div id="email">
            <span>邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</span>
            <input autocomplete type="text" name="email" v-model="email" placeholder="请输入邮箱">
            <span class='err'>{{ errEmail }}</span>
        </div>

        <div id="sex">
            <span> 性&nbsp;&nbsp;&nbsp;&nbsp;别:</span>
            <span> &nbsp;&nbsp;男</span><input autocomplete type="radio" v-model="sex" name="sex" value="boy">
            <span> &nbsp;&nbsp;女</span><input autocomplete type="radio" v-model="sex" name="sex" value="girl">
        </div>
        <div id="phone">
            <span>手机号：</span>
            <input autocomplete type="text" name="phone" v-model="phone" placeholder="可选项">
            <span class='err'>{{ errPhone }}</span>
        </div>
        <div id="address">
            <span>地&nbsp;&nbsp;&nbsp;&nbsp;址：</span>
            <input autocomplete type="text" name="address" v-model="address" placeholder="可选项">
        </div>
        <div id="registBtn">
            <div class="button" @click="toLogin">取消</div>
            <div class="button" @click="regist">注册</div>
        </div>
    </form>
</template>
<script>
import axios from 'axios';
import { getUser } from '@/api/index.js';
import { postUser } from '../../api';
import { isEmail, isPassword, isRegisterUserName, isTel } from '@/api/index.js'
export default {
    data() {
        return {
            username: "",
            password: "",
            repeatPassword: "",
            email: "",
            nicheng: "",
            sex: "boy",
            phone: "",
            address: "",

            errUsername: "",
            errEmail: "",
            errPassword: "",
            errRepeatPassword: "",
            errPhone: '',
            errNicheng: "",
        }
    },
    methods: {
        toLogin() {
            this.$router.push("/")
        },
        checkUserId(id) {
            let data = this.users;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    return true;
                }
            }
            return false;
        },
        checkNeedItem() {
            this.errUsername = "";
            this.errEmail = "";
            this.errPassword = "";
            this.errRepeatPassword = "";
            this.errPhone = '';
            this.errNicheng = "";
            if (this.username == '') {
                this.errUsername = "用户名不能为空!";
                return false;
            }
            if (!isRegisterUserName(this.username)) {
                this.errUsername = "用户名不合法";
                return false;
            }
            if (this.nicheng == '') {
                this.errNicheng = "昵称不能为空！";
                return false;
            }
            if (this.password == '') {
                this.errPassword = "密码不能为空！";
                return false;
            }
            if (!isPassword(this.password)) {
                this.errPassword = "密码格式不正确";
                return false;
            }
            if (this.repeatPassword == '') {
                this.errRepeatPassword = "请再次输入密码！";
                return false;
            }
            if (this.repeatPassword != this.password) {
                this.errRepeatPassword = "两次输入的密码不一致";
                return false;
            }
            if (this.email == '') {
                this.errEmail = "邮箱不能为空";
                return false;
            }
            if (!isEmail(this.email)) {
                this.errEmail = "请输入正确邮箱！";
                return false;
            }
            if (this.phone != '' && !isTel(this.phone)) {
                this.errPhone = "请输入正确手机号";
                return false;
            }
            return true;
        },
        async regist() {
            if (!this.checkNeedItem()) {
                return;
            }
            if (this.checkUserId(this.username)) {
                this.errUsername = "该用户已注册";
            } else {
                postUser(this.username, this.nicheng, this.password,this.email,this.phone,this.address,this.sex);
                this.$router.push("/");
            }

        }
    },
    mounted: async function(){
        this.users = await getUser();
    }
}
</script>
<style scoped>
#registForm {
    width: 500px;
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

#registForm>div>input {
    border-radius: 3px;
    height: 30px;
    border: 1px solid #ccc;
    outline: none;
}

#registForm>div>input:focus {
    border: 1px solid rgb(137, 233, 253);
}

#registForm>div>span {
    color: #fff;
}

#sex {
    width: 230px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

#registBtn>div {
    margin: 0 15px;
    cursor: pointer;
    float: left;
}

#registTitle {
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
}

#registTitle h1 {
    font-family: '隶书';
}

#registTitle img {
    position: absolute;
    width: 50px;
    height: 50px;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);
}

#registForm>div {
    position: relative;
}

#registForm>div>.err {
    width: 150px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 100%;
    color: red;
    font-size: 14px;
}
</style>
  