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
		var styleElement = document.createElement('style');
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
			}

			/* Styles to hide the "Lyrics" button in the UI */
			.main-nowPlayingBar-lyricsButton { 
				display: none; 
			}

			/* Styles to hide the "View Current Song" and "Song Queue" buttons in the UI */
			.Button-sc-1dqy6lx-0.Button-sm-16-buttonTertiary-iconOnly-useBrowserDefaultFocusStyle.main-genericButton-button {
				display: none !important;
			}

			/* Styles to explicitly show the "Song Queue" button in the UI */
			.GlueDropTarget.GlueDropTarget--tracks.GlueDropTarget--local-tracks.GlueDropTarget--episodes
			.Button-sc-1dqy6lx-0.Button-sm-16-buttonTertiary-iconOnly-useBrowserDefaultFocusStyle.main-genericButton-button {
				display: block !important;
			}

			/* Styles to fix the scrolling in a playlist */
			.main-topBar-topbarContent.main-entityHeader-topbarContent.main-entityHeader-topbarContentFadeIn {
				margin-top: 4px;
			}

			.main-topBar-topbarContent.main-entityHeader-topbarContent.main-entityHeader-topbarContentFadeIn 
			.Type__TypeElement-sc-goli3j-0.TypeElement-canon-type-draggable.main-entityHeader-topbarTitle {
				margin-top: 4px;
				margin-left: 10px;
			}

			/* Styles for the container of the current song and upcoming song */
			.main-nowPlayingBar-left {
				display: flex;
			}

			.main-nowPlayingWidget-nowPlaying {
				box-sizing: border-box;
			}
			
			/* Styles for the upcoming song container, including padding */
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

			setTimeout(fillInUpcomingSongDetails, LOAD_DELAY_IN_MS);
			Spicetify.Player.addEventListener("songchange", () => {
				setTimeout(fillInUpcomingSongDetails, LOAD_DELAY_IN_MS);
			});
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
								<div class="cover-art" aria-hidden="true" style="width: 30px; height: 30px; margin-top: 25%;">
									<div class="cover-art-icon">
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
								<div class="Type__TypeElement-sc-goli3j-0 TypeElement-mesto-type main-trackInfo-name" dir="auto" data-encore-id="type">
									<span draggable="true">
										<a id="flexiUpcomingSongTitle" draggable="false" style="font-size: 0.6em; text-decoration: none;"></a>
									</span>
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
		const nextTrack = queue.nextTracks[0];
	
		const upcomingSongTitle = document.getElementById("flexiUpcomingSongTitle");
		const upcomingSongArtist = document.getElementById("flexiUpcomingSongArtist");
		const upcomingSongImg = document.getElementById("flexiUpcomingSongImg");
	
		upcomingSongTitle.innerText = nextTrack.contextTrack.metadata.title;
		upcomingSongArtist.innerText = nextTrack.contextTrack.metadata.artist_name;
		upcomingSongImg.src = nextTrack.contextTrack.metadata.image_large_url;

		formatSongsLayout();
	}
	
	function formatSongsLayout() {
		const firstElement = document.querySelector(".main-nowPlayingWidget-nowPlaying:not(#flexiUpcomingSongDiv)");
		const secondElement = document.getElementById("flexiUpcomingSongDiv");
	
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
	}

	waitForSpicetifyLoad();
})();
