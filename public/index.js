
$(window).scroll(function() {
    if ($(window).scrollTop() > 0) {
        $('.navigation').addClass('floatingNav');
    } else {
        $('.navigation').removeClass('floatingNav');
    }
});