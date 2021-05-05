jQuery(document).ready(function($) {
	$('.menu__icon').click(function(event) {
		$('.menu__icon').toggleClass('_active');
	});
});;
// if( window.innerWidth < 960) {
//     $(function(){
//         $('.slider__item_desc-text').readmore({
//             lessLink: '<p class="more"><a href="#" class="btn btn-default">Свернуть</a></p>',
//             moreLink: '<p class="more"><a href="#" class="btn btn-default">Показать ещё</a></p>',
//             collapsedHeight: 200,
//         });
//     });
// }


$(document).ready(function(){
    let mobile = $(window).width();
    if (mobile <= 960) {
        $(function(){
            $('.slider__item_desc-text').readmore({
                lessLink: '<p class="more"><a href="#" class="btn btn-default">Свернуть</a></p>',
                moreLink: '<p class="more"><a href="#" class="btn btn-default">Показать ещё</a></p>',
                collapsedHeight: 200,
            });
        });
    }
    console.log(mobile)
});
let swiper = new Swiper(".mySwiper", {
  spaceBetween: 20,
  slidesPerView: 4,
  navigation: {
      nextEl: ".swiper-next",
      prevEl: ".swiper-prev",
  },
});
let swiper2 = new Swiper(".mySwiper2", {
  thumbs: {
      swiper: swiper,
  },
  navigation: {
      nextEl: ".swiper-next_main",
      prevEl: ".swiper-prev_main",
  },
});;
/*!
 * jQuery.Elimore
 * http://github.com/luftinur/jquery.elimore
 * --------------------------------------------------------------------------
 * Copyright (c) 2018 Lufti Nurfahmi (@luftinur)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Create Ellipsis Of Text
 * Change Log add options data url
 */
if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        function _O() { };
        _O.prototype = obj;
        return new _O();

    }

}
; (function ($, window, document, undefined) {
    'use strict';

    var _Elimore = {
        init: function (options, el) {
            var self = this;
            self.el = el;
            self.$el = $(el);
            // Store the length text of each element;
            self.$lengthtext = self.$el.text().length;
            self.options = $.extend({}, $.fn.elimore.options, options);


            // Check The Length Text
            if (self.$lengthtext >= self.options.maxLength) {
                self.ellipsis();
            } else {
                return self;
            }


        },
        ellipsis: function () {

            var self = this;

            //self.$elimore_toggle = $("._elimore_toggle");

            if (self.options.dataUrl) {

                var fullTxt = self.$el.text(),
                    text_one = fullTxt.substr(0, self.options.maxLength),
                    dataUrl = self.$el.data("url");

                console.log(dataUrl);
                var more_btn = '<a href="' + dataUrl + '">' + self.options.moreText + '</a>';

                self.$el.html("");

                self.$el.append(text_one + more_btn);

            } else {

                var fullTxt = self.$el.text(),
                    text_one = fullTxt.substr(0, self.options.maxLength),
                    text_two = fullTxt.substr(self.options.maxLength, self.$lengthtext);

                var more_btn = '<a href="javascript:;" class="elimore_show">' + self.options.moreText + '</a>',
                    less_btn = '<a href="javascript:;" class="elimore_hide" style="display:none;">' + self.options.lessText + '</a>';

                if (self.options.showOnly) {
                    less_btn = '';
                }

                self.$el.html("");
				if(self.options.trimOnly){
					 self.$el.append(text_one);
				}else{
					 self.$el.append(text_one + '<span class="elimore_trim" style="display:none">' + text_two + '</span>' + more_btn + less_btn);
				}
               

                self._toggle_ellipsis();

            }




        },
        _toggle_ellipsis: function () {
            var self = this;

            self.$show_btn = self.$el.children().find("a.elimore_show");

            // Toggle Show Hide For Ellipsis Text
            self.$el.on("click", ".elimore_show", function () {
                self.$el.children().toggle();
            });
            self.$el.on("click", ".elimore_hide", function () {
                self.$el.children().toggle();
            });
        }

    }

    $.fn.elimore = function (options) {
        return this.each(function () {
            var em = Object.create(_Elimore);
            em.init(options, this);
        });
    };

    $.fn.elimore.options = {
        maxLength: 130,
        moreText: "Читать далее",
        lessText: "Свернуть",
        showOnly: false,
        dataUrl: false,
		trimOnly : false
    };


})(jQuery, window, document);

