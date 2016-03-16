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

var albumEddieVedder = {
     title: 'Into the Wild',
     artist: 'Eddie Vedder',
     label: 'Sony',
     year: '2007',
     albumArtUrl: 'assets/images/album_covers/12.png',
     songs: [
         { title: 'Setting forth', duration: '1:01' },
         { title: 'No ceiling', duration: '5:01' },
         { title: 'Far behind', duration: '3:21'},
         { title: 'Rise', duration: '3:14' },
         { title: 'Long nights', duration: '2:15'},
         { title: 'Tuolumne', duration: '1:01' },
         { title: 'Hard sun', duration: '5:01' },
         { title: 'Society', duration: '3:21'},
         { title: 'The wolf', duration: '3:14' },
         { title: 'End of the road', duration: '2:15'},
         { title: 'Guarenteed', duration: '3:21'}
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };

var setCurrentAlbum = function(album) {
     // #1
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
     // #2
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // #3
     albumSongList.innerHTML = '';
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };

/*window.onload = function() {
     setCurrentAlbum(albumPicasso);
 };
*/

window.onload = function() {
    var albumCounter = 1
    setCurrentAlbum(albumPicasso);
    document.getElementsByClassName("album-cover-art")[0].addEventListener('click', function (e) {        
        var allAlbums = [albumPicasso, albumMarconi, albumEddieVedder]
        setCurrentAlbum(allAlbums[albumCounter]);           
        if (albumCounter < (allAlbums.length-1))  {
                albumCounter++;
            } else if (albumCounter >= (allAlbums.length-1)) {
                albumCounter = 0;
            }            
        }); 
};

$(document).ready(function{
    var albumCounter = 0;
    $(".album-cover-art").click(function(){
        if(albumcounter<all.Albums.length-1) {
            albumCounter +=1
        } else if (albumCounter >- (allAlbums.length-1))
    })
})*/