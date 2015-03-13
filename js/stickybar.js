var triggerHeight = $('.customerBar').height();
triggerHeight += $('.searchBar').height();

$('#sticky').affix({
    offset: {
        top: triggerHeight
    }
});
$('#sticky').on('affix.bs.affix', function() {
    $('#sticky').hide();
    $('.menuBar').css({
        'display' : 'none',
        'position' : 'fixed',
        'top' : '70px',
        'width' : '100%',
        '-webkit-transform' : 'translate3d(0,0,0)',
        '-o-transform' : 'translate3d(0,0,0)',
        'transform' : 'translate3d(0,0,0)',
        'z-index' : '4999',
        '-webkit-box-shadow' : '0px 5px 10px 0px rgba(50, 50, 50, 0.5)',
        '-moz-box-shadow' : '0px 5px 10px 0px rgba(50, 50, 50, 0.5)',
        'box-shadow' : '0px 5px 10px 0px rgba(50, 50, 50, 0.5)'
    });
    $('.customerBar').css({
        'display' : 'none',
        'position' : 'fixed',
        'top' : '0',
        'width' : '100%',
        '-webkit-transform' : 'translate3d(0,0,0)',
        '-o-transform' : 'translate3d(0,0,0)',
        'transform' : 'translate3d(0,0,0)',
        'z-index' : '5000'
    });
});

$('#sticky').on('affixed.bs.affix', function() {
    $('#sticky').slideDown('fast');
});

$('#sticky').on('affix-top.bs.affix', function() {
    $('.menuBar').css({
        'display' : 'block',
        'position' : 'relative',
        'top' : '0',
        'z-index' : '0',
        '-webkit-box-shadow' : 'none',
        '-moz-box-shadow' : 'none',
        'box-shadow' : 'none'
    });
    $('.customerBar').css({
        'display' : 'block',
        'position' : 'relative',
        'top' : '0',
        'z-index' : '0'
    });
});

$('#toggleCategories').click(function() {
    if($('.menuBar').is(":visible")) {
        var slideMenuBarUp = $('.menuBar').slideUp();
        $.when(slideMenuBarUp).done(function() {
            $('.menuBar').animate({
                'top' : '70px'
            });
            $('.customerBar').slideUp();
            $('#sticky').animate({
                'top' : '0'
            });
        });
    } else {
        $('.customerBar').slideDown();
        $('#sticky').animate({
            'top' : '30px'
        });
        $('.menuBar').animate({
            'top' : '100px'
        });
        $('.menuBar').slideDown();
    }
});
