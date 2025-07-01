document.addEventListener('DOMContentLoaded', function() {
    // --- KODE UNTUK HEADER YANG MUNCUL/MENGHILANG ---
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY; // Menyimpan posisi scroll terakhir

    window.addEventListener('scroll', function() {
        if (window.scrollY > lastScrollY) {
            // Scroll ke bawah
            header.classList.add('hidden');
        } else {
            // Scroll ke atas
            if (window.scrollY < lastScrollY || window.scrollY === 0) {
                header.classList.remove('hidden');
            }
        }
        lastScrollY = window.scrollY; // Perbarui posisi scroll terakhir
    });

    // --- KODE UNTUK HAMBURGER MENU ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const closeBtn = document.querySelector('.mobile-nav-overlay .close-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-overlay .mobile-nav ul li a'); // Link dalam menu mobile

    // Pastikan elemen-elemen ada sebelum menambahkan event listener
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Mencegah scrolling pada body saat overlay aktif
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = ''; // Mengembalikan scrolling pada body
        });
    }

    // Menutup overlay saat link di menu mobile diklik
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- KODE SLIDER ---
    const slides = document.querySelectorAll('.hero-slider .slide'); // Ini adalah elemen individual slide
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    const dots = document.querySelectorAll('.slider-dots .dot');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    const autoSlideDelay = 3000; // 3 detik

    function showSlide(index) {
        // Logika untuk memastikan index berada dalam batas
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }

        // Gunakan opacity untuk menampilkan/menyembunyikan slide
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        slides[currentSlide].classList.add('active');

        // Update active dot
        dots.forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        stopAutoSlide(); // Hentikan interval sebelumnya jika ada
        autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event Listeners for Slider
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide(); // Restart auto-slide after manual interaction
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide(); // Restart auto-slide after manual interaction
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideIndex = parseInt(e.target.dataset.slide);
            stopAutoSlide();
            showSlide(slideIndex);
            startAutoSlide(); // Restart auto-slide after manual interaction
        });
    });

    // Mulai auto-slide saat halaman dimuat
    startAutoSlide();

    // Initial load for slider
    showSlide(currentSlide);
});