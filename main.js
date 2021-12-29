// Songs
var song1 = "";
var song2 = ""; 

// Status
var songS1 = "";
var songS2 = "";

// Declaring Pose Points
var rWristX = 0; // Right Wrist X
var rWristY = 0; // Right Wrist Y

var lWristX = 0; // Left Wrist X
var lWristY = 0; // Left Wrist Y

var lWristScore = 0; // Left Wrist Confidence
var rWristScore = 0; // Right Wrist Confidence

// Preload
function preload() 
{
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");
}

// Setup
function setup() 
{
    // Canvas
    canvas = createCanvas(600, 495);
    canvas.center();

    // Webcam
    webcam = createCapture(600, 495);
    webcam.hide();

    poseNet = ml5.poseNet(webcam, modelLoaded);
    poseNet.on("pose", gotPoses);
}

// Model Loaded
function modelLoaded() 
{
    console.log("model loaded...");
}

// Got Poses
function gotPoses(result) 
{
    if (result.length > 0) 
    {
        // Assigning KeyPoints Values
        rWristX = result[0].pose.rightWrist.x; // Right Wrist X
        rWristY = result[0].pose.rightWrist.y; // Right Wrist Y

        lWristX = result[0].pose.leftWrist.x; // Left Wrist X
        lWristY = result[0].pose.leftWrist.y; // Left Wrist Y

        rWristScore = result[0].pose.keypoints[10].score; // Right Wrist Confidence
        lWristScore = result[0].pose.keypoints[9].score; // Left Wrist Confidence

        // Console
        console.log("Right Wrist Confidence: " + rWristScore.toFixed(2));
        console.log("Left Wrist Confidence: " + lWristScore.toFixed(2));
    }
}

// Draw
function draw() 
{
    image(webcam, 0, 0, 600, 495);

    // Status
    songS1 = song1.isPlaying();
    songS2 = song2.isPlaying();

    // Fill and Stroke
    fill("#FF0000");
    stroke("#FF0000");

    if (lWristScore >= 0.2) 
    {
        circle(lWristX, lWristY, 25);
        song2.stop();    

        if (songS1 == false) 
        {
            song1.play();
            document.getElementById("songName").innerHTML = "Playing - Monster Yaosobi (Dio)";

        }
    }

    if (rWristScore >= 0.2) 
    {
        circle(rWristX, rWristY, 25);
        song1.stop();    

        if (songS2 == false) 
        {
            song2.play();
            document.getElementById("songName").innerHTML = "Playing - Bloody Stream";
        }
    }
}

function play() 
{
    song1.play();
    song1.setVolume(1);
    song1.rate(1);    
}