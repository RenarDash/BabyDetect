
Modelstatus = "";
o = [];
function preload() {
alarm=loadSound("alarm_clock_old.mp3")
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    oD = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object deleting";
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (Modelstatus != "") {
        for (i = 0; i < o.length; i++) {
            objName = o[i].label;
            if(objName=="person"){
                document.getElementById("status").innerHTML = "Baby in sight";
                alarm.stop();
            }
            else{
                document.getElementById("status").innerHTML = "YOUR BABY HAS GONE MISSING!"
                alarm.play();
            }
        }
        if (o.length==0) {
            document.getElementById("status").innerHTML = "YOUR BABY HAS GONE MISSING!"
            alarm.play();
        }
    }
}
function modelLoaded() {
    console.log("Model Loaded");
    Modelstatus = true;
    oD.detect(video, gotResults);
}

function gotResults(e, r) {
    if (e) {
        console.error(e);
    }
    else {
        console.log(r);
        o = r;
    }
}
