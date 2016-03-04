var callBack = function(j) {
  console.log("This is the output of the callback function vor point" + j)
}

var forEach = function(array, callback) {
  for(i=0;i<array.length;i++) {
    callBack(array[i]);
  }
};


//why is there also 'callback' passed into the function??????