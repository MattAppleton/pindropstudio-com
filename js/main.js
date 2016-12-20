/* jshint browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document, Site, imagesLoaded, Swiper, zenscroll */
var Shuffle = window.shuffle;

Site = {
  mobileThreshold: 601,
  animationSpeed: 400,
  init: function() {
    var _this = this;

    $(window).resize(function(){
      _this.onResize();
    });

    $(document).ready(function () {
      Site.Galleries.init();
    });

    _this.fixWidows();

    Site.Shuffle.init();
    Site.Media.init();
    Site.Lightbox.init();
    Site.Luminaries.init();
    Site.Expandables.init();
    Site.Drawers.init();
  },

  onResize: function() {
//     var _this = this;

  },

  fixWidows: function() {
    // utility class mainly for use on headines to avoid widows [single words on a new line]
    $('.js-fix-widows').each(function(){
      var string = $(this).html();
      string = string.replace(/ ([^ ]*)$/,'&nbsp;$1');
      $(this).html(string);
    });
  },
};

Site.Shuffle = {
  init: function() {
    var _this = this;

    _this.shuffleContainer = document.getElementById('shuffle-container');

    if (_this.shuffleContainer) {
      _this.bind();
    }
  },

  bind: function() {
    var _this = this;

    imagesLoaded(_this.shuffleContainer, function() {
      _this.initShuffle();
    });
  },

  initShuffle: function() {
    var _this = this;

    $('#shuffle-preloader').remove();
    $(_this.shuffleContainer).removeClass('hidden');

    _this.shuffleInstance = new Shuffle(_this.shuffleContainer, {
      itemSelector: '.shuffle-item',
      sizer: '.shuffle-item',
      throttleTime: 200,
      staggerAmount: 10,
      staggerAmountMax: 150,
    });

    _this.shuffleContainer.addEventListener('load', function() {
      _this.update();
    }, true);
  },

  update: function() {
    var _this = this;

    if (_this.shuffleInstance) {
      _this.shuffleInstance.update();
    }
  }
};

Site.Galleries = {
  init: function() {
    var _this = this;
    var $galleries = $('.swiper-container');

    if ($galleries.length) {
      $galleries.each(function(index, container) {
        if ($(this).hasClass('home-carousel')) {
          _this.initHomeCarousel(index, container);
        } else {
          _this.initGalleryInstance(index, container);
        }
      });
    }
  },

  initGalleryInstance: function(index, container) {
    var _this = this;

    _this['gallery-instance' + index] = new Swiper(container, {
      speed: 400,
      pagination: '.swiper-pagination',
      paginationType: 'fraction',
      loop: true,
      onTap: function(swiper) {
        swiper.slideNext();
      }
    });
  },

  initHomeCarousel: function(index, container) {
    var _this = this;
    var $slides = $(container).find('.swiper-slide');

    $slides.each(function(index, item) {
      var background = $(item).data('background');

      $(item).css({
        'background-image': 'url(' + background + ')'
      });

    });

    _this['gallery-instance' + index] = new Swiper(container, {
      speed: 600,
      autoplay: 2000,
      pagination: '.swiper-pagination',
      paginationType: 'bullets',
      paginationClickable: true,
      loop: true,
      paginationBulletRender: function(swiper, index, className) {
        return '<div class="carousel-pagination-item u-pointer ' + className + '"><span class="carousel-pagination-item-number">' + (index + 1) + '</span></div>';
      },
    });
  }
};

Site.Luminaries = {
  init: function() {
    if ($('body').hasClass('post-type-archive-luminaries')) {
      this.Archive.init();
    } else if ($('body').hasClass('single-luminaries')) {

    }
  }
};

Site.Luminaries.Archive = {
  init: function() {
    this.bind();
  },

  bind: function() {
    var _this = this;

    $('#luminaries-sort-alphabetical').on('click', function() {
      _this.sort('alphabetical');
      $(this).hide();
      $('#luminaries-sort-order').show();
    });

    $('#luminaries-sort-order').on('click', function() {
      _this.sort('order');
      $(this).hide();
      $('#luminaries-sort-alphabetical').show();
    });
  },

  sort: function(type) {
    var $posts = $('#posts');

    // this function sorts posts by specified order. all the .-type-luminaries children of #posts are sorted by the javascript sort function. the code is based on SO examples
    $posts.find('.type-luminaries').sort(function(a, b) {
      if (type === 'order') {
        // this orders by numerical value with largest numbers first (to match the menu_order). the + is typecasting to enforce integer
        return +b.getAttribute('data-sort-order') - +a.getAttribute('data-sort-order');
      } else {
        // this sorts by alphabetical order abc...
        if (a.getAttribute('data-sort-alphabetical') === 'a'){
          return 0;
        }

        if ( b.getAttribute('data-sort-alphabetical') === 'a'){
          return 1;
        }

        return (a.getAttribute('data-sort-alphabetical') > b.getAttribute('data-sort-' + type) ? 1 : -1);
      }
    }).appendTo($posts);
  }
};

Site.Expandables = {
  init: function() {
    var _this = this;

    _this.bind();
  },

  bind: function() {
    $('.expandable-toggle').click( function() {

      $(this).toggle();

      var $expandableId = $(this).data('exapandable-id');

      // Toggle content
      $('#' + $expandableId).slideToggle(Site.animationSpeed, function() {
        if (Site.Shuffle.shuffleInstance) {
          Site.Shuffle.update();
        }
      });
    });
  },

};

