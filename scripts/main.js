/*
Title:		Main Javascript
Author: 	3 Crown Creative
*/

//----------------------------------------------------------------------
// FUNCTION: Housekeeping
//----------------------------------------------------------------------
function houseKeeping() {
	checkBrowser();


	/*  adding special icons to link types, modal windows, etc... */
	window.addEvent('domready',function() {

        /*  Make all links to external sites open in a new window  */
		$$('a[href^="http://"]').each(function(a) {   /* grab all complete linked anchors */
			var href = a.get('href');
			if(!href.contains(window.location.host)) {  /* if it's not this domain */
				a.setProperties({
					target: '_blank'
				});
			}
		});

		/* Add pdf icons to pdf links  */
		$$("a[href$='.pdf']").each(function(a) {
			var href = a.get('href');
				a.setProperties({
					target: '_blank'
				});
				a.addClass("pdf");
		});


		/* Add txt icons to document links (doc, rtf, txt)  */
		$$("a[href$='.doc']","a[href$='.txt']", "a[href$='.rtf']").each(function(a) {
			var href = a.get('href');
				a.setProperties({
					target: '_blank'
				});
				a.addClass("txt");
		});

		/* Add zip icons to Zip file links (zip, rar) */
		$$("a[href$='.zip']","a[href$='.rar']").each(function(a) {   /* grab all complete linked anchors */
			var href = a.get('href');
				a.setProperties({
					target: '_blank'
				});
				a.addClass("zip");
		});


		/*  Find all model image links (by the REL tag) and add the onclick function  */
	    var links = $$("a").filter(function(el) {
			return el.rel && el.rel.test(/^Image_Window/i);
		});
		$$(links).each (function(e1) {
			e1.addEvent('click', function() {
				return hs.expand(this, {captionEval: 'this.a.title'});
			});
		});

		/*  Find all model text window links (by the REL tag) and add the onclick function  */
		var links = $$("a").filter(function(el) {
			return el.rel && el.rel.test(/^Text_Window/i);
		});
		$$(links).each (function(e1) {
			e1.addEvent('click', function() {
				return hs.htmlExpand (this, {objectType: 'iframe', width: 600,headingEval: 'this.a.title',wrapperClassName: 'titlebar' })
			});
		});

		/*  HIGHSLIDE stuff  */
		hs.graphicsDir = '/wp-content/themes/mtsitetheme/images/imagesHighslide/';
		hs.align = 'center';
		hs.transitions = ['expand', 'crossfade'];
		hs.outlineType = 'rounded-white';

		hs.fadeInOut = true;
		hs.allowMultipleInstances = false;
		/*hs.captionEval = 'this.a.title';*/
		hs.dimmingOpacity = 0.75;

		hs.registerOverlay({
			html: '<div class="closebutton" onclick="return hs.close(this)"></div>',
			position: 'top right',
			relativeTo: 'expander',
			useOnHtml: false,
			fade: 2 // fading the semi-transparent overlay looks bad in IE
		});

		hs.captionOverlay.useOnHtml = false;


		/*  dropdown menu stuff for IE */
		sfHover = function() {
			var sfEls = document.getElementById("nav").getElementsByTagName("li");
			for (var i=0; i<sfEls.length; i++) {
				sfEls[i].onmouseover=function() {
					this.className+=" sfhover";
				}
				sfEls[i].onmouseout=function() {
					this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
				}
			}
		}

		if (window.attachEvent) window.attachEvent("onload", sfHover);

	});

}


//----------------------------------------------------------------------
// FUNCTION: create an Accordion instance
//----------------------------------------------------------------------
function createAccordion(panel) {

	window.addEvent('domready', function() {
		var myAccordion = new Accordion($('accordion'), 'h3.toggler', 'div.element', {
			opacity: false,
			display: panel,
			alwaysHide: true,
			onActive: function(toggler, element) {
				toggler.removeClass('back');
				toggler.addClass('selected');
			},
			onBackground: function(toggler, element){
				toggler.removeClass('selected');
				toggler.addClass('back');
			}
		});
	});
}

//----------------------------------------------------------------------
// FUNCTION: Add Stylesheet when javascript is enabled
//----------------------------------------------------------------------
function linkCSS(title) {
   var i, a, main;
   for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
     	if (a.getAttribute("rel").indexOf("style") != -1  && a.getAttribute("title")== title) {
			a.disabled = true;
			a.disabled = false;
		}
    }
}

