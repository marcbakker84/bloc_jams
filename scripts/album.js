var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
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
        var songNumber = $(this).attr('data-song-number');

        if (currentlyPlayingSong !== null) {
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingCell.html(currentlyPlayingSong);
        }    
        if (currentlyPlayingSong !== songNumber) {
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songNumber;
        } 
        else if (currentlyPlayingSong === songNumber) {
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        }
    };
    
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    }; 

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    }; 
    
    $row.find('.song-item-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
 };



var setCurrentAlbum = function(album) {
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

 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 var currentlyPlayingSong = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso); 
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