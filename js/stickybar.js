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
        'top' : '0'
    });
});

$('#toggleCategories').click(function() {
    if($('.menuBar').is(":visible")) {
        $('.menuBar').slideUp();
    } else {
        $('.menuBar').slideDown();
    }
});
