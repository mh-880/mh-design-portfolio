// /* ==========================================
//    Hero Glass Orbs
//    Part1
//    ------------------------------------------
//    ・マウス追従
//    ・イージング
//    ・requestAnimationFrame
//    ・Hero外で自然復帰
// ========================================== */

// document.addEventListener("DOMContentLoaded", () => {

//     const hero = document.querySelector(".hero");

//     if (!hero) return;

//     const orbWraps = document.querySelectorAll(".orb-wrap");

//     const mouse = {
//         x: 0,
//         y: 0,
//         inside: false
//     };

//     /*==========================
//       Orb設定
//     ==========================*/

//     const orbData = [];

//     orbWraps.forEach((wrap) => {

//         let radius = 180;
//         let move = 5;
//         let ease = .08;

//         if (wrap.classList.contains("orb-1")) {

//             radius = 150;
//             move = 10;
//             ease = .13;

//         }

//         if (wrap.classList.contains("orb-2")) {

//             radius = 180;
//             move = 7;
//             ease = .10;

//         }

//         if (wrap.classList.contains("orb-3")) {

//             radius = 240;
//             move = 4;
//             ease = .07;

//         }

//         orbData.push({
//             wrap,
//             element: wrap.querySelector(".orb"),
//             light: wrap.querySelector(".orb-light"),
//             radius,
//             move,
//             ease,
//             currentX:0,
//             currentY:0,
//             targetX:0,
//             targetY:0
//         });

//     });

//     /*==========================
//       Mouse
//     ==========================*/

//     hero.addEventListener("mouseenter",()=>{

//         mouse.inside = true;

//         hero.classList.add("is-active");

//     });

//     hero.addEventListener("mouseleave",()=>{

//         mouse.inside = false;

//         hero.classList.remove("is-active");

//     });

//     hero.addEventListener("mousemove",(e)=>{

//         mouse.x = e.clientX;

//         mouse.y = e.clientY;

//     });

//     /*==========================
//       Update Target
//     ==========================*/

//     function updateTarget(){

//         orbData.forEach((orb)=>{

//             if(!mouse.inside){

//                 orb.targetX = 0;
//                 orb.targetY = 0;

//                 return;

//             }

//             const rect = orb.wrap.getBoundingClientRect();

//             const centerX = rect.left + rect.width / 2;

//             const centerY = rect.top + rect.height / 2;

//             const dx = mouse.x - centerX;

//             const dy = mouse.y - centerY;

//             const distance = Math.sqrt(dx * dx + dy * dy);

//             // ガラス玉に近いか判定
//             if (distance < orb.radius * 0.55) {

//                 orb.wrap.classList.add("is-near");

//             } else {

//                 orb.wrap.classList.remove("is-near");

//             }

//             // 反応範囲外なら追従しない
//             if (distance > orb.radius) {

//                 orb.targetX = 0;
//                 orb.targetY = 0;

//                 return;

//             }

//             const power = 1 - (distance / orb.radius);

//             orb.targetX = (dx / orb.radius) * orb.move * power;

//             orb.targetY = (dy / orb.radius) * orb.move * power;

//         });

//     }

//     /*==========================
//       Animation Loop
//     ==========================*/

//     const heroBg = document.querySelector(".hero-bg");

//     function animate(){

//         updateTarget();

//         orbData.forEach((orb)=>{

//             orb.currentX +=
//                 (orb.targetX - orb.currentX)
//                 * orb.ease;

//             orb.currentY +=
//                 (orb.targetY - orb.currentY)
//                 * orb.ease;

//             orb.wrap.style.transform =

//                 `translate3d(${orb.currentX}px, ${orb.currentY}px, 0)`;

//                 // ガラス玉を少し傾ける
//                 const rotateY = orb.currentX * 0.8;
//                 const rotateX = -orb.currentY * 0.8;
//                 const scale =
//                     orb.wrap.classList.contains("is-near")
//                         ? 1.02
//                         : 1;
//                 if (orb.element) {
//                     orb.element.style.transform = `
//                         rotateX(${rotateX}deg)
//                         rotateY(${rotateY}deg)
//                         scale(${scale})
//                     `;
//                 }
//                 if (orb.light) {
//                     orb.light.style.transform = `
//                         translate3d(
//                             ${orb.currentX * 2.4}px,
//                             ${orb.currentY * 2.4}px,
//                             0
//                         )
//                     `;
//                     const strength = Math.min(
//                         Math.sqrt(
//                             orb.currentX * orb.currentX +
//                             orb.currentY * orb.currentY
//                         ),
//                         8
//                     );
//                     orb.light.style.opacity =
//                         0.25 + strength * 0.08;
//                 }

