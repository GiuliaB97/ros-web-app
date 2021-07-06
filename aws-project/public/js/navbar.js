const Navbutton =  {
    props: ['text'],
    data: function () {
        return {
            count: 0
        }
    },
    template: `
        <li v-on:click="onClickButton()" class="nav-item">
            <router-link class="nav-link" :to="{ name: text }">{{text}} ({{ count }} click)</router-link>
        </li>
    `,
    methods: {
        onClickButton() {
            this.count++;
            this.$emit('clicked')
        }
    }
}

const Navbar =  {
    components: {
        'navbutton': Navbutton
    },
    data: function () {
        return {
            count: 0
        }
    },
    template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div id="navbarNav">
            <ul class="navbar-nav">
                <navbutton text="Home" @clicked="onClickChild()"></navbutton>
                <navbutton text="Movies" @clicked="onClickChild()"></navbutton>
            </ul>
            <p>Tot click: {{count}}</p>
        </div>
    </nav>
    `,
    methods: {
        onClickChild() {
            this.count++;
        }
    }
}
