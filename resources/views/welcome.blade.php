<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>CôngCụ Pro – Nền tảng công cụ trực tuyến hàng đầu</title>
  <meta name="description" content="CôngCụ Pro – Bộ công cụ PDF, chuyển đổi ảnh, nén ảnh, chuyển đổi Ebook, xem Tarot, mua AI & Phần mềm. Tất cả trong một nền tảng." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
  <link rel="stylesheet" href="{{ asset('congcu.css') }}" />
</head>
<body>

{{-- ========== NAVBAR ========== --}}
<header class="navbar" id="navbar">
  <div class="nav-container">
    <a href="{{ url('/') }}" class="nav-logo">
      <i class="bi bi-lightning-charge-fill logo-accent" style="font-size: 1.4rem;"></i>
      <span class="logo-text">CôngCụ<span class="logo-accent">Pro</span></span>
    </a>

    <nav class="nav-menu" id="navMenu">

      {{-- PDF Tools Dropdown --}}
      <div class="nav-item has-dropdown">
        <button class="nav-link dropdown-toggle" id="pdf-toggle">
          <i class="bi bi-file-earmark-pdf nav-icon"></i> PDF Tools
          <svg class="chevron" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="dropdown-panel" id="pdf-dropdown">
          <div class="dropdown-grid">
            <div class="dropdown-col">
              <p class="dropdown-label"><i class="bi bi-pencil-square"></i> Chỉnh sửa & Ký kết</p>
              <a href="#" class="dropdown-item"><i class="bi bi-pencil-square text-primary"></i> Sửa PDF</a>
              <a href="#" class="dropdown-item"><i class="bi bi-file-earmark-ruled text-primary"></i> Tạo khuôn mẫu</a>
              <a href="#" class="dropdown-item"><i class="bi bi-scissors text-primary"></i> Chia PDF</a>
              <a href="#" class="dropdown-item"><i class="bi bi-intersect text-primary"></i> Hợp nhất PDF</a>
              <a href="#" class="dropdown-item"><i class="bi bi-file-zip text-primary"></i> Nén PDF</a>
              <a href="#" class="dropdown-item"><i class="bi bi-droplet text-primary"></i> Thêm dấu nước</a>
              <a href="#" class="dropdown-item"><i class="bi bi-arrow-repeat text-primary"></i> Xoay PDF</a>
              <a href="#" class="dropdown-item"><i class="bi bi-pen text-primary"></i> Ký PDF</a>
            </div>
            <div class="dropdown-col">
              <p class="dropdown-label"><i class="bi bi-box-arrow-up"></i> Chuyển đổi từ PDF</p>
              <a href="#" class="dropdown-item"><i class="bi bi-file-earmark-word text-danger"></i> PDF sang Word</a>
              <a href="#" class="dropdown-item"><i class="bi bi-file-earmark-image text-danger"></i> PDF sang JPG</a>
              <a href="#" class="dropdown-item"><i class="bi bi-file-earmark-excel text-danger"></i> PDF sang Excel</a>
              <a href="#" class="dropdown-item"><i class="bi bi-file-earmark-ppt text-danger"></i> PDF sang PPT</a>
            </div>
            <div class="dropdown-col">
              <p class="dropdown-label"><i class="bi bi-box-arrow-in-down"></i> Chuyển đổi sang PDF</p>
              <a href="#" class="dropdown-item"><i class="bi bi-file-earmark-word text-success"></i> Word sang PDF</a>
              <a href="#" class="dropdown-item"><i class="bi bi-file-earmark-image text-success"></i> JPG sang PDF</a>
              <a href="#" class="dropdown-item"><i class="bi bi-file-earmark-excel text-success"></i> Excel sang PDF</a>
              <a href="#" class="dropdown-item"><i class="bi bi-file-earmark-ppt text-success"></i> PPT sang PDF</a>
            </div>
          </div>
        </div>
      </div>

      {{-- Image Tools Dropdown --}}
      <div class="nav-item has-dropdown">
        <button class="nav-link dropdown-toggle" id="img-toggle">
          <i class="bi bi-image nav-icon"></i> Công cụ Ảnh
          <svg class="chevron" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="dropdown-panel" id="img-dropdown">
          <div class="dropdown-grid single">
            <div class="dropdown-col">
              <p class="dropdown-label"><i class="bi bi-palette"></i> Chuyển đổi & Nén</p>
              <a href="#" class="dropdown-item"><i class="bi bi-grid-3x3-gap text-warning"></i> Ghép ảnh online</a>
              <a href="#" class="dropdown-item"><i class="bi bi-arrow-left-right text-warning"></i> WEBP sang JPG</a>
              <a href="#" class="dropdown-item"><i class="bi bi-file-zip text-warning"></i> Nén ảnh JPG/PNG/SVG/GIF</a>
              <a href="#" class="dropdown-item"><i class="bi bi-file-earmark-zip text-warning"></i> Nén nhiều ảnh cùng lúc</a>
            </div>
          </div>
        </div>
      </div>

      {{-- More Tools Dropdown --}}
      <div class="nav-item has-dropdown">
        <button class="nav-link dropdown-toggle" id="more-toggle">
          <i class="bi bi-tools nav-icon"></i> Công cụ khác
          <svg class="chevron" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div class="dropdown-panel" id="more-dropdown">
          <div class="dropdown-grid single">
            <div class="dropdown-col">
              <a href="#" class="dropdown-item"><i class="bi bi-book text-info"></i> Chuyển đổi Ebook</a>
              <a href="#" class="dropdown-item"><i class="bi bi-magic text-info"></i> Xem Tarot Online</a>
            </div>
          </div>
        </div>
      </div>

      {{-- Shop Dropdown --}}
      <div class="nav-item has-dropdown nav-item-shop">
        <button class="nav-link dropdown-toggle" id="shop-toggle">
          <span class="mobile-chevron-left"><i class="bi bi-chevron-down"></i></span>
          <span class="shop-badge-capsule">
            <i class="bi bi-cart3 nav-icon"></i> Cửa hàng
            <i class="bi bi-chevron-up chevron-up-icon"></i>
          </span>
          <svg class="chevron desktop-chevron" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
          <span class="mobile-list-right"><i class="bi bi-list-task"></i></span>
        </button>
        <div class="dropdown-panel" id="shop-dropdown">
          <div class="dropdown-grid single">
            <div class="dropdown-col">
              <a href="#" class="dropdown-item"><i class="bi bi-robot"></i> Mua AI</a>
              <a href="#" class="dropdown-item"><i class="bi bi-laptop"></i> Mua Phần mềm</a>
            </div>
          </div>
        </div>
      </div>

      {{-- Bài Viết --}}
      <div class="nav-item">
        <a href="#" class="nav-link">
          <i class="bi bi-journal-text nav-icon"></i> Bài Viết
        </a>
      </div>

      {{-- Liên Hệ --}}
      <div class="nav-item">
        <a href="#" class="nav-link">
          <i class="bi bi-envelope nav-icon"></i> Liên Hệ
        </a>
      </div>

      {{-- Mobile Actions (Login, Register) --}}
      <div class="mobile-menu-actions">
        <a href="#" class="btn-outline"><i class="bi bi-box-arrow-in-right"></i> Đăng nhập</a>
        <a href="#" class="btn-primary"><i class="bi bi-person-plus"></i> Đăng ký</a>
      </div>

    </nav>

    <div class="nav-actions">
      <a href="#" class="cart-btn" id="nav-cart-btn" aria-label="Giỏ hàng">
        <i class="bi bi-cart3"></i>
        <span class="cart-badge">0</span>
      </a>

      <a href="#" class="btn-outline"><i class="bi bi-box-arrow-in-right"></i> Đăng nhập</a>
      <a href="#" class="btn-primary"><i class="bi bi-person-plus"></i> Đăng ký</a>
    </div>

    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

