/* ==========================================
   Header Scroll
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");

    if (!header) return;

    /**
     * Headerの状態を更新
     */
    function updateHeader() {

        if (window.scrollY > 30) {

            header.classList.add("is-scrolled");

        } else {

            header.classList.remove("is-scrolled");

        }

    }

    // 初期表示
    updateHeader();

    // スクロール時
    window.addEventListener("scroll", updateHeader);

});


/* ==========================================
   Back To Top
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const backToTop = document.querySelector(".back-to-top");

    if (!backToTop) return;

    let ticking = false;

    /**
     * ボタン表示切替
     */
    function updateBackToTop() {

        if (window.scrollY > 400) {

            backToTop.classList.add("is-visible");

        } else {

            backToTop.classList.remove("is-visible");

        }

        ticking = false;

    }

    /**
     * Scroll
     */
    window.addEventListener("scroll", () => {

        if (!ticking) {

            window.requestAnimationFrame(updateBackToTop);

            ticking = true;

        }

    });

    /**
     * 初期表示
     */
    updateBackToTop();

    /**
     * Click
     */
    backToTop.addEventListener("click", (e) => {

        e.preventDefault();

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

});


/* ==========================================
   Fade Up
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const fadeItems = document.querySelectorAll(".fade-up");

    if (!fadeItems.length) return;

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-show");

            observer.unobserve(entry.target);

        });

    }, {

        threshold: 0.15

    });

    fadeItems.forEach(item => {

        observer.observe(item);

    });

});


/* ==========================================
   Image Modal
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.querySelector(".image-modal");
    const modalOverlay = document.querySelector(".image-modal-overlay");
    const modalImage = document.querySelector(".modal-image");
    const modalClose = document.querySelector(".modal-close");

    const imageButtons = document.querySelectorAll(".image-modal-open");

    if (
        !modal ||
        !modalOverlay ||
        !modalImage ||
        !modalClose ||
        !imageButtons.length
    ) return;

    /**
     * モーダルを開く
     */
    function openModal(src, alt) {

        modalImage.src = src;
        modalImage.alt = alt;

        modal.classList.add("is-open");

        document.body.style.overflow = "hidden";

    }

    /**
     * モーダルを閉じる
     */
    function closeModal() {

        modal.classList.remove("is-open");

        document.body.style.overflow = "";

        setTimeout(() => {

            modalImage.src = "";
            modalImage.alt = "";

        }, 300);

    }

    /**
     * 画像クリック
     */
    imageButtons.forEach(button => {

        button.addEventListener("click", () => {

            const src = button.dataset.image;
            const img = button.querySelector("img");

            openModal(

                src,

                img ? img.alt : ""

            );

        });

    });

    /**
     * 閉じるボタン
     */
    modalClose.addEventListener("click", closeModal);

    /**
     * 背景クリック
     */
    modalOverlay.addEventListener("click", closeModal);

    /**
     * ESCキー
     */
    document.addEventListener("keydown", (e) => {

        if (
            e.key === "Escape" &&
            modal.classList.contains("is-open")
        ) {

            closeModal();

        }

    });

});



