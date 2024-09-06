$(function () {
    $('.mobile-men-icon').on('click', function () {
        $('nav').css({
            'margin-left': '0px'
        })
    });

    $('.close-mobile-menu').on('click', function () {
        $('nav').css({
            'margin-left': '-100%'
        })
    });
    $('nav a').on('click', function () {
        if ($(window).width() < 1024) {
            $('nav').css({
                'margin-left': '-100%'
            });
        }
    });

    ////when scroll window navigation hide and show on mobile
    var lastScrollTop = 0;
    var nav = $('.navigation-bar');
    var isNavHidden = false; // Track the state of the navigation bar

    $(window).on('scroll', function () {
        var currentScrollTop = $(this).scrollTop();

        if ($(window).width() <= 768) { // Check if screen width is mobile-sized
            if (currentScrollTop > lastScrollTop) {
                // Scrolling down - hide the nav
                if (!isNavHidden) {
                    nav.css('top', '-100px'); // Adjust value as needed
                    isNavHidden = true;
                }
            } else {
                // Scrolling up - show the nav
                if (isNavHidden) {
                    nav.css('top', '0');
                    isNavHidden = false;
                }
            }

            lastScrollTop = currentScrollTop;
        }
    });

    // Optionally, add a resize event listener if you need to handle screen size changes
    $(window).on('resize', function () {
        if ($(window).width() > 768) {
            // Reset the nav position for larger screens
            nav.css('top', '0');
            isNavHidden = false; // Reset state for larger screens
        }
    });

})

///Nvigation active and section counter
$(document).ready(function () {
    // Smooth scrolling for sidebar links
    $('nav a').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('href');
        if ($(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 500);
        }
    });

    $('nav a').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('href');

        if ($(target).length) {
            // Scroll to the target section
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 500);

            // Remove 'active' class from all links
            $('nav a').removeClass('active');

            // Add 'active' class to the clicked link
            $(this).addClass('active');
        }
    });



});


///Publication acco function

$(function () {
    $('.pub-title').on('click', function () {
        // Reference to the currently clicked .full-desc div
        var currentDesc = $(this).parents('.w-full').find('.full-desc');

        // Close all .full-desc divs except the currently clicked one
        $('.full-desc').not(currentDesc).slideUp();

        // Toggle the current .full-desc div
        currentDesc.slideToggle();
    });
});


//// Animation type script

var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};



//// News more and less funtion
$('.new-more-button').on('click', function () {
    if ($(this).find('span').text() === "More") {
        $(this).find('span').text('Less');
        $('.news-more').slideDown();
    } else {
        $(this).find('span').text('More');
        $('.news-more').slideUp();
    }
})