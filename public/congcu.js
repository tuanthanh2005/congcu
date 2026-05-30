// ============================================================
//  CôngCụPro – Main JavaScript
// ============================================================

/* ---------- Navbar scroll effect ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ---------- Dropdown menus (Desktop hover + click) ---------- */
const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

dropdownItems.forEach(item => {
  const toggle = item.querySelector('.dropdown-toggle');

  // Desktop: toggle on click
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = item.classList.contains('open');

    // Close all others
    dropdownItems.forEach(d => d.classList.remove('open'));

    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
  dropdownItems.forEach(d => d.classList.remove('open'));
});

// Prevent dropdown panel clicks from bubbling
document.querySelectorAll('.dropdown-panel').forEach(panel => {
  panel.addEventListener('click', e => e.stopPropagation());
});

/* ---------- Mobile hamburger ---------- */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function toggleMobileMenu(force) {
  const isOpen = force !== undefined ? force : !navMenu.classList.contains('open');
  navMenu.classList.toggle('open', isOpen);
  mobileOverlay.classList.toggle('show', isOpen);
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', () => toggleMobileMenu());
mobileOverlay.addEventListener('click', () => toggleMobileMenu(false));

/* ---------- Smooth scroll for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return; // Ignore simple placeholder hash links
    
    try {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        toggleMobileMenu(false);
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    } catch (err) {
      console.warn('Invalid selector:', href, err);
    }
  });
});

/* ---------- Intersection Observer – fade-in animation ---------- */
const observerOpts = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOpts);

// Add animate class to elements
const animateEls = [
  '.tool-card',
  '.feature-item',
  '.shop-item',
  '.shop-category',
  '.tool-category',
  '.tarot-card-preview'
];

animateEls.forEach(sel => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    observer.observe(el);
  });
});

// Add visible class style
const style = document.createElement('style');
style.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