{{-- Mobile Menu Overlay --}}
<div class="mobile-overlay" id="mobileOverlay"></div>





{{-- ========== TOOLS SECTION ========== --}}
<section class="tools-section" id="tools">
  <div class="container">
    {{-- PDF Tools Card --}}
    <div class="tool-category" id="pdf-tools">
      <div class="category-header">
        <div class="cat-icon pdf-gradient"><i class="bi bi-file-earmark-pdf-fill text-danger"></i></div>
        <div>
          <h3 class="cat-title">Công cụ PDF</h3>
          <p class="cat-desc">Một nền tảng cho tất cả các công cụ PDF của bạn</p>
        </div>
      </div>

      <div class="tool-group">
        <h4 class="tool-group-title"><i class="bi bi-pencil-square"></i> Chỉnh sửa & Ký kết</h4>
        <div class="tools-grid">
          <a href="#" class="tool-card" id="tool-edit-pdf">
            <div class="tool-card-icon text-danger"><i class="bi bi-pencil-square"></i></div>
            <div class="tool-card-body">
              <h5>Sửa PDF</h5>
              <p>Chỉnh sửa văn bản, hình ảnh trong PDF</p>
            </div>
            <span class="tool-badge free">Miễn phí</span>
          </a>
          <a href="#" class="tool-card" id="tool-template-pdf">
            <div class="tool-card-icon text-danger"><i class="bi bi-file-earmark-ruled"></i></div>
            <div class="tool-card-body">
              <h5>Tạo khuôn mẫu</h5>
              <p>Tạo mẫu PDF chuyên nghiệp</p>
            </div>
            <span class="tool-badge free">Miễn phí</span>
          </a>
          <a href="#" class="tool-card" id="tool-split-pdf">
            <div class="tool-card-icon text-danger"><i class="bi bi-scissors"></i></div>
            <div class="tool-card-body">
              <h5>Chia PDF</h5>
              <p>Tách PDF thành nhiều file nhỏ</p>
            </div>
            <span class="tool-badge free">Miễn phí</span>
          </a>
          <a href="#" class="tool-card" id="tool-merge-pdf">
            <div class="tool-card-icon text-danger"><i class="bi bi-intersect"></i></div>
            <div class="tool-card-body">
              <h5>Hợp nhất PDF</h5>
              <p>Gộp nhiều PDF thành một file</p>
            </div>
            <span class="tool-badge free">Miễn phí</span>
          </a>
          <a href="#" class="tool-card" id="tool-compress-pdf">
            <div class="tool-card-icon text-danger"><i class="bi bi-file-zip"></i></div>
            <div class="tool-card-body">
              <h5>Nén PDF</h5>
              <p>Giảm dung lượng file PDF nhanh chóng</p>
            </div>
            <span class="tool-badge free">Miễn phí</span>
          </a>
          <a href="#" class="tool-card" id="tool-watermark-pdf">
            <div class="tool-card-icon text-danger"><i class="bi bi-droplet"></i></div>
            <div class="tool-card-body">
              <h5>Thêm dấu nước</h5>
              <p>Bảo vệ tài liệu với watermark</p>
            </div>
            <span class="tool-badge free">Miễn phí</span>
          </a>
          <a href="#" class="tool-card" id="tool-rotate-pdf">
            <div class="tool-card-icon text-danger"><i class="bi bi-arrow-repeat"></i></div>
            <div class="tool-card-body">
              <h5>Xoay PDF</h5>
              <p>Xoay trang PDF theo chiều muốn</p>
            </div>
            <span class="tool-badge free">Miễn phí</span>
          </a>
          <a href="#" class="tool-card" id="tool-sign-pdf">
            <div class="tool-card-icon text-danger"><i class="bi bi-pen"></i></div>
            <div class="tool-card-body">
              <h5>Ký PDF</h5>
              <p>Ký điện tử tài liệu PDF</p>
            </div>
            <span class="tool-badge free">Miễn phí</span>
          </a>
        </div>
      </div>

      <div class="convert-grid">
        <div class="tool-group">
          <h4 class="tool-group-title"><i class="bi bi-box-arrow-up"></i> Chuyển đổi từ PDF</h4>
          <div class="tools-grid compact">
            <a href="#" class="tool-card compact" id="tool-pdf-word">
              <div class="tool-card-icon text-danger"><i class="bi bi-file-earmark-word"></i></div>
              <div class="tool-card-body"><h5>PDF → Word</h5></div>
            </a>
            <a href="#" class="tool-card compact" id="tool-pdf-jpg">
              <div class="tool-card-icon text-danger"><i class="bi bi-file-earmark-image"></i></div>
              <div class="tool-card-body"><h5>PDF → JPG</h5></div>
            </a>
            <a href="#" class="tool-card compact" id="tool-pdf-excel">
              <div class="tool-card-icon text-danger"><i class="bi bi-file-earmark-excel"></i></div>
              <div class="tool-card-body"><h5>PDF → Excel</h5></div>
            </a>
            <a href="#" class="tool-card compact" id="tool-pdf-ppt">
              <div class="tool-card-icon text-danger"><i class="bi bi-file-earmark-ppt"></i></div>
              <div class="tool-card-body"><h5>PDF → PPT</h5></div>
            </a>
          </div>
        </div>
        <div class="tool-group">
          <h4 class="tool-group-title"><i class="bi bi-box-arrow-in-down"></i> Chuyển đổi sang PDF</h4>
          <div class="tools-grid compact">
            <a href="#" class="tool-card compact" id="tool-word-pdf">
              <div class="tool-card-icon text-success"><i class="bi bi-file-earmark-word"></i></div>
              <div class="tool-card-body"><h5>Word → PDF</h5></div>
            </a>
            <a href="#" class="tool-card compact" id="tool-jpg-pdf">
              <div class="tool-card-icon text-success"><i class="bi bi-file-earmark-image"></i></div>
              <div class="tool-card-body"><h5>JPG → PDF</h5></div>
            </a>
            <a href="#" class="tool-card compact" id="tool-excel-pdf">
              <div class="tool-card-icon text-success"><i class="bi bi-file-earmark-excel"></i></div>
              <div class="tool-card-body"><h5>Excel → PDF</h5></div>
            </a>
            <a href="#" class="tool-card compact" id="tool-ppt-pdf">
              <div class="tool-card-icon text-success"><i class="bi bi-file-earmark-ppt"></i></div>
              <div class="tool-card-body"><h5>PPT → PDF</h5></div>
            </a>
          </div>
        </div>
      </div>
    </div>

    {{-- Image Tools --}}
    <div class="tool-category" id="image-tools">
      <div class="category-header">
        <div class="cat-icon img-gradient"><i class="bi bi-image-fill"></i></div>
        <div>
          <h3 class="cat-title">Công cụ Ảnh</h3>
          <p class="cat-desc">Chuyển đổi và tối ưu hình ảnh dễ dàng</p>
        </div>
      </div>
      <div class="tools-grid">
        <a href="#" class="tool-card" id="tool-collage-img">
          <div class="tool-card-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="5" height="5" rx="1" fill="#1e293b" />
              <rect x="9.5" y="3" width="5" height="5" rx="1" fill="#1e293b" />
              <rect x="16" y="3" width="5" height="5" rx="1" fill="#1e293b" />
              <rect x="3" y="9.5" width="5" height="5" rx="1" fill="#1e293b" />
              <rect x="9.5" y="9.5" width="5" height="5" rx="1" fill="#1e293b" />
              <rect x="16" y="9.5" width="5" height="5" rx="1" fill="#1e293b" />
              <rect x="3" y="16" width="5" height="5" rx="1" fill="#1e293b" />
              <rect x="9.5" y="16" width="5" height="5" rx="1" fill="#1e293b" />
              <rect x="16" y="16" width="5" height="5" rx="1" fill="#1e293b" />
            </svg>
          </div>
          <div class="tool-card-body">
            <h5>Ghép ảnh online <span class="tool-badge-inline">Miễn phí</span></h5>
            <p>Ghép nhiều ảnh thành một khung hình với nhiều bố cục lưới, khoảng cách, bo góc và màu nền tùy chỉnh.</p>
          </div>
        </a>
        <a href="#" class="tool-card" id="tool-webp-jpg">
          <div class="tool-card-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 8h16M20 8l-4-4M20 8l-4 4" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 16H4M4 16l4 4M4 16l4-4" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="tool-card-body">
            <h5>WEBP sang JPG <span class="tool-badge-inline">Miễn phí</span></h5>
            <p>Chuyển WEBP sang JPG — tương thích mọi thiết bị</p>
          </div>
        </a>
        <a href="#" class="tool-card" id="tool-compress-img">
          <div class="tool-card-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="7" y="2" width="10" height="20" rx="3" fill="#1e293b" />
              <path d="M12 5V13" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              <rect x="10" y="11" width="4" height="6" rx="1" fill="#ffffff" stroke="#1e293b" stroke-width="1" />
              <circle cx="12" cy="14" r="1" fill="#1e293b" />
            </svg>
          </div>
          <div class="tool-card-body">
            <h5>Nén ảnh <span class="tool-badge-inline">Miễn phí</span></h5>
            <p>Nén JPG, PNG, SVG, GIF với chất lượng tốt nhất. Giảm kích thước nhiều ảnh cùng lúc.</p>
          </div>
        </a>
      </div>
    </div>


    {{-- Ebook Converter --}}
    <div class="tool-category" id="ebook-tools">
      <div class="category-header">
        <div class="cat-icon ebook-gradient">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="2" width="16" height="20" rx="3" stroke="#0f1123" stroke-width="2"/>
            <circle cx="12" cy="11" r="4" stroke="#0f1123" stroke-width="2"/>
            <path d="M12 7l2 2-2 2" stroke="#0f1123" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 15l-2-2 2-2" stroke="#0f1123" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 18h8" stroke="#0f1123" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div>
          <h3 class="cat-title">Chuyển đổi Ebook trực tuyến</h3>
          <p class="cat-desc">Chuyển đổi EPUB, MOBI, FB2, AZW3 và các định dạng ebook khác miễn phí</p>
        </div>
      </div>
      <div class="tools-grid">
        <a href="#" class="tool-card" id="tool-epub-mobi">
          <div class="tool-card-icon"><i class="bi bi-book"></i></div>
          <div class="tool-card-body">
            <h5>EPUB → MOBI <span class="tool-badge-inline">Miễn phí</span></h5>
            <p>Chuyển đổi cho Kindle</p>
          </div>
        </a>
        <a href="#" class="tool-card" id="tool-mobi-epub">
          <div class="tool-card-icon"><i class="bi bi-book"></i></div>
          <div class="tool-card-body">
            <h5>MOBI → EPUB <span class="tool-badge-inline">Miễn phí</span></h5>
            <p>Chuyển đổi sang EPUB phổ biến</p>
          </div>
        </a>
        <a href="#" class="tool-card" id="tool-fb2-epub">
          <div class="tool-card-icon"><i class="bi bi-book"></i></div>
          <div class="tool-card-body">
            <h5>FB2 → EPUB <span class="tool-badge-inline">Miễn phí</span></h5>
            <p>Chuyển đổi định dạng FB2</p>
          </div>
        </a>
        <a href="#" class="tool-card" id="tool-azw3-epub">
          <div class="tool-card-icon"><i class="bi bi-book"></i></div>
          <div class="tool-card-body">
            <h5>AZW3 → EPUB <span class="tool-badge-inline">Miễn phí</span></h5>
            <p>Giải phóng DRM Kindle</p>
          </div>
        </a>
      </div>
    </div>

    {{-- Tarot --}}
    <div class="tool-category tarot-category" id="tarot-section">
      <div class="tarot-inner">
        <div class="tarot-glow"></div>
        <div class="category-header">
          <div class="cat-icon tarot-gradient"><i class="bi bi-magic"></i></div>
          <div>
            <h3 class="cat-title">Xem Tarot Online</h3>
            <p class="cat-desc">Khám phá bí ẩn tương lai qua những lá bài Tarot huyền bí</p>
          </div>
        </div>
        <div class="tarot-cards-preview">
          <div class="tarot-card-preview" style="--delay:0s"><i class="bi bi-moon-stars"></i></div>
          <div class="tarot-card-preview" style="--delay:0.1s"><i class="bi bi-star"></i></div>
          <div class="tarot-card-preview" style="--delay:0.2s"><i class="bi bi-sun"></i></div>
          <div class="tarot-card-preview" style="--delay:0.3s"><i class="bi bi-stars"></i></div>
          <div class="tarot-card-preview" style="--delay:0.4s"><i class="bi bi-eye"></i></div>
        </div>
        <a href="#" class="btn-tarot" id="btn-tarot-start"><i class="bi bi-magic"></i> Bắt đầu xem Tarot</a>
      </div>
    </div>

  </div>
