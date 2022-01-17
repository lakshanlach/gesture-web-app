prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:360,
    height:250,
    image_format : 'jpeg',
    jpeg_quality:90
})
camera = document.getElementById("camera")

Webcam.attach(camera)

function capture()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
    })
}
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/T8kga5dqd/model.json',modelloaded)

function modelloaded(){
    console.log('modelloaded')
}

function speak(){
    var synth = window.speechSynthesis;

    speak_data_1 = "Taking your Selfie in 5 seconds" + prediction_1
    speak_data_2 = "Taking your Selfie in 5 seconds" + prediction_2

    var utterThis = new SpeechSynthesisUtterance(speak_data)

    synth.speak(utterThis)
}

function check(){
    img = document.getElementById('captured_image')
    classifier.classify(img, gotResult)
}

function gotResult(error, result){
        console.log(result)
        document.getElementById("result_emotion_name").innerHTML=result[0].label
        document.getElementById("result_emotion_name2").innerHTML=result[1].label
        prediction_1 = result[0].label
        prediction_2 = result[1].label

        speak()
        if(result[0].label == "victory"){
          document.getElementById("update_emoji").innerHTML = "&#9996;"
        }

        if(result[0].label == "amazing"){
            document.getElementById("update_emoji").innerHTML = "&#128076;"
          }

          if(result[0].label == "best"){
          document.getElementById("update_emoji").innerHTML = "&#128077;"
        }

        if(result[1].label == "best"){
            document.getElementById("update_emoji2").innerHTML = "&#128077;"
          }

          if(result[1].label == "amazing"){
            document.getElementById("update_emoji2").innerHTML = "&#128076;"
          }

          if(result[1].label == "victory"){
            document.getElementById("update_emoji2").innerHTML = "&#9996;"
          }
}