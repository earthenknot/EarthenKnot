/**
 * EarthenKnot Global Script
 */

// Initialize Cart from Session Storage if available
let cartCount = sessionStorage.getItem('cartCount') ? parseInt(sessionStorage.getItem('cartCount')) : 0;
updateCartBadge();

function addToCart() {
  cartCount++;
  sessionStorage.setItem('cartCount', cartCount);
  updateCartBadge();
  animateCartBadge();
}

function updateCartBadge() {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = cartCount;
  }
}

function animateCartBadge() {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    countEl.style.transform = 'scale(1.5)';
    setTimeout(() => {
      countEl.style.transform = 'scale(1)';
    }, 250);
  }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('main-nav');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// Simple fade-in intersection observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      entry.target.style.opacity = 1;
      entry.target.style.animation = 'fadeIn 0.8s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
  
  // Dropdown Menu Click Toggle
  const dropBtns = document.querySelectorAll('.dropbtn');
  dropBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Close all other open dropdowns first (if any)
      document.querySelectorAll('.dropdown-content.show').forEach(el => {
        if (el !== btn.nextElementSibling) el.classList.remove('show');
      });
      // Toggle current
      const dropdownContent = btn.nextElementSibling;
      if (dropdownContent && dropdownContent.classList.contains('dropdown-content')) {
        dropdownContent.classList.toggle('show');
      }
    });
  });

  // Close dropdown if clicking outside
  window.addEventListener('click', (e) => {
    if (!e.target.matches('.dropbtn')) {
      const dropdowns = document.querySelectorAll('.dropdown-content');
      dropdowns.forEach(content => {
        if (content.classList.contains('show')) {
          content.classList.remove('show');
        }
      });
    }
  });

  // ===== Global Search =====
  const searchBtn = document.getElementById('global-search-btn');
  const searchInput = document.getElementById('global-search-input');
  const searchResults = document.getElementById('search-results-dropdown');

  if (searchBtn && searchInput && searchResults) {
    // Toggle expand on icon click
    searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchInput.classList.toggle('active');
      if (searchInput.classList.contains('active')) {
        searchInput.focus();
      } else {
        searchInput.value = '';
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
      }
    });

    // Live search as user types
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      if (query.length < 2) {
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
        return;
      }

      const matches = [];
      for (const [id, product] of Object.entries(productsData)) {
        if (product.name.toLowerCase().includes(query)) {
          matches.push({ id, ...product });
        }
      }

      if (matches.length > 0) {
        searchResults.innerHTML = matches.map(p => {
          const filterStyle = p.filter ? `filter: ${p.filter};` : '';
          return `<a href="product.html?id=${p.id}" class="search-result-item">
            <img src="${p.image}" alt="${p.name}" style="${filterStyle}">
            <div class="search-result-info">
              <span class="result-name">${p.name}</span>
              <span class="result-price">${p.price}</span>
            </div>
          </a>`;
        }).join('');
        searchResults.classList.add('active');
      } else {
        searchResults.innerHTML = '<div class="search-no-results">No products found</div>';
        searchResults.classList.add('active');
      }
    });

    // Close search when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.global-search-container')) {
        searchInput.classList.remove('active');
        searchInput.value = '';
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
      }
    });

    // Prevent clicks inside search from closing it
    searchInput.addEventListener('click', (e) => e.stopPropagation());
    searchResults.addEventListener('click', (e) => e.stopPropagation());
  }
});