</section>

{{-- ========== SHOP SECTION ========== --}}
<section class="shop-section" id="shop">
  <div class="container">
    <div class="section-header">
      <span class="section-badge"><i class="bi bi-cart3"></i> Cửa hàng</span>
    </div>

    <div class="shop-grid">
      {{-- AI Products --}}
      <div class="shop-category" id="ai-category">
        <div class="shop-cat-header ai-header">
          <span class="shop-cat-icon"><i class="bi bi-robot text-primary"></i></span>
          <h3>Bán AI</h3>
          <p>Các công cụ AI tiên tiến nhất</p>
        </div>
        <div class="shop-items">
          <a href="#" class="shop-item" id="shop-ai-writer">
            <div class="shop-item-icon text-primary"><i class="bi bi-pencil-square"></i></div>
            <div class="shop-item-info">
              <h5>AI Writer Pro</h5>
              <p>Viết nội dung tự động với AI</p>
              <span class="shop-price">299.000₫ <small>/tháng</small></span>
            </div>
            <span class="shop-badge hot">HOT</span>
          </a>
          <a href="#" class="shop-item" id="shop-ai-image">
            <div class="shop-item-icon text-primary"><i class="bi bi-palette"></i></div>
            <div class="shop-item-info">
              <h5>AI Image Generator</h5>
              <p>Tạo hình ảnh bằng AI</p>
              <span class="shop-price">499.000₫ <small>/tháng</small></span>
            </div>
            <span class="shop-badge new">MỚI</span>
          </a>
          <a href="#" class="shop-item" id="shop-ai-chat">
            <div class="shop-item-icon text-primary"><i class="bi bi-chat-dots"></i></div>
            <div class="shop-item-info">
              <h5>AI Chatbot Builder</h5>
              <p>Xây dựng chatbot thông minh</p>
              <span class="shop-price">799.000₫ <small>/tháng</small></span>
            </div>
            <span class="shop-badge pro">PRO</span>
          </a>
        </div>
        <a href="#" class="btn-shop-more" id="btn-view-all-ai">Xem tất cả AI →</a>
      </div>

      {{-- Software Products --}}
      <div class="shop-category" id="software-category">
        <div class="shop-cat-header sw-header">
          <span class="shop-cat-icon"><i class="bi bi-laptop text-success"></i></span>
          <h3>Bán Phần mềm</h3>
          <p>Phần mềm chuyên nghiệp giá tốt</p>
        </div>
        <div class="shop-items">
          <a href="#" class="shop-item" id="shop-sw-office">
            <div class="shop-item-icon text-success"><i class="bi bi-file-earmark-excel"></i></div>
            <div class="shop-item-info">
              <h5>Office Suite Pro</h5>
              <p>Bộ công cụ văn phòng đầy đủ</p>
              <span class="shop-price">1.200.000₫ <small>/năm</small></span>
            </div>
            <span class="shop-badge hot">HOT</span>
          </a>
          <a href="#" class="shop-item" id="shop-sw-design">
            <div class="shop-item-icon text-success"><i class="bi bi-palette"></i></div>
            <div class="shop-item-info">
              <h5>Design Studio</h5>
              <p>Phần mềm thiết kế chuyên nghiệp</p>
              <span class="shop-price">899.000₫ <small>/năm</small></span>
            </div>
            <span class="shop-badge new">MỚI</span>
          </a>
          <a href="#" class="shop-item" id="shop-sw-security">
            <div class="shop-item-icon text-success"><i class="bi bi-shield-check"></i></div>
            <div class="shop-item-info">
              <h5>Security Shield</h5>
              <p>Bảo vệ toàn diện máy tính</p>
              <span class="shop-price">450.000₫ <small>/năm</small></span>
            </div>
            <span class="shop-badge pro">PRO</span>
          </a>
        </div>
        <a href="#" class="btn-shop-more" id="btn-view-all-sw">Xem tất cả phần mềm →</a>
      </div>
    </div>
  </div>
