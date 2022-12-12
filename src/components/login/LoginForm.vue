<template>
    <form id="loginForm">
        <div id="loginTitle">
            <img src="../../assets/img/monkey.png" alt="">
            <h1 style="color:#fff;">登录</h1>
        </div>
        <div id="username">
            <span style="color:#fff;">用户名：</span><input autocomplete v-model="username" type="text" name="username" placeholder="请输入用户名">
            <span>{{errUsername}}</span>
        </div>
        <div id="password">
            <span style="color:#fff;">密&nbsp;&nbsp;&nbsp;&nbsp;码：</span><input autocomplete v-model="password" type="password" name="password"
                placeholder="请输入密码">
            <router-link to="/findPassword">忘记密码？</router-link>
            <span>{{errPassword}}</span>
        </div>
        <div>
            <div class="button" @click="checkLogin">登录</div>
            <div class="button" @click="toRegist()">注册</div>
        </div>
    </form>
</template>
<script>
import md5 from 'js-md5'
import { getUser } from '@/api/index.js';

export default {
    data(){
        return{
            errUsername:"",
            errPassword:"",
            username:"",
            password:"",
            users:[{}]
        }
    },
    methods: {
        toRegist() {
            this.$router.push('/regist')
        },
        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },
        async checkLogin() {
            this.errPassword = "";
            this.errUsername = "";
            if(this.username==''){
                this.errUsername = "用户名不能为空";
                return ;
            }
            if(this.password == ''){
                this.errPassword = "密码不能为空";
                return ;
            }
            
            let data = await getUser();
            let flag = false;
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == this.username) {
                    flag = true;
                    if (data[i].password != this.password && data[i].password != md5(this.password)) {
                        this.errPassword = "密码错误";
                    } else {
                        this.setCookie("id",this.username,30);
                        this.setCookie("name",data[i].name,30);
                        this.setCookie("password",data[i].password,30);
                        this.setCookie("email",data[i].email,30);
                        this.setCookie("noteList",data[i].noteList,30);
                        alert("登陆成功！");
                        this.$router.push("/main");
                    }
                }
            }
            if (!flag) {
                this.errUsername = "该用户不存在！";
            }
        },
    },
    mounted: async function(){
        this.users = await getUser();
    }
}
</script>
<style scoped>

#loginForm {
    width: 400px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    box-shadow: 3px 3px 15px rgba(129, 128, 128, 0.485),
        -3px -3px 15px rgba(129, 128, 128, 0.485);
    border-radius: 10px;
    background-color: rgba(98, 98, 98, 0.624);
}

#loginForm>div {
    font-size: 16px;
}

#loginTitle>h1 {
    font-family: '隶书'
}

#loginForm>div>input {
    outline: none;
    box-sizing: border-box;
    padding: 0 10px;
    width: 200px;
    height: 40px;
    font-size: 16px;
    border: 1px solid rgb(89, 89, 89);
    border-radius: 5px;
}
#loginForm>div>input:focus{
   border: 1px solid rgb(137, 233, 253);
}
#loginForm>div:last-child>div {
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


#loginTitle {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
}

#loginTitle img {
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
#username{
    position: relative;
}
#username>span:last-child,#password>span:last-child{
    position: absolute;
    top: 100%;
    left: 65px;
    color: red;
    font-size: 14px;
}
</style>
  