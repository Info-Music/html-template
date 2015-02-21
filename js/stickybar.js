var triggerHeight = $('#customerBar').height();
triggerHeight += $('#searchBar').height();
triggerHeight += $('#menuBar').height();

$('#searchBar').affix({
    offset: {
        top: triggerHeight
    }
});

$('#customerBar').on('affix-top.bs.affix', function(e) {
    this.css("display", "none");
});

console.log($('#customerBar'));