</section>

{{-- ========== FEATURES SECTION ========== --}}
<section class="features-section" id="features">
  <div class="container">
    <div class="features-grid">
      <div class="feature-item" id="feat-free">
        <div class="feature-icon text-primary"><i class="bi bi-gift-fill"></i></div>
        <h4>Hoàn toàn miễn phí</h4>
        <p>Sử dụng tất cả công cụ cơ bản không tốn một đồng nào</p>
      </div>
      <div class="feature-item" id="feat-secure">
        <div class="feature-icon text-success"><i class="bi bi-shield-lock-fill"></i></div>
        <h4>Bảo mật tuyệt đối</h4>
        <p>File của bạn được xóa ngay sau khi xử lý xong</p>
      </div>
      <div class="feature-item" id="feat-fast">
        <div class="feature-icon text-warning"><i class="bi bi-lightning-charge-fill"></i></div>
        <h4>Xử lý siêu nhanh</h4>
        <p>Máy chủ mạnh mẽ đảm bảo tốc độ xử lý tối đa</p>
      </div>
      <div class="feature-item" id="feat-device">
        <div class="feature-icon text-info"><i class="bi bi-phone-fill"></i></div>
        <h4>Mọi thiết bị</h4>
        <p>Hoạt động hoàn hảo trên máy tính, điện thoại, máy tính bảng</p>
      </div>
    </div>
  </div>
