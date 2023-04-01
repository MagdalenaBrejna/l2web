import {createApp} from 'vue'
import {createRouter, createWebHistory} from "vue-router";
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './assets/main.css'
import BookForm from "@/components/book/BookForm.vue";
import BookTable from "@/components/book/BookTable.vue";
import AuthorForm from "@/components/author/AuthorForm.vue";
import AuthorTable from "@/components/author/AuthorTable.vue";
import AuthorUpdate from "@/components/author/AuthorUpdate.vue";
import BookUpdate from "@/components/book/BookUpdate.vue";
import ReaderForm from "@/components/reader/ReaderForm.vue";
import ReaderTable from "@/components/reader/ReaderTable.vue";
import ReaderUpdate from "@/components/reader/ReaderUpdate.vue";
import Main from "@/components/Main.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Main,
        },
        {
            path: '/books',
            name: 'books',
            component: BookTable,
        },
        {
            path: '/book-form',
            component: BookForm,
        },
        {
            path: '/author-form',
            component: AuthorForm,
        },
        {
            path: '/reader-form',
            component: ReaderForm,
        },
        {
            path: '/authors',
            name: 'authors',
            component: AuthorTable,
        },
        {
            path: '/readers',
            name: 'readers',
            component: ReaderTable,
        },
        {
            path: '/author-update/:id',
            name: 'authorUpdate',
            component: AuthorUpdate,
        },
        {
            path: '/book-update/:id',
            name: 'bookUpdate',
            component: BookUpdate,
        },
        {
            path: '/reader-update/:id',
            name: 'readerUpdate',
            component: ReaderUpdate,
        },
    ]
})

createApp(App).use(router).mount('#app')