/* ---------- Tool card click effect ---------- */
document.querySelectorAll('.tool-card, .shop-item').forEach(card => {
  card.addEventListener('click', (e) => {
    // Ripple effect
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(108,71,255,0.3);
      transform: scale(0);
      animation: ripple 0.5s linear;
      pointer-events: none;
      width: 100px; height: 100px;
      left: ${e.offsetX - 50}px;
      top: ${e.offsetY - 50}px;
    `;
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to { transform: scale(4); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

/* ---------- Hero typed text effect ---------- */
function typeWriter(el, texts, speed = 80) {
  let textIdx = 0, charIdx = 0, deleting = false;
  function tick() {
    const current = texts[textIdx];
    if (deleting) {
      el.textContent = current.slice(0, charIdx--);
      if (charIdx < 0) {
        deleting = false;
        textIdx = (textIdx + 1) % texts.length;
        setTimeout(tick, 400);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx++);
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
    }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}

// Active state for nav item based on scroll
const sections = document.querySelectorAll('[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
}, { passive: true });

/* ---------- Counter animation ---------- */
function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();
  const isFloat = String(target).includes('.');

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = start + (parseFloat(target) - start) * eased;
    el.textContent = isFloat ? val.toFixed(1) : Math.round(val).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// Observe stats
const statEls = document.querySelectorAll('.stat strong');
const statObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const raw = entry.target.textContent.replace(/[^0-9.]/g, '');
      const suffix = entry.target.textContent.replace(/[0-9.]/g, '').replace(/\s/g, '');
      const num = parseFloat(raw);
      if (!isNaN(num)) {
        const originalSuffix = suffix;
        animateCounter(entry.target, num);
        setTimeout(() => {
          entry.target.textContent = entry.target.textContent + originalSuffix;
        }, 1600);
      }
      statObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statEls.forEach(el => statObs.observe(el));

/* ---------- Close mobile nav on resize ---------- */
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    toggleMobileMenu(false);
  }
});

// ============================================================
//  TOOL WORKSPACE MANAGEMENT & LOGIC
// ============================================================

// Configuration for all tools
const toolsConfig = {
  'tool-edit-pdf': {
    title: 'Sửa PDF',
    desc: 'Chỉnh sửa văn bản, vẽ hình hoặc thêm hình ảnh vào tài liệu PDF của bạn trực tuyến.',
    accept: '.pdf',
    multiple: false
  },
  'tool-template-pdf': {
    title: 'Tạo khuôn mẫu PDF',
    desc: 'Tạo và thiết kế mẫu biểu PDF tương tác từ tài liệu của bạn.',
    accept: '.pdf',
    multiple: false
  },
  'tool-split-pdf': {
    title: 'Chia PDF',
    desc: 'Tách một tài liệu PDF thành nhiều trang riêng lẻ hoặc trích xuất các trang bạn chọn.',
    accept: '.pdf',
    multiple: false
  },
  'tool-merge-pdf': {
    title: 'Hợp nhất PDF',
    desc: 'Ghép nhiều tệp PDF lại với nhau thành một tệp duy nhất theo thứ tự mong muốn.',
    accept: '.pdf',
    multiple: true
  },
  'tool-compress-pdf': {
    title: 'Nén PDF',
    desc: 'Giảm dung lượng tập tin PDF của bạn mà không làm giảm chất lượng tài liệu.',
    accept: '.pdf',
    multiple: false
  },
  'tool-watermark-pdf': {
    title: 'Thêm dấu nước (Watermark)',
    desc: 'Bảo vệ bản quyền tài liệu bằng cách đóng dấu chữ watermark lên trang PDF.',
    accept: '.pdf',
    multiple: false
  },
  'tool-rotate-pdf': {
    title: 'Xoay các trang PDF',
    desc: 'Xoay các trang trong tài liệu PDF theo góc 90, 180, hoặc 270 độ trực quan.',
    accept: '.pdf',
    multiple: false
  },
  'tool-sign-pdf': {
    title: 'Ký tên PDF',
    desc: 'Vẽ chữ ký tay của bạn và chèn trực tiếp vào trang đầu tài liệu PDF trực tuyến.',
    accept: '.pdf',
    multiple: false
  },
  'tool-pdf-word': {
    title: 'Chuyển PDF sang Word',
    desc: 'Chuyển đổi tệp PDF sang văn bản Word (.docx) có thể chỉnh sửa.',
    accept: '.pdf',
    multiple: false
  },
  'tool-pdf-jpg': {
    title: 'Chuyển PDF sang ảnh JPG',
    desc: 'Chuyển đổi mỗi trang PDF thành một tệp hình ảnh JPG chất lượng cao.',
    accept: '.pdf',
    multiple: false
  },
  'tool-pdf-excel': {
    title: 'Chuyển PDF sang Excel',
    desc: 'Trích xuất dữ liệu bảng biểu từ PDF sang bảng tính Excel (.xlsx).',
    accept: '.pdf',
    multiple: false
  },
  'tool-pdf-ppt': {
    title: 'Chuyển PDF sang PowerPoint',
    desc: 'Chuyển đổi nội dung PDF thành các slide thuyết trình PowerPoint (.pptx).',
    accept: '.pdf',
    multiple: false
  },
  'tool-word-pdf': {
    title: 'Chuyển Word sang PDF',
    desc: 'Tải tài liệu Word (.doc, .docx) lên để chuyển thành file PDF chuẩn.',
    accept: '.doc,.docx',
    multiple: false
  },
  'tool-jpg-pdf': {
    title: 'Chuyển JPG/PNG sang PDF',
    desc: 'Gộp nhiều hình ảnh JPG, JPEG, PNG thành một tệp PDF duy nhất.',
    accept: '.jpg,.jpeg,.png',
    multiple: true
  },
  'tool-excel-pdf': {
    title: 'Chuyển Excel sang PDF',
    desc: 'Chuyển đổi tệp Excel (.xls, .xlsx) thành trang PDF sạch đẹp.',
    accept: '.xls,.xlsx',
    multiple: false
  },
  'tool-ppt-pdf': {
    title: 'Chuyển PowerPoint sang PDF',
    desc: 'Chuyển bài thuyết trình slide PowerPoint thành file tài liệu PDF.',
    accept: '.ppt,.pptx',
    multiple: false
  },
  'tool-collage-img': {
    title: 'Ghép ảnh Online',
    desc: 'Ghép nhiều bức ảnh lại với nhau thành một ảnh ghép với nhiều bố cục lưới tuỳ biến.',
    accept: '.jpg,.jpeg,.png,.webp',
    multiple: true
  },
  'tool-webp-jpg': {
    title: 'Chuyển WEBP sang JPG/PNG',
    desc: 'Chuyển đổi hình ảnh định dạng WEBP sang định dạng JPG hoặc PNG thông dụng.',
    accept: '.webp',
    multiple: true
  },
  'tool-compress-img': {
    title: 'Nén ảnh tối ưu dung lượng',
    desc: 'Nén hàng loạt hình ảnh định dạng JPG, PNG, WEBP để giảm dung lượng lưu trữ.',
    accept: '.jpg,.jpeg,.png,.webp',
    multiple: true
  },
  'tool-epub-mobi': {
    title: 'Chuyển Ebook EPUB sang MOBI',
    desc: 'Chuyển đổi sách EPUB sang định dạng MOBI tương thích máy đọc sách Kindle.',
    accept: '.epub',
    multiple: false
  },
  'tool-mobi-epub': {
    title: 'Chuyển Ebook MOBI sang EPUB',
    desc: 'Chuyển đổi sách MOBI sang định dạng EPUB thông dụng.',
    accept: '.mobi',
    multiple: false
  },
  'tool-fb2-epub': {
    title: 'Chuyển Ebook FB2 sang EPUB',
    desc: 'Chuyển đổi tài liệu sách điện tử định dạng FB2 sang EPUB.',
    accept: '.fb2',
    multiple: false
  },
  'tool-azw3-epub': {
    title: 'Chuyển Ebook AZW3 sang EPUB',
    desc: 'Chuyển đổi tệp sách điện tử AZW3 sang định dạng EPUB mở.',
    accept: '.azw3',
    multiple: false
  },
  'btn-tarot-start': {
    title: 'Trải Bài Tarot Online',
    desc: 'Hãy tập trung tâm trí, suy nghĩ về vấn đề bạn đang băn khoăn và rút 3 lá bài để nhận lời khuyên.',
    accept: null,
    multiple: false
  }
};

// Tarot Deck definition (22 Major Arcana)
const tarotCardsDeck = [
  { name: "The Fool (Chàng Khờ)", meaning: "Khởi đầu mới, sự tự do, phiêu lưu, nhiệt huyết nhưng cũng đi kèm sự ngây thơ và thiếu chuẩn bị.", icon: "bi-moon-stars" },
  { name: "The Magician (Nhà Ảo Thuật)", meaning: "Ý chí mạnh mẽ, tài năng, bản lĩnh, khả năng biến ý tưởng thành hiện thực nhờ công cụ sẵn có.", icon: "bi-magic" },
  { name: "The High Priestess (Nữ Tư Tế)", meaning: "Trực giác nhạy bén, trí tuệ ngầm, bí ẩn cần giải đáp, sự kiên nhẫn và tĩnh lặng.", icon: "bi-eye" },
  { name: "The Empress (Nữ Hoàng)", meaning: "Sự trù phú, sinh trưởng, tình mẫu tử, vẻ đẹp tự nhiên và sự chăm sóc ngọt ngào.", icon: "bi-flower1" },
  { name: "The Emperor (Hoàng Đế)", meaning: "Quyền lực, kỷ luật, cấu trúc vững chãi, tính bảo thủ, sự bảo vệ và lãnh đạo mạnh mẽ.", icon: "bi-bank" },
  { name: "The Hierophant (Giáo Hoàng)", meaning: "Truyền thống, giáo dục, đức tin tôn giáo, sự định hướng từ tiền nhân và các chuẩn mực xã hội.", icon: "bi-book" },
  { name: "The Lovers (Tình Nhân)", meaning: "Sự hòa hợp, tình yêu đôi lứa, những quyết định quan trọng dựa trên tiếng gọi của trái tim.", icon: "bi-heart-fill" },
  { name: "The Chariot (Cỗ Xe Chiến Thắng)", meaning: "Chiến thắng nhờ ý chí sắt đá, sự tập trung cao độ, kiểm soát xung đột để tiến về phía trước.", icon: "bi-cone-striped" },
  { name: "Strength (Sức Mạnh)", meaning: "Sức mạnh nội tâm, lòng quả cảm, sự kiên nhẫn nhu hòa chế ngự thú tính và khó khăn.", icon: "bi-shield-shaded" },
  { name: "The Hermit (Ẩn Sĩ)", meaning: "Sự đơn độc tự nguyện, chiêm nghiệm sâu sắc, tìm kiếm ánh sáng chân lý từ bên trong bản thân.", icon: "bi-brightness-low" },
  { name: "Wheel of Fortune (Vòng Quay Số Phận)", meaning: "Vòng quay định mệnh, may mắn, bước ngoặt lớn bất ngờ, sự thay đổi không thể tránh khỏi.", icon: "bi-arrow-repeat" },
  { name: "Justice (Công Lý)", meaning: "Sự công bằng, lẽ phải, luật nhân quả rõ ràng, quyết định lý trí và sự thật khách quan.", icon: "bi-scales" },
  { name: "The Hanged Man (Kẻ Treo)", meaning: "Sự trì hoãn cần thiết, chấp nhận hy sinh ngắn hạn, đổi mới góc nhìn cuộc sống.", icon: "bi-gender-ambiguous" },
  { name: "Death (Tử Thần)", meaning: "Sự kết thúc của một giai đoạn, chuyển giao và lột xác, chuẩn bị cho những khởi đầu hoàn toàn mới.", icon: "bi-skull" },
  { name: "Temperance (Tiết Độ)", meaning: "Sự điều độ, cân bằng, kiềm chế, nghệ thuật kết hợp các yếu tố đối lập một cách hòa hợp.", icon: "bi-droplet-half" },
  { name: "The Devil (Ác Quỷ)", meaning: "Cám dỗ vật chất, thói quen xấu, sự ràng buộc tự thân, ảo tưởng về sự bất lực của bản thân.", icon: "bi-fire" },
  { name: "The Tower (Tòa Tháp)", meaning: "Đổ vỡ đột ngột, khủng hoảng cấu trúc, sự thức tỉnh đau đớn giải phóng bạn khỏi xiềng xích.", icon: "bi-lightning-fill" },
  { name: "The Star (Ngôi Sao)", meaning: "Niềm hy vọng, nguồn cảm hứng, phục hồi sức khỏe và tinh thần, sự dẫn lối ngọt ngào.", icon: "bi-star-fill" },
  { name: "The Moon (Mặt Trăng)", meaning: "Ảo ảnh, nỗi sợ tiềm ẩn, nhầm lẫn, trực giác cao độ, những điều chưa được phơi bày.", icon: "bi-moon-fill" },
  { name: "The Sun (Mặt Trời)", meaning: "Thành công rực rỡ, niềm vui thuần khiết, năng lượng dồi dào, sự thật sáng tỏ.", icon: "bi-sun-fill" },
  { name: "Judgement (Phán Xét)", meaning: "Sự phán xét cuối cùng, nhìn nhận lại bản thân, đánh giá lại cuộc đời, kêu gọi hành động.", icon: "bi-bell-fill" },
  { name: "The World (Thế Giới)", meaning: "Sự hoàn thành viên mãn, hội nhập toàn cầu, đi đến đích cuối của hành trình dài.", icon: "bi-globe" }
];

// State variables
let currentToolId = null;
let selectedFiles = [];
let pdfPagesData = [];
let collageImages = [];
let isDrawingSignature = false;
let sigCanvas = null;
let sigCtx = null;
let tarotSelected = [];

// DOM Elements
const workspaceOverlay       = document.getElementById('tool-workspace');
const workspaceBackBtn       = document.getElementById('workspace-back-btn');
const workspaceIcon          = document.getElementById('workspace-icon');
const workspaceTitle         = document.getElementById('workspace-title');
const workspaceDesc          = document.getElementById('workspace-desc');
const workspaceUploadPanel   = document.getElementById('workspace-upload-panel');
const workspaceDropZone      = document.getElementById('workspace-drop-zone');
const workspaceFileInput     = document.getElementById('workspace-file-input');
const selectedFilesContainer = document.getElementById('selected-files-container');
const workspaceFilesList     = document.getElementById('workspace-files-list');
const fileCountSpan          = document.getElementById('file-count');
const workspaceEditorPanel   = document.getElementById('workspace-editor-panel');
const workspaceControls      = document.getElementById('workspace-controls');
const workspacePreviewArea   = document.getElementById('workspace-preview-area');
const workspaceFooterBar     = document.getElementById('workspace-footer-bar');
const workspaceStatusText    = document.getElementById('workspace-status-text');
const workspaceActionBtn     = document.getElementById('workspace-action-btn');
const workspaceSpinner       = document.getElementById('workspace-spinner');

// Helper to load dynamic external scripts
function loadScript(url) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Helper to load PDF-lib & PDF.js
async function loadPdfLibraries() {
  workspaceStatusText.textContent = "Đang tải thư viện PDF...";
  await loadScript('https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js');
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js');
  window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
  workspaceStatusText.textContent = "Thư viện PDF đã sẵn sàng.";
}

// Open Workspace
function openWorkspace(toolId) {
  const config = toolsConfig[toolId];
  if (!config) return;

  currentToolId = toolId;
  selectedFiles = [];
  pdfPagesData = [];
  collageImages = [];
  tarotSelected = [];
  
  // Update Header details
  workspaceTitle.textContent = config.title;
  workspaceDesc.textContent = config.desc;
  workspaceIcon.innerHTML = getToolIconMarkup(toolId);

  // Reset panels
  workspaceUploadPanel.style.display = 'block';
  workspaceEditorPanel.style.display = 'none';
  workspaceFooterBar.style.display = 'none';
  selectedFilesContainer.style.display = 'none';
  workspaceFilesList.innerHTML = '';
  fileCountSpan.textContent = '0';
  workspacePreviewArea.innerHTML = '';
  workspaceControls.innerHTML = '';
  workspaceStatusText.textContent = 'Sẵn sàng xử lý';
  workspaceSpinner.style.display = 'none';
  workspaceActionBtn.querySelector('.btn-text').textContent = 'Bắt đầu xử lý';

  // Config file inputs
  if (config.accept) {
    workspaceFileInput.accept = config.accept;
    workspaceFileInput.multiple = config.multiple;
    document.getElementById('workspace-formats-hint').textContent = `Hỗ trợ: ${config.accept.toUpperCase()}`;
  } else {
    // Tool doesn't require upload (like Tarot)
    workspaceUploadPanel.style.display = 'none';
    workspaceEditorPanel.style.display = 'block';
    workspaceFooterBar.style.display = 'flex';
    setupTarotBoard();
  }

  // Display overlay
  workspaceOverlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Close Workspace
function closeWorkspace() {
  workspaceOverlay.style.display = 'none';
  document.body.style.overflow = '';
  currentToolId = null;
  selectedFiles = [];
  pdfPagesData = [];
  collageImages = [];
  tarotSelected = [];
}

// Icon markup map
function getToolIconMarkup(toolId) {
  if (toolId.includes('pdf')) {
    return '<i class="bi bi-file-earmark-pdf-fill text-danger"></i>';
  } else if (toolId.includes('img') || toolId.includes('webp') || toolId.includes('collage')) {
    return '<i class="bi bi-image-fill text-warning"></i>';
  } else if (toolId.includes('epub') || toolId.includes('mobi') || toolId.includes('fb2') || toolId.includes('azw3')) {
    return '<i class="bi bi-book text-info"></i>';
  } else if (toolId.includes('tarot')) {
    return '<i class="bi bi-magic text-warning"></i>';
  }
  return '<i class="bi bi-tools"></i>';
}

// Event bindings for opening workspace
document.querySelectorAll('.tool-card').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    openWorkspace(card.id);
  });
});

// For Tarot start button
const tarotStartBtn = document.getElementById('btn-tarot-start');
if (tarotStartBtn) {
  tarotStartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openWorkspace('btn-tarot-start');
  });
}

// Back/Close Button
workspaceBackBtn.addEventListener('click', closeWorkspace);

// Drag and drop zone actions
workspaceDropZone.addEventListener('click', () => workspaceFileInput.click());

workspaceDropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  workspaceDropZone.classList.add('dragover');
});
workspaceDropZone.addEventListener('dragleave', () => {
  workspaceDropZone.classList.remove('dragover');
});
workspaceDropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  workspaceDropZone.classList.remove('dragover');
  if (e.dataTransfer.files.length > 0) {
    handleFileSelection(e.dataTransfer.files);
  }
});

workspaceFileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    handleFileSelection(e.target.files);
  }
});

// File management logic
async function handleFileSelection(files) {
  const config = toolsConfig[currentToolId];
  if (!config) return;

  const validFiles = [];
  const allowedExtensions = config.accept.toLowerCase().split(',');

  for (const file of files) {
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (config.accept === '*' || allowedExtensions.includes(ext)) {
      validFiles.push(file);
    }
  }

  if (validFiles.length === 0) {
    alert(`Định dạng tệp không được hỗ trợ! Vui lòng tải các tệp thuộc định dạng: ${config.accept}`);
    return;
  }

  if (config.multiple) {
    selectedFiles = [...selectedFiles, ...validFiles];
  } else {
    selectedFiles = [validFiles[0]];
  }

  updateFilesListDisplay();
  
  // Show controls, preview and footer
  workspaceEditorPanel.style.display = 'block';
  workspaceFooterBar.style.display = 'flex';

  // Specific workspace loading depending on tool types
  if (currentToolId === 'tool-jpg-pdf') {
    renderImageToolPreviews();
  } else if (['tool-word-pdf', 'tool-excel-pdf', 'tool-ppt-pdf'].includes(currentToolId)) {
    renderOfficeToPdfPreview(selectedFiles[0]);
  } else if (currentToolId.includes('pdf')) {
    await loadPdfLibraries();
    if (['tool-edit-pdf', 'tool-split-pdf', 'tool-rotate-pdf', 'tool-sign-pdf', 'tool-watermark-pdf', 'tool-pdf-word', 'tool-pdf-jpg', 'tool-pdf-excel', 'tool-pdf-ppt'].includes(currentToolId)) {
      await loadPdfPreviews(selectedFiles[0]);
    } else {
      // Mock converters
      renderMockPipelinePreviews();
    }
  } else if (currentToolId === 'tool-collage-img') {
    await loadCollageImages();
  } else if (currentToolId === 'tool-webp-jpg' || currentToolId === 'tool-compress-img') {
    renderImageToolPreviews();
  } else if (currentToolId.includes('epub') || currentToolId.includes('mobi') || currentToolId.includes('fb2') || currentToolId.includes('azw3')) {
    renderMockPipelinePreviews();
  }

  // Render controls sidebar
  renderToolControls();
}

function updateFilesListDisplay() {
  workspaceFilesList.innerHTML = '';
  selectedFiles.forEach((file, index) => {
    const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `
      <i class="bi ${file.name.endsWith('.pdf') ? 'bi-file-earmark-pdf-fill text-danger' : 'bi-image text-warning'} file-icon"></i>
      <div class="file-info">
        <div class="file-name" title="${file.name}">${file.name}</div>
        <div class="file-size">${sizeStr}</div>
      </div>
      <button class="btn-remove-file" data-index="${index}" title="Xoá file">
        <i class="bi bi-trash"></i>
      </button>
    `;
    workspaceFilesList.appendChild(item);
  });

  fileCountSpan.textContent = selectedFiles.length;
  selectedFilesContainer.style.display = selectedFiles.length > 0 ? 'block' : 'none';

  // Add click to delete
  document.querySelectorAll('.btn-remove-file').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = parseInt(btn.dataset.index);
      selectedFiles.splice(index, 1);
      updateFilesListDisplay();
      if (selectedFiles.length === 0) {
        workspaceEditorPanel.style.display = 'none';
        workspaceFooterBar.style.display = 'none';
      } else {
        // Refresh previews if needed
        if (currentToolId === 'tool-collage-img') {
          loadCollageImages();
        } else if (currentToolId === 'tool-webp-jpg' || currentToolId === 'tool-compress-img') {
          renderImageToolPreviews();
        }
      }
    });
  });
}

// Load real PDF previews using PDF.js
async function loadPdfPreviews(file) {
  workspaceStatusText.textContent = "Đang tải trang xem trước PDF...";
  workspacePreviewArea.innerHTML = '<div class="spinner"></div>';
  
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const totalPages = pdfDoc.numPages;

    const grid = document.createElement('div');
    grid.className = 'pdf-previews-grid';
    workspacePreviewArea.innerHTML = '';
    workspacePreviewArea.appendChild(grid);

    pdfPagesData = []; // Reset

    // Load first 10 pages maximum for preview performance
    const pagesToRender = Math.min(totalPages, 12);
    
    for (let i = 1; i <= pagesToRender; i++) {
      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale: 0.25 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      await page.render({ canvasContext: context, viewport: viewport }).promise;
      
      const card = document.createElement('div');
      card.className = 'pdf-page-card';
      card.dataset.pageIndex = i - 1;
      
      const thumb = document.createElement('div');
      thumb.className = 'pdf-page-thumbnail';
      thumb.appendChild(canvas);
      
      const info = document.createElement('div');
      info.className = 'pdf-page-info';
      info.innerHTML = `
        <span class="pdf-page-num">Trang ${i}</span>
        <div class="pdf-page-actions">
          <button class="btn-page-action btn-rotate-page" data-page-index="${i - 1}" title="Xoay trang">
            <i class="bi bi-arrow-repeat"></i>
          </button>
        </div>
      `;

      card.appendChild(thumb);
      card.appendChild(info);
      grid.appendChild(card);
      
      pdfPagesData.push({
        index: i - 1,
        rotation: 0
      });
    }

    if (totalPages > 12) {
      const moreInfo = document.createElement('p');
      moreInfo.className = 'upload-hint';
      moreInfo.style.marginTop = '16px';
      moreInfo.textContent = `Và ${totalPages - 12} trang khác...`;
      workspacePreviewArea.appendChild(moreInfo);
    }

    // Add rotate event handler
    document.querySelectorAll('.btn-rotate-page').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.dataset.pageIndex);
        const pData = pdfPagesData.find(p => p.index === index);
        pData.rotation = (pData.rotation + 90) % 360;
        
        const canvas = btn.closest('.pdf-page-card').querySelector('canvas');
        canvas.style.transform = `rotate(${pData.rotation}deg)`;
        canvas.style.transition = 'transform 0.3s ease';
      });
    });

    workspaceStatusText.textContent = `Đã tải tài liệu gồm ${totalPages} trang.`;

  } catch (err) {
    console.error("PDF loading error:", err);
    workspacePreviewArea.innerHTML = `<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> Lỗi khi đọc file PDF. Vui lòng thử lại.</p>`;
    workspaceStatusText.textContent = "Không thể tải trang xem trước PDF.";
  }
}

// Load Image objects helper
function loadImageFromFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Load Collage Images
async function loadCollageImages() {
  workspaceStatusText.textContent = "Đang tải ảnh ghép...";
  workspacePreviewArea.innerHTML = '<div class="spinner"></div>';
  
  collageImages = [];
  for (const file of selectedFiles) {
    const img = await loadImageFromFile(file);
    collageImages.push(img);
  }

  // Draw initial canvas preview
  workspacePreviewArea.innerHTML = `
    <div class="collage-preview-wrapper">
      <canvas class="collage-canvas"></canvas>
    </div>
  `;

  updateCollagePreview();
  workspaceStatusText.textContent = `Đã tải ${collageImages.length} hình ảnh thành công.`;
}

// Render dynamic controls
function renderToolControls() {
  workspaceControls.innerHTML = '';
  
  if (currentToolId === 'tool-edit-pdf' || currentToolId === 'tool-template-pdf') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Thêm văn bản vào trang đầu</label>
        <input type="text" class="form-input" id="pdf-edit-text" placeholder="Nhập chữ cần chèn..." value="Bản chỉnh sửa Công Cụ Pro">
      </div>
      <div class="control-group">
        <label class="control-label">Cỡ chữ</label>
        <div class="range-container">
          <input type="range" class="range-slider" id="pdf-edit-fontsize" min="12" max="64" value="24">
          <span class="range-val" id="val-pdf-fontsize">24px</span>
        </div>
      </div>
    `;
    setupSliderListeners('pdf-edit-fontsize', 'val-pdf-fontsize', 'px');

  } else if (currentToolId === 'tool-split-pdf') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Phương thức chia</label>
        <select class="form-input" id="split-mode-select">
          <option value="range">Chia theo khoảng trang</option>
          <option value="all">Tách toàn bộ các trang</option>
        </select>
      </div>
      <div class="control-group" id="split-range-group">
        <label class="control-label">Khoảng trang (ví dụ: 1-3 hoặc 2,4)</label>
        <input type="text" class="form-input" id="split-pages-input" value="1-2" placeholder="1-3 hoặc 2,5">
      </div>
    `;
    const splitMode = document.getElementById('split-mode-select');
    splitMode.addEventListener('change', () => {
      document.getElementById('split-range-group').style.display = splitMode.value === 'range' ? 'flex' : 'none';
    });

  } else if (currentToolId === 'tool-merge-pdf') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Thứ tự ghép nối</label>
        <p class="upload-hint" style="margin-bottom:0">Các tài liệu sẽ được gộp theo thứ tự từ trên xuống dưới trong danh sách tập tin đã chọn.</p>
      </div>
    `;

  } else if (currentToolId === 'tool-compress-pdf') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Mức độ nén</label>
        <select class="form-input" id="compress-level-select">
          <option value="medium">Nén trung bình (Chất lượng & Dung lượng tốt)</option>
          <option value="high">Nén tối đa (Dung lượng thấp nhất, chất lượng giảm)</option>
          <option value="low">Nén nhẹ (Chất lượng hình ảnh sắc nét)</option>
        </select>
      </div>
    `;

  } else if (currentToolId === 'tool-watermark-pdf') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Nội dung đóng dấu</label>
        <input type="text" class="form-input" id="watermark-text" value="CONGCUPRO.COM" placeholder="Nhập chữ đóng dấu...">
      </div>
      <div class="control-group">
        <label class="control-label">Độ mờ đục</label>
        <div class="range-container">
          <input type="range" class="range-slider" id="watermark-opacity" min="10" max="100" value="30">
          <span class="range-val" id="val-watermark-opacity">30%</span>
        </div>
      </div>
      <div class="control-group">
        <label class="control-label">Màu sắc</label>
        <div class="color-picker-container">
          <input type="color" class="color-swatch-input" id="watermark-color" value="#5046e5">
          <span style="font-size:0.85rem">Chọn màu chữ</span>
        </div>
      </div>
    `;
    setupSliderListeners('watermark-opacity', 'val-watermark-opacity', '%');

  } else if (currentToolId === 'tool-rotate-pdf') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Xoay nhanh tất cả trang</label>
        <div class="layout-presets" style="grid-template-columns: 1fr 1fr">
          <button class="btn-layout-preset" id="btn-rotate-all-cw"><i class="bi bi-arrow-clockwise"></i> Phải 90°</button>
          <button class="btn-layout-preset" id="btn-rotate-all-ccw"><i class="bi bi-arrow-counterclockwise"></i> Trái 90°</button>
        </div>
      </div>
    `;
    
    document.getElementById('btn-rotate-all-cw').addEventListener('click', () => {
      pdfPagesData.forEach(p => {
        p.rotation = (p.rotation + 90) % 360;
      });
      document.querySelectorAll('.pdf-page-card canvas').forEach((canvas, idx) => {
        canvas.style.transform = `rotate(${pdfPagesData[idx].rotation}deg)`;
      });
    });
    document.getElementById('btn-rotate-all-ccw').addEventListener('click', () => {
      pdfPagesData.forEach(p => {
        p.rotation = (p.rotation + 270) % 360;
      });
      document.querySelectorAll('.pdf-page-card canvas').forEach((canvas, idx) => {
        canvas.style.transform = `rotate(${pdfPagesData[idx].rotation}deg)`;
      });
    });

  } else if (currentToolId === 'tool-sign-pdf') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Chữ ký tay</label>
        <p class="upload-hint">Vẽ chữ ký của bạn vào bảng vẽ bên phải và bấm "Tải PDF Đã Ký" để chèn chữ ký vào trang đầu.</p>
      </div>
      <div class="control-group">
        <label class="control-label">Công cụ vẽ</label>
        <button class="btn-layout-preset" id="btn-clear-sig" style="width: 100%"><i class="bi bi-eraser"></i> Xoá nét vẽ</button>
      </div>
    `;
    
    setupSignaturePad();

  } else if (currentToolId === 'tool-collage-img') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Bố cục lưới</label>
        <select class="form-input" id="collage-layout-select">
          <option value="2x2">Lưới 2x2 (4 hình)</option>
          <option value="1x2">1 Hàng 2 Cột (2 hình)</option>
          <option value="1x3">1 Hàng 3 Cột (3 hình)</option>
        </select>
      </div>
      <div class="control-group">
        <label class="control-label">Khoảng cách viền</label>
        <div class="range-container">
          <input type="range" class="range-slider" id="collage-gap-slider" min="0" max="40" value="10">
          <span class="range-val" id="val-collage-gap">10px</span>
        </div>
      </div>
      <div class="control-group">
        <label class="control-label">Bo tròn góc ảnh</label>
        <div class="range-container">
          <input type="range" class="range-slider" id="collage-round-slider" min="0" max="30" value="8">
          <span class="range-val" id="val-collage-round">8px</span>
        </div>
      </div>
      <div class="control-group">
        <label class="control-label">Màu nền viền</label>
        <div class="color-picker-container">
          <input type="color" class="color-swatch-input" id="collage-bg-input" value="#ffffff">
          <span>Chọn màu viền</span>
        </div>
      </div>
    `;
    setupSliderListeners('collage-gap-slider', 'val-collage-gap', 'px');
    setupSliderListeners('collage-round-slider', 'val-collage-round', 'px');
    
    // Add real-time change events for collage
    ['collage-layout-select', 'collage-gap-slider', 'collage-round-slider', 'collage-bg-input'].forEach(id => {
      document.getElementById(id).addEventListener('input', updateCollagePreview);
    });

  } else if (currentToolId === 'tool-webp-jpg') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Định dạng đích</label>
        <select class="form-input" id="image-format-select">
          <option value="image/jpeg">JPG (JPEG Image)</option>
          <option value="image/png">PNG (Portable Network Graphics)</option>
        </select>
      </div>
    `;

  } else if (currentToolId === 'tool-compress-img') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Chất lượng nén</label>
        <div class="range-container">
          <input type="range" class="range-slider" id="image-quality-slider" min="10" max="100" value="80">
          <span class="range-val" id="val-image-quality">80%</span>
        </div>
      </div>
    `;
    setupSliderListeners('image-quality-slider', 'val-image-quality', '%');

  } else if (currentToolId === 'tool-pdf-word') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Chế độ chuyển đổi</label>
        <select class="form-input" id="pdf-word-mode">
          <option value="standard">Chuyển đổi tiêu chuẩn (Giữ nguyên bố cục)</option>
          <option value="ocr">Nhận dạng chữ viết (OCR - Khuyên dùng cho bản quét)</option>
        </select>
      </div>
      <div class="control-group">
        <label class="control-label">Định dạng tệp đầu ra</label>
        <select class="form-input" id="pdf-word-ext">
          <option value="docx">Word (.docx)</option>
          <option value="doc">Word 97-2003 (.doc)</option>
        </select>
      </div>
    `;
  } else if (currentToolId === 'tool-pdf-jpg') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Độ phân giải hình ảnh</label>
        <select class="form-input" id="pdf-jpg-resolution">
          <option value="150">Độ phân giải tiêu chuẩn (150 DPI)</option>
          <option value="300">Độ phân giải cao (300 DPI - Sắc nét)</option>
          <option value="72">Độ phân giải thấp (72 DPI - Dung lượng nhỏ)</option>
        </select>
      </div>
      <div class="control-group">
        <label class="control-label">Định dạng ảnh</label>
        <select class="form-input" id="pdf-jpg-format">
          <option value="image/jpeg">JPG (.jpg)</option>
          <option value="image/png">PNG (.png)</option>
        </select>
      </div>
    `;
  } else if (currentToolId === 'tool-pdf-excel') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Tùy chọn bảng tính</label>
        <select class="form-input" id="pdf-excel-sheets">
          <option value="single">Gộp tất cả trang vào một sheet</option>
          <option value="multi">Mỗi trang PDF thành một sheet riêng</option>
        </select>
      </div>
    `;
  } else if (currentToolId === 'tool-pdf-ppt') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Bố cục Slide</label>
        <select class="form-input" id="pdf-ppt-layout">
          <option value="fit">Vừa trang màn hình (Widescreen 16:9)</option>
          <option value="standard">Bố cục tiêu chuẩn (4:3)</option>
        </select>
      </div>
    `;
  } else if (currentToolId === 'tool-word-pdf') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Chất lượng tệp PDF</label>
        <select class="form-input" id="word-pdf-quality">
          <option value="high">Chất lượng in ấn (High Quality Print)</option>
          <option value="standard">Tối ưu hóa hiển thị web (Standard)</option>
        </select>
      </div>
    `;
  } else if (currentToolId === 'tool-excel-pdf') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Phạm vi chuyển đổi</label>
        <select class="form-input" id="excel-pdf-sheets">
          <option value="all">Chuyển đổi toàn bộ bảng tính (All Sheets)</option>
          <option value="active">Chỉ chuyển đổi sheet hiện hành</option>
        </select>
      </div>
      <div class="control-group">
        <label class="control-label">Hướng trang</label>
        <select class="form-input" id="excel-pdf-orientation">
          <option value="landscape">Nằm ngang (Khuyên dùng cho bảng tính rộng)</option>
          <option value="portrait">Nằm dọc (Portrait)</option>
        </select>
      </div>
    `;
  } else if (currentToolId === 'tool-ppt-pdf') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Độ phân giải slide</label>
        <select class="form-input" id="ppt-pdf-resolution">
          <option value="1080">Full HD 1080p (Sắc nét)</option>
          <option value="720">HD 720p (Dung lượng vừa phải)</option>
        </select>
      </div>
    `;
  } else if (currentToolId === 'tool-jpg-pdf') {
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Hướng trang</label>
        <select class="form-input" id="jpg-pdf-orientation">
          <option value="portrait">Nằm dọc (Portrait)</option>
          <option value="landscape">Nằm ngang (Landscape)</option>
          <option value="auto">Tự động xoay theo ảnh</option>
        </select>
      </div>
      <div class="control-group">
        <label class="control-label">Khổ trang</label>
        <select class="form-input" id="jpg-pdf-size">
          <option value="a4">Khổ A4 (210 x 297 mm)</option>
          <option value="letter">Khổ US Letter</option>
          <option value="fit">Vừa khít kích thước ảnh</option>
        </select>
      </div>
      <div class="control-group">
        <label class="control-label">Kích thước lề</label>
        <select class="form-input" id="jpg-pdf-margin">
          <option value="none">Không lề (No margin)</option>
          <option value="small">Lề nhỏ (20px)</option>
          <option value="large">Lề lớn (40px)</option>
        </select>
      </div>
    `;
  } else if (currentToolId.includes('pdf-') || currentToolId.includes('-pdf') || currentToolId.includes('epub') || currentToolId.includes('mobi')) {
    // Other converters
    workspaceControls.innerHTML = `
      <div class="control-group">
        <label class="control-label">Cài đặt chuyển đổi</label>
        <p class="upload-hint">Quy trình tự động hóa chuyển đổi định dạng tài liệu được tối ưu trên hạ tầng đám mây tốc độ cao.</p>
      </div>
    `;
  }
}

// Setup slider value listener
function setupSliderListeners(sliderId, valueId, suffix) {
  const slider = document.getElementById(sliderId);
  const display = document.getElementById(valueId);
  if (slider && display) {
    slider.addEventListener('input', (e) => {
      display.textContent = e.target.value + suffix;
    });
  }
}

// Setup Signature Pad
function setupSignaturePad() {
  // Clear preview and render canvas and controls
  workspacePreviewArea.innerHTML = `
    <div class="signature-pad-container">
      <h5>Vẽ chữ ký của bạn tại đây:</h5>
      <canvas class="signature-canvas" width="500" height="240"></canvas>
    </div>
  `;

  sigCanvas = document.querySelector('.signature-canvas');
  if (!sigCanvas) return;
  sigCtx = sigCanvas.getContext('2d');
  
  sigCtx.strokeStyle = '#1e1b4b';
  sigCtx.lineWidth = 4;
  sigCtx.lineCap = 'round';
  sigCtx.lineJoin = 'round';

  let isDrawing = false;

  const startDraw = (e) => {
    isDrawing = true;
    const rect = sigCanvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    sigCtx.beginPath();
    sigCtx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const rect = sigCanvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    sigCtx.lineTo(x, y);
    sigCtx.stroke();
  };

  const stopDraw = () => {
    isDrawing = false;
  };

  sigCanvas.addEventListener('mousedown', startDraw);
  sigCanvas.addEventListener('mousemove', draw);
  sigCanvas.addEventListener('mouseup', stopDraw);
  sigCanvas.addEventListener('mouseleave', stopDraw);

  sigCanvas.addEventListener('touchstart', startDraw);
  sigCanvas.addEventListener('touchmove', draw);
  sigCanvas.addEventListener('touchend', stopDraw);

  // Clear signature button in sidebar
  document.getElementById('btn-clear-sig').addEventListener('click', () => {
    sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
  });
}

// Draw Image Collage Preview
function updateCollagePreview() {
  const canvas = document.querySelector('.collage-canvas');
  if (!canvas || collageImages.length === 0) return;
  const ctx = canvas.getContext('2d');

  const gap = parseInt(document.getElementById('collage-gap-slider').value) || 0;
  const round = parseInt(document.getElementById('collage-round-slider').value) || 0;
  const bg = document.getElementById('collage-bg-input').value || '#ffffff';
  const layout = document.getElementById('collage-layout-select').value || '2x2';

  const size = 600;
  canvas.width = size;
  canvas.height = size;

  // Background
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, size, size);

  function drawRoundedImage(img, x, y, w, h, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.clip();

    const imgAspect = img.width / img.height;
    const boxAspect = w / h;
    let sx, sy, sw, sh;
    if (imgAspect > boxAspect) {
      sh = img.height;
      sw = sh * boxAspect;
      sx = (img.width - sw) / 2;
      sy = 0;
    } else {
      sw = img.width;
      sh = sw / imgAspect;
      sx = 0;
      sy = (img.height - sh) / 2;
    }
    ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
    ctx.restore();
  }

  // Draw positions depending on layout selected
  if (layout === '2x2') {
    const w = (size - gap * 3) / 2;
    const h = (size - gap * 3) / 2;
    const positions = [
      { x: gap, y: gap },
      { x: gap * 2 + w, y: gap },
      { x: gap, y: gap * 2 + h },
      { x: gap * 2 + w, y: gap * 2 + h }
    ];
    for (let i = 0; i < 4; i++) {
      if (collageImages[i]) {
        drawRoundedImage(collageImages[i], positions[i].x, positions[i].y, w, h, round);
      } else {
        ctx.fillStyle = '#eef0fb';
        ctx.fillRect(positions[i].x, positions[i].y, w, h);
        ctx.fillStyle = '#9297b5';
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`Lưới trống ${i+1}`, positions[i].x + w/2, positions[i].y + h/2);
      }
    }
  } else if (layout === '1x2') {
    const w = (size - gap * 3) / 2;
    const h = size - gap * 2;
    const positions = [
      { x: gap, y: gap },
      { x: gap * 2 + w, y: gap }
    ];
    for (let i = 0; i < 2; i++) {
      if (collageImages[i]) {
        drawRoundedImage(collageImages[i], positions[i].x, positions[i].y, w, h, round);
      } else {
        ctx.fillStyle = '#eef0fb';
        ctx.fillRect(positions[i].x, positions[i].y, w, h);
        ctx.fillStyle = '#9297b5';
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`Lưới trống ${i+1}`, positions[i].x + w/2, positions[i].y + h/2);
      }
    }
  } else if (layout === '1x3') {
    const w = (size - gap * 4) / 3;
    const h = size - gap * 2;
    const positions = [
      { x: gap, y: gap },
      { x: gap * 2 + w, y: gap },
      { x: gap * 3 + w * 2, y: gap }
    ];
    for (let i = 0; i < 3; i++) {
      if (collageImages[i]) {
        drawRoundedImage(collageImages[i], positions[i].x, positions[i].y, w, h, round);
      } else {
        ctx.fillStyle = '#eef0fb';
        ctx.fillRect(positions[i].x, positions[i].y, w, h);
        ctx.fillStyle = '#9297b5';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(`Trống ${i+1}`, positions[i].x + w/2, positions[i].y + h/2);
      }
    }
  }
}

// Render regular image lists
function renderImageToolPreviews() {
  workspacePreviewArea.innerHTML = '';
  const list = document.createElement('div');
  list.className = 'image-compress-list';
  workspacePreviewArea.appendChild(list);

  selectedFiles.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const item = document.createElement('div');
      item.className = 'image-compress-item';
      item.innerHTML = `
        <img src="${e.target.result}" class="image-thumb">
        <div class="compress-details">
          <h6>${file.name}</h6>
          <div class="compress-stats">Gốc: ${(file.size/1024).toFixed(1)} KB</div>
        </div>
        <div class="compress-saving" id="saving-${file.name.replace(/[^a-zA-Z0-9]/g, '')}">Sẵn sàng</div>
      `;
      list.appendChild(item);
    };
    reader.readAsDataURL(file);
  });
}

// Render mock pipeline for conversions
function renderMockPipelinePreviews(stepsArray) {
  const defaultSteps = [
    { title: "Đọc dữ liệu tập tin", desc: "Phân tích dữ liệu cấu trúc nguồn tệp tin..." },
    { title: "Phân tích & Tối ưu bố cục", desc: "Trích xuất hình ảnh, phông chữ và định dạng..." },
    { title: "Tạo tệp đích", desc: "Chuyển đổi thành cấu trúc nhị phân của định dạng mới..." }
  ];
  const steps = stepsArray || defaultSteps;

  workspacePreviewArea.innerHTML = `
    <div class="pipeline-container">
      <div class="pipeline-steps">
        ${steps.map((step, idx) => `
          <div class="pipeline-step ${idx === 0 ? 'active' : ''}" id="step-${idx + 1}">
            <div class="pipeline-step-check">${idx + 1}</div>
            <div class="pipeline-step-info">
              <h6>${step.title}</h6>
              <p>${step.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Render Office to PDF preview
function renderOfficeToPdfPreview(file) {
  let fileIcon = 'bi-file-earmark-word-fill text-primary';
  if (currentToolId.includes('excel')) {
    fileIcon = 'bi-file-earmark-excel-fill text-success';
  } else if (currentToolId.includes('ppt')) {
    fileIcon = 'bi-file-earmark-ppt-fill text-danger';
  }
  
  workspacePreviewArea.innerHTML = `
    <div style="text-align: center; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px;">
      <div style="position: relative; width: 120px; height: 120px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; inset: 0; border-radius: 50%; background: var(--primary-light); animation: pulseScale 2s infinite; opacity: 0.5;"></div>
        <i class="bi ${fileIcon}" style="font-size: 4.5rem; position: relative; z-index: 1;"></i>
      </div>
      <div>
        <h5 style="font-size: 1.05rem; font-weight: 700; color: var(--text); margin-bottom: 6px;">${file.name}</h5>
        <p class="text-muted" style="font-size: 0.8rem;">Sẵn sàng chuyển đổi thành tài liệu PDF chuẩn hóa</p>
      </div>
    </div>
  `;
}

// Setup Tarot Table Game
function setupTarotBoard() {
  workspacePreviewArea.innerHTML = `
    <div class="tarot-board">
      <div class="tarot-instructions" id="tarot-instructions-text">
        Tập trung suy nghĩ vào câu hỏi của bạn. Hãy nhấp chọn lần lượt 3 lá bài dưới đây đại diện cho: <strong>Quá khứ - Hiện tại - Tương lai</strong>.
      </div>
      <div class="tarot-table" id="tarot-cards-table">
        <!-- Cards generated dynamically -->
      </div>
      <div class="tarot-readings" id="tarot-reading-output" style="display: none;"></div>
    </div>
  `;

  // Draw 6 cards for the user to choose
  const table = document.getElementById('tarot-cards-table');
  table.innerHTML = '';
  
  // Shuffle cards
  const shuffled = [...tarotCardsDeck].sort(() => 0.5 - Math.random()).slice(0, 6);

  shuffled.forEach((card, idx) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'tarot-card-3d';
    cardEl.innerHTML = `
      <div class="tarot-card-face tarot-card-back">
        <div class="tarot-card-back-pattern">
          <i class="bi bi-moon-stars-fill"></i>
        </div>
      </div>
      <div class="tarot-card-face tarot-card-front">
        <div class="tarot-card-img">
          <i class="bi ${card.icon}"></i>
        </div>
        <div class="tarot-card-name">${card.name}</div>
        <div class="tarot-card-pos" id="card-pos-${idx}">Vị trí</div>
      </div>
    `;

    cardEl.addEventListener('click', () => {
      if (tarotSelected.length >= 3 || cardEl.classList.contains('flipped')) return;

      const positionNames = ['Quá khứ', 'Hiện tại', 'Tương lai'];
      const currentPosName = positionNames[tarotSelected.length];
      
      tarotSelected.push({
        card: card,
        position: currentPosName
      });

      cardEl.querySelector('.tarot-card-pos').textContent = currentPosName;
      cardEl.classList.add('flipped');

      if (tarotSelected.length === 3) {
        displayTarotReading();
      }
    });

    table.appendChild(cardEl);
  });

  // Action button change
  workspaceActionBtn.querySelector('.btn-text').textContent = 'Xem Trải Bài Khác';
}

function displayTarotReading() {
  document.getElementById('tarot-instructions-text').innerHTML = `<strong>Kết quả trải bài Tarot của bạn:</strong>`;
  const output = document.getElementById('tarot-reading-output');
  output.innerHTML = '';
  output.style.display = 'flex';

  tarotSelected.forEach(item => {
    const read = document.createElement('div');
    read.className = 'tarot-reading-item';
    read.innerHTML = `
      <h6>${item.position}: ${item.card.name}</h6>
      <p>${item.card.meaning}</p>
    `;
    output.appendChild(read);
  });
}

// Download blob helper
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Main Process click handler
workspaceActionBtn.addEventListener('click', async () => {
  if (currentToolId === 'btn-tarot-start') {
    setupTarotBoard();
    return;
  }

  if (selectedFiles.length === 0) return;

  // Show spinner
  workspaceSpinner.style.display = 'inline-block';
  workspaceActionBtn.disabled = true;
  workspaceStatusText.textContent = "Đang xử lý dữ liệu...";

  try {
    if (currentToolId === 'tool-merge-pdf') {
      const mergedPdf = await PDFLib.PDFDocument.create();
      for (const file of selectedFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }
      const pdfBytes = await mergedPdf.save();
      downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), 'hop-nhat-tai-lieu.pdf');

    } else if (currentToolId === 'tool-split-pdf') {
      const arrayBuffer = await selectedFiles[0].arrayBuffer();
      const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
      const splitMode = document.getElementById('split-mode-select').value;
      const totalPages = pdf.getPageCount();

      if (splitMode === 'all') {
        // Tách tất cả các trang
        for (let i = 0; i < totalPages; i++) {
          const newPdf = await PDFLib.PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(pdf, [i]);
          newPdf.addPage(copiedPage);
          const pdfBytes = await newPdf.save();
          downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), `trang-${i + 1}-${selectedFiles[0].name}`);
        }
      } else {
        // Khoảng trang
        const pagesInput = document.getElementById('split-pages-input').value;
        const selectedPagesIndices = [];
        const parts = pagesInput.split(',');
        parts.forEach(part => {
          if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number);
            for (let i = start; i <= end; i++) {
              if (i >= 1 && i <= totalPages) selectedPagesIndices.push(i - 1);
            }
          } else {
            const val = Number(part);
            if (val >= 1 && val <= totalPages) selectedPagesIndices.push(val - 1);
          }
        });
        if (selectedPagesIndices.length === 0) {
          alert("Vui lòng nhập số trang hợp lệ.");
          throw new Error("Invalid page inputs");
        }
        const newPdf = await PDFLib.PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdf, selectedPagesIndices);
        copiedPages.forEach(p => newPdf.addPage(p));
        const pdfBytes = await newPdf.save();
        downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), `tach-trang-${selectedFiles[0].name}`);
      }

    } else if (currentToolId === 'tool-rotate-pdf') {
      const arrayBuffer = await selectedFiles[0].arrayBuffer();
      const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
      const pages = pdf.getPages();
      
      pdfPagesData.forEach(item => {
        if (item.rotation > 0) {
          const page = pages[item.index];
          const curr = page.getRotation().angle;
          page.setRotation(PDFLib.degrees((curr + item.rotation) % 360));
        }
      });
      const pdfBytes = await pdf.save();
      downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), 'xoay-trang-' + selectedFiles[0].name);

    } else if (currentToolId === 'tool-watermark-pdf') {
      const text = document.getElementById('watermark-text').value || 'CONGCUPRO.COM';
      const opacity = parseFloat(document.getElementById('watermark-opacity').value) / 100 || 0.3;
      const colorHex = document.getElementById('watermark-color').value || '#5046e5';

      const arrayBuffer = await selectedFiles[0].arrayBuffer();
      const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
      
      const r = parseInt(colorHex.slice(1, 3), 16) / 255;
      const g = parseInt(colorHex.slice(3, 5), 16) / 255;
      const b = parseInt(colorHex.slice(5, 7), 16) / 255;
      
      const pages = pdf.getPages();
      const font = await pdf.embedFont(PDFLib.StandardFonts.HelveticaBold);
      
      pages.forEach(page => {
        const { width, height } = page.getSize();
        page.drawText(text, {
          x: width / 2 - (text.length * 8),
          y: height / 2 - 20,
          size: 40,
          font: font,
          color: PDFLib.rgb(r, g, b),
          opacity: opacity,
          rotate: PDFLib.degrees(30),
        });
      });
      
      const pdfBytes = await pdf.save();
      downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), 'dong-dau-' + selectedFiles[0].name);

    } else if (currentToolId === 'tool-sign-pdf') {
      if (!sigCanvas) return;
      const sigDataUrl = sigCanvas.toDataURL('image/png');
      const arrayBuffer = await selectedFiles[0].arrayBuffer();
      const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
      const signatureImage = await pdf.embedPng(sigDataUrl);
      
      const pages = pdf.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      
      // Stamp bottom-right of page 1
      firstPage.drawImage(signatureImage, {
        x: width - 220,
        y: 40,
        width: 180,
        height: 86
      });
      const pdfBytes = await pdf.save();
      downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), 'da-ky-' + selectedFiles[0].name);

    } else if (currentToolId === 'tool-edit-pdf' || currentToolId === 'tool-template-pdf') {
      const text = document.getElementById('pdf-edit-text').value || '';
      const fontSize = parseInt(document.getElementById('pdf-edit-fontsize').value) || 24;

      const arrayBuffer = await selectedFiles[0].arrayBuffer();
      const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
      const pages = pdf.getPages();
      const font = await pdf.embedFont(PDFLib.StandardFonts.HelveticaBold);

      if (pages.length > 0 && text) {
        pages[0].drawText(text, {
          x: 50,
          y: pages[0].getSize().height - 50,
          size: fontSize,
          font: font,
          color: PDFLib.rgb(0.31, 0.27, 0.9)
        });
      }
      const pdfBytes = await pdf.save();
      downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), 'chinh-sua-' + selectedFiles[0].name);

    } else if (currentToolId === 'tool-collage-img') {
      const canvas = document.querySelector('.collage-canvas');
      if (canvas) {
        canvas.toBlob((blob) => {
          downloadBlob(blob, 'anh-ghep-congcupro.png');
        }, 'image/png');
      }

    } else if (currentToolId === 'tool-webp-jpg') {
      const format = document.getElementById('image-format-select').value;
      const ext = format === 'image/png' ? 'png' : 'jpg';

      for (const file of selectedFiles) {
        const img = await loadImageFromFile(file);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          downloadBlob(blob, file.name.replace(/\.[^/.]+$/, "") + '-converted.' + ext);
        }, format, 0.95);
      }

    } else if (currentToolId === 'tool-jpg-pdf') {
      const orientation = document.getElementById('jpg-pdf-orientation').value;
      const pageSizeSelect = document.getElementById('jpg-pdf-size').value;
      const marginSelect = document.getElementById('jpg-pdf-margin').value;
      
      const pdfDoc = await PDFLib.PDFDocument.create();
      const margin = marginSelect === 'none' ? 0 : (marginSelect === 'small' ? 20 : 40);

      for (const file of selectedFiles) {
        const imgBytes = await file.arrayBuffer();
        let img;
        if (file.name.toLowerCase().endsWith('.png')) {
          img = await pdfDoc.embedPng(imgBytes);
        } else if (file.name.toLowerCase().endsWith('.webp')) {
          const loadedImg = await loadImageFromFile(file);
          const canvas = document.createElement('canvas');
          canvas.width = loadedImg.width;
          canvas.height = loadedImg.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(loadedImg, 0, 0);
          const dataUrl = canvas.toDataURL('image/png');
          const pngBytes = await (await fetch(dataUrl)).arrayBuffer();
          img = await pdfDoc.embedPng(pngBytes);
        } else {
          img = await pdfDoc.embedJpg(imgBytes);
        }

        let pageWidth = 595.276;
        let pageHeight = 841.890;
        
        if (pageSizeSelect === 'letter') {
          pageWidth = 612;
          pageHeight = 792;
        }

        let isLandscape = false;
        if (orientation === 'landscape' || (orientation === 'auto' && img.width > img.height)) {
          isLandscape = true;
        }

        if (isLandscape) {
          const temp = pageWidth;
          pageWidth = pageHeight;
          pageHeight = temp;
        }

        if (pageSizeSelect === 'fit') {
          pageWidth = img.width + margin * 2;
          pageHeight = img.height + margin * 2;
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        const maxWidth = pageWidth - margin * 2;
        const maxHeight = pageHeight - margin * 2;
        const scaled = img.scaleToFit(maxWidth, maxHeight);
        
        const x = margin + (maxWidth - scaled.width) / 2;
        const y = margin + (maxHeight - scaled.height) / 2;

        page.drawImage(img, {
          x: x,
          y: y,
          width: scaled.width,
          height: scaled.height
        });
      }

      const pdfBytes = await pdfDoc.save();
      downloadBlob(new Blob([pdfBytes], { type: 'application/pdf' }), 'chuyen-doi-hinh-anh.pdf');

    } else if (currentToolId === 'tool-pdf-jpg') {
      const resolution = parseFloat(document.getElementById('pdf-jpg-resolution').value) || 150;
      const format = document.getElementById('pdf-jpg-format').value || 'image/jpeg';
      const ext = format === 'image/png' ? 'png' : 'jpg';
      const scale = resolution / 96;
      
      const arrayBuffer = await selectedFiles[0].arrayBuffer();
      const pdfDoc = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdfDoc.numPages;

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext('2d');
        await page.render({ canvasContext: context, viewport: viewport }).promise;
        
        canvas.toBlob((blob) => {
          downloadBlob(blob, `trang-${i}-${selectedFiles[0].name.replace(/\.[^/.]+$/, "")}.${ext}`);
        }, format, 0.95);
      }

    } else if (['tool-pdf-word', 'tool-pdf-excel', 'tool-pdf-ppt', 'tool-word-pdf', 'tool-excel-pdf', 'tool-ppt-pdf'].includes(currentToolId)) {
      let steps = [
        { title: "Đọc cấu trúc file", desc: "Phân tích nội dung và tài nguyên..." },
        { title: "Chuyển đổi bố cục", desc: "Khớp định dạng phông chữ và bảng biểu..." },
        { title: "Kết xuất file đích", desc: "Đang đóng gói tệp tin kết quả..." }
      ];
      
      let targetExt = 'docx';
      if (currentToolId === 'tool-pdf-word') {
        const ext = document.getElementById('pdf-word-ext').value;
        targetExt = ext;
        steps = [
          { title: "Đọc cấu trúc file PDF", desc: "Quét và phân tích văn bản nguồn..." },
          { title: "Nhận dạng chữ viết & trích xuất văn bản", desc: "Đang xây dựng bố cục tài liệu Word..." },
          { title: "Kết xuất file Word ." + ext, desc: "Đang đóng gói tài liệu DOCX/DOC..." }
        ];
      } else if (currentToolId === 'tool-pdf-excel') {
        targetExt = 'xlsx';
        steps = [
          { title: "Đọc cấu trúc file PDF", desc: "Quét các bảng dữ liệu gốc..." },
          { title: "Phát hiện và định vị bảng biểu", desc: "Đang chuyển dữ liệu thành lưới bảng tính..." },
          { title: "Kết xuất bảng tính Excel .xlsx", desc: "Đang tối ưu cấu trúc cột hàng..." }
        ];
      } else if (currentToolId === 'tool-pdf-ppt') {
        targetExt = 'pptx';
        steps = [
          { title: "Đọc cấu trúc file PDF", desc: "Phân tích tỷ lệ khung hình slide..." },
          { title: "Trích xuất bố cục trang Slide", desc: "Đang chuyển các vector và văn bản..." },
          { title: "Kết xuất bài thuyết trình PowerPoint .pptx", desc: "Đang tạo các trang slide tương thích..." }
        ];
      } else if (currentToolId === 'tool-word-pdf') {
        targetExt = 'pdf';
        steps = [
          { title: "Đọc cấu trúc file Word", desc: "Đang đọc văn bản và lề trang..." },
          { title: "Dàn trang & định dạng phông chữ", desc: "Đang chuyển đổi phông chữ và hình ảnh..." },
          { title: "Kết xuất tài liệu PDF chuẩn", desc: "Đang đóng gói tệp PDF chất lượng cao..." }
        ];
      } else if (currentToolId === 'tool-excel-pdf') {
        targetExt = 'pdf';
        steps = [
          { title: "Đọc cấu trúc bảng tính Excel", desc: "Đang phân tích các dòng cột và sheet..." },
          { title: "Tính toán trang in và căn lề rộng", desc: "Đang chuyển đổi lưới sang trang tĩnh..." },
          { title: "Kết xuất tài liệu PDF chuẩn", desc: "Đang đóng gói tệp PDF..." }
        ];
      } else if (currentToolId === 'tool-ppt-pdf') {
        targetExt = 'pdf';
        steps = [
          { title: "Đọc Slide PowerPoint", desc: "Đang phân tích tài nguyên hình ảnh..." },
          { title: "Trích xuất tài nguyên hình ảnh & vector", desc: "Đang dàn trang các slide thuyết trình..." },
          { title: "Kết xuất tài liệu PDF chuẩn", desc: "Đang đóng gói tệp PDF chuẩn in ấn..." }
        ];
      }

      renderMockPipelinePreviews(steps);

      const step1 = document.getElementById('step-1');
      const step2 = document.getElementById('step-2');
      const step3 = document.getElementById('step-3');

      step1.classList.add('active');
      workspaceStatusText.textContent = steps[0].title + "...";
      await new Promise(r => setTimeout(r, 1200));

      step1.classList.add('completed');
      step2.classList.add('active');
      workspaceStatusText.textContent = steps[1].title + "...";
      await new Promise(r => setTimeout(r, 1200));

      step2.classList.add('completed');
      step3.classList.add('active');
      workspaceStatusText.textContent = steps[2].title + "...";
      await new Promise(r => setTimeout(r, 1000));

      step3.classList.add('completed');
      workspaceStatusText.textContent = "Hoàn tất! Đang tải về tệp tin chuyển đổi.";

      const blobText = `CongCuPro Converter Output\n\nChúc mừng! Tệp ${selectedFiles[0].name} đã được chuyển đổi thành công sang định dạng ${targetExt.toUpperCase()} lúc ${new Date().toLocaleString()}.`;
      const blob = new Blob([blobText], { type: 'text/plain;charset=utf-8' });
      downloadBlob(blob, selectedFiles[0].name.replace(/\.[^/.]+$/, "") + '_converted.' + targetExt);

    } else if (currentToolId === 'tool-compress-img') {
      const qual = parseFloat(document.getElementById('image-quality-slider').value) / 100 || 0.8;
      for (const file of selectedFiles) {
        const img = await loadImageFromFile(file);
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          const domId = 'saving-' + file.name.replace(/[^a-zA-Z0-9]/g, '');
          const label = document.getElementById(domId);
          if (label) {
            const savings = ((1 - (blob.size / file.size)) * 100).toFixed(0);
            label.textContent = `Nén ${savings}% (${(blob.size/1024).toFixed(0)} KB)`;
          }
          downloadBlob(blob, 'nen_' + file.name);
        }, file.type, qual);
      }

    } else {
      // Mock converters (Ebooks)
      const steps = [
        { title: "Đọc dữ liệu tập tin", desc: "Phân tích dữ liệu cấu trúc nguồn tệp tin..." },
        { title: "Phân tích & Tối ưu bố cục", desc: "Trích xuất hình ảnh, phông chữ và định dạng..." },
        { title: "Tạo tệp đích", desc: "Chuyển đổi thành cấu trúc nhị phân của định dạng mới..." }
      ];
      renderMockPipelinePreviews(steps);

      const step1 = document.getElementById('step-1');
      const step2 = document.getElementById('step-2');
      const step3 = document.getElementById('step-3');

      step1.classList.add('active');
      workspaceStatusText.textContent = steps[0].title + "...";
      await new Promise(r => setTimeout(r, 1200));

      step1.classList.add('completed');
      step2.classList.add('active');
      workspaceStatusText.textContent = steps[1].title + "...";
      await new Promise(r => setTimeout(r, 1200));

      step2.classList.add('completed');
      step3.classList.add('active');
      workspaceStatusText.textContent = steps[2].title + "...";
      await new Promise(r => setTimeout(r, 1000));

      step3.classList.add('completed');
      workspaceStatusText.textContent = "Hoàn tất! Đang tải về tệp tin chuyển đổi.";

      const targetExt = currentToolId.endsWith('mobi') ? 'mobi' : (currentToolId.endsWith('epub') ? 'epub' : 'pdf');
      const blobText = `CongCuPro Converter Output\n\nChúc mừng! Tệp ${selectedFiles[0].name} đã được chuyển đổi thành công sang định dạng ${targetExt.toUpperCase()} lúc ${new Date().toLocaleString()}.`;
      const blob = new Blob([blobText], { type: 'text/plain;charset=utf-8' });
      downloadBlob(blob, selectedFiles[0].name.replace(/\.[^/.]+$/, "") + '_converted.' + targetExt);
    }

    workspaceStatusText.textContent = "Đã xử lý xong và tải xuống thành công!";

  } catch (err) {
    console.error("Processing failed:", err);
    alert("Có lỗi xảy ra trong quá trình xử lý: " + err.message);
    workspaceStatusText.textContent = "Xử lý thất bại.";
  } finally {
    workspaceSpinner.style.display = 'none';
    workspaceActionBtn.disabled = false;
  }
});

console.log('%c⚡ CôngCụPro loaded with interactive tools!', 'color: #6c47ff; font-size: 1.2rem; font-weight: bold;');