// Product Stories Data
const productsData = {
  'sage-mocha-throw': {
    name: 'Sage Mocha Throw',
    price: '₹9,999.00',
    image: 'assets/blanket.png',
    images: ['assets/blanket.png', 'assets/blanket.png', 'assets/blanket.png'],
    videoUrl: 'https://www.youtube.com/embed/5mzIEIuVyK8?start=245',
    story: "Woven during the quiet, misty mornings of early spring, the Sage Mocha Throw captures the essence of a serene forest floor. The interlocking mocha and sage green fibers symbolize the intertwining roots of ancient trees, bringing their grounding energy directly to your sanctuary. Every individual stitch acts as a whisper of nature, meticulously designed to wrap you in warmth and tranquility. This isn't just a blanket; it's a piece of the earth to hold you tight during chilly evenings."
  },
  'earthy-bear-amigurumi': {
    name: 'Earthy Bear Amigurumi',
    price: '₹2,999.00',
    image: 'assets/amigurumi.png',
    images: ['assets/amigurumi.png', 'assets/amigurumi.png', 'assets/amigurumi.png'],
    videoUrl: 'https://www.youtube.com/embed/5mzIEIuVyK8?start=245',
    story: "Meet your new companion, crafted gently from the softest, sustainably sourced earthy yarns. This little bear was inspired by the gentle creatures of the woodlands, who find comfort in the simplest of forest corners. Hand-stuffed with love and care over countless hours, it carries a deep-rooted story of woodland adventures and peaceful slumbers. He is designed not only as decor but as a sturdy, loving heirloom—perfect to pass down through generations of dreamers."
  },
  'olive-chunky-throw': {
    name: 'Olive Chunky Throw',
    price: '₹11,999.00',
    image: 'assets/blanket.png',
    images: ['assets/blanket.png', 'assets/blanket.png', 'assets/blanket.png'],
    videoUrl: 'https://www.youtube.com/embed/5mzIEIuVyK8?start=245',
    filter: 'hue-rotate(30deg)',
    story: "Inspired by sprawling olive groves bathed in late afternoon sun, this chunky knit throw is the epitome of rustic luxury. The thick, incredibly plush yarn creates a comforting physical weight that feels like a warm embrace from a loved one. It’s more than just a blanket; it’s a tribute to the warmth of the Mediterranean and the gentle, slow pace of a mindful life."
  },
  'granny-square-top': {
    name: 'Granny Square Crop Top',
    price: '₹4,500.00',
    image: 'assets/blanket.png', // dummy reuse
    images: ['assets/blanket.png', 'assets/blanket.png'],
    videoUrl: 'https://www.youtube.com/embed/5mzIEIuVyK8?start=245',
    filter: 'hue-rotate(150deg) saturate(1.5)',
    story: "A vintage-inspired crochet top bringing the nostalgia of summer festivals to life. Individually joined squares create a breathtaking geometric pattern in bright, sunny hues."
  },
  'sunflower-scrunchie': {
    name: 'Sunflower Hair Scrunchie',
    price: '₹899.00',
    image: 'assets/amigurumi.png', // dummy reuse
    images: ['assets/amigurumi.png'],
    videoUrl: 'https://www.youtube.com/embed/5mzIEIuVyK8?start=245',
    filter: 'hue-rotate(250deg) saturate(2)',
    story: "Woven meticulously with soft organic cotton to protect your hair. This scrunchie is not only an accessory but a bright slice of sunshine that holds firm all day long."
  },
  'macrame-tote-bag': {
    name: 'Boho Macrame Tote',
    price: '₹3,400.00',
    image: 'assets/blanket.png', // dummy reuse
    images: ['assets/blanket.png'],
    videoUrl: 'https://www.youtube.com/embed/5mzIEIuVyK8?start=245',
    filter: 'grayscale(0.5) sepia(1)',
    story: "Durable, fashionable, and incredibly spacious. This handcrafted macrame tote bag is your perfect companion for farmers markets or leisurely beach days, combining utility with rustic bohemian flair."
  }
};

