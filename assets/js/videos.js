// videos.js - 處理影片播放功能

document.addEventListener('DOMContentLoaded', function() {
  // 設置影片預覽點擊事件
  setupVideoPreviewClicks();
  
  // 設置影片卡片點擊事件
  setupVideoCardClicks();
  
  // 處理模態視窗關閉事件，暫停影片播放
  handleModalClose();
});

// 設置影片預覽點擊事件
function setupVideoPreviewClicks() {
  const videoPreviewElements = document.querySelectorAll('.video-preview');
  
  videoPreviewElements.forEach(preview => {
    preview.addEventListener('click', function() {
      const videoId = this.dataset.videoId;
      if (!videoId) return;
      
      // 獲取影片標題和描述
      let videoTitle = "影片教學";
      const imgAlt = this.querySelector('img').getAttribute('alt');
      if (imgAlt) {
        videoTitle = imgAlt;
      }
      
      // 設置並顯示模態視窗
      openVideoModal(videoId, videoTitle);
    });
  });
}

// 設置影片卡片點擊事件
function setupVideoCardClicks() {
  const videoCardElements = document.querySelectorAll('.video-card');
  
  videoCardElements.forEach(card => {
    card.addEventListener('click', function() {
      const videoId = this.dataset.videoId;
      if (!videoId) return;
      
      // 獲取影片標題和描述
      let videoTitle = "影片教學";
      const titleElement = this.querySelector('.card-title');
      if (titleElement) {
        videoTitle = titleElement.textContent;
      }
      
      // 設置並顯示模態視窗
      openVideoModal(videoId, videoTitle);
    });
  });
  
  // 為觀看影片按鈕單獨添加點擊事件
  const watchButtons = document.querySelectorAll('.watch-video-btn');
  watchButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation(); // 阻止事件冒泡，避免觸發卡片的點擊事件
      
      const card = this.closest('.video-card');
      const videoId = card.dataset.videoId;
      if (!videoId) return;
      
      let videoTitle = "影片教學";
      const titleElement = card.querySelector('.card-title');
      if (titleElement) {
        videoTitle = titleElement.textContent;
      }
      
      // 設置並顯示模態視窗
      openVideoModal(videoId, videoTitle);
    });
  });
}

// 打開影片模態視窗
function openVideoModal(videoId, videoTitle) {
  // 確保模態視窗已載入
  const modalElement = document.getElementById('videoModal');
  if (!modalElement) return;
  
  // 等待modal加載完成
  setTimeout(() => {
    const modal = new bootstrap.Modal(modalElement);
    
    // 設置標題
    const titleElement = document.getElementById('videoModalLabel');
    if (titleElement) {
      titleElement.textContent = videoTitle || '影片教學';
    }
    
    // 設置影片來源
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer) {
      const sourceElement = videoPlayer.querySelector('source');
      if (sourceElement) {
        sourceElement.src = `assets/videos/${videoId}`;
        videoPlayer.load(); // 重新載入影片
      } else {
        // 如果沒有source元素，創建一個
        const newSource = document.createElement('source');
        newSource.src = `assets/videos/${videoId}`;
        newSource.type = 'video/mp4';
        videoPlayer.appendChild(newSource);
        videoPlayer.load();
      }
    }
    
    // 顯示模態視窗
    modal.show();
  }, 300);
}

// 處理模態視窗關閉事件，暫停影片播放
function handleModalClose() {
  document.addEventListener('hidden.bs.modal', function(event) {
    if (event.target.id === 'videoModal') {
      const videoPlayer = document.getElementById('videoPlayer');
      if (videoPlayer) {
        videoPlayer.pause();
      }
    }
  });
}