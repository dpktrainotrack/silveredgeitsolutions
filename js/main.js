/* ===================================================================
   Silver Edge IT Solutions - Main JavaScript
   =================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // ---- Initialize AOS ----
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 80,
    });
  }

  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar && navbar.classList.add('scrolled');
      backToTop && backToTop.classList.add('show');
    } else {
      navbar && navbar.classList.remove('scrolled');
      backToTop && backToTop.classList.remove('show');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ---- Back to Top ----
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Animated Counters ----
  const counters = document.querySelectorAll('.counter');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;

    counters.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        countersAnimated = true;
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * (target - start) + start);
          counter.textContent = current.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString() + suffix;
          }
        }
        requestAnimationFrame(updateCounter);
      }
    });
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // ---- Course Filter (Courses Page) ----
  const filterBtns = document.querySelectorAll('.btn-filter');
  const courseItems = document.querySelectorAll('.course-filter-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      courseItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = '';
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
            item.style.transition = 'all 0.4s ease';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Close mobile menu on link click ----
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (navbarCollapse) {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      });
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#consultationModal') return;
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---- Page load animation class ----
  document.body.classList.add('page-loaded');


  // ---- Partner Carousel auto ----
  const partnerCarousel = document.querySelector('#partnerCarousel');
  if (partnerCarousel) {
    new bootstrap.Carousel(partnerCarousel, {
      interval: 3000,
      pause: 'hover',
    });
  }


  // ---- Contact Form Handler ----
  const contactForm = document.querySelector('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const origText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
        btn.classList.remove('btn-primary-custom');
        btn.classList.add('btn-success');

        setTimeout(() => {
          contactForm.reset();
          btn.innerHTML = origText;
          btn.disabled = false;
          btn.classList.remove('btn-success');
          btn.classList.add('btn-primary-custom');
        }, 3000);
      }, 1500);
    });
  }

  // ---- Consultation Modal Form ----
  const consultForm = document.querySelector('#consultationForm');
  if (consultForm) {
    consultForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const modal = bootstrap.Modal.getInstance(document.querySelector('#consultationModal'));
      if (modal) modal.hide();
      alert('Thank you! Our team will contact you shortly.');
      consultForm.reset();
    });
  }

});
document.querySelectorAll(".mobile-dropdown-toggle").forEach(toggle => {
  toggle.addEventListener("click", function () {
    const parent = this.closest(".custom-dropdown");
    const dropdown = parent.querySelector(".drop-down-links");

    dropdown.classList.toggle("show-dropownd-mobile");

    // Optional: rotate icon
    this.classList.toggle("rotate");
  });
});


$(document).ready(function () {

  $(".placement-carousel").owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplayHoverPause: true,
    smartSpeed: 700,

    nav: true,
    dots: true,

    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>'
    ],

    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 }
    }
  });

  $(".testimonial-carousel").owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 700,
    animateOut: 'fadeOut',   // fade out effect
    animateIn: 'fadeIn',
    nav: true,
    dots: true,

    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>'
    ],

    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  });



  $(document).ready(function () {
    $("#partnerOwlCarousel").owlCarousel({
      loop: true,
      margin: 20,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      smartSpeed: 3000,
      nav: false,
      dots: false,
      navText: [
        '<i class="fa-solid fa-chevron-left"></i>',
        '<i class="fa-solid fa-chevron-right"></i>'
      ],
      responsive: {
        0: { items: 2 },
        600: { items: 3 },
        1000: { items: 5 }
      }
    });

  });

  $(".studentReviews").owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 700,
    animateOut: 'fadeOut',   // fade out effect
    animateIn: 'fadeIn',
    nav: false,
    dots: false,

    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>'
    ],

    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 }
    }
  });

});


// const dropdownToggles = document.querySelectorAll(".mobile-dropdown-toggle");
// dropdownToggles.forEach(toggle => {
//   toggle.addEventListener("click", function (e) {
//     e.preventDefault();
//     const dropdown = this.closest(".custom-dropdown").querySelector(".drop-down-links");
//     dropdown.classList.toggle("show");

//     // Optional visually flip chevron icon
//     if (dropdown.classList.contains("show")) {
//       this.classList.remove("fa-chevron-down");
//       this.classList.add("fa-chevron-up");
//     } else {
//       this.classList.remove("fa-chevron-up");
//       this.classList.add("fa-chevron-down");
//     }
//   });
// });

document.querySelectorAll(".mobile-dropdown-toggle").forEach(toggle => {
  toggle.addEventListener("click", function (e) {
    e.preventDefault();
    const parent = this.closest(".custom-dropdown");
    const dropdown = parent.querySelector(".drop-down-links");

    dropdown.classList.toggle("show");

    // Optional: rotate icon
    this.classList.toggle("rotate");
  });
});


document.querySelectorAll(".mobile-dropdown-toggle").forEach(toggle => {
  toggle.addEventListener("click", function () {
    const parent = this.closest(".custom-dropdown");
    const dropdown = parent.querySelector(".drop-down-links");

    dropdown.classList.toggle("show-dropownd-mobile");

    // Optional: rotate icon
    this.classList.toggle("rotate");
  });
});