//         });

//         if(heroBg){
//             const rect = hero.getBoundingClientRect();
//             const mx = (mouse.x - rect.left) / rect.width - .5;
//             const my = (mouse.y - rect.top) / rect.height - .5;

//             heroBg.style.transform = `
//                 translate3d(
//                     ${-mx * 2}px,
//                     ${-my * 2}px,
//                     0
//                 )
//             `;
//         }
//         requestAnimationFrame(animate);

//     }
//     animate();
// });




document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const orbWraps = document.querySelectorAll(".orb-wrap");

  const mouse = {
    x: 0,
    y: 0,
    inside: false
  };

  const orbData = [];

  orbWraps.forEach((wrap) => {
    let radius = 180;
    let move = 5;
    let ease = 0.08;
    let lightStrength = 1;

    if (wrap.classList.contains("orb-1")) {
      radius = 150;
      move = 18;
      ease = 0.13;
      lightStrength = 1.2;
    }

    if (wrap.classList.contains("orb-2")) {
      radius = 180;
      move = 15;
      ease = 0.1;
      lightStrength = 1;
    }

    if (wrap.classList.contains("orb-3")) {
      radius = 240;
      move = 11;
      ease = 0.08;
      lightStrength = 0.85;
    }

    orbData.push({
      wrap,
      element: wrap.querySelector(".orb"),
      light: wrap.querySelector(".orb-light"),
      radius,
      move,
      ease,
      currentX: 0,
      currentY: 0,
      targetX: 0,
      targetY: 0,
      scale: 1,
      lightStrength: 1
    });
  });

  hero.addEventListener("mouseenter", () => {
    mouse.inside = true;
    hero.classList.add("is-active");
  });

  hero.addEventListener("mouseleave", () => {
    mouse.inside = false;
    hero.classList.remove("is-active");
  });

  hero.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function updateTarget() {
    orbData.forEach((orb) => {
      if (!mouse.inside) {
        orb.targetX = 0;
        orb.targetY = 0;
        return;
      }

      const rect = orb.wrap.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = mouse.x - centerX;
      const dy = mouse.y - centerY;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < orb.radius * 0.55) {
        orb.wrap.classList.add("is-near");
      } else {
        orb.wrap.classList.remove("is-near");
      }

      if (distance > orb.radius) {
        orb.targetX = 0;
        orb.targetY = 0;
        return;
      }

    //   const power = 1 - distance / orb.radius;
    //   const power = Math.pow(1 - distance / orb.radius, 1.5);
    //   const power = (1 - distance / orb.radius) * 1.3;
      const power = Math.pow(1 - distance / orb.radius, 1.8);

      orb.targetX = (dx / orb.radius) * orb.move * power * 2.0;
      orb.targetY = (dy / orb.radius) * orb.move * power * 8;
    });
  }

  function animate() {
    updateTarget();

    orbData.forEach((orb) => {
      orb.currentX += (orb.targetX - orb.currentX) * orb.ease;
      orb.currentY += (orb.targetY - orb.currentY) * orb.ease;

      const rotateY = orb.currentX * 0.8;
      const rotateX = -orb.currentY * 0.8;

      // scale（near反応）
      const targetScale = orb.wrap.classList.contains("is-near")
        ? 1.02
        : 1;

      orb.scale += (targetScale - orb.scale) * 0.08;

      orb.wrap.style.transform = `
        translate3d(${orb.currentX}px, ${orb.currentY}px, 0)
      `;

      if (orb.element) {
        orb.element.style.transform = `
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale(${orb.scale})
        `;
      }

      if (orb.light) {
        orb.light.style.transform = `
          translate3d(
            ${orb.currentX * 2.4 * orb.lightStrength}px,
            ${orb.currentY * 2.4 * orb.lightStrength}px,
            0
          )
        `;

        const strength = Math.min(
          Math.sqrt(orb.currentX ** 2 + orb.currentY ** 2),
          8
        );

        orb.light.style.opacity = 0.25 + strength * 0.08;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
});