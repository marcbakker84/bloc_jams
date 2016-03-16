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
 
     return $(template);
 };

//createSongRow is a function that creates a song row on the album page. It takes in a three parameters: songNumber, songName, songLength.
    //when invoked, createSongRow creates var template. 
        //var template is a table row (.album-view-song-item) that consists three table cells (song-item-number,song-item-title,song-item-duration).
            //the song-item-number cell shows the string passed in as songNumber argument. <<check this out.
            //the song-item-title cell shows the string passed in as songName argument.
            //the song-item-duration cell shows the string passed in as songLength argument.
        //createSongRow returns var template

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
 
 var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
 var songRows = document.getElementsByClassName('album-view-song-item');

 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 var currentlyPlayingSong = null;

window.onload = function() {
     setCurrentAlbum(albumPicasso);
   
    var findParentByClassName = function(element, targetClass) {
        if (element) {
            var currentParent = element.parentElement;
            while (currentParent.className != targetClass) {
                currentParent = currentParent.parentElement;
            }
            return currentParent;
        }
    }
    
//findParentByClassName is a function that returns the elementname of the elements parent when the class name of that element is equal to the passed in targetclass. If not, it checks the parent of the parent. It takes in two parameters; element and targetClass.
    //check if there is an input from an element.
        //when true:
        //declare var currentParrent which holds the element name of the parent from the passed in element.
        //check with a while loop if currentParrent.className is not equal to targetClass
            //when true change set value of var currentParent to currentParent.parentElement and check this ancestor again in the while loop. 
        //when false return var currentParent.

    var getSongItem = function(element) {
        switch (element.className) {
            case 'album-song-button':
            case 'ion-play':
            case 'ion-pause':
                return findParentByClassName(element, 'song-item-number');
            case 'album-view-song-item':
                return element.querySelector('.song-item-number');
            case 'song-item-title':
            case 'song-item-duration':
                return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
            case 'song-item-number':
                return element;
            default:
                return;
        }  
    };

    //getSongItem is a function that returns the song-item-number element based on an element name in the same row. It takes in one parameter: element. 
    //pass the element.classname in a switch statement 
        //Case: the classname equals 'album-song-button' or 'ion-play' or 'ion-pause' 
            //invoke the findParentByClassName function.
            //pass in the element and 'song-item-number' as arguments.
            //return the result of the function
        //Case: the class name equals 'album view-song-item':
            //return the element which has the class 'song-item-number'.
        //Case: the classname equals 'song-item-title' or 'song-item-duration'.
            //invoke the findParentByClassName function.
            //pass in the element and 'song-item-number' as arguments.
            //return the element which has the classname 'song-item-number'.
        //Case: the classname equals 'song-item-number':
            //return the element
    
    
    var clickHandler = function(targetElement) {
        var songItem = getSongItem(targetElement);  

        if (currentlyPlayingSong === null) {
             songItem.innerHTML = pauseButtonTemplate;
             currentlyPlayingSong = songItem.getAttribute('data-song-number');
        } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
             songItem.innerHTML = playButtonTemplate;
             currentlyPlayingSong = null;
        } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
             var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
             currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
             songItem.innerHTML = pauseButtonTemplate;
             currentlyPlayingSong = songItem.getAttribute('data-song-number');
        }
    };

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
    
    songListContainer.addEventListener('mouseover', function(event) {
        if (event.target.parentElement.className === 'album-view-song-item') {
            var songItem = getSongItem(event.target);
            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
        }
    });
    
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
    
    
    for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');
            if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
         });
    
        
        songRows[i].addEventListener('click', function(event) {
            clickHandler(event.target);
        }); 
    }
};

