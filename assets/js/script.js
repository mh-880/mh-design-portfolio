/* ==========================
   Hamburger Menu
========================== */

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburger.classList.toggle('active');
});


/* ==========================
   Smooth Scroll
========================== */

const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener('click', function (e) {

    const targetId = this.getAttribute('href');

    if (targetId === '#') return;

    e.preventDefault();

    const target = document.querySelector(targetId);

    const headerHeight =
      document.querySelector('.header')
      .offsetHeight;

    const targetPosition =
      target.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    // スマホメニュー閉じる
    nav.classList.remove('active');
    hamburger.classList.remove('active');
  });
});


/* ==========================
   Fade In Animation
========================== */

const fadeElements =
document.querySelectorAll(
  '.section, .work-card, .value-card, .flow-item'
);

const fadeObserver =
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.15
});

fadeElements.forEach(el => {
  fadeObserver.observe(el);
});

const flowItems = document.querySelectorAll('.flow-item');

const flowObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      flowItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('is-visible');
        }, index * 250);
      });

      obs.disconnect(); // 1回だけ発火
    }
  });
}, {
  threshold: 0.2
});

const flowSection = document.querySelector('.flow-list');
if (flowSection) {
  flowObserver.observe(flowSection);
}


/* ==========================
   Header Scroll Effect
========================== */

window.addEventListener('scroll', () => {
  const header =
    document.querySelector('.header');

  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* ==========================
Navigation Active
========================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {

    const headerHeight =
        document.querySelector(".header").offsetHeight;

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - headerHeight - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${current}`
        ) {
            link.classList.add("active");
        }

    });

});


/* ==========================
Works
========================== */

const buttons =
document.querySelectorAll('.btn');
const cards =
document.querySelectorAll('.work-card');
const LIMIT = 6;
const showMoreBtn =
document.getElementById('show-more-btn');
let expanded = false;


/* --------------------------
表示更新
-------------------------- */

function updateWorksDisplay() {

  const visibleCards = [
    ...document.querySelectorAll(
      '.work-card:not(.is-hidden)'
    )
  ];

  // 件数制限リセット
  cards.forEach(card => {
    card.classList.remove(
      'hidden-by-limit'
    );
  });

  // 8件超の場合のみ制限
  if (
    !expanded &&
    visibleCards.length > LIMIT
  ) {
    visibleCards
      .slice(LIMIT)
      .forEach(card => {
        card.classList.add(
          'hidden-by-limit'
        );
      });
  }

  // ボタン表示制御
  if (
    visibleCards.length <= LIMIT
  ) {
    showMoreBtn.style.display =
      'none';

  } else {
    showMoreBtn.style.display =
      'inline-flex';
    showMoreBtn.textContent =
      expanded
        ? 'とじる'
        : 'すべての実績を見る';
  }
}


/* --------------------------
タブ切り替え
-------------------------- */

buttons.forEach(button => {

  button.addEventListener(
    'click',
    () => {
      expanded = false;
      buttons.forEach(btn =>
        btn.classList.remove(
          'active'
        )
      );
      button.classList.add(
        'active'
      );
      const filter =
        button.id;
      cards.forEach(card => {

        if (
          filter === 'all'
        ) {
          card.classList.remove(
            'is-hidden'
          );
          return;
        }

        if (
          card.classList.contains(
            filter
          )
        ) {
          card.classList.remove(
            'is-hidden'
          );

        } else {
          card.classList.add(
            'is-hidden'
          );
        }
      });
      updateWorksDisplay();
    }
  );
});


/* --------------------------
もっと見る
-------------------------- */

showMoreBtn.addEventListener(
  'click',
  () => {
    const wasExpanded = expanded;
    const scrollPos = window.scrollY;
    expanded = !expanded;

    updateWorksDisplay();
    // 開く時だけアニメーション
    if (!wasExpanded) {
      const visibleCards = [
        ...document.querySelectorAll(
          '.work-card:not(.is-hidden)'
        )
      ];
      visibleCards
        .slice(LIMIT)
        .forEach((card, index) => {
          card.style.animationDelay =
            `${index * 0.08}s`;
          card.classList.add(
            'fade-in'
          );
          setTimeout(() => {
            card.classList.remove(
              'fade-in'
            );
            card.style.animationDelay =
              '';
          }, 800);
        });
      window.scrollTo({
        top: scrollPos
      });

    } else {
      const worksSection =
        document.querySelector('.works');
      const worksBottom =
        worksSection.offsetTop +
        worksSection.offsetHeight;
      window.scrollTo({
        top: worksBottom - window.innerHeight + 150,
        behavior: 'smooth'
      });
    }
  }
);

/* --------------------------
初期表示
-------------------------- */
updateWorksDisplay();