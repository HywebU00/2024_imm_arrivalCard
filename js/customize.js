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
  //cp輪播
  // const cpSwiper = new Swiper('.cpSlider .swiper', {
  //   slidesPerView: 4,
  //   spaceBetween: 20,
  //   loop: false,
  //   // 切換點
  //   pagination: {
  //     el: '.cpSlider .swiperDots',
  //     bulletElement: 'button',
  //     clickable: true,
  //   },
  //   // 切換箭頭
  //   navigation: {
  //     nextEl: '.cpSlider .nextSlider', //自行設定樣式
  //     prevEl: '.cpSlider .prevSlider', //自行設定樣式
  //     disabledClass: 'swiperArrow-disabled', //不可點選樣式
  //   },
  //   breakpoints: {
  //     100: {
  //       slidesPerView: 2,
  //     },
  //     767: {
  //       slidesPerView: 4,
  //     },
  //   },
  // });
})();

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

//=============語系選單===============
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

//
// ================自訂頁籤功能================
const tabItems2 = document.querySelector('.tabItems2');
const tabButtons2 = document.querySelectorAll('.tabItems2 .tabBtn2');
const tabContents2 = document.querySelectorAll('.tabContentGroup2 .tabContent2');

// 確保頁面上有 tabItems2、tabButtons2 和 tabContents2 才執行
if (tabItems2 && tabButtons2.length > 0 && tabContents2.length > 0) {
  let defaultIndex;

  // 判斷父層是否有 class="review"
  const parentElement = tabItems2.closest('.review');
  if (parentElement) {
    // 如果父層有 class="review"，則設定第一個項目為 active
    defaultIndex = 0;
  } else {
    // 預設最後一個項目為 active
    defaultIndex = tabButtons2.length - 1;
  }

  // 設定預設頁籤
  tabButtons2[defaultIndex].classList.add('active');
  tabContents2[defaultIndex].classList.add('active');

  // 為每個按鈕添加點擊事件
  tabButtons2.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      // 如果當前按鈕已經是 active，不進行操作
      if (btn.classList.contains('active')) return;

      // 移除所有按鈕的 active 類別
      tabButtons2.forEach((button) => button.classList.remove('active'));
      // 為點擊的按鈕添加 active 類別
      btn.classList.add('active');

      // 移除所有內容區塊的 active 類別
      tabContents2.forEach((content) => content.classList.remove('active'));
      // 為對應索引的內容區塊添加 active 類別
      tabContents2[index].classList.add('active');
    });
  });

  // 增加滑動動畫
  tabContents2.forEach((content) => {
    content.style.transition = 'opacity 0.3s ease-in-out';
    content.classList.add('fade');
  });
} else {
  console.log('頁面上沒有找到頁籤功能');
}

// ================== 自訂頁籤功能 RWD ================
const tabBtns2 = document.querySelectorAll('.tabBtn2');
const header = document.querySelector('.header');
const tabContentGroup2 = document.querySelector('.tabContentGroup2');
let toggleBtn = null;

// 監聽螢幕寬度變化
function handleResize() {
  const screenWidth = window.innerWidth;
  const activeTabBtn2 = document.querySelector('.tabBtn2.active');

  if (activeTabBtn2) {
    const activeTabBtn2Height = activeTabBtn2.offsetHeight;

    if (screenWidth < 992) {
      tabContentGroup2.style.paddingTop = activeTabBtn2Height + 10 + 'px';

      if (tabBtns2.length > 1) {
        if (!toggleBtn) {
          toggleBtn = document.createElement('a');
          toggleBtn.href = '#';
          toggleBtn.role = 'button';
          toggleBtn.classList.add('toggleBtn');
          toggleBtn.tabIndex = 0;
          tabItems2.appendChild(toggleBtn);

          toggleBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (toggleBtn.classList.contains('open')) {
              toggleBtn.classList.remove('open');
              hideInactiveTabBtns2();
            } else {
              toggleBtn.classList.add('open');
              showAllTabBtns2();
            }
          });
        }

        toggleBtn.style.height = activeTabBtn2Height - 1 + 'px';
        hideInactiveTabBtns2();

        tabBtns2.forEach((btn) => {
          btn.addEventListener('click', function () {
            handleTabClick2(btn);
          });
        });
      } else if (toggleBtn) {
        toggleBtn.remove();
        toggleBtn = null;
      }
    } else {
      tabContentGroup2.style.paddingTop = '0px';

      if (toggleBtn) {
        toggleBtn.remove();
        toggleBtn = null;
        showAllTabBtns2();
      }
    }
  }
}

// 處理每個 tabBtn2 的點擊事件
function handleTabClick2(clickedBtn) {
  tabBtns2.forEach((btn) => {
    if (btn !== clickedBtn) {
      btn.style.display = 'none';
    } else {
      btn.classList.add('active');
    }
  });

  checkTabVisibility2();

  const newActiveTabBtn2Height = clickedBtn.offsetHeight;
  toggleBtn.style.height = newActiveTabBtn2Height + 'px';
  tabContentGroup2.style.paddingTop = newActiveTabBtn2Height + 10 + 'px';
}

