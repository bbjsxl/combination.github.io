<template>
    <div>
        <Block v-for="(item, index) in textcontent" :key="index" :content="item.content" :parentdata="index + 1"
            @addUp="shang" @addDown="xia" @moveUp="moveUp" @moveDown="moveDown" @deleteNote="deleteNote" :data="index">
        </Block>
    </div>
</template>
<script>
import Block from '@/components/note/Block.vue';
import { addNote, updateNote, getNoteById } from '@/api/index.js'
import { toRaw } from '@vue/reactivity';
export default {
    props: ['texts', 'noteId'],
    watch: {
        async 'noteId'(newVal, oldVal) {
            this.textcontent = await getNoteById(newVal);
            setTimeout(() => {
                this.changeHeight();
            }, 10)
        },
        'textcontent'(newVal, oldVal) {
            this.textcontent = toRaw(newVal);
        }
    },
    data() {
        return {
            parentdata: "",
            comName: [{ name: "Block" }, { name: "Block" }],
            textcontent: [],
        }
    },
    components: {
        Block
    },
    methods: {
        updateContent(index, content) {
            setTimeout(() => {
                let notes = document.querySelectorAll('.note');
                for (let i = 0; i < index; i++) {
                    notes[i].childNodes[1].childNodes[0].value = content[i];
                }
                notes[index].childNodes[1].childNodes[0].value = "";
                for (let i = index + 1; i < notes.length; i++) {
                    notes[i].childNodes[1].childNodes[0].value = content[i - 1];
                }
            }, 1)
        },
        getContent(notes) {
            let content = [];
            for (let i = 0; i < notes.length; i++) {
                content[i] = notes[i].childNodes[1].childNodes[0].value;
            }
            return content;
        },
        reloadPage() {
            setTimeout(() => {
                window.location.reload();
            }, 500)
        },
        changeHeight() {
            let contents = document.querySelectorAll(".content");
            let markTexts = document.querySelectorAll(".markText");
            let htmlTexts = document.querySelectorAll(".htmlText");
            for (let i = 0; i < contents.length; i++) {
                contents[i].style.height = Math.max(htmlTexts[i].offsetHeight, markTexts[i].offsetHeight) + "px";
            }
        },
        shang(val) {
            let notes = document.querySelectorAll('.note');
            let index = [].indexOf.call(notes, val[0]);
            this.textcontent.splice(index, 0, { content: "" })
            this.textcontent.splice(index + 1, 1, { content: val[1] })
            setTimeout(() => {
                this.changeHeight();
            }, 10)
            updateNote(this.noteId, this.textcontent);
        },
        xia(val) {
            let notes = document.querySelectorAll('.note');
            let index = [].indexOf.call(notes, val);
            this.textcontent.splice(index + 1, 0, { content: "" });
            setTimeout(() => {
                this.changeHeight();
            }, 10)
            updateNote(this.noteId, this.textcontent);
        },
        moveUp(val) {
            let notes = document.querySelectorAll('.note');
            let index = [].indexOf.call(notes, val);
            if (index > 0) {
                let up = this.textcontent[index - 1];
                let cur = this.textcontent[index];
                this.textcontent.splice(index - 1, 1, cur);
                this.textcontent.splice(index, 1, up);
                setTimeout(() => {
                    this.changeHeight();
                }, 10)
            } else return;
        },
        moveDown(val) {
            let notes = document.querySelectorAll('.note');
            let index = [].indexOf.call(notes, val);
            if (index < notes.length - 1) {
                let down = this.textcontent[index + 1];
                let cur = this.textcontent[index];
                this.textcontent.splice(index + 1, 1, cur);
                this.textcontent.splice(index, 1, down);
                setTimeout(() => {
                    this.changeHeight();
                }, 10)
            } else return;
        },
        deleteNote(val) {
            let notes = document.querySelectorAll('.note');
            let index = [].indexOf.call(notes, val);
            console.log(index);
            this.textcontent.splice(index, 1);
            setTimeout(() => {
                this.changeHeight();
            }, 10)
            updateNote(this.noteId, this.textcontent);
        },
    },
    mounted: async function () {
        this.textcontent = await getNoteById(this.noteId);
    }
}
</script>