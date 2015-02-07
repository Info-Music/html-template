var stickyBarEnabled = true;
var scrollStartHeight = 0;
var stickyBarInit = false;

var Cosifinum = {		
    init : function() {
        $().ready(function(){
        	Cosifinum.initStickyBar();        	
        });
    },    
    	
	initStickyBar : function() {
		if($('.searchBar .displayToggle').length > 0) {
			// set correct scroll start
			$('.searchBar .displayToggle').hide();
			if($('.customerBar').length > 0) {
				scrollStartHeight = $('.customerBar').height();
			}
			else {
				stickyBarEnabled = false;
			}
			
			if(window.innerWidth<480) {
				Cosifinum.hideMenu();
				stickyBarInit = true;
			}
			else {
				stickyBarInit = false;
			}
			
			// add menu toggle listener 
			$('.searchBar .displayToggle').click( function() {
				// finish animations				
				$('.searchBar').finish();
				$('.menuBar').finish();
				$('.customerBar').finish();
				
				if(stickyBarEnabled) {	
					Cosifinum.showMenu();
				}
				else {
					Cosifinum.hideMenu();
				}
			});			
		}
	},
	
	showStickyBar : function() {
		if(stickyBarEnabled) {
			_height = $('.searchBar').height();
			$('.searchBar').css({position: 'fixed', width: '100%', top: '0px', 'background-color': '#f7f6f5'});
			$('.menuBar').css({position: 'fixed', width: '100%', top: _height+'px'});
			$('.menuBar').fadeOut(50);
			$('.customerBar').fadeOut(50);
			$('.searchBarShadow').show();
			$('.searchBar .displayToggle').show();			
		}
	},
	
	hideStickyBar : function() {
		if(!stickyBarInit) {
			$('.searchBar').finish();
			$('.menuBar').finish();
			$('.customerBar').finish();
		
			stickyBarEnabled = true;	  
		
			$('.searchBar .displayToggle').hide();
			$('.searchBar .displayToggle').css({background: 'url(img/icon_menu_toggle.png) 0px 0px no-repeat'});
			$('.searchBar').css({position: 'relative', width: '100%', top: '0px', 'background-color': '#fff'});
			$('.menuBar').css({position: 'relative', width: '100%', top: '0px'});
			$('.customerBar').css({position: 'relative', top: '0px'});
			$('.searchBarShadow').hide();
			$('.customerBar').fadeIn(50);
			$('.menuBar').fadeIn(50);		
		}
	},
	
	showMenu : function () {
		stickyBarEnabled = false;
		_height = $('.customerBar').height();					  
		$('.searchBar .displayToggle').css({background: 'url(img/icon_menu_toggle.png) -31px 0px no-repeat'});
		$('.customerBar').css({position: 'fixed', width: '100%', top: '0px'});
		$('.searchBar').css({top: _height+'px'});
		$('.menuBar').css({position: 'fixed', width: '100%', top: '100px'});
		$('.customerBar').fadeIn(100);
		$('.menuBar').fadeIn(100);		
	},
	
	hideMenu : function () {
		stickyBarEnabled = true;	
		$('.searchBar').css({position: 'fixed', width: '100%', top: '0px', 'background-color': '#f7f6f5'});
		$('.searchBar .displayToggle').show();	
		$('.searchBar .displayToggle').css({background: 'url(img/icon_menu_toggle.png) 0px 0px no-repeat'});
		$('.customerBar').fadeOut(100);
		$('.menuBar').fadeOut(100);		
	}
};

/*
Cosifinum.init();    

$(window).scroll(function() {
	if($(this).scrollTop()>scrollStartHeight) {				
		Cosifinum.showStickyBar();
    }	
	if($(this).scrollTop()<=0) {
		Cosifinum.hideStickyBar();
    }
});

$(window).resize(function() {
	Cosifinum.initStickyBar();
});
*/
