// 호버 상태에 따른 이미지 맵핑 객체
const starImageSourceMap = {
  empty: "./src/images/icon_empty_star.png",
  half: "./src/images/icon_half_star.png",
  full: "./src/images/icon_star.png",
};

class StarPoint {
  constructor() {
    this.starContentElement = document.querySelector(".content-star");
    this.starBackgroundElement = this.starContentElement.querySelector(".star-background");
    this.starimages = this.starBackgroundElement.querySelectorAll("img");
    this.starPointResetButton = this.starContentElement.querySelector(".icon-remove-star");
    this.lockedStarPoint = false; // 별점이 고정되어 있는지 아닌지 상태를 알려주는 변수. (클릭이 됐는지 안됐는지)
  }

  setup() {
    this.bindEvents();
  }

  // 별점을 고정된 상태로 만들어준다.
  lockStarPoint() {
    this.lockedStarPoint = true;
  }

  // 별점을 고정되어 있지 않은 상태로 만들어준다.
  unlockStarPoint() {
    this.lockedStarPoint = false;
  }

  // 별점의 상태를 반환한다.
  isLockedStarPoint() {
    return this.lockedStarPoint;
  }

  bindEvents() {
    // 마우스 무브 이벤트 체크
    this.starBackgroundElement.addEventListener("mousemove", (event) => {
      // 별점이 고정되어 있다면 이벤트 핸들링 중지
      if (this.isLockedStarPoint()) {
        return;
      }
      // offsetX: 타겟 요소에서의 마우스 포인터의 x축 위치 반환
      const { target, offsetX: currentUserPoint } = event;
      const { point } = target.dataset;
      const starPointIndex = parseInt(point, 10) - 1;
      // 요소의 좌표와 크기에 대한 정보를 반환
      const [starimageClientRect] = target.getClientRects();
      const starImageWidth = starimageClientRect.width;
      // 마우스 포인터의 위치가 별의 중간을 넘어서면 true 아니면 false
      const isOverHalf = starImageWidth / 2 < currentUserPoint;

      this.renderStarPointImages({ drawableLimitIndex: starPointIndex, isOverHalf });
    });

    // 마우스 클릭시 별점 고정
    this.starBackgroundElement.addEventListener("click", () => this.lockStarPoint());

    // 리셋버튼 이벤트 할당
    this.starPointResetButton.addEventListener("click", () => {
      this.unlockStarPoint();
      this.resetStarPointImages();
    });

    // 별점을 고정하지 않은 상태에서 마우스 벗어나면 별점 리셋
    this.starBackgroundElement.addEventListener("mouseout", () => {
      !this.isLockedStarPoint() && this.resetStarPointImages();
    });
  }

  renderStarPointImages(payload = {}) {
    const { drawableLimitIndex = -1, isOverHalf = false } = payload; // 초기값 할당
    // NodeList !== Array. call 메서드를 통해서 함수를 호출하는 객체를
    // Array에서 NodeList 객체로 재할당한다.
    Array.prototype.forEach.call(this.starimages, (starimage, index) => {
      // 현재 순환 인덱스보다 마우스가 호버된 별의 인덱스가 크다면 full 그렇지 않다면 empty
      let imageSource =
        index < drawableLimitIndex ? starImageSourceMap.full : starImageSourceMap.empty;

      if (drawableLimitIndex === index) {
        imageSource = isOverHalf ? starImageSourceMap.full : starImageSourceMap.half;
      }

      // 현재 순환중인 이미지에 src값 할당
      starimage.src = imageSource;
    });
  }

  resetStarPointImages() {
    this.renderStarPointImages();
  }
}

export default StarPoint;
