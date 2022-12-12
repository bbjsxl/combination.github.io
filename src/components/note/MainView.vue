<template>
    <div class="notePage">
        <LeftBar :user="user" @changeNote="changeNote"></LeftBar>
        <div class="centetNote">
            <NoteFunc :noteId="noteId"></NoteFunc>
        </div>
        <button class="button" @click="saveNote" >保存</button>
    </div>
</template>
<script>
import NoteFunc from './NoteFunc.vue';
import LeftBar from './LeftBar.vue';
import { toRaw } from '@vue/reactivity';
import {addNote,updateNote,getNoteById} from '@/api/index.js'
export default{
    components:{
        NoteFunc,LeftBar
    },
    data(){
        return{
            noteId:"intro",
            texts:[],
            user:{}
        }
    },
    methods:{
        getCookieObject() {
            let cookieString = document.cookie;
            cookieString = cookieString.substring(0, cookieString.length);
            let tempCookieArray = cookieString.split('; ');

            let cookieObject = {}; // 存放 cookie 键值对

            tempCookieArray.forEach(item => {
                let name = item.substring(0, item.indexOf('='));
                let value = item.substring(item.indexOf('=') + 1);
                value = decodeURIComponent(value); // 还原字符串
                cookieObject[name] = value; // 将键值插入中这个对象中
            });

            return cookieObject // 返回包含 cookie 键值对的对象
        },
        async saveNote(){
            let text = document.querySelectorAll('.markText');
            let contents = [];
            for(let i=0;i<text.length;i++){
                contents.push({content:text[i].value});
            }
            updateNote(this.noteId,contents);
            alert("保存成功");
        },
        changeNote(val){
            this.noteId = val;
            setTimeout(()=>{
                // window.location.reload();
            },1000)
        },
        changeHeight(){
            let contents = document.querySelectorAll(".content");
            let markTexts = document.querySelectorAll(".markText");
            console.log(contents);
            let htmlTexts = document.querySelectorAll(".htmlText");
            for(let i=0;i<contents.length;i++){
                
                contents[i].style.height = Math.max(htmlTexts[i].offsetHeight,markTexts[i].offsetHeight) + "px";
                console.log(contents[i].style.height );
            }
        }
    },
    mounted: async function(){
        this.user = await this.getCookieObject();
        this.user.noteList = this.user.noteList.split(',');
    }
}
</script>
<style>
button{
    position: absolute;
    top: 0;
    z-index: 9999;
    cursor: pointer;
}
.notePage{
    width: 100%;
    height: 100vh;
}
.centetNote{
    width: calc(100% - 350px);
    float: right;
    height: 100vh;
    box-sizing: border-box;
    padding-right:300px;
    overflow-y: scroll;
}
</style>