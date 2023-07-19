sound = "";
objects = [];
object_status = "";

function preload() {
    sound = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Person";
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (object_status != "") {
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
        if (objects[i].label = "person") {
            document.getElementById("status").innerHTML = "Status: Baby Detected";
            sound.stop();
        } else {
            document.getElementById("status").innerHTML = "Status: Baby Not Detected";
            sound.play();
        }
    } 

    if (objects.length == 0) {
        document.getElementById("status").innerHTML = "Status: Baby Not Detected";
        sound.play();
    }
  }
}

function modelLoaded() {
    console.log("Model Loaded Successfully!");
    object_status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}