//----------------------------------------------------------------------
// FUNCTION: slideshow
//----------------------------------------------------------------------
function slideshow() {
	window.addEvent('domready',function() {

		/* settings */
		var showDuration = 3000;
		var container = $('slideshow-container');
		var images = container.getElements('img');
		var captions = container.getElements('div');
		var currentIndex = 0;

		document.addEvent('keydown', function(event) {
			if (event.key == 'right') show();
			if (event.key == 'left') show(currentIndex != 0 ? currentIndex -1 : images.length-1);
		});


		/* worker */
		var show = function(to) {
			images[currentIndex].fade('out');
			captions[currentIndex].fade('out');
			var saveCurrentIndex = currentIndex;
			images[currentIndex = ($defined(to) ? to : (currentIndex < images.length - 1 ? currentIndex+1 : 0))].fade('in');
			captions[saveCurrentIndex = ($defined(to) ? to : (saveCurrentIndex < captions.length - 1 ? saveCurrentIndex+1 : 0))].fade('in');
		};

		images.each(function(img,i){
			if(i > 0) { img.set('opacity',0); }
		});
		captions.each(function(caption,i){
			if(i > 0) { caption.set('opacity',0); }
		});

		/* new: control: next and previous */
		var next = $('next');
		next.addEvent ('click', function(event) {
				event.preventDefault();
				show();

		});
		var previous = $('prev');
		previous.addEvent ('click', function(event) {
				event.preventDefault();
				show(currentIndex != 0 ? currentIndex -1 : images.length-1);

		});


	});
}

//--------------------------------------------------------------------------------------------------------
// FUNCTION: Set error messages
//--------------------------------------------------------------------------------------------------------
function setError(field, div) {
	errorMsg = true;
	$(field).removeClass('inpOK');
	$(field).addClass('inpErr');
    $(div).removeClass('none');
	$(div).addClass('show');
	$(field).focus();
}

//--------------------------------------------------------------------------------------------------------
// Validates a form and returns a value indicating if validation passed or failed
//--------------------------------------------------------------------------------------------------------
function validateForm() {

	errorMsg = false;

	//  HIDE ERROR MESSAGES
	var e = $('divNoError');
	if (e) {
		$('divNoError').removeClass('show');
		$('divNoError').addClass('none');
	}
	$('divMustEnter').removeClass('show');
    $('divMustEnter').addClass('none');
	$('divEmailInv').removeClass('show');
	$('divEmailInv').addClass('none');


    var i, req, field;
	var args=validateForm.arguments;

	//  loop thru all the passed arguments: 1st variable is FIELD NAME, 2nd varible is "R" if required
  	for (i=0;  i<(args.length-1); i+=2) {
		req=args[i+1];
		field = args[i];

    	if (field) {
			$(field).removeClass('inpErr');
			$(field).addClass('inpOK');
			if ( ( $(field).value=="") || ( $(field).value==null) )  {
				if (req=='R') {
			 		setError( field, "divMustEnter");
				}
			}
			else {   // FIELD WAS ENTERED - DO MORE CHECKS...


				// VALIDATE EMAIL ADDRESS
				if ( $(field).name=="email")  {
					var reEmailPattern  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					if (!reEmailPattern.test( $(field).value))
						setError(field, "divEmailInv");
				}
			}  //  end ELSE
		}  // end IF
	}  // end FOR

	if (errorMsg==false)
		return true;
	else
		return false;
}

//---------------------------------------------------------------------------
//  FUNCTION: Check for browsers N4/IE4/IE5 Mac or older....
//---------------------------------------------------------------------------
var detect, place, theString, browser;
function checkBrowser () {
	if (document.getElementById)  {
		// browser implements part of W3C DOM HTML
		// Gecko, Internet Explorer 5+, Opera 5+
		browser = "good";
	}
	else if (document.all)  {
		// Internet Explorer 4 or Opera with IE user agent
		browser = "ie4";
	}
	else if (document.layers) {
		// Navigator 4
		browser = "net4";
		location.href = "oldbrowser.html";
	}

	detect = navigator.userAgent.toLowerCase();
	/* edit colsen - this file doesn't exist
	if (detect.indexOf("safari") != -1)
		document.write('<link rel="stylesheet" type="text/css" href="styles/safari.css" />');
		*/


	if (checkIt('msie')) { // browser is IE
		var version = detect.charAt(place + theString.length);
		if (checkIt('mac'))
			location.href = "maciebrowser.html";
	}
}
function checkIt(string) {
	place = detect.indexOf(string) + 1;
	theString = string;
	return place;
}
//----------------------------------------------------------------------
// FUNCTION: Open a new window
//----------------------------------------------------------------------
function targetBlank (url) {
  blankWin = window.open(url,'_blank','menubar=yes,toolbar=yes,location=yes,directories=yes,fullscreen=no,titlebar=yes,hotkeys=yes,status=yes,scrollbars=yes,resizable=yes');
}