</section>

{{-- ========== FOOTER ========== --}}
<footer class="footer" id="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="{{ url('/') }}" class="nav-logo">
          <i class="bi bi-lightning-charge-fill logo-accent" style="font-size: 1.4rem;"></i>
          <span class="logo-text">CôngCụ<span class="logo-accent">Pro</span></span>
        </a>
        <p>Nền tảng công cụ trực tuyến hàng đầu Việt Nam. Nhanh – An toàn – Miễn phí.</p>
        <div class="social-links">
          <a href="#" id="social-fb" class="social-btn"><i class="bi bi-facebook"></i> Facebook</a>
          <a href="#" id="social-tg" class="social-btn"><i class="bi bi-telegram"></i> Telegram</a>
          <a href="#" id="social-yt" class="social-btn"><i class="bi bi-youtube"></i> YouTube</a>
        </div>
      </div>
      <div class="footer-col">
        <h5>PDF Tools</h5>
        <a href="#">Sửa PDF</a>
        <a href="#">Hợp nhất PDF</a>
        <a href="#">Chia PDF</a>
        <a href="#">Nén PDF</a>
        <a href="#">PDF sang Word</a>
      </div>
      <div class="footer-col">
        <h5>Công cụ Ảnh</h5>
        <a href="#">Ghép ảnh online</a>
        <a href="#">WEBP sang JPG</a>
        <a href="#">Nén ảnh</a>
        <a href="#">Chuyển đổi Ebook</a>
        <a href="#">Xem Tarot</a>
      </div>
      <div class="footer-col">
        <h5>Cửa hàng</h5>
        <a href="#">Mua AI</a>
        <a href="#">Mua Phần mềm</a>
        <a href="#">Gói Premium</a>
        <a href="#">Liên hệ</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© {{ date('Y') }} CôngCụPro. Tất cả quyền được bảo lưu.</p>
      <div class="footer-links">
        <a href="#">Chính sách bảo mật</a>
        <a href="#">Điều khoản sử dụng</a>
      </div>
    </div>
  </div>
