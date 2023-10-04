(function flexi() {
	const SPICETIFY_LOAD_INTERVAL_IN_SECONDS = 4;
	const CAT_GIF_URL = "https://s11.gifyu.com/images/SgXKG.gif";
	const LOAD_DELAY_IN_MS = 10;

	function waitForSpicetifyLoad() {
		if (!Spicetify.Player.data || !Spicetify.LocalStorage) {
			setTimeout(waitForSpicetifyLoad, SPICETIFY_LOAD_INTERVAL_IN_SECONDS * 1000);
			return;
		}

		addCatGifToProgressBar();
		modifyUIStyles();
		addUpcomingSong();
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
			.Button-sc-1dqy6lx-0.Button-sm-16-buttonTertiary-iconOnly-isUsingKeyboard-useBrowserDefaultFocusStyle.main-genericButton-button,
			.Button-sc-1dqy6lx-0.Button-sm-16-buttonTertiary-iconOnly-useBrowserDefaultFocusStyle.main-genericButton-button {
				display: none;
			}

			/* Styles to explicitly show the "Song Queue" button in the UI */
			.GlueDropTarget.GlueDropTarget--tracks.GlueDropTarget--local-tracks.GlueDropTarget--episodes
			.Button-sc-1dqy6lx-0.Button-sm-16-buttonTertiary-iconOnly-useBrowserDefaultFocusStyle.main-genericButton-button,
			.GlueDropTarget.GlueDropTarget--tracks.GlueDropTarget--local-tracks.GlueDropTarget--episodes
			.Button-sc-1dqy6lx-0.Button-sm-16-buttonTertiary-iconOnly-isUsingKeyboard-useBrowserDefaultFocusStyle.main-genericButton-button  {
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

			.Button-sc-1dqy6lx-0.Button-sm-16-buttonTertiary-iconOnly-isUsingKeyboard-useBrowserDefaultFocusStyle.main-genericButton-button
			.Svg-sc-ytk21e-0.Svg-img-16-icon.LyricsPageIcon,
			.Button-sc-1dqy6lx-0.Button-sm-16-buttonTertiary-iconOnly-useBrowserDefaultFocusStyle.main-genericButton-button
			.Svg-sc-ytk21e-0.Svg-img-16-icon.LyricsPageIcon {
				width: 21px;
				height: 21px;
			}

			/* Styles for the container of the current song and upcoming song */
			.main-nowPlayingBar-left {
				display: flex;
			}

			.main-nowPlayingWidget-nowPlaying {
				box-sizing: border-box;
			}
			
			/* Styles for the upcoming song container */
			#flexiUpcomingSongDiv {
				box-sizing: border-box;
				padding-left: 20px;
				padding-top: 24px;
			}
		`;
		document.head.appendChild(styleElement);
	}

	function addUpcomingSong(){
		const nowPlayingLeft = document.querySelector(".main-nowPlayingBar-left");
		if (nowPlayingLeft) {
			const upcomingSongDiv = createUpcomingSongDiv();
			nowPlayingLeft.appendChild(upcomingSongDiv);

			// hide upcoming song in beautiful lyrics full screen
			const beautifulLyricsFullScreenButton = document.querySelector("#BeautifulLyricsFullscreenButton");
			if(beautifulLyricsFullScreenButton){
				document.addEventListener("fullscreenchange", () => {
					checkFullScreen();
					formatSongsLayout();
				});
			}
			
			// Adding event listeners to parts that modify the queue
			const shuffleButton = document.querySelector(".main-shuffleButton-button")
			if(shuffleButton){
				shuffleButton.addEventListener("click", function() {
					setTimeout(fillInUpcomingSongDetails, LOAD_DELAY_IN_MS * 100);
				});
			}

			Spicetify.Player.addEventListener("songchange", () => {
				setTimeout(fillInUpcomingSongDetails, LOAD_DELAY_IN_MS);
			});

			setTimeout(fillInUpcomingSongDetails, LOAD_DELAY_IN_MS);
		}
	}

	function createUpcomingSongDiv() {
		const upcomingSongDiv = document.createElement("div");
		upcomingSongDiv.classList.add("main-nowPlayingWidget-nowPlaying");
		upcomingSongDiv.setAttribute("id", "flexiUpcomingSongDiv");
		upcomingSongDiv.innerHTML = `
			<div class="main-coverSlotCollapsed-container main-coverSlotCollapsed-navAltContainer" aria-hidden="false">
				<div draggable="true">
					<div class="GlueDropTarget GlueDropTarget--albums GlueDropTarget--tracks GlueDropTarget--episodes GlueDropTarget--local-tracks">
						<a id="flexiUpcomingSongPlaylist" draggable="false" data-context-item-type="track" style="border: none;">
							<div class="main-nowPlayingWidget-coverArt">
								<div class="cover-art" aria-hidden="true" style="width: 30px; height: 30px; margin-top: 35%;">
									<div class="cover-art-icon" style="position: initial;">
										<svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 30 30" data-encore-id="icon" class="Svg-sc-ytk21e-0 Svg-img-icon">
											<path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path>
										</svg>
									</div>
									<img id="flexiUpcomingSongImg" aria-hidden="false" draggable="false" loading="eager" src="" alt="" class="main-image-image cover-art-image main-image-loaded" style="" />
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
			<div class="main-nowPlayingWidget-trackInfo main-trackInfo-container" style="margin: 0;">
				<div class="main-trackInfo-name">
					<div class="main-trackInfo-overlay">
						<div class="main-trackInfo-contentContainer">
							<div class="main-trackInfo-contentWrapper" style="--trans-x: 0px;">
								<div class="Type__TypeElement-sc-goli3j-0 TypeElement-mesto-type main-trackInfo-name" dir="auto" data-encore-id="type" style="height: 30px;">
									<a id="flexiUpcomingSongTitle" draggable="false" style="font-size: 0.6em; text-decoration: none;"></a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="main-trackInfo-artists" style="padding-top: 0;">
					<div class="main-trackInfo-overlay">
						<div class="main-trackInfo-contentContainer">
							<div class="main-trackInfo-contentWrapper" style="--trans-x: 0px;">
								<div class="Type__TypeElement-sc-goli3j-0 TypeElement-finale-textSubdued-type main-trackInfo-artists" data-encore-id="type" style="font-size: 0.5em; padding-top: 0;">
									<span>
										<a id="flexiUpcomingSongArtist" draggable="true" dir="auto" style="text-decoration: none;"></a>
									</span>
									<span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
		return upcomingSongDiv;
	}
	
	function fillInUpcomingSongDetails() {
		const queue = Spicetify.Queue;
		var nextTrack = null;
		for (let i = 0; i < queue.nextTracks.length; i++) {
			var tmpNextTrack = queue.nextTracks[i];
			if (!tmpNextTrack.removed.length && tmpNextTrack.contextTrack.uid != Spicetify.Queue.track.contextTrack.uid) {
				nextTrack = tmpNextTrack;
				break;
			}
		}

		const upcomingSongTitle = document.getElementById("flexiUpcomingSongTitle");
		const upcomingSongArtist = document.getElementById("flexiUpcomingSongArtist");
		const upcomingSongImg = document.getElementById("flexiUpcomingSongImg");

		//check if upcoming song was found
		if(nextTrack){		
			upcomingSongTitle.innerText = nextTrack.contextTrack.metadata.title;
	
			//load artists
			upcomingSongArtist.innerText = nextTrack.contextTrack.metadata.artist_name;
			for (let i = 1; i > 0; i++) {
				if (nextTrack.contextTrack.metadata['artist_name:' + i]) {
					upcomingSongArtist.innerText += ', ' + nextTrack.contextTrack.metadata['artist_name' + i];
				} else {
					break;
				}
			}	
	
			//load image or default if no image was found
			if(!nextTrack.contextTrack.metadata.image_url){
				upcomingSongImg.style.display = "none";
			}
			else{
				upcomingSongImg.style.display = "flex";
				upcomingSongImg.src = nextTrack.contextTrack.metadata.image_url;
			}
		}
		else{
			upcomingSongTitle.innerText = "FlexiNoSongWasFound";
		}

		formatSongsLayout();
	}
	
	function formatSongsLayout() {
		const firstElement = document.querySelector(".main-nowPlayingWidget-nowPlaying:not(#flexiUpcomingSongDiv)");
		const secondElement = document.getElementById("flexiUpcomingSongDiv");

		//no following song was found
		const upcomingSongTitle = document.getElementById("flexiUpcomingSongTitle");
		if(upcomingSongTitle.innerText == "FlexiNoSongWasFound"){
			firstElement.style.flex = `0 0 ${100}%`;
			secondElement.style.setProperty("display", "none", "important");
			return;
		}

		//fill in values
		firstElement.style.flex = ``;
		secondElement.style.display = "none";
		const firstWidth = firstElement.offsetWidth;
		secondElement.style.display = "flex";
	
		secondElement.style.flex = ``;
		firstElement.style.display = "none";
		const secondWidth = secondElement.offsetWidth;
		firstElement.style.display = "flex";
	
		const totalWidth = firstElement.parentElement.offsetWidth;
		let firstElementFlex = (firstWidth / totalWidth) * 100;
		let secondElementFlex = (secondWidth / totalWidth) * 100;
	
		if (firstElementFlex > 62 && secondElementFlex > 38) {
			firstElementFlex = 62;
			secondElementFlex = 38;
		} else if (secondElementFlex <= 38 && firstElementFlex > 62 && firstElementFlex + secondElementFlex > 100) {
			firstElementFlex = 100 - secondElementFlex;
		} else if (firstElementFlex <= 62 && secondElementFlex > 38 && firstElementFlex + secondElementFlex > 100) {
			secondElementFlex = 100 - firstElementFlex;
		}

		firstElement.style.flex = `0 0 ${firstElementFlex}%`;
		secondElement.style.flex = `0 0 ${secondElementFlex}%`;

		// ensure secondElement appears behind firstElement (seems to be caused by enhanced playlists)
		if(firstElement.parentElement.children[1].getAttribute("id") != "flexiUpcomingSongDiv"){
			secondElement.remove()
			firstElement.parentElement.appendChild(secondElement);
		}

		// ensure application is not in full screen
		checkFullScreen();
	}

	function checkFullScreen(){
		const upcomingSongDiv = document.querySelector("#flexiUpcomingSongDiv");
		if (upcomingSongDiv) {
			if (document.fullscreenElement) {
				upcomingSongDiv.style.setProperty("display", "none", "important");
			} else {
				upcomingSongDiv.style.display = "flex";
			}
		}
	}

	waitForSpicetifyLoad();
})();
