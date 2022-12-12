<template>
    <div class="note">
        <div class="head">
            <div class="head_left">
                <div class="round" style="background-color:#FC625D"></div>
                <div class="round" style="background-color:#FDBC40"></div>
                <div class="round" style="background-color:#35CD4B"></div>
                <div class="titleNum">{{ parentdata }}</div>
                <div class="titleName">{{ tag }}</div>
            </div>
            <div class="head_right">
            </div>
            <div class="function">
                <div class="func file-up" @click="addUp">
                    <i class="fa fa-plus-square-o"></i>
                </div>
                <div class="func file-down" @click="addDown">
                    <i class="fa fa-plus-square"></i>
                </div>
                <div class="func move-up" @click="moveUp">
                    <i class="fa fa-arrow-up"></i>
                </div>
                <div class="func move-down" @click="moveDown">
                    <i class="fa fa-arrow-down"></i>
                </div>
                <div class="func delete" @click="deleteNote">
                    <i class="fa fa-trash-o"></i>
                </div>
            </div>
        </div>
        <div class="content" ref="contentWrapper">
            <textarea :class="markClass" ref="textareaRef" v-model="markTxt" @click.ctrl="markToHtml" :onblur="markToHtml"></textarea>
            <div class="htmlText markdown-body" ref="htmlTxt" v-html="markedParse(markTxt)" @dblclick="htmlToMark"></div>
        </div>
        <div class="rightAttribute">
            <div>
                <span>cell编号：</span>
                <span>{{ cellNum }}</span>
            </div>
            <div>
                <span>Id：</span>
                <span>{{ id }}</span>
            </div>
            <div>
                <span>标签名：</span>
                <span contenteditable="true" @input="changeBiaoqian">{{ tag }}</span>
            </div>
            <div>
                <span>createTime:</span>
                <span>{{ createTime }}</span>
            </div>
            <div>
                <span>updateTime:</span>
                <span>{{ updateTime }}</span>
            </div>
            <div>
                <span>作者：</span>
                <span>{{ author }}</span>
            </div>
            <div>
                <span>fontSize：</span>
                <span>{{ fontSize }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { marked } from 'marked'
import { toRaw } from '@vue/reactivity';
export default {
    props: ['parentdata', 'content'],
    data() {
        return {
            cellNum: this.parentdata,
            id: this.parentdata,
            tag: "html",
            createTime: "2022-11-17",
            updateTime: "2022-11-17",
            author: "bbjsxl",
            fontSize: "18px",
            //htmlContent
            txt: "",
            markTxt: "",
            // markContent
            markClass: "markText",
        }
    },

    watch: {
        "content"(newVal, oldVal) {
            this.markTxt = newVal;
            this.txt = marked(newVal);
            this.changeTextareaHeight();
        }
    },
    methods: {
        hhh(e){
            console.log(toRaw(this));
        },
        markedParse(text){
            return marked(text)
        },
        markToHtml(e) {
            let mark = e.target||this.$refs.textareaRef;
            let html = e.target.nextSibling;
            let content = mark;
            while (!content.classList.contains('content')) {
                content = content.parentNode;
            }
            console.log(mark.value);
            this.txt = marked(mark.value);
            html.style.display = "block";
            setTimeout(() => {
                mark.style.height = html.offsetHeight + "px";
                content.style.height = html.offsetHeight + "px";
            }, 10)
        },
        htmlToMark(e) {
            let html = e.target;
            while (!html.classList.contains('htmlText')) {
                html = html.parentNode;
            }
            this.txt = "";
            html.style.display = "none";
            this.changeTextareaHeight();
        },
        changeTextareaHeight() {
            let textarea = this.$refs.textareaRef;
            let content = textarea;
            while (!content.classList.contains('content')) {
                content = content.parentNode;
            }
            var scrollHeight = textarea.scrollHeight; // 控件所有的高度，包含滚动的那部分(不可见也会有高度)
            var height = textarea.offsetHeight; // 屏幕上显示的高度
            if (height <= scrollHeight) {
                textarea.style.height = 'auto'; // 恢复默认值，这个作用就是根据内容自适应textarea高度
                textarea.style.height = textarea.scrollHeight + 'px'; // 拿到最新的高度改变textarea的高度
                content.style.height = textarea.scrollHeight + 'px';
            }
        },
        addUp(e) {
            let note = e.target;
            while (!note.classList.contains('note')) {
                note = note.parentNode;
            }
            let arr = [note,this.markTxt];
            this.markTxt = "";
            this.$emit('addUp', arr);
        },
        addDown(e) {
            let note = e.target;
            while (!note.classList.contains('note')) {
                note = note.parentNode;
            }
            this.$emit('addDown', note);
        },
        moveUp(e) {
            let note = e.target;
            while (!note.classList.contains('note')) {
                note = note.parentNode;
            }
            this.$emit('moveUp', note);
        },
        moveDown(e) {
            let note = e.target;
            while (!note.classList.contains('note')) {
                note = note.parentNode;
            }
            this.$emit('moveDown', note);
        },
        deleteNote(e) {
            let note = e.target;
            while (!note.classList.contains('note')) {
                note = note.parentNode;
            }
            this.$emit('deleteNote', note);
        },
        changeBiaoqian(e) {
            let cur = e.target;
            this.biaoqian = cur.innerHTML;
        }
    },
    mounted: function () {
        this.markTxt = this.content;
        this.txt = marked(this.content);
        let mark = this.$refs.textareaRef;
        let html = mark.nextSibling;
        let content = mark;
        while (!content.classList.contains('content')) {
            content = content.parentNode;
        }
        this.txt = marked(mark.value);
        html.style.display = "block";
        setTimeout(() => {
            mark.style.height = html.offsetHeight + "px";
            content.style.height = html.offsetHeight + "px";
        }, 10)
        this.changeTextareaHeight();
    }
}
</script>

<style>
@import '../../assets/css/markdown.css';

.note {
    width: 100%;
    min-width: 800px;
    position: relative;
    transition: all 0.3s;
    box-shadow: 3px 3px 15px rgba(129, 128, 128, 0.485),
        -3px -3px 15px rgba(129, 128, 128, 0.485);
    border-radius: 10px;
    margin: 30px 0;

}


.head {
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
}

code {
    font-size: 16px;
    line-height: 30px;
}

.head_left {
    width: 50%;
    height: 100%;
    float: left;
    display: flex;
    align-items: center;
    justify-content: start;
}

.head_left>div {
    margin: 0 3px;
}

.round {
    width: 15px;
    height: 15px;
    border-radius: 50%;
}

.head_right {
    width: 50%;
    height: 100%;
    float: right;
    opacity: 0;
    transition: all 0.3s;
}

.note:hover .head_right {
    opacity: 1;
}

.head_right>div {
    float: right;
    line-height: 50px;
    margin: 0 10px;
    font-size: 12px;
}

.function {
    width: 100px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    /* transform: translate(0,-100%); */
    opacity: 0;
    transition: all 0.3s;
}

.note:hover .function {
    opacity: 1;
}

.function .func:hover i {
    cursor: pointer;
    color: rgba(241, 181, 181, 0.538);
}

.function .func i {
    color: rgba(0, 0, 0, 0.736);
    transition: all 0.3s;
}

.content {
    width: 100%;
    border-radius: 0 0 10px 10px;
    background-color: #fff;
    position: relative;
    box-sizing: border-box;
}

.content img {
    width: 100%;
}

.markText {
    min-width: 100%;
    max-width: 100%;
    min-height: 100px;
    outline: none;
    border: none;
    resize: none;
    line-height: 25px;
    font-size: 16px;
}

.htmlText {
    position: absolute;
    min-width: 100%;
    max-width: 100%;
    min-height: 100px;
    box-sizing: border-box;
    background-color: #fff;
    display: block;
    top: 0;
}

.head:hover~.rightAttribute {
    visibility: visible;
}

.rightAttribute:hover {
    visibility: visible;
}

.rightAttribute {
    width: 250px;
    height: 220px;
    box-sizing: border-box;
    padding: 15px;
    /* background-image: linear-gradient(to right top, rgba(255,255,255,0.3), rgba(255,255,255,0.7)); */
    backdrop-filter: blur(40px);
    box-shadow: 0 5px 15px rgba(20, 20, 20, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: absolute;
    top: 0;
    left: 100%;
    visibility: hidden;
}

.rightAttribute>div {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: space-between;
    color: white;
}
</style>