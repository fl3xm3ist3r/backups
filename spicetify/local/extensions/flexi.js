(function flexi() {
	const SPICETIFY_LOAD_INTERVAL_IN_SECONDS = 4;
	const CAT_GIF_URL = "https://gifyu.com/image/SBU4o";

	function waitForSpicetifyLoad() {
		if (!Spicetify.Player.data || !Spicetify.LocalStorage) {
			setTimeout(waitForSpicetifyLoad, SPICETIFY_LOAD_INTERVAL_IN_SECONDS * 1000);
			return;
		}

		addCatGifToProgressBar();
		modifyUIStyles();
	}

	function addCatGifToProgressBar() {
		const playbackProgressBar = document.querySelector('.playback-progressbar.playback-progressbar-isInteractive:not(:has(.volume-bar__slider-container))');
		if (playbackProgressBar) {
			const catGifContainer = document.createElement('div');
			catGifContainer.setAttribute("id", "flexiCatGifContainer");
			catGifContainer.style.backgroundImage = `url("${CAT_GIF_URL}")`;
			playbackProgressBar.appendChild(catGifContainer);
		}
	}

	function modifyUIStyles() {
		const styleElement = document.createElement('style');
		styleElement.textContent = `
			/* Styles for cat gif and UI modifications */
			#flexiCatGifContainer {
				content: "";
				width: 75px;
				height: 75px;
				bottom: calc(100% - 18px);
				right: 10px;
				position: absolute;
				image-rendering: pixelated;
				background-size: 75px 75px;
				pointer-events: none;
			}

			/* Styles to hide all extra control buttons  */
			.Button-sc-1dqy6lx-0.Button-small-small-buttonTertiary-iconOnly-useBrowserDefaultFocusStyle.main-genericButton-button,
			.Button-sc-1dqy6lx-0 Button-small-small-buttonTertiary-iconOnly-useBrowserDefaultFocusStyle.main-genericButton-button.ZMXGDTbwxKJhbmEDZlYy.main-nowPlayingBar-lyricsButton,
			.Button-sc-1dqy6lx-0.Button-small-small-buttonTertiary-iconOnly-isUsingKeyboard-useBrowserDefaultFocusStyle.main-genericButton-button,
			.Button-sc-1dqy6lx-0 Button-small-small-buttonTertiary-iconOnly-isUsingKeyboard-useBrowserDefaultFocusStyle.main-genericButton-button.ZMXGDTbwxKJhbmEDZlYy.main-nowPlayingBar-lyricsButton {
				display: none;
			}

			/* Styles to explicitly show the "Song Queue" button in the UI */
			.GlueDropTarget.GlueDropTarget--tracks.GlueDropTarget--local-tracks.GlueDropTarget--episodes
			.Button-sc-1dqy6lx-0.Button-small-small-buttonTertiary-iconOnly-isUsingKeyboard-useBrowserDefaultFocusStyle.main-genericButton-button,
			.GlueDropTarget.GlueDropTarget--tracks.GlueDropTarget--local-tracks.GlueDropTarget--episodes
			.Button-sc-1dqy6lx-0.Button-small-small-buttonTertiary-iconOnly-useBrowserDefaultFocusStyle.main-genericButton-button  {
				display: flex;
			}

			/* Styles to explicitly show the "Better Lyrics" buttons in the UI */
			.main-nowPlayingBar-extraControls > :nth-child(-n+2) {
				display: flex !Important;
			}

			/* Style "Better Lyrics button" */
			.main-nowPlayingBar-extraControls > :nth-child(2) {
				margin: 0;
				margin-top: 3px;
			}

			.LyricsPageIcon {
				width: 21px;
				height: 21px;
			}
		`;
		
		document.head.appendChild(styleElement);
	}

	waitForSpicetifyLoad();
})();
