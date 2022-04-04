class Favorite {
  constructor() {
    this.favoriteElement = document.querySelector(".content-favorite");
  }

  setup() {
    this.bindEvents();
  }
  // 이벤트 리스너를 처리하는 함수
  bindEvents() {
    this.favoriteElement.addEventListener("click", (event) => {
      const cPath = event.composedPath();
      const element = cPath.find((element) => element.tagName === "BUTTON");

      if (!element) {
        return;
      }

      element.classList.toggle("on");
    });
  }
}

export default Favorite;
