song = "";

function preload() {
	song = loadSound("alert.mp3");
}

function setup() {
    canvas = createCanvas(270 , 270);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/pQxMz_3u9/model.json" , modelLoaded);
}

function modelLoaded() {
    console.log("Modal is loaded!");
}

function draw() {
    image(video , 0 , 0 , 270 , 270);
    classifier.classify(video , gotResult);
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    }

    else {
        console.log(results);
        if (results[0].label == "Wearing mask") {
            document.getElementById("object").innerHTML = "You have wore the mask!";
            document.getElementById("accuracy").innerHTML = "You can enter!";
        }
        else if (results[0].label == "Not wearing mask ") {
            document.getElementById("object").innerHTML = "Please wear your mask and come back!";
            document.getElementById("accuracy").innerHTML = "You are not allowed to enter🚷🚷🚷";
            play;
        }
        else if(results[0].label == "Not wore the mask properly") {
            document.getElementById("object").innerHTML = "Please wear your mask properly!";
            document.getElementById("accuracy").innerHTML = "You are not allowed to enter till you don't wear the mask properly🚷🚷🚷";
            play;
        }
    }
}

function play() {
    song.play();
    song.volume(1);
    song.speed(1);
}