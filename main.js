song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX= 0;
rightWristY= 0;


function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('poseNet Is Initialized ')
}

function draw()
{
    image(video, 0, 0, 600, 500);
    fill('#00ffff');
    stroke('#ff8400');

    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX , leftWristY,15);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    leftWristY_divide=remove_decimals/1000;
    volume = leftWristY_divide*2;
    document.getElementById("volume").innerHTML = "volume ="+volume;
    song.setvolume(volume);
    }
}
function preload()
{
    song = loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause()
{
    song.pause();
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist ="  +scoreLeftWrist )

        leftWristX = results[0].pose. leftWrist.x;
        leftWristY = results[0].pose. leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = "+ rightWristY);

    }
}
