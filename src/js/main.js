const { createApp } = Vue;
const options = {
  method: "GET",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "X-RapidAPI-Host": "gaming-news.p.rapidapi.com",
    "X-RapidAPI-Key": "bdfbeeb0b1msh85778f6f18922a0p137b2bjsn943b41484846",
  },
};
createApp({
  data() {
    return {
      news: [],
      step: 3,
    };
  },
  async mounted() {
    await fetch("//gaming-news.p.rapidapi.com/news", options)
      .then((response) => response.json())
      .then((response) => (this.news = response))
      .catch((err) => console.error(err));
    console.log("News fetched");
  },
  computed: {
    newsList() {
      return this.news.slice(0, this.step);
    },
  },
  methods: {
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
        this.step = 3;
      }, 1000);

      console.log("Refreshed");
    },
  },
}).mount("#app");
