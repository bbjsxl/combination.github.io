<template>
    <div class="viewLeftBar">
        <div class="extendAndIncent">
            <i class="fa fa-hand-o-left" @click="incent"></i>
            <i class="fa fa-hand-o-right" @click="extend"></i>
        </div>
        <div class="title">
            <div class="title_left">
                <img src="../../assets/img/monkey.png" alt="">
                <span>{{ this.user.id }}</span>
            </div>
            <div class="title_right">
                <div class="headPhoto">
                    <img src="../../assets/img/monkey.png" alt="">
                    <i class="fa fa-angle-down"></i>
                </div>
                <div class="updateInfoBlock">
                    <div class="selfInfo">
                        <img src="../../assets/img/monkey.png" alt="">
                        <span>{{ this.user.name }}</span>
                    </div>
                    <div>
                        <i class="fa fa-gear"></i>
                        <span>账户设置</span>
                    </div>
                    <div @click="exit">
                        <i class="fa fa-sign-out"></i>
                        <span>退出登录</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="catalog">
            <span>目录</span>
            <i class="fa fa-plus-square-o" @click="addNoteList">添加</i>
        </div>
        <div class="noteId" v-for="(item, index) in noteList" :key="index" @click="changeNote">{{ item }}</div>
    </div>
</template>
<script>
import { updateUserNoteList, addNote } from '@/api/index.js'
export default {
    props: ['user'],
    data() {
        return {
            cnt: "0",
            noteList: ["intro"],
        }
    },
    watch: {
        'user'(newVal, oldVal) {
            if (this.user.noteList[0] != 'intro') {
                this.noteList = this.noteList.concat(this.user.noteList=='undefined'?[]:this.user.noteList);
            }else{
                this.noteList = this.user.noteList;
            }
        }
    },
    methods: {
        incent(e) {
            let cur = e.target;
            cur.style.display = "none";
            let extend = cur.nextSibling;
            extend.style.display = "block";
            while (!cur.classList.contains("viewLeftBar")) {
                cur = cur.parentNode;
            }
            cur.style.transform = "translate(-300px,0)";
        },
        extend(e) {
            let cur = e.target;
            cur.style.display = "none";
            let incent = cur.previousSibling;
            incent.style.display = "block";
            while (!cur.classList.contains("viewLeftBar")) {
                cur = cur.parentNode;
            }
            cur.style.transform = "translate(0,0)";
        },
        exit() {
            this.$router.push("/")
        },
        addNoteList() {
            this.cnt = this.user.noteList.length+1;
            let name = this.user.id+'新建笔记'+this.cnt;
            this.noteList.push(name);
            this.user.noteList.push(name);
            updateUserNoteList(this.user);
            addNote(name, [{ content: "" }])
        },
        changeNote(e) {
            this.$emit('changeNote', e.target.innerHTML);
        }
    },
    mounted: function () {


    }
}
</script>
<style>
.noteId {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: left;
    box-sizing: border-box;
    padding: 0 10px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 20px;
}

.noteId:hover {
    background-color: rgba(204, 204, 204, 0.587);
}

.viewLeftBar {
    width: 300px;
    background-color: rgba(255, 255, 255, 0.503);
    transition: transform 0.3s;
    height: 100vh;
    float: left;
    margin-right: 50px;
    z-index: 2;
    box-sizing: border-box;
    padding-left: 15px;
}

.extendAndIncent {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 100%;
}

.extendAndIncent>i {
    font-size: 23px;
    cursor: pointer;
    box-sizing: border-box;
    padding: 2px;
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
}

.extendAndIncent>i:nth-child(1) {
    display: block;
}

.extendAndIncent>i:nth-child(2) {
    display: none;
}

.title {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    border-bottom: 1px solid #ccc;
}

.title_left,
.title_right {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title_left {
    width: 120px;
}

.title_right {
    justify-content: space-around;
    width: 100px;
    height: 40px;
    position: relative;
}

.title_left>img {
    width: 50px;
    height: 50px;
}

.title_left>span {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
}

.headPhoto {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60px;
    cursor: pointer;
}

.headPhoto>i {
    font-size: 20px;
}

.headPhoto>img,
.selfInfo>img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ccc;
}

.title_right>.updateInfoBlock {
    position: absolute;
    top: 40px;
    left: 0;
    box-shadow: 1px 1px 10px rgb(35, 35, 35);
    border-radius: 15px;
    background-color: rgba(255, 255, 255, 0.686);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    transition: height 0.3s;
    width: 0;
    height: 0;
    visibility: hidden;
    z-index: 2;
}

.title_right:hover .updateInfoBlock {
    width: 200px;
    height: 180px;
    visibility: visible;
}

.updateInfoBlock>div {
    display: flex;
    align-items: center;
    width: 160px;
    margin: 0 auto;
    height: 50px;
    box-sizing: border-box;
    padding-left: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
    border-radius: 8px;
}

.updateInfoBlock>div:nth-child(1) {
    cursor: text;
}

.updateInfoBlock>div:not(:nth-child(1)):hover {
    background-color: #ccc;
}

.updateInfoBlock>div:last-child {
    border: none;
}

.updateInfoBlock>div>span {
    margin-left: 15px;
}

.catalog {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    padding: 0 15px;
}

.catalog>span {
    font-size: 18px;
}

.catalog>i {
    width: 60px;
    height: 30px;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    background-color: rgba(188, 184, 184, 0.513);
    cursor: pointer;
}
</style>