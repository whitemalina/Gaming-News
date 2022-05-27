const { createApp } = Vue;
var notyf = new Notyf();
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "gaming-news.p.rapidapi.com",
    "X-RapidAPI-Key": "bdfbeeb0b1msh85778f6f18922a0p137b2bjsn943b41484846",
  },
};
createApp({
  data() {
    return {
      news: [],
      step: 23,
      start: 3,
    };
  },
  async mounted() {
    await fetch("https://gaming-news.p.rapidapi.com/news", options)
      .then((response) => response.json())
      .then((response) => (this.news = response))
      .catch((err) => console.error(err));
    this.start = 20;
    console.log("News fetched");
    for (let i = 0; i < this.news.length; i++) {
      let string
      let num = Math.floor(Math.random() * 5);
      string = 'background: url("src/img/' + num + '.jpg") center / cover no-repeat  !important'
      this.news[i].bg = string
    }
    
  },
  computed: {
    newsList() {
      return this.news.slice(this.start, this.step);
    },
  },
  methods: {
    openUrl(url) {
      window.open(url, "_blank");
    },
    toast(message) {
      notyf.success(message);
    },
    getNews() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "gaming-news.p.rapidapi.com",
          "X-RapidAPI-Key":
            "bdfbeeb0b1msh85778f6f18922a0p137b2bjsn943b41484846",
        },
      };

      fetch("https://gaming-news.p.rapidapi.com/news", options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    },
    pushStep() {
      this.step += 4;
      console.log("News added");
    },
    refresh() {
      this.step = 0;
      setTimeout(() => {
        this.step = 23;
      }, 1000);

      console.log("Refreshed");
    },
  },
}).mount("#app");
