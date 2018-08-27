import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

import 'tablesaw/dist/tablesaw.jquery';
import libs from './lib/dependancies';
window.libs = libs;

import Swiper from 'swiper/dist/js/swiper.js';
import './vendor/wa-mediabox';

$(document).foundation();

libs.AOS.init();

// SVG Injector
// Elements to inject
var mySVGsToInject = document.querySelectorAll('img.inject-me');

// Options
var injectorOptions = {
  evalScripts: 'once',
  pngFallback: 'assets/png'
};

var afterAllInjectionsFinishedCallback = function(totalSVGsInjected) {
  // Callback after all SVGs are injected
  console.log('We injected ' + totalSVGsInjected + ' SVG(s)!');
};

var perInjectionCallback = function(svg) {
  // Callback after each SVG is injected
  console.log('SVG injected: ' + svg);
};

// create injector configured by options
var injector = new libs.svgInjector(injectorOptions);

// Trigger the injection
injector.inject(mySVGsToInject, afterAllInjectionsFinishedCallback, perInjectionCallback);

// slick carousel
$('.content-carousel').slick({
  // normal options...
  speed: 5000,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: 'linear',
  slidesToShow: 5,
  slidesToScroll: 1,
  infinite: true,
  swipeToSlide: true,
  centerMode: true,
  focusOnSelect: true,
  // the magic
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        dots: true
      }
    },
    {
      breakpoint: 300,
      settings: 'unslick' // destroys slick
    }
  ]
});

// tablesaw table plugin
$(function() {
  $(document)
    .foundation()
    .trigger('enhance.tablesaw');
});

var TablesawConfig = {
  swipeHorizontalThreshold: 15
};

// app dashboard toggle
$('[data-app-dashboard-toggle-shrink]').on('click', function(e) {
  e.preventDefault();
  $(this)
    .parents('.app-dashboard')
    .toggleClass('shrink-medium')
    .toggleClass('shrink-large');
});

document.addEventListener('DOMContentLoaded', function(event) {
  // search menu toggle
  $('.navigation-toggle').on('click', function(e) {
    e.preventDefault();

    var navigation = $('.navigation'),
      navigationToggle = $(this);

    if (navigation) {
      navigation.toggleClass('shown');
      navigationToggle.toggleClass('active');
    }
  });

  // hero slider
  var heroSwiper = new Swiper('#hero-slider', {
    loop: true,
    autoHeight: true,
    lazy: {
      loadPrevNext: true
    },
    // effect: 'fade',
    fadeEffect: {
      // crossFade: true
    }
  });

  // lightbox
  //Translate - set before any binding
  WAMediaBox.lang = {
    prev: 'Назад',
    next: 'Вперёд',
    close: 'Закрыть',
    openInNew: 'Открыть в новом окне'
  };

  //Counter
  var increments = document.querySelectorAll('.counter-button.plus'),
    decrements = document.querySelectorAll('.counter-button.minus'),
    i;

  for (i = 0; i < increments.length; i++) {
    increments[i].addEventListener('click', function(e) {
      e.preventDefault();

      var counterInput = this.parentElement.firstElementChild.nextElementSibling;

      console.log(counterInput);

      if (counterInput.classList.contains('counter-input') && counterInput.value < 1001) {
        counterInput.value++;
      }
    });
  }

  for (i = 0; i < decrements.length; i++) {
    decrements[i].addEventListener('click', function(e) {
      e.preventDefault();

      var counterInput = this.parentElement.firstElementChild.nextElementSibling;

      if (counterInput.classList.contains('counter-input') && counterInput.value > 1) {
        counterInput.value--;
      }
    });
  }

  //Project gallery
  var projectGallery = new Swiper('#project-gallery-main', {
    // spaceBetween: 10,
    lazy: {
      loadPrevNext: true
    },
    navigation: {
      nextEl: '#project-gallery-next',
      prevEl: '#project-gallery-prev'
    }
  });
  var galleryThumbs = new Swiper('#project-gallery-thumbs', {
    spaceBetween: 4,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
    lazy: {
      loadPrevNext: true
    }
  });
  projectGallery.controller.control = galleryThumbs;
  galleryThumbs.controller.control = projectGallery;
});
