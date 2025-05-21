// main.js - 主要JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
  // 初始化Tooltip
  initTooltips();
  
  // 初始化搜尋功能
  initFaqSearch();
  
  // 初始化頁面切換效果
  initPageTransitions();
  
  // 監聽模板下載按鈕
  trackTemplateDownloads();
});

// 初始化Bootstrap Tooltip
function initTooltips() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  if (tooltipTriggerList.length) {
    tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
}

// 初始化FAQ搜尋功能
function initFaqSearch() {
  const searchInput = document.getElementById('faqSearch');
  if (!searchInput) return;
  
  searchInput.addEventListener('keyup', function() {
    const searchText = this.value.toLowerCase();
    const allQuestions = document.querySelectorAll('.accordion-item');
    
    allQuestions.forEach(item => {
      const questionText = item.querySelector('.accordion-button').textContent.toLowerCase();
      const answerText = item.querySelector('.accordion-body').textContent.toLowerCase();
      
      if (questionText.includes(searchText) || answerText.includes(searchText)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// 初始化頁面切換效果
function initPageTransitions() {
  // 為所有內部鏈接添加淡入淡出效果
  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.indexOf('#') !== 0 && href.indexOf('http') !== 0 && href.indexOf('mailto:') !== 0) {
      link.addEventListener('click', function(e) {
        const targetPage = this.getAttribute('href');
        if (targetPage === window.location.pathname.split('/').pop()) return;
        
        e.preventDefault();
        document.body.classList.add('page-transition-out');
        
        setTimeout(() => {
          window.location.href = targetPage;
        }, 300);
      });
    }
  });
  
  // 頁面載入完成後添加淡入效果
  window.addEventListener('load', function() {
    document.body.classList.add('page-transition-in');
  });
}

// 追蹤模板下載
function trackTemplateDownloads() {
  const downloadButtons = document.querySelectorAll('a[download]');
  
  downloadButtons.forEach(button => {
    button.addEventListener('click', function() {
      const fileName = this.getAttribute('href').split('/').pop();
      
      // 如果有Google Analytics或其他分析工具，可以在這裡添加追蹤代碼
      console.log(`Template downloaded: ${fileName}`);
      
      // 例如，如果使用Google Analytics:
      // if (typeof gtag !== 'undefined') {
      //   gtag('event', 'download', {
      //     'event_category': 'templates',
      //     'event_label': fileName
      //   });
      // }
    });
  });
}

// 添加頁面過渡動畫的CSS
const style = document.createElement('style');
style.textContent = `
  body {
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  body.page-transition-out {
    opacity: 0;
  }
  body.page-transition-in {
    opacity: 0;
    animation: fadeIn 0.5s ease forwards;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);