//Инициализация VueJs
const { createApp } = Vue;

//Инициализация Notyf
var notyf = new Notyf();

//Параметры для запроса к API
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
      news: [], // массив новостей
      step: 23, // шаг новостей
      start: 3, // кол-во отображаемых новостей при старте
    };
  },
  // mounted позволяет до открытия страницы сделать запрос
  async mounted() {
    // делаем запрос с настройками которые определены выше
    await fetch("https://gaming-news.p.rapidapi.com/news", options)
      .then((response) => response.json())
      .then((response) => (this.news = response))
      .catch((err) => console.error(err));
    this.start = 20;
    console.log("News fetched");
    // добавляем  к каждой новости картинку
    for (let i = 0; i < this.news.length; i++) {
      let string
      let num = Math.floor(Math.random() * 5);
      string = 'background: url("src/img/' + num + '.jpg") center / cover no-repeat  !important'
      this.news[i].bg = string
    }
    
  },
  // computed позволяет динамично менять данные при отображении
  computed: {
    newsList() {
      // возвращаем массив с указанным количеством новостей
      return this.news.slice(this.start, this.step);
    },
  },
  methods: {
    // метод открытия ссылок (ссылок на игры)
    openUrl(url) {
      window.open(url, "_blank");
    },
    // всплывающие уведомления
    toast(message) {
      notyf.success(message);
    },
    // получение новостей путем отправки запроса
    getNews() {
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "gaming-news.p.rapidapi.com",
          "X-RapidAPI-Key":
            "bdfbeeb0b1msh85778f6f18922a0p137b2bjsn943b41484846",
        },
      };
      // запрос к апи
      fetch("https://gaming-news.p.rapidapi.com/news", options)
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    },
    // метод для "Show More"
    pushStep() {
      this.step += 4;
      console.log("News added");
    },
    
    // Обновление списка новостей
    refresh() {
      this.step = 0;
      setTimeout(() => {
        this.step = 23;
      }, 1000);

      console.log("Refreshed");
    },
  },
}).mount("#app");
