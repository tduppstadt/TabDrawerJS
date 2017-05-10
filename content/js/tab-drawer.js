 
// ---------------------------------------------------------------
//
// Module - Tab Drawer
// Demo: http://tduppstadt.com/project/sdg/
//
// ---------------------------------------------------------------
/*
	configure tab drawer:
	 - container: class or id of the container
	 - activeTab: tab index you want open on start.
	
	Example:
	var m_td = new tabdrawer({
		container: ".tabdrawer-1",
		activeTab: 2
	});
*/

$(document).ready(function(){

	var TabDrawer = function(config) {
		this.ui = {
			$container    : $(config.container),
			$tab          : $(".js-tabdrawer-tab", config.container),
			$drawerHeader : $(".js-tabdrawer-drawer", config.container),
			$content      : $(".js-tabdrawer-content", config.container)
		}

		this.init(config.activeTab);		
	}
	
	TabDrawer.prototype =  
	{
	
		// ______________________________________________________________
		//                                                           init
		init: function(activeTab)
		{
			// init events
			this.assignListeners();

			// set first tab as active
		    this.setActiveState(activeTab);			
		},
	
	
		// ______________________________________________________________
		//                                                assignListeners
		assignListeners: function ()
		{
			var self = this;	

			// tab clicked
			this.ui.$tab.click(function(){
				self.onTabClick(this);
			});

			// drawer clicked
			this.ui.$drawerHeader.click(function(){
				self.onDrawerClick(this);
			});
		},

		// --------------------------------------------------------------
		// HELPERS
		// --------------------------------------------------------------

		// ______________________________________________________________
		//                                                	  showContent
		showContent: function (contentIndex)
		{
			contentIndex = Number(contentIndex) - 1;

			this.ui.$content.hide();	
			$(this.ui.$content[contentIndex]).fadeIn();
		},

		// ______________________________________________________________
		//                                                 setActiveState
		setActiveState: function (activeIndex)
		{		
			activeIndex = String(activeIndex);

			if ( $(this.ui.$tab.siblings("[data-index='" + activeIndex + "']")).hasClass("is-active") ) {

				// remove active state
				this.ui.$tab.removeClass("is-active");
				this.ui.$drawerHeader.removeClass("is-active");	

				// hide content
				this.ui.$content.hide();

			} else {

				// set active drawer
				this.ui.$drawerHeader.removeClass("is-active");
				$(this.ui.$drawerHeader.siblings("[data-index='" + activeIndex + "']")).addClass("is-active");

				// set active tabs
				this.ui.$tab.removeClass("is-active");
				$(this.ui.$tab.siblings("[data-index='" + activeIndex + "']")).addClass("is-active");

				// reveal content
				this.showContent(activeIndex);				
			}
			
		},

		// --------------------------------------------------------------
		// EVENTS
		// --------------------------------------------------------------
		// ______________________________________________________________
		//                                                	   onTabClick
		onTabClick: function (target)
		{
			var activeIndex = $(target).attr("data-index");
			this.setActiveState(activeIndex);
		},


		// ______________________________________________________________
		//                                                	onDrawerClick
		onDrawerClick: function (target)
		{
			var activeIndex = $(target).attr("data-index"); 
			this.setActiveState(activeIndex);
		}
	}
	
	var m_clothes_td = new TabDrawer({
		container: ".c-clothes",
		activeTab: 3
	});

});