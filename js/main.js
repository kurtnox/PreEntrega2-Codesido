

document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * nav movil
   */

  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * esconder mostrar nav
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * dropdownss moviles
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function (event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * scrol ltop
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });



  /**
   * swiper
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * swiper2
   */
  new Swiper('.slides-2', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * purecounter
   */
  new PureCounter();

  /**
   * animacion on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});

/**
 * calculadora nutricional
 */
const inputs = document.querySelectorAll('input, select');

inputs.forEach(input => {
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const nextInput = getNextInput(input);
      if (nextInput) {
        nextInput.focus();
      }
    }
  });
});

function getNextInput(currentInput) {
  const nextIndex = parseInt(currentInput.tabIndex) + 1;
  return document.querySelector(`[tabindex="${nextIndex}"]`);
}

function calcular() {
}

function calcular() {
  const peso = document.getElementById("peso").value;
  const altura = document.getElementById("altura").value / 100; // CONVERTIR A METROS
  const edad = document.getElementById("edad").value;
  const genero = document.querySelector('input[name="genero"]:checked').value;
  const nivelActividad = document.getElementById("nivel-actividad").value;

  // cALCULO BMR
  let bmr;
  if (genero === "masculino") {
    bmr = 88.36 + (13.4 * peso) + (4.8 * altura * 100) - (5.7 * edad);
  } else {
    bmr = 447.6 + (9.2 * peso) + (3.1 * altura * 100) - (4.3 * edad);
  }

  // CALCULAR CALORIAS DIARIAS
  const tdee = bmr * nivelActividad;

  // CALCULAR DISTRIBUCION MACRONUTRIENTES
  const protein = peso * 2.2 * 1.6; // 1.6 PARA ADULTOS SALUDABLES
  const fat = tdee * 0.2 / 9; // 20% DE CALORIAS PROVIENEN DE GRASA
  const carb = (tdee - (protein * 4) - (fat * 9)) / 4; // EL RESTO DE LAS CALORIAS VAN A CARBOS

  // DISPLAY RESULTADO
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = `
            <p>Tu Ritmo Metabólico basal es de ${tdee.toFixed(2)} kcal/día.</p>
            <p>Para mantenerte en tu peso actual, debes consumir:</p>
            <ul>
                <li>${protein.toFixed(1)} g de proteína al día</li>
                <li>${fat.toFixed(1)} g de grasa al día</li>
                <li>${carb.toFixed(1)} g de carbohidratos al día</li>
            </ul>
        `;
}
/**
 * Calculadora de RM
 */
function calcular_rm() {
  var peso = document.getElementById("peso_barra").value;
  var repeticiones = document.getElementById("repeticiones").value;
  var oneRM = peso * (1 + (repeticiones / 30));
  document.getElementById("resultado_rm").innerHTML = "Tu 1RM estimado es: " + oneRM.toFixed(2) + " kg.";
}
/**
 * Calculadora de Aproximaciones
 */
function calcularSeries() {
  // INPUT
  const goalWeight = parseFloat(document.getElementById("pesoObjetivo").value);
  const goalReps = parseInt(document.getElementById("repsObjetivo").value);

  // CALCULAR SERIES Y REPS
  const set1Reps = goalReps + 7;
  const set1Weight = roundToNearest(20, 2.5);

  const set2Reps = goalReps + 6;
  const set2Weight = roundToNearest(goalWeight * 0.25, 2.5);

  const set3Reps = goalReps + 5;
  const set3Weight = roundToNearest(goalWeight * 0.5, 2.5);

  const set4Reps = goalReps + 4;
  const set4Weight = roundToNearest(goalWeight * 0.7, 2.5);

  const set5Reps = goalReps + 3;
  const set5Weight = roundToNearest(goalWeight * 0.8, 2.5);

  const set6Reps = goalReps;
  const set6Weight = roundToNearest(goalWeight * 0.9, 2.5);

  const set7Reps = goalReps;
  const set7Weight = roundToNearest(goalWeight * 0.95, 2.5);

  // DISPLAY RESULTADO
  document.getElementById("set1").innerHTML = set1Reps + " reps con " + set1Weight + " kg";
  document.getElementById("set2").innerHTML = set2Reps + " reps con " + set2Weight + " kg";
  document.getElementById("set3").innerHTML = set3Reps + " reps con " + set3Weight + " kg";
  document.getElementById("set4").innerHTML = set4Reps + " reps con " + set4Weight + " kg";
  document.getElementById("set5").innerHTML = set5Reps + " reps con " + set5Weight + " kg";
  document.getElementById("set6").innerHTML = set6Reps + " reps con " + set6Weight + " kg";
  document.getElementById("set7").innerHTML = set7Reps + " reps con " + set7Weight + " kg";
}

function roundToNearest(weight, nearest) {
  // REDONDEAR AL 2.5 MAS CERCANO
  const rounded = Math.round(weight / nearest) * nearest;
  return rounded;
}
