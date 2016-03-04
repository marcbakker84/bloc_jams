var pointsArray = document.getElementsByClassName('.point');

var revealPoint = function(point) {
    point.style.opacity = 1;
    point.style.transform = "scaleX(1) translateY(0)";
    point.style.msTransform = "scaleX(1) translateY(0)";
    point.style.WebkitTransform = "scaleX(1) translateY(0)";
}

var animatePoints = function(points) {
    forEach(points,revealPoint)
}

/*
var animatePoints = function(points) {
    pointsArray.forEach(points)

Ok, if you don't want to use a fake for each function, as made in utilities, than i would expect the above to work. However, it does not. Why? And how to implement a real forEach function in this case?g
    
}*/

window.onload = function() {
    if (window.innerHeight > 950) {
         animatePoints(pointsArray);
     }

    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;


     window.addEventListener("scroll", function(event) {
         if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
             animatePoints(pointsArray);   
             pointsArray.forEach(animatePoints);
         }     
     });
 }

/*Old solution

var pointsArray = document.querySelectorAll('.point');

var animatePoints = function (points) {
    for(i=0;i<points.length;i++) {
        points[i].style.opacity = 1;
        points[i].style.transform = "scaleX(1) translateY(0)";
        points[i].style.msTransform = "scaleX(1) translateY(0)";
        points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    }
};

window.onload = function() {
    if (window.innerHeight > 950) {
         animatePoints(pointsArray);
     }

    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;


     window.addEventListener("scroll", function(event) {
         if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
             animatePoints(pointsArray);   
             pointsArray.forEach(animatePoints);
         }     
     });
 }

//What is document.documentElement.scrollTop or document.body.scrollTop

/*
var animatePoints = function () {
var points = document.getElementsByClassName('point');
    var revealPoint = function(index) {
        points[index].style.opacity = 1;
        points[index].style.transform = "scaleX(1) translateY(0)";
        points[index].style.msTransform = "scaleX(1) translateY(0)";
        points[index].style.WebkitTransform = "scaleX(1) translateY(0)";
    }
        
        for(i=0;i<points.length;i++) {
        revealpoint(i)
};*/
//this is the solution given in the video. Why is there a distinciton between the styles and the 