Site.Drawers = {
  init: function() {
    var _this = this;

    _this.bind();

    _this.$validationError = $('.gform_validation_error');
    _this.$submitConfirmation = $('.gform_confirmation_message');

    if (_this.$validationError.length) {
      _this.openSubmitSection(_this.$validationError);
    }

    if (_this.$submitConfirmation.length) {
      _this.openSubmitSection(_this.$submitConfirmation);
    }

    if ($('body').hasClass('page-about')) {
      _this.About.init();
    }
  },

  bind: function() {
    $('.drawer-toggle').click( function() {
      var $drawer = $(this).data('drawer-id');

      // Toggle content
      $('#' + $drawer).slideToggle(Site.animationSpeed);
    });
  },

  openSubmitSection: function($target) {
    for (var x = 0; x < $target.length; x++) {
      $target.closest('.drawer-content').slideToggle(Site.animationSpeed, function() {
        $('html, body').animate({
          scrollTop: $(this).offset().top
        }, Site.animationSpeed);
      });
    }
  },
};

Site.Drawers.About = {
  init: function() {
    var _this = this;

    _this.bind();
  },

  bind: function() {
    var _this = this;

    $('.about-page-drawer-trigger').on('click', function() {
      _this.toggleDrawer(this);
    });
  },

  toggleDrawer: function(clickedTrigger) {
    var target = $(clickedTrigger).data('target');

    if ($(clickedTrigger).hasClass('active')) {
      return;
    }

    $('.about-page-drawer.active').slideUp((Site.animationSpeed + 150), function() {
      $('#about-drawer-' + target).slideDown(Site.animationSpeed);

      $('.about-page-drawer-trigger.active').removeClass('active');
      $(clickedTrigger).addClass('active');

      $('.about-page-drawer.active').removeClass('active');
      $('#about-drawer-' + target).addClass('active');
    });
  }
};

Site.Media = {
  init: function() {
    var _this = this;

    _this.bind();
  },

  bind: function() {
    var _this = this;

    if ($('.page-sound-and-vision').length) {
      $('.media-item-image-holder').on({
        'click': function() {
          var $target = $(this).parents('.media-item');

          _this.unloadActive();

          $target.addClass('active');

          _this.loadMedia($target);

          Site.Shuffle.update();

          clearTimeout(_this.scrollToTimeout);
          _this.scrollToTimeout = setTimeout(function() {
            zenscroll.to($target[0]);
          }, 200);
        }
      });
    }
  },

  unloadActive: function() {
    var _this = this;
    var $active = $('.media-item.active');

    if ($active.hasClass('playing-video')) {
      $('#media-item-video-embed').remove();
      $active.removeClass('playing-video');
    }

    if ($active.hasClass('playing-audio')) {
      $('#media-item-audio-embed').remove();
      $active.removeClass('playing-audio');
    }

    $active.removeClass('active');
  },

  loadMedia: function($item) {
    var _this = this;
    var data = $item.data();

    if (data.vimeo) {
      _this.loadVideo($item, data.vimeo);
    } else if (data.soundcloud) {
      _this.loadAudio($item, data.soundcloud);
    }
  },

  loadVideo: function($item, vimeoId) {
    var _this = this;
    var insert = '<div id="media-item-video-embed" class="u-video-embed-container"><iframe src="https://player.vimeo.com/video/' + vimeoId + '?title=0&byline=0&portrait=0&autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>';

    $item.addClass('playing-video');
    $item.find('.media-item-image-holder').append(insert);
  },

  loadAudio: function($item, soundcloudUrl) {
    var _this = this;
    var insert = '<div id="media-item-audio-embed"><iframe width="100%" height="400" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' + encodeURIComponent(soundcloudUrl) + '&amp;auto_play=true&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;visual=true"></iframe></div>';

    $item.addClass('playing-audio');
    $item.find('.media-item-image-holder').append(insert);
  },
};

Site.Lightbox = {
  init: function() {
    var _this = this;

    _this.$lightbox = $('#lightbox');
    _this.$lightboxTitle = $('#lightbox-title');
    _this.$lightboxContent = $('#lightbox-content');

    _this.bind();
  },

  bind: function() {
    var _this = this;

    $('[data-lightbox]').on({
      'click': function() {
        var data = $(this).data();

        _this.setTitle(data.lightboxTitle);

        if (data.lightbox === 'image') {
          _this.openImage(data);
        }

        _this.show();
      }
    });

    _this.$lightbox.on({
      'click': function(e) {
        if (e.target.id === 'lightbox' || e.target.id === 'lightbox-close') {
          _this.hide();
        }
      }
    });
  },

  show: function() {
    var _this = this;

    $('body').addClass('lightbox-active');
    _this.$lightbox.css('display', 'flex');
  },

  hide: function() {
    var _this = this;

    _this.$lightbox.hide();
    $('body').removeClass('lightbox-active');
    _this.$lightboxTitle.html('');
    _this.$lightboxContent.html('');
  },

  setTitle: function(title) {
    var _this = this;

    _this.$lightboxTitle.html(title);
  },

  openImage: function(data) {
    var _this = this;
    var insert = '<img class="lightbox-image" src="' + data.lightboxImage + '" />';

    _this.$lightboxContent.append(insert);
  },
};

Site.init();
