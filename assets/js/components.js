// components.js - 用於加載共用組件

// 當DOM加載完成後執行
document.addEventListener('DOMContentLoaded', function() {
  // 載入頁頭
  if (document.getElementById('header-container')) {
    fetch('./components/header.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('header-container').innerHTML = data;
        // 激活當前頁面的導航項
        activateCurrentNav();
      })
      .catch(error => console.error('載入頁頭時發生錯誤:', error));
  }
  
  // 載入頁腳
  if (document.getElementById('footer-container')) {
    fetch('./components/footer.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('footer-container').innerHTML = data;
      })
      .catch(error => console.error('載入頁腳時發生錯誤:', error));
  }
  
  // 載入影片模態視窗
  if (document.getElementById('video-modal-container')) {
    fetch('./components/video-modal.html')
      .then(response => response.text())
      .then(data => {
        document.getElementById('video-modal-container').innerHTML = data;
      })
      .catch(error => console.error('載入影片模態視窗時發生錯誤:', error));
  }
});

// 根據當前頁面URL激活對應的導航項
function activateCurrentNav() {
  // 等待導航項載入完成
  setTimeout(() => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if ((currentPage === 'index.html' && href === 'index.html') || 
          (currentPage !== 'index.html' && href === currentPage)) {
        link.classList.add('active');
      }
    });
  }, 100);
}