// 隱藏所有非 active 的 tabBtns2
function hideInactiveTabBtns2() {
  tabBtns2.forEach((btn) => {
    if (!btn.classList.contains('active')) {
      btn.style.display = 'none';
    } else {
      btn.style.display = 'block';
    }
  });
}

// 顯示所有 tabBtns2
function showAllTabBtns2() {
  tabBtns2.forEach((btn) => {
    btn.style.display = 'block';
  });
}

// 檢查 tabBtn2 是否被隱藏，若有隱藏則移除 toggleBtn 的 open 類別
function checkTabVisibility2() {
  let allVisible = true;
  tabBtns2.forEach((btn) => {
    if (btn.style.display === 'none') {
      allVisible = false;
    }
  });

  if (!allVisible) {
    toggleBtn.classList.remove('open');
  }
}

// 初始執行
handleResize();

// 當螢幕大小改變時，觸發 handleResize
window.addEventListener('resize', handleResize);

// 監聽滾動事件
if (tabButtons2.length > 0 && tabContents2.length > 0) {
  function handleScroll() {
    const screenWidth = window.innerWidth;

    // 只有在螢幕寬度小於768px時才處理
    if (screenWidth < 992) {
      const headerHeight = header ? header.offsetHeight : 0; // 獲取 header 的高度
      const tabItems2Rect = tabItems2.getBoundingClientRect(); // 獲取 tabItems2 相對於視窗頂部的位置
      const tabContentGroup2Rect = tabContentGroup2.getBoundingClientRect(); // 獲取 tabContentGroup2 相對於視窗頂部的位置

      // 檢查 tabItems2 的頂部是否滾動超過 header 高度 + 10px
      if (tabItems2Rect.top <= headerHeight + 10) {
        tabItems2.classList.add('fixed');
      }

      // 檢查 tabContentGroup2 的頂部是否超過 header 高度 + 10px，若是則移除 fixed
      if (tabContentGroup2Rect.top > headerHeight + 10) {
        tabItems2.classList.remove('fixed');
      }
    } else {
      // 螢幕寬度大於等於 768px 時，移除 fixed 類別
      tabItems2.classList.remove('fixed');
    }
  }

  // 初次執行檢查滾動位置
  handleScroll();

  // 監聽頁面滾動事件
  window.addEventListener('scroll', handleScroll);

  // 監聽視窗大小改變事件
  window.addEventListener('resize', handleScroll);
}

// ============自訂下拉選單樣式=============
document.querySelectorAll('.dropdown').forEach((dropdown) => {
  const input = dropdown.querySelector('.dropdownInput');
  const content = dropdown.querySelector('.dropdownContent');
  const items = content.getElementsByClassName('dropdownItem');

  // 點擊 input 顯示下拉選單，並根據空間判斷方向
  input.addEventListener('click', function () {
    toggleDropdownDirection(dropdown, content);
    content.classList.toggle('show');
  });

  // 輸入文字時篩選選項
  input.addEventListener('keyup', function () {
    const filter = input.value.toUpperCase();
    let hasVisibleOption = false;

    for (let i = 0; i < items.length; i++) {
      const txtValue = items[i].textContent || items[i].innerText;
      if (txtValue.toUpperCase().includes(filter)) {
        items[i].style.display = '';
        hasVisibleOption = true;
      } else {
        items[i].style.display = 'none';
      }
    }

    // 如果沒有匹配項目，顯示「無匹配項目」
    if (!hasVisibleOption) {
      if (!content.querySelector('.no-match')) {
        const noMatchDiv = document.createElement('div');
        noMatchDiv.className = 'no-match';
        noMatchDiv.textContent = 'No matching items found';
        content.appendChild(noMatchDiv);
      }
    } else {
      const noMatchDiv = content.querySelector('.no-match');
      if (noMatchDiv) noMatchDiv.remove();
    }
  });

  // 點擊選單項目時將文字填入 input，並關閉下拉選單
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function () {
      // 移除所有項目上的 'selected' 樣式
      Array.from(items).forEach((item) => item.classList.remove('selected'));

      // 為被選取的項目套用 'selected' 樣式
      this.classList.add('selected');

      // 將選取的項目填入 input 中
      input.value = this.textContent;
      content.classList.remove('show');
    });
  }

  // 點擊其他地方時關閉下拉選單
  document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target)) {
      content.classList.remove('show');
    }
  });
});

// 根據視窗高度自動調整展開方向
function toggleDropdownDirection(dropdown, content) {
  // 取得下拉選單的位置和高度
  const dropdownRect = dropdown.getBoundingClientRect();
  const dropdownBottom = dropdownRect.bottom;
  const dropdownHeight = content.scrollHeight;

  // 取得視窗高度
  const windowHeight = window.innerHeight;

  // 判斷剩餘空間是否足夠展開向下的選單
  if (dropdownBottom + dropdownHeight > windowHeight) {
    content.classList.remove('downward');
    content.classList.add('upward');
  } else {
    content.classList.remove('upward');
    content.classList.add('downward');
  }
}
