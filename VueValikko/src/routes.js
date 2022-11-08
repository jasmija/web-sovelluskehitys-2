import Home from './components/Home.vue';
import ListEvent from './components/ListEvent.vue';
import AddEvent from './components/AddEvent.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/list', name: 'ListEvent', component: ListEvent, props: { items:[]} },
    { path: '/add', name: 'AddEvent', component: AddEvent },
];

export default routes;