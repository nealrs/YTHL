/*///////////////////////////////

I suppose FitVids / responsive embeds aren't really a requirment, but they certainly look nicer. - Neal.

///////////////////////////////*/

/*global jQuery */
/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement('div');
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

/*///////////////////////////////

And now, some code that I wrote and that makes this whole thing function. - Neal.

///////////////////////////////*/

function ytshow(t){
  var id = t.dataset.id;
  var auto = t.dataset.auto;
  var title = t.dataset.title;

  if (auto == "no"){
    auto = "0";
  } else {auto = 1;}

  // add container span
  var ytframe = document.createElement('span');
  ytframe.className = "ytframe";
  t.appendChild(ytframe);

  ytframe.style.display='inline'; // use for inline, full width preview
  //ytframe.style.display='block'; // use for popup?

  // don't create iframe if ytframe is hidden (because of media query)
  if (ytframe.offsetParent !== null){
    console.log("ytframe is hidden");
    // create iframe
    var iframe = document.createElement('iframe');
    ytframe.appendChild(iframe);
    iframe.src="//www.youtube-nocookie.com/embed/"+id+"?rel=0&autoplay="+auto;

    $(ytframe).fitVids(); // initialize responsive iframe.
  }
}

function ythide(t){
  var f = (t.parentElement).getElementsByClassName('ytframe')[0];
  var i = f.getElementsByTagName('iframe')[0];
  f.parentNode.removeChild(f);
}

// listeners & such.
$( document ).ready(function(){

  // process all .ythl elements & add inner elements.
  var ythl = document.querySelectorAll(".ythl");
  for (var i=0, max=ythl.length; i < max; i++) {

    // get video id & title
    var id = ythl[i].dataset.id;
    var alt = ythl[i].dataset.title;

    // add link
    var link = document.createElement('a');
    ythl[i].appendChild(link);

    link.href = "https://www.youtube.com/watch?v="+id;
    link.title = alt;
    link.innerHTML = alt;
    link.target = "_blank";
  }

  $(".ythl").mouseenter(function(){
    ytshow(this);
  });

  $(".ythl").mouseleave(function(){
    ythide(this);
  });
});
