// -----  基本功能開關   ---------------------------------------------------
window.addEventListener('load', () => {
  topNav(); // 手機版顯示nav選單
  //navSticky(); // 捲動時固定主選單
  xSlider('.language button', '.language ul'); //語系
  //fontSize(); // 全站字體
  fatFooter(); // fatFooter是否要展開
  scrollTables('.tableWrapper'); // table捲動功能

  //webSearch();

  // tab功能
  tabFunction({
    target: '.tabSet',
    openFirst: false, // 預設先展開所有內容，鍵盤的自動開合功能無效
    openSwitch: true, // 是否可開合/切換
    autoClose: true, // 自動關閉其他開啟內容
    modeSwitch: true, // 預設模式自動切換，尺寸以上tab功能，尺寸以下手風琴功能
    width: 767, // 尺寸以上tab功能，尺寸以下手風琴功能
    index: 0, // 預設開啟第幾個
  });

  tableAddDataAttributes({
    elemClass: '.tableList', // 目標table
    dataName: 'title', // tableList樣式 加上 data-title
  });

  // 手風琴功能
  accordionFunction({
    target: '.accordion',
    openFirst: false, // 預設先展開所有內容，鍵盤的自動開合功能無效
    autoClose: true, // 點擊時自動關閉已展開的項目，若需要此功能需要關閉openFirst
    openSwitch: true, // 是否可開合
    index: 0, // 預設開啟第幾個
    info: {
      open: '展開', // 收合時顯示
      close: '收合', // 展開時顯示
    },
  });
});
// -----  基本功能開關   ---------------------------------------------------

// 自行加入的JS請寫在這裡
(function () {
  function adjustMainPadding() {
    var header = document.querySelector('.header');
    var main = document.querySelector('main');
    var headerHeight = header.offsetHeight;

    // 只在螢幕寬度 >= 768px 時執行
    if (window.innerWidth >= 768) {
      main.style.paddingTop = headerHeight + 'px';
    } else {
      main.style.paddingTop = '60px';
    }
  }

  window.onscroll = function () {
    var header = document.querySelector('.header');

    // 判斷螢幕寬度是否大於等於768px
    if (window.innerWidth >= 768) {
      if (window.scrollY > 30) {
        header.classList.add('fixed');
      } else {
        header.classList.remove('fixed');
      }
    } else {
      header.classList.remove('fixed');
    }
  };

  // 當視窗大小改變時，重新檢查
  window.onresize = adjustMainPadding;

  // 當頁面加載時，設置適當的padding-top
  window.onload = adjustMainPadding;
})();

document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('.language button');
  const links = document.querySelectorAll('.language ul a');

  function updateButtonText() {
    const selectedLink = document.querySelector('.language ul a.selected');
    if (selectedLink) {
      // 根據螢幕尺寸設定button的文字
      if (window.innerWidth < 768) {
        button.textContent = selectedLink.getAttribute('data-title');
      } else {
        button.textContent = selectedLink.textContent;
      }
    }
  }

  // 監聽每個連結的點擊事件
  links.forEach((link) => {
    link.addEventListener('click', function () {
      // 移除其他a元素的selected class
      links.forEach((item) => item.classList.remove('selected'));

      // 為當前選中的a元素添加selected class
      this.classList.add('selected');

      // 更新button文字
      updateButtonText();
    });
  });

  // 當視窗大小改變時動態更新button的文字
  window.addEventListener('resize', updateButtonText);

  // 頁面載入時自動更新button的文字
  updateButtonText();
});
