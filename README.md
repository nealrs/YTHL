## YTHL (YouTube Hover Links)

Detailed explanation coming soon &mdash; but basically &mdash; YTHL creates minimal YouTube embeds that open & auto-play on hover. Result: less wasted real estate.

**Instructions**

1. Load up jQuery, `ythl.css`, and  `ythl.js` in `<head>`.

2. Use `<span>` elements and data-attributes to embed your video. Here's an example using Katy Perry's Roar music video: `<span class="ythl" data-id="CevxZvSJLk8" data-title="Katy Perry - Roar"></span>` That's neat right? just plug in the video id & your link text. YTHL does the rest.

3. Enjoy.

**[Live demo here]()**

**Notes**

The plugin currently depends on  [Fitvids.js](https://github.com/davatron5000/FitVids.js) for responsive embeds - but if you can live without that, you can also nix the jQuery dependency. (You may have to refactor a little bit of code though.)
