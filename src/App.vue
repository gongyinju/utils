<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <div>
      <input type="file" @change="aa">
    </div>

    <ul>
      <li v-for="i in list">
        <div>{{i.name}}</div> <div>{{i.sex}}</div>
      </li>
    </ul>
    <!--{{formatList}}-->
  </div>
</template>

<script>
  import s3 from './s3'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      list:[
        {
        "name": "x利康",
        "age": 26,
        "sex": "男",
        "groupName":"一组",
        "content": "Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.",
        "photo":"views/man/img/2.jpg",
        "interest":["爱好1", "爱好2"]
      },{
        "name": "范佩瑶",
        "age": 21,
        "sex": "女",
        "groupName":"三组",
        "content":"I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.",
        "photo":"views/man/1.jpg",
        "interest":["爱好1", "爱好2", "爱好3"]
      },
        {
          "name": "a锦程",
          "age": 25,
          "sex": "男",
          "groupName":"二组",
          "content": "Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.",
          "photo":"views/man/3.jpg",
          "interest":["爱好1", "爱好2", "爱好3"]

        }, {
          "name": "王萌",
          "age": 23,
          "sex": "女",
          "groupName":"二组",
          "content": "Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.",
          "photo":"views/man/1.jpg",
          "interest":["爱好1", "爱好2"]
        },{
          "name": "王点",
          "age": 26,
          "sex": "女",
          "groupName":"三组",
          "content": "Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.",
          "photo":"views/man/2.jpg",
          "interest":["爱好1", "爱好2"]
        },{
          "name": "z样",
          "age": 26,
          "sex": "女",
          "groupName":"一组",
          "content": "eeeeee",
          "interest":["爱好1", "爱好2"]
        }
      ]
    }
  },
  created() {
    console.dir(s3);
  },
  methods: {
    aa(e){
      let fileUpload = e.target.files[0];
      let result = s3.file.checkFile(fileUpload,this.f);
      console.log(result);
      s3.file.upload(fileUpload,{})
    },
    f(re){
      console.log(result);
    },
  },
  computed:{
    /*formatList(){
      return s3.groupSort(this.list,'sex');
    }*/
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
