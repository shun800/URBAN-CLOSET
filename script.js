/* ==========================================
   URBAN CLOSET — Global JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* === ヘッダースクロール制御（全ページ共通） === */
  const header = document.querySelector('.header');

  if (header) {
    let scrollTimer = null;

    window.addEventListener('scroll', function() {
      // 最上部に戻ったら透明に
      if (window.scrollY === 0) {
        header.classList.remove('scrolled');
        return;
      }
      // スクロール中は透明（scrolled解除）
      header.classList.remove('scrolled');
      // タイマーリセット
      clearTimeout(scrollTimer);
      // 止まったら白に戻す（300ms後）
      scrollTimer = setTimeout(function() {
        if (window.scrollY > 0) {
          header.classList.add('scrolled');
        }
      }, 300);
    }, { passive: true });
  }

  /* === ハンバーガーメニュー === */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');
  let isMenuOpen = false;

  function openMenu() {
    if (!mobileMenu) return;
    isMenuOpen = true;
    mobileMenu.classList.add('active');
    if (mobileClose) mobileClose.classList.add('active');
    if (hamburger) hamburger.style.display = 'none';
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!mobileMenu) return;
    isMenuOpen = false;
    mobileMenu.classList.remove('active');
    if (mobileClose) mobileClose.classList.remove('active');
    if (hamburger) hamburger.style.display = '';
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* === 検索バー === */
  const btnSearch = document.querySelector('.btn-search');
  const searchBar = document.getElementById('search-bar');
  const searchInput = document.querySelector('.search-input');
  const searchClose = document.querySelector('.search-close');

  if (btnSearch && searchBar) {
    // 検索ボタンでトグル
    btnSearch.addEventListener('click', () => {
      searchBar.classList.toggle('active');
      if (searchBar.classList.contains('active') && searchInput) {
        searchInput.focus();
      }
    });
    // 閉じるボタン
    if (searchClose) {
      searchClose.addEventListener('click', () => {
        searchBar.classList.remove('active');
      });
    }
    // Enterキーでproducts.htmlへ遷移
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          window.location.href = 'products.html';
        }
      });
    }
  }

  /* === カートパネル === */
  const btnCart = document.querySelector('.btn-cart-toggle');
  const cartPanel = document.getElementById('cart-panel');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.querySelector('.cart-panel-close');

  const openCart = () => {
    if (cartPanel) cartPanel.classList.add('active');
    if (cartOverlay) cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const closeCart = () => {
    if (cartPanel) cartPanel.classList.remove('active');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (btnCart) btnCart.addEventListener('click', openCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

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
  const productsHeroImg = document.querySelector('.products-hero-img');
  const productsHeroTitle = document.querySelector('.products-hero-title');
  const productsHeroSub = document.querySelector('.products-hero-sub');

  // ヒーローデータ
  const heroData = {
    new: {
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
      title: 'NEW ARRIVALS', sub: '最新アイテム'
    },
    women: {
      img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80',
      title: 'WOMEN', sub: 'ウィメンズコレクション'
    },
    men: {
      img: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1600&q=80',
      title: 'MEN', sub: 'メンズコレクション'
    },
    goods: {
      img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1600&q=80',
      title: 'GOODS', sub: 'アクセサリー・グッズ'
    }
  };

  // URLパラメータを読み取り
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter');

  if (productGrid) {
    const cards = productGrid.querySelectorAll('.product-card');

    // URLパラメータによるフィルター
    if (filterParam) {
      cards.forEach(card => {
        const category = card.dataset.category;
        const badge = card.dataset.badge;
        let show = false;

        if (!filterParam || filterParam === 'all') {
          show = true;
        } else if (filterParam === 'new') {
          show = badge === 'new';
        } else if (filterParam === 'women') {
          show = category === 'tops' || category === 'bottoms';
        } else if (filterParam === 'men') {
          show = category === 'outerwear' || category === 'tops';
        } else if (filterParam === 'goods') {
          show = category === 'accessories';
        } else {
          show = category === filterParam;
        }
        card.style.display = show ? '' : 'none';
      });

      // ヒーロー画像・タイトル切替
      if (heroData[filterParam]) {
        if (productsHeroImg) {
          productsHeroImg.style.opacity = '0';
          setTimeout(() => {
            productsHeroImg.src = heroData[filterParam].img;
            productsHeroImg.style.opacity = '1';
          }, 300);
        }
        if (productsHeroTitle) productsHeroTitle.textContent = heroData[filterParam].title;
        if (productsHeroSub) productsHeroSub.textContent = heroData[filterParam].sub;
      }

      // フィルターボタンのactiveを解除
      filterBtns.forEach(b => b.classList.remove('active'));
    }
  }

  if (filterBtns.length && productGrid) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.category.toLowerCase();
        const cards = productGrid.querySelectorAll('.product-card');
        cards.forEach(card => {
          if (cat === 'all' || card.dataset.category === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
        // ALLクリック時はヒーローをデフォルトに戻す
        if (cat === 'all') {
          if (productsHeroTitle) productsHeroTitle.textContent = 'PRODUCTS';
          if (productsHeroSub) productsHeroSub.textContent = 'ALL ITEMS';
          if (productsHeroImg) {
            productsHeroImg.style.opacity = '0';
            setTimeout(() => {
              productsHeroImg.src = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80';
              productsHeroImg.style.opacity = '1';
            }, 300);
          }
          history.replaceState(null, '', 'products.html');
        }
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
        return 0;
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
