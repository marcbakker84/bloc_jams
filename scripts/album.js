var setSong = function(songNumber) {
    if (currentSoundFile) {
         currentSoundFile.stop();
    }
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber-1];
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: [ 'mp3' ],
        preload: true
    });
    setVolume(currentVolume);
};

 var setVolume = function(volume) {
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 };

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
};

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
    var $row = $(template);
    
    var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));

        if (currentlyPlayingSongNumber !== null) {
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }    
        
        if (currentlyPlayingSongNumber !== songNumber) {
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            currentSoundFile.play()
            updatePlayerBarSong();
        } 
        
        else if (currentlyPlayingSongNumber === songNumber) {
                if(currentSoundFile.isPaused()) {
                    currentSoundFile.play();
                    $('.main-controls .play-pause').html(playerBarPauseButton);
                    $(this).html(pauseButtonTemplate);
                } else {
                    currentSoundFile.pause();
                    $('.main-controls .play-pause').html(playerBarPlayButton);
                    $(this).html(playButtonTemplate);
                }
            }
        };
    
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    }; 

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    }; 
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
 };

var setCurrentAlbum = function(album) {
    currentAlbum = album;
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
 
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
 
    $albumSongList.empty();
 
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);     
    }
};

var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
};

var nextSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    // Set a new current song
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updatePlayerBarSong();

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    //var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    //var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

//var nextSong = function() {
//    
//    var getLastSongNumber = function(index) {
//       return index == 0 ? currentAlbum.songs.length : index;
//    };
//        
//        
//    var newIndex;
//    //step 1. Retrieve the index of the next song and return the new index.
//    newIndex = trackIndex(currentAlbum,currentSongFromAlbum) + 1;
//    console.log(trackIndex);
//    if(newIndex >= currentAlbum.songs.length) {
//        newIndex = 0;
//    };
//    
//    
//    //step 2. Use the new index of the number of setting the currentSongFromAlbum and the currentPlayingSongNumber.
//    currentSongFromAlbum = currentAlbum.songs[newIndex];
//    console.log(currentSongFromAlbum)
//    currentPlayingSongNumber = newIndex + 1;
//        
//    //step 3. Reset the parts in the player bar to the new song. 
//    $(".artist-song-mobile").text(currentAlbum.artist + " - " + currentSongFromAlbum.title);
//    $(".song-name").text(currentSongFromAlbum.title);
//    $(".artist-name").text(currentAlbum.artist);
//    $('.main-controls .play-pause').html(playerBarPauseButton);
//
//var lastSongNumber = getLastSongNumber(currentSongIndex);
//    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
//    //var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
//    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
//    //var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
//    
//    $nextSongNumberCell.html(pauseButtonTemplate);
//    $lastSongNumberCell.html(lastSongNumber);
//}

var previousSong = function() {

    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;
    
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updatePlayerBarSong();
    
    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    //var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    //var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var updatePlayerBarSong = function() {
        $(".artist-song-mobile").text(currentAlbum.artist + " - " + currentSongFromAlbum.name);
        $(".song-name").text(currentSongFromAlbum.title);//this 
        $(".artist-name").text(currentAlbum.artist);
        $('.main-controls .play-pause').html(playerBarPauseButton);
    }

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;



var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});

//clickHandler is a function that sets var currentlyPlayingSong to ??. I
        //declare songItem and set its value to the result of the getSongItem function.
        //if the currentlyPlayingSong equals null
            //set the innerHTML of songItem to pauseButtonTemplate
            //set currentlyPlaying Song to the data-song-number of songItem
        //else if the currentlyPlayingSong equals the 'data-song-number' attribute of songItem
            //set the innerHTML of songItem to playButtonTemplate
            //set currentlyPlayingSong to null
        //else if the currentlyPlayingSong does not equal the 'data-song-number' attribute of songItem
            //declare var currentlyPlayingSongElement and set it to the data stored in 'data-song-number' of the currentlyPlayingSong.
    
    
    //start an anonymous function when there is a mouseover over the songListContainer. 
        //if the classname of the elements' parent (of where the event took place) equals the class 'album-view-song-item' 
            //declare var songItem and set
                //invoke the getSongItem.
                //pass in the element name of where the event took place.
                //return the result of the function and set var songItem
            //if the attribute 'data-song-number' of songItem does not equal currentlyPlayingSong
                //set the innerHTML of songItem to playButtonTemplate
            //if false, do nothing.
        //if false, do nothing.
    
//setCurrent album is a function that generates the correct data of the chosen album on the album page. It takes one paramater: album.
    //when setCurren is invoked: 
        //declare var albumTitle which holds the ?? with the class 'album-view-title' on index [0].
        //declare var albumArtist which holds the ?? with the class 'album-view-artist' on index [0].
        //declare var albumReleaseInfo which holds the ?? with the class 'album-view-release-info' on index [0].
        //declare var albumImage which holds the ?? with the class 'albumImage' on index [0].
        //declare var albumSongList which holds the ?? with the class 'albumSongList' on index [0].
    //set the text in var albumTitle by the value of the title property from the passed in album object
    //set the text in var albumArtist by the value of the artist property from the passed in album object
    //set the text in var albumReleaseinfo by the values of the year and label properties from the passed in album object.
    //the URL of the albumArtURL property from the passed in object added is set as an attribute to albumImage
    //clear the (possible) contents of the var albumSongList.
    //invoke the createSongRow function multiple times by a for loop and create rows in the varAlbumSonglist with the titles and duration propertie for each song in the passed in album object.

//createSongRow is a function that creates a song row on the album page. It takes in a three parameters: songNumber, songName, songLength.
    //when invoked, createSongRow creates var template. 
        //var template is a table row (.album-view-song-item) that consists three table cells (song-item-number,song-item-title,song-item-duration).
            //the song-item-number cell shows the string passed in as songNumber argument. <<check this out.
            //the song-item-title cell shows the string passed in as songName argument.
            //the song-item-duration cell shows the string passed in as songLength argument.
        //createSongRow returns var template