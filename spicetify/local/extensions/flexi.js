(function flexi() {
	//add cat gif on top of playback progress bar
    const playbackProgressBars = document.querySelectorAll('.playback-progressbar.playback-progressbar-isInteractive:not(:has(.volume-bar__slider-container))');
    if (playbackProgressBars.length > 0) {
        const firstPlaybackProgressBar = playbackProgressBars[0];
        
        const catGifContainer = document.createElement('div');
        catGifContainer.style.content = '""';
        catGifContainer.style.width = '75px';
        catGifContainer.style.height = '75px';
        catGifContainer.style.bottom = 'calc(100% - 18px)';
        catGifContainer.style.right = '10px';
        catGifContainer.style.position = 'absolute';
        catGifContainer.style.imageRendering = 'pixelated';
        catGifContainer.style.backgroundImage = 'url("https://s11.gifyu.com/images/SgXKG.gif")';
        catGifContainer.style.backgroundSize = '75px 75px';

        firstPlaybackProgressBar.appendChild(catGifContainer);
    }

	// Hide unwanted elements and fix styling
    const styleElement = document.createElement('style');
    styleElement.textContent = `
		//hide lyrics button
        .main-nowPlayingBar-lyricsButton { 
			display: none; 
		}

		//hide "view current song" and song queue buttons
        .Button-sc-1dqy6lx-0,
        .Button-sm-16-buttonTertiary-iconOnly-useBrowserDefaultFocusStyle,
        .main-genericButton-button {
            display: none;
        }

		//explicitly show song queue button
        .GlueDropTarget--local-tracks .Button-sc-1dqy6lx-0 {
            display: block;
        }

		//fix styling of scroling in a playlist
        .main-topBar-topbarContent.main-entityHeader-topbarContent.main-entityHeader-topbarContentFadeIn {
            margin-top: 4px;
        }

        .main-topBar-topbarContent.main-entityHeader-topbarContent.main-entityHeader-topbarContentFadeIn 
        .Type__TypeElement-sc-goli3j-0.TypeElement-canon-type-draggable.main-entityHeader-topbarTitle {
            margin-top: 4px;
            margin-left: 10px;
        }
    `;
    document.head.appendChild(styleElement);
})();