;
/*!
 * @preserve
 *
 * Readmore.js jQuery plugin
 * Author: @jed_foster
 * Project home: http://jedfoster.github.io/Readmore.js
 * Licensed under the MIT license
 *
 * Debounce function from http://davidwalsh.name/javascript-debounce-function
 */

/* global jQuery */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function($) {
  'use strict';

  var readmore = 'readmore',
      defaults = {
        speed: 100,
        collapsedHeight: 200,
        heightMargin: 16,
        moreLink: '<a href="#">Read More</a>',
        lessLink: '<a href="#">Close</a>',
        embedCSS: true,
        blockCSS: 'display: block; width: 100%;',
        startOpen: false,

        // callbacks
        blockProcessed: function() {},
        beforeToggle: function() {},
        afterToggle: function() {}
      },
      cssEmbedded = {},
      uniqueIdCounter = 0;

  function debounce(func, wait, immediate) {
    var timeout;

    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (! immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  function uniqueId(prefix) {
    var id = ++uniqueIdCounter;

    return String(prefix == null ? 'rmjs-' : prefix) + id;
  }

  function setBoxHeights(element) {
    var el = element.clone().css({
          height: 'auto',
          width: element.width(),
          maxHeight: 'none',
          overflow: 'hidden'
        }).insertAfter(element),
        expandedHeight = el.outerHeight(),
        cssMaxHeight = parseInt(el.css({maxHeight: ''}).css('max-height').replace(/[^-\d\.]/g, ''), 10),
        defaultHeight = element.data('defaultHeight');

    el.remove();

    var collapsedHeight = cssMaxHeight || element.data('collapsedHeight') || defaultHeight;

    // Store our measurements.
    element.data({
      expandedHeight: expandedHeight,
      maxHeight: cssMaxHeight,
      collapsedHeight: collapsedHeight
    })
    // and disable any `max-height` property set in CSS
    .css({
      maxHeight: 'none'
    });
  }

  var resizeBoxes = debounce(function() {
    $('[data-readmore]').each(function() {
      var current = $(this),
          isExpanded = (current.attr('aria-expanded') === 'true');

      setBoxHeights(current);

      current.css({
        height: current.data( (isExpanded ? 'expandedHeight' : 'collapsedHeight') )
      });
    });
  }, 100);

  function embedCSS(options) {
    if (! cssEmbedded[options.selector]) {
      var styles = ' ';

      if (options.embedCSS && options.blockCSS !== '') {
        styles += options.selector + ' + [data-readmore-toggle], ' +
          options.selector + '[data-readmore]{' +
            options.blockCSS +
          '}';
      }

      // Include the transition CSS even if embedCSS is false
      styles += options.selector + '[data-readmore]{' +
        'transition: height ' + options.speed + 'ms;' +
        'overflow: hidden;' +
      '}';

      (function(d, u) {
        var css = d.createElement('style');
        css.type = 'text/css';

        if (css.styleSheet) {
          css.styleSheet.cssText = u;
        }
        else {
          css.appendChild(d.createTextNode(u));
        }

        d.getElementsByTagName('head')[0].appendChild(css);
      }(document, styles));

      cssEmbedded[options.selector] = true;
    }
  }

  function Readmore(element, options) {
    this.element = element;

    this.options = $.extend({}, defaults, options);

    embedCSS(this.options);

    this._defaults = defaults;
    this._name = readmore;

    this.init();

    // IE8 chokes on `window.addEventListener`, so need to test for support.
    if (window.addEventListener) {
      // Need to resize boxes when the page has fully loaded.
      window.addEventListener('load', resizeBoxes);
      window.addEventListener('resize', resizeBoxes);
    }
    else {
      window.attachEvent('load', resizeBoxes);
      window.attachEvent('resize', resizeBoxes);
    }
  }


  Readmore.prototype = {
    init: function() {
      var current = $(this.element);

      current.data({
        defaultHeight: this.options.collapsedHeight,
        heightMargin: this.options.heightMargin
      });

      setBoxHeights(current);

      var collapsedHeight = current.data('collapsedHeight'),
          heightMargin = current.data('heightMargin');

      if (current.outerHeight(true) <= collapsedHeight + heightMargin) {
        // The block is shorter than the limit, so there's no need to truncate it.
        if (this.options.blockProcessed && typeof this.options.blockProcessed === 'function') {
          this.options.blockProcessed(current, false);
        }
        return true;
      }
      else {
        var id = current.attr('id') || uniqueId(),
            useLink = this.options.startOpen ? this.options.lessLink : this.options.moreLink;

        current.attr({
          'data-readmore': '',
          'aria-expanded': this.options.startOpen,
          'id': id
        });

        current.after($(useLink)
          .on('click', (function(_this) {
            return function(event) {
              _this.toggle(this, current[0], event);
            };
          })(this))
          .attr({
            'data-readmore-toggle': id,
            'aria-controls': id
          }));

        if (! this.options.startOpen) {
          current.css({
            height: collapsedHeight
          });
        }

        if (this.options.blockProcessed && typeof this.options.blockProcessed === 'function') {
          this.options.blockProcessed(current, true);
        }
      }
    },

    toggle: function(trigger, element, event) {
      if (event) {
        event.preventDefault();
      }

      if (! trigger) {
        trigger = $('[aria-controls="' + this.element.id + '"]')[0];
      }

      if (! element) {
        element = this.element;
      }

      var $element = $(element),
          newHeight = '',
          newLink = '',
          expanded = false,
          collapsedHeight = $element.data('collapsedHeight');

      if ($element.height() <= collapsedHeight) {
        newHeight = $element.data('expandedHeight') + 'px';
        newLink = 'lessLink';
        expanded = true;
      }
      else {
        newHeight = collapsedHeight;
        newLink = 'moreLink';
      }

      // Fire beforeToggle callback
      // Since we determined the new "expanded" state above we're now out of sync
      // with our true current state, so we need to flip the value of `expanded`
      if (this.options.beforeToggle && typeof this.options.beforeToggle === 'function') {
        this.options.beforeToggle(trigger, $element, ! expanded);
      }

      $element.css({'height': newHeight});

      // Fire afterToggle callback
      $element.on('transitionend', (function(_this) {
        return function() {
          if (_this.options.afterToggle && typeof _this.options.afterToggle === 'function') {
            _this.options.afterToggle(trigger, $element, expanded);
          }

          $(this).attr({
            'aria-expanded': expanded
          }).off('transitionend');
        }
      })(this));

      $(trigger).replaceWith($(this.options[newLink])
        .on('click', (function(_this) {
            return function(event) {
              _this.toggle(this, element, event);
            };
          })(this))
        .attr({
          'data-readmore-toggle': $element.attr('id'),
          'aria-controls': $element.attr('id')
        }));
    },

    destroy: function() {
      $(this.element).each(function() {
        var current = $(this);

        current.attr({
          'data-readmore': null,
          'aria-expanded': null
        })
          .css({
            maxHeight: '',
            height: ''
          })
          .next('[data-readmore-toggle]')
          .remove();

        current.removeData();
      });
    }
  };


  $.fn.readmore = function(options) {
    var args = arguments,
        selector = this.selector;

    options = options || {};

    if (typeof options === 'object') {
      return this.each(function() {
        if ($.data(this, 'plugin_' + readmore)) {
          var instance = $.data(this, 'plugin_' + readmore);
          instance.destroy.apply(instance);
        }

        options.selector = selector;

        $.data(this, 'plugin_' + readmore, new Readmore(this, options));
      });
    }
    else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      return this.each(function () {
        var instance = $.data(this, 'plugin_' + readmore);
        if (instance instanceof Readmore && typeof instance[options] === 'function') {
          instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }
      });
    }
  };

}));

;
