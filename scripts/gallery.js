/* 
Title:		Gallery Javascript
Author: 	3 Crown Creative
*/

//----------------------------------------------------------------------
// FUNCTION: add HS gallery slideshow										
//----------------------------------------------------------------------
function addHSslideshow() {
	
	hs.addSlideshow({
		slideshowGroup: 'group1',
		interval: 5000,
		repeat: false,
		useControls: true,
		fixedControls: 'fit',
		overlayOptions: {
			className: 'controls-in-heading',
			opacity: '0.75',
			position: 'above',
			offsetX: '0',
			offsetY: '-10',
			hideOnMouseOut: false
		}
	});
	
	// gallery config object
	var config1 = {
		slideshowGroup: 'group1',
		transitions: ['expand', 'crossfade']
	};
	
	return config1;
}
//----------------------------------------------------------------------
// FUNCTION: add events to thumbnails on Gallery pages											
//----------------------------------------------------------------------
function setGalleryThumbs() {
	window.addEvent('domready', function() {
		//  add click event to each link on the map
		$$('#imageGallery a').each (function(el) {
			el.removeClass('linkopacity');
			el.addEvents ({
				'click': function(imgID) {
					mouseClickGallery(imgID);
					return false;
				}.pass(el.id)
			});
		});
		
		//  add mouseover and mouseout events
		$$('#imageGallery li').each (function(el) {
			el.addEvents ({
	
				'mouseover': function(imgID) {
					mouseOverGallery(imgID);
				}.pass(el.id),

				'mouseout': function(imgID) {
					mouseOutGallery(imgID);
				}.pass(el.id)

			});
		});


	});
	
	document.addEvent('keydown', function(event) {
    	if (event.key == 'right') mouseClickGallery('r');
		if (event.key == 'left') mouseClickGallery('l');
	});

}
//---------------------------------------------------------------------------
//  FUNCTION: Mouseout on a gallery thumbnail - turn opacity up
//---------------------------------------------------------------------------
function mouseOverGallery(imgID) { 
	var curDiv = divPrefix+curImg.toString(); 
	if (imgID != curDiv) {
		$(imgID).set('opacity',.5);
	}
}
//---------------------------------------------------------------------------
//  FUNCTION: Mouseout on a gallery thumbnail - turn opacity off
//---------------------------------------------------------------------------
function mouseOutGallery(imgID) { 
	var curDiv = divPrefix+curImg.toString();
	if (imgID != curDiv) {
		$(imgID).set('opacity',1);
	}
}

//---------------------------------------------------------------------------
//  FUNCTION: Mouseclick on an image gallery thumbnail 
//---------------------------------------------------------------------------
function mouseClickGallery(imgID) {

	//  check if left or right arrow was clicked
	if (imgID=='r') 
		(curImg.substr(1)).toInt()+1>=numImages ? imgID = thumbPrefix+'0' : imgID = thumbPrefix+((curImg.substr(1)).toInt()+1).toString();
	else
		if (imgID=='l')
			(curImg.substr(1)).toInt()-1<0 ? imgID = thumbPrefix+(numImages-1).toString() : imgID = thumbPrefix+((curImg.substr(1)).toInt()-1).toString();

	//  hide the previous image (if there is one)
	//if ( curImg.substr(1).toInt()!=0) {
		var lastThumb = imgPrefix+curImg.toString(); 
		$(lastThumb).removeClass('show');
		$(lastThumb).addClass('none');
//	}
	
	//  show the clicked image
	var clickedThumb = imgPrefix+imgID.toString(); 
	$(clickedThumb).setStyle('visibility','hidden');
	$(clickedThumb).removeClass('none');
	$(clickedThumb).addClass('show');
	fadeIn(clickedThumb,2000);
	
	//  turn the previous parcel thumbnail OFF (if here is one)
	if (curImg.substr(1).toInt()!=0) {
		var lastThumbName = divPrefix+curImg.toString(); 
		$(lastThumbName).set('opacity',1);
	}

	//  turn the clicked parcel thumbnail ON
	var clickedThumbName = divPrefix+imgID.toString();
	$(clickedThumbName).set('opacity',.5);
	
	//  reset the currently selected thumbnail
	curImg = imgID;
}
