/* ==========================================
   URBAN CLOSET — Global JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* === ヘッダースクロール制御 === */
  const header = document.querySelector('.header');
  if (header) {
    // 黒背景セクションの検出用
    const darkSections = document.querySelectorAll('[data-dark-section]');
    
    const updateHeader = () => {
      const scrollY = window.scrollY;
      // スクロールで背景色変化
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      // 黒背景セクション上にいるかチェック
      let overDark = false;
      darkSections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) overDark = true;
      });
      if (overDark && scrollY > 50) {
        header.classList.add('header-dark');
        header.classList.remove('scrolled');
      } else {
        header.classList.remove('header-dark');
      }
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }

  /* === ハンバーガーメニュー === */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.add('active'));
    if (mobileClose) mobileClose.addEventListener('click', () => mobileMenu.classList.remove('active'));
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('active'));
    });
  }

  /* === ライトボックス === */
  const lightbox = document.querySelector('.lightbox');
  const lbImg = document.querySelector('.lightbox-img');
  const lbClose = document.querySelector('.lightbox-close');
  const lbPrev = document.querySelector('.lightbox-prev');
  const lbNext = document.querySelector('.lightbox-next');
  let lbImages = [];
  let lbIndex = 0;

  // ライトボックス対応の画像をクリックで開く
  const initLightbox = () => {
    const triggers = document.querySelectorAll('[data-lightbox]');
    lbImages = Array.from(triggers).map(el => el.dataset.lightbox);
    triggers.forEach((el, i) => {
      el.addEventListener('click', () => {
        lbIndex = i;
        openLightbox();
      });
    });
  };

  const openLightbox = () => {
    if (!lightbox || !lbImg) return;
    lbImg.src = lbImages[lbIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  if (lbPrev) lbPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
    lbImg.src = lbImages[lbIndex];
  });
  if (lbNext) lbNext.addEventListener('click', (e) => {
    e.stopPropagation();
    lbIndex = (lbIndex + 1) % lbImages.length;
    lbImg.src = lbImages[lbIndex];
  });
  // キーボード操作
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
    if (e.key === 'ArrowRight' && lbNext) lbNext.click();
  });
  initLightbox();

  /* === 商品フィルター＆ソート（products.html用） === */
  const filterBtns = document.querySelectorAll('.filter-cats button');
  const sortSelect = document.querySelector('.sort-select');
  const productGrid = document.querySelector('.product-grid');

  if (filterBtns.length && productGrid) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.category;
        const cards = productGrid.querySelectorAll('.product-card');
        cards.forEach(card => {
          if (cat === 'ALL' || card.dataset.category === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  if (sortSelect && productGrid) {
    sortSelect.addEventListener('change', () => {
      const val = sortSelect.value;
      const cards = Array.from(productGrid.querySelectorAll('.product-card'));
      cards.sort((a, b) => {
        const priceA = parseInt(a.dataset.price);
        const priceB = parseInt(b.dataset.price);
        if (val === 'price-asc') return priceA - priceB;
        if (val === 'price-desc') return priceB - priceA;
        return 0; // 新着順はデフォルト順
      });
      cards.forEach(card => productGrid.appendChild(card));
    });
  }

  /* === 商品詳細 サムネイル切替 === */
  const mainImg = document.querySelector('.detail-main-img img');
  const thumbBtns = document.querySelectorAll('.detail-thumbs button');
  if (mainImg && thumbBtns.length) {
    thumbBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        thumbBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mainImg.src = btn.dataset.src;
      });
    });
  }

  /* === カラー選択 === */
  document.querySelectorAll('.color-swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      sw.classList.add('active');
    });
  });

  /* === サイズ選択 === */
  document.querySelectorAll('.size-option').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.size-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });

  /* === FAQアコーディオン === */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const answer = q.nextElementSibling;
      const isOpen = q.classList.contains('active');
      // 全て閉じる
      document.querySelectorAll('.faq-q').forEach(item => {
        item.classList.remove('active');
        item.nextElementSibling.style.maxHeight = null;
      });
      // クリックしたものを開く
      if (!isOpen) {
        q.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* === フォームバリデーション === */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      // エラーリセット
      contactForm.querySelectorAll('.form-error').forEach(err => err.classList.remove('show'));

      // 名前チェック
      const name = contactForm.querySelector('#name');
      if (name && !name.value.trim()) {
        showError(name, '必須項目です');
        valid = false;
      }
      // メールチェック
      const email = contactForm.querySelector('#email');
      if (email) {
        if (!email.value.trim()) {
          showError(email, '必須項目です');
          valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
          showError(email, '正しいメールアドレスを入力してください');
          valid = false;
        }
      }
      // 内容チェック
      const message = contactForm.querySelector('#message');
      if (message && !message.value.trim()) {
        showError(message, '必須項目です');
        valid = false;
      }

      if (valid) {
        alert('お問い合わせを送信しました。\nありがとうございます。');
        contactForm.reset();
      }
    });

    const showError = (input, msg) => {
      const err = input.parentElement.querySelector('.form-error');
      if (err) {
        err.textContent = msg;
        err.classList.add('show');
      }
    };
  }

  /* === スクロールフェードインアニメーション === */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => observer.observe(el));
  }

  /* === ニュースレターフォーム === */
  const nlForm = document.querySelector('.newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = nlForm.querySelector('input');
      if (input && input.value.trim()) {
        alert('ご登録ありがとうございます！');
        input.value = '';
      }
    });
  }

});