/* ==========================================
   Design Point
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Element Cache
    ========================================== */

    const wrapper = document.querySelector(".design-layout");
    const preview = document.querySelector(".preview-image");

    if (!wrapper || !preview) return;

    const image = preview.querySelector("img");

    /* ---------------------------------------
    Lightbox
    --------------------------------------- */

    const lightbox =
        document.querySelector(".design-lightbox");

    const lightboxImage =
        lightbox?.querySelector("img");

    const closeButton =
        lightbox?.querySelector(".lightbox-close");

    const expandButton =
        document.querySelector(".preview-expand");

    const cards = document.querySelectorAll(".design-card");
    const pins = document.querySelectorAll(".design-pin");
    const highlights = document.querySelectorAll(".highlight");

    const reflection =
        document.querySelector(".glass-reflection");

    const svg =
        document.querySelector(".design-line-layer");

    const path =
        document.querySelector(".design-line");



    /* ==========================================
       Mouse Position
    ========================================== */

    let targetX = preview.offsetWidth / 2;
    let targetY = preview.offsetHeight / 2;

    let currentX = targetX;
    let currentY = targetY;



    /* ==========================================
    Preview Reveal
    ========================================== */

    const previewObserver =
        new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                preview.classList.add("is-show");

                observer.disconnect();

            });

        },{

            threshold:0.2

        });

    const section = document.querySelector(".design-detail");

    previewObserver.observe(section);



    /* ==========================================
    Card Reveal
    ========================================== */

    const cardGrid =
        document.querySelector(".design-card-grid");

    const cardObserver =
        new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                showCardsSequentially();

                observer.disconnect();

            });

        },{

            threshold:0.15,

            rootMargin:"0px 0px -12% 0px"

        });

    cardObserver.observe(cardGrid);



    /* ==========================================
       Card Sequential Reveal
    ========================================== */

    function showCardsSequentially(){

        cards.forEach((card,index)=>{

            setTimeout(()=>{

                requestAnimationFrame(()=>{

                    card.classList.add("is-show");

                });

            }, index * 180);

        });

    }



    /* ==========================================
       Draw SVG Line
    ========================================== */

    function drawLine(card,pin){

        if(!card || !pin || !svg || !path) return;

        const svgRect =
            svg.getBoundingClientRect();

        const cardRect =
            card.getBoundingClientRect();

        const stepCircle =
            card.querySelector(".step-circle");

        if (!stepCircle) return;

        const stepRect =
            stepCircle.getBoundingClientRect();

        const pinRect =
            pin.getBoundingClientRect();

        const startX =
            stepRect.left +
            stepRect.width / 2 -
            svgRect.left;

        const startY =
            stepRect.top -
            svgRect.top;

        const endX =
            pinRect.left +
            pinRect.width / 2 -
            svgRect.left;

        const endY =
            pinRect.bottom -
            svgRect.top;

        const curve = 50;

        path.setAttribute("d",`

            M ${startX} ${startY}
            C ${startX-curve} ${startY}
              ${endX+curve} ${endY}
              ${endX} ${endY}

        `);

        const length =
            path.getTotalLength();

        path.style.transition = "none";

        path.style.strokeDasharray = length;

        path.style.strokeDashoffset = length;

        path.style.opacity = 1;

        path.getBoundingClientRect();

        requestAnimationFrame(()=>{

            path.style.transition =
                "stroke-dashoffset .55s ease";

            path.style.strokeDashoffset = 0;

        });

    }



    /* ==========================================
       Glass Reflection
    ========================================== */

    function animateReflection(){

        if(!reflection) return;

        currentX +=
            (targetX-currentX)*0.08;

        currentY +=
            (targetY-currentY)*0.08;

        reflection.style.transform =

            `translate(${currentX-130}px,
                       ${currentY-130}px)`;

        requestAnimationFrame(
            animateReflection
        );

    }

    animateReflection();

    /* ---------------------------------------
    Open Lightbox
    --------------------------------------- */

    function openLightbox(){

        if(!lightbox || !lightboxImage) return;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        document.body.classList.add("lightbox-open");

        lightbox.classList.add("is-show");

        document.body.style.overflow = "hidden";

    }

    /* ---------------------------------------
    Close Lightbox
    --------------------------------------- */

    function closeLightbox(){

        if(!lightbox) return;

        lightbox.classList.remove("is-show");

        document.body.classList.remove("lightbox-open");

        document.body.style.overflow = "";

    }



    /* ==========================================
       Reset Active
    ========================================== */

    function resetActive() {

        preview.classList.remove("is-active");

        cards.forEach(card => {

            card.classList.remove("is-active");

        });

        pins.forEach(pin => {

            pin.classList.remove("is-active");

        });

        highlights.forEach(highlight => {

            highlight.classList.remove("is-show");

        });

        if (path) {

            path.style.opacity = 0;
            path.style.transition = "none";

            const length = path.getTotalLength();

            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;

        }

    }



    /* ==========================================
       Activate
    ========================================== */

    function activate(point) {

        resetActive();

        preview.classList.add("is-active");

        const card = document.querySelector(
            `.design-card[data-point="${point}"]`
        );

        const pin = document.querySelector(
            `.design-pin[data-target="${point}"]`
        );

        const highlight = document.querySelector(
            `.highlight-${point}`
        );

        card?.classList.add("is-active");

        pin?.classList.add("is-active");

        highlight?.classList.add("is-show");

        if (card && pin) {

            drawLine(card, pin);

        }

    }



    /* ==========================================
       Card Hover
    ========================================== */

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            activate(card.dataset.point);

        });

        card.addEventListener("focusin", () => {

            activate(card.dataset.point);

        });

    });



    /* ==========================================
       Pin Hover
    ========================================== */

    pins.forEach(pin => {

        pin.addEventListener("mouseenter", () => {

            activate(pin.dataset.target);

        });

        pin.addEventListener("focus", () => {

            activate(pin.dataset.target);

        });

    });



    /* ==========================================
       Wrapper Leave
    ========================================== */

    wrapper.addEventListener("mouseleave", () => {

        resetActive();

    });

    wrapper.addEventListener("focusout", (e) => {

        if (!wrapper.contains(e.relatedTarget)) {

            resetActive();

        }

    });


        /* ==========================================
       Pin Click
    ========================================== */

    pins.forEach(pin => {

        pin.addEventListener("click", () => {

            const point = pin.dataset.target;

            activate(point);

            const card = document.querySelector(
                `.design-card[data-point="${point}"]`
            );

            card?.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });

        });

    });



    /* ==========================================
       Card Click
    ========================================== */

    cards.forEach(card => {

        card.addEventListener("click", () => {

            activate(card.dataset.point);

        });

    });



    /* ==========================================
       Touch Device
    ========================================== */

    if (window.matchMedia("(hover: none)").matches) {

        pins.forEach(pin => {

            pin.addEventListener("touchstart", () => {

                activate(pin.dataset.target);

            }, {

                passive: true

            });

        });

    }



    /* ==========================================
       Escape Key
    ========================================== */

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {

            resetActive();

        }

    });


        /* ==========================================
       Preview Mouse Move
    ========================================== */

    preview.addEventListener("mousemove", (e) => {

        const rect = preview.getBoundingClientRect();

        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;

        /* ---------- Image Tilt ---------- */

        const rotateX =
            ((targetY / rect.height) - 0.5) * -2;

        const rotateY =
            ((targetX / rect.width) - 0.5) * 2;

        image.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.02)
        `;

    });



    /* ==========================================
       Preview Leave
    ========================================== */

    preview.addEventListener("mouseleave", () => {

        targetX = preview.offsetWidth / 2;
        targetY = preview.offsetHeight / 2;

        image.style.transform = `
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;

    });


    /* ---------------------------------------
    Preview Click
    --------------------------------------- */

    preview.addEventListener("click",(e)=>{

        if(e.target.closest(".design-pin")) return;

        openLightbox();

    });

    /* ---------------------------------------
    Expand Button
    --------------------------------------- */

    expandButton?.addEventListener("click",(e)=>{

        e.stopPropagation();

        openLightbox();

    });

    /* ---------------------------------------
    Close Button
    --------------------------------------- */

    closeButton?.addEventListener("click",()=>{

        closeLightbox();

    });

    /* ---------------------------------------
    Background Click
    --------------------------------------- */

    lightbox?.addEventListener("click",(e)=>{

        if(e.target===lightbox){

            closeLightbox();

        }

    });

    /* ---------------------------------------
    ESC Key
    --------------------------------------- */

    document.addEventListener("keydown",(e)=>{

        if(e.key==="Escape"){

            closeLightbox();

        }

    });



    /* ==========================================
       Resize
    ========================================== */

    window.addEventListener("resize", () => {

        targetX = preview.offsetWidth / 2;
        targetY = preview.offsetHeight / 2;

        const activeCard =
            document.querySelector(".design-card.is-active");

        const activePin =
            document.querySelector(".design-pin.is-active");

        if (activeCard && activePin) {

            drawLine(activeCard, activePin);

        }

    });



    /* ==========================================
       Initialize
    ========================================== */

    targetX = preview.offsetWidth / 2;
    targetY = preview.offsetHeight / 2;

    currentX = targetX;
    currentY = targetY;

});


/* ==========================
Hero Divider
========================== */

const heroDivider = document.querySelector(".hero-divider");

if(heroDivider){

    const heroDividerObserver = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            entry.target.classList.add("is-show");

            heroDividerObserver.unobserve(entry.target);

        });

    },{

        threshold:.5

    });

    heroDividerObserver.observe(heroDivider);

}


/* ==========================
Section Divider
========================== */

const dividerObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(!entry.isIntersecting) return;

        entry.target.classList.add("is-show");

        dividerObserver.unobserve(entry.target);

    });

},{

    threshold:0.4

});

document.querySelectorAll(".section-divider").forEach(divider=>{

    dividerObserver.observe(divider);

});