</footer>


{{-- ========== TOOL WORKSPACE OVERLAY ========== --}}
<div class="tool-workspace-overlay" id="tool-workspace" style="display: none;">
  <div class="workspace-container">
    {{-- Workspace Header --}}
    <header class="workspace-header">
      <button class="btn-back" id="workspace-back-btn">
        <i class="bi bi-arrow-left"></i> Quay lại
      </button>
      <div class="workspace-title-area">
        <span class="workspace-icon" id="workspace-icon"><i class="bi bi-tools"></i></span>
        <div>
          <h3 id="workspace-title">Tên Công Cụ</h3>
          <p id="workspace-desc" class="text-muted">Mô tả công cụ</p>
        </div>
      </div>
      <div class="workspace-header-actions">
        <!-- Any secondary action could go here -->
      </div>
    </header>

    {{-- Workspace Content --}}
    <div class="workspace-body">
      {{-- Drag & Drop Upload Panel (Shown initially for tools requiring files) --}}
      <div class="upload-panel" id="workspace-upload-panel">
        <div class="drop-zone" id="workspace-drop-zone">
          <input type="file" id="workspace-file-input" multiple style="display: none;" />
          <div class="drop-zone-content">
            <i class="bi bi-cloud-arrow-up-fill upload-pulse-icon"></i>
            <h4>Kéo và thả tệp của bạn vào đây</h4>
            <p class="upload-hint">hoặc click để chọn tệp từ thiết bị</p>
            <p class="upload-formats" id="workspace-formats-hint">Hỗ trợ: .pdf, .jpg, .png</p>
          </div>
        </div>
        
        {{-- Selected Files List --}}
        <div class="selected-files-container" id="selected-files-container" style="display: none;">
          <h5>Tệp đã chọn (<span id="file-count">0</span>)</h5>
          <div class="files-list" id="workspace-files-list">
            <!-- Dynamically populated -->
          </div>
        </div>
      </div>

      {{-- Interactive Editor/Options & Preview Area (Hidden until files uploaded, or shown immediately for tools like Tarot) --}}
      <div class="editor-panel" id="workspace-editor-panel" style="display: none;">
        <div class="editor-layout">
          {{-- Left Side: Option Controls --}}
          <div class="editor-controls" id="workspace-controls">
            @include('tools.edit-pdf')
            @include('tools.split-pdf')
            @include('tools.merge-pdf')
            @include('tools.compress-pdf')
            @include('tools.watermark-pdf')
            @include('tools.rotate-pdf')
            @include('tools.sign-pdf')
            @include('tools.pdf-word')
            @include('tools.pdf-jpg')
            @include('tools.pdf-excel')
            @include('tools.pdf-ppt')
            @include('tools.word-pdf')
            @include('tools.excel-pdf')
            @include('tools.ppt-pdf')
            @include('tools.jpg-pdf')
            @include('tools.collage-img')
            @include('tools.webp-jpg')
            @include('tools.compress-img')
            @include('tools.ebook')
          </div>

          {{-- Right Side: Interactive Preview / Output --}}
          <div class="editor-preview" id="workspace-preview-area">
            <!-- Dynamically populated previews: PDF pages, canvas rendering, Tarot table -->
          </div>
        </div>
      </div>
    </div>

    {{-- Workspace Footer --}}
    <footer class="workspace-footer" id="workspace-footer-bar" style="display: none;">
      <div class="footer-status" id="workspace-status-text">
        Sẵn sàng xử lý
      </div>
      <div class="footer-actions">
        <button class="btn-primary btn-action" id="workspace-action-btn">
          <span class="btn-text">Bắt đầu xử lý</span>
          <span class="spinner" id="workspace-spinner" style="display: none;"></span>
        </button>
      </div>
    </footer>
  </div>
</div>

<script src="{{ asset('congcu.js') }}"></script>
</body>
</html>
