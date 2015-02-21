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
        'z-index' : '5000',
        '-webkit-box-shadow' : '0px 5px 10px 0px rgba(50, 50, 50, 0.5)',
        '-moz-box-shadow' : '0px 5px 10px 0px rgba(50, 50, 50, 0.5)',
        'box-shadow' : '0px 5px 10px 0px rgba(50, 50, 50, 0.5)'
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
});

$('#toggleCategories').click(function() {
    if($('.menuBar').is(":visible")) {
        $('.menuBar').slideUp();
    } else {
        $('.menuBar').slideDown();
    }
});