function renderProductPage() {
  const container = document.getElementById('product-detail-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const product = productsData[productId];

  if (product) {
    const imagesToUse = product.images || [product.image];
    // Create the thumbnails HTML
    let thumbnailsHTML = '';
    if (imagesToUse.length > 1) {
      thumbnailsHTML = '<div class="thumbnails">';
      imagesToUse.forEach((imgUrl, index) => {
        // As a visual trick for duplicate images, adding small brightness drops
        const filterStr = product.filter ? product.filter : '';
        const thumbFilter = index > 0 ? `${filterStr} brightness(${1 - (index * 0.1)})` : filterStr;
        thumbnailsHTML += `<img src="${imgUrl}" alt="${product.name} angle ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" style="filter: ${thumbFilter};" data-index="${index}" data-filter="${thumbFilter}">`;
      });
      thumbnailsHTML += '</div>';
    }

    container.innerHTML = `
      <div style="max-width: 850px; margin: 0 auto; margin-bottom: 4rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.8rem;">
          <h1 style="font-size: 2.2rem; color: var(--text); font-family: 'Outfit', sans-serif; font-weight: 500; margin: 0;">${product.name}</h1>
          <button id="zoom-toggle-btn" style="padding: 0.5rem 1rem; font-size: 0.9rem; border-radius: 8px; border: 1px solid var(--secondary); background: transparent; color: var(--secondary); cursor: pointer; transition: all 0.3s; box-shadow: var(--shadow-sm);">🔍 Enable Zoom</button>
        </div>
        <div class="product-gallery" style="margin-bottom: 3rem;">
          <div class="main-image-container" id="main-image-container">
            <img src="${imagesToUse[0]}" id="main-product-image" alt="${product.name}" style="filter: ${product.filter || 'none'};">
          </div>
          ${thumbnailsHTML}
        </div>
        
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 2rem; background: var(--surface); border-radius: 16px; box-shadow: var(--shadow-sm); border: 1px solid rgba(0,0,0,0.05); text-align: left;">
          <p style="font-size: 1.8rem; color: var(--primary); font-weight: 600; margin: 0;">${product.price}</p>
          <button class="btn btn-primary" style="padding: 1rem 3rem; font-size: 1.1rem; border-radius: 30px; box-shadow: 0 4px 10px rgba(108, 120, 92, 0.2); white-space: nowrap;" onclick="addToCart()">Add to Cart</button>
        </div>
      </div>

      <div class="product-bio-wrapper" style="max-width: 800px; margin: 0 auto; padding: 3rem 0; border-top: 1px solid rgba(0,0,0,0.05); text-align: center;">
        <h2 style="font-size: 2rem; margin-bottom: 2rem; color: var(--primary-dark); font-family: 'Outfit', sans-serif; font-weight: 600;">The Story Behind It</h2>
        <div class="story-text" style="text-align: left; font-size: 1.2rem;">${product.story}</div>
        
        ${product.videoUrl ? `
        <h2 style="font-size: 2rem; margin: 4rem 0 2rem 0; color: var(--primary-dark); font-family: 'Outfit', sans-serif; font-weight: 600;">The Making Of</h2>
        <div class="video-container short" style="margin: 0 auto;">
          <iframe src="${product.videoUrl}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        ` : ''}
      </div>
    `;
    document.title = `${product.name} - EarthenKnot`;

    // Initialize gallery and zoom functionality
    initGalleryZoom();

  } else {
    container.innerHTML = `<h1 style="grid-column: 1/-1; text-align: center; color: var(--text-light); font-weight: 400; margin-top: 2rem;">Product not found or has been discontinued.</h1>`;
  }
}

function initGalleryZoom() {
  const mainContainer = document.getElementById('main-image-container');
  const mainImage = document.getElementById('main-product-image');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const zoomBtn = document.getElementById('zoom-toggle-btn');
  
  let zoomEnabled = false;

  if (zoomBtn) {
    zoomBtn.addEventListener('click', function() {
      zoomEnabled = !zoomEnabled;
      if (zoomEnabled) {
        this.textContent = '🔍 Disable Zoom';
        this.style.background = 'var(--secondary)';
        this.style.color = 'white';
        if (mainContainer) mainContainer.style.cursor = 'zoom-in';
      } else {
        this.textContent = '🔍 Enable Zoom';
        this.style.background = 'transparent';
        this.style.color = 'var(--secondary)';
        if (mainContainer) {
          mainContainer.style.cursor = 'default';
          // Reset transform when disabled
          mainImage.style.transformOrigin = 'center center';
          mainImage.style.transform = 'scale(1)';
        }
      }
    });
  }

  if (thumbnails.length > 0) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', function () {
        // Remove active class from all
        thumbnails.forEach(t => t.classList.remove('active'));
        // Add to clicked
        this.classList.add('active');
        // Update main image source and filter to match the thumbnail
        mainImage.src = this.src;
        mainImage.style.filter = this.getAttribute('data-filter') || 'none';
      });
    });
  }

  if (mainContainer && mainImage) {
    mainContainer.style.cursor = 'default'; // set explicit initial cursor

    mainContainer.addEventListener('mousemove', function (e) {
      if (!zoomEnabled) return;

      const rect = mainContainer.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top; // y position within the element

      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      mainImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
      mainImage.style.transform = 'scale(2.5)';
    });

    mainContainer.addEventListener('mouseleave', function () {
      if (!zoomEnabled) return;
      // Reset transform when mouse leaves
      mainImage.style.transformOrigin = 'center center';
      mainImage.style.transform = 'scale(1)';
    });
  }
}
