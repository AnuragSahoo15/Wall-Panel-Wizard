// app.js

// Event listener for the camera button
document.getElementById('cameraButton').addEventListener('click', function() {
    document.getElementById('cameraContainer').style.display = 'block';
    startCamera();
});

// Function to start the camera
function startCamera() {
    var video = document.getElementById('video');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
            video.srcObject = stream;
            video.play();
        }).catch(function(err) {
            console.error("Error accessing camera: " + err);
        });
    } else {
        console.error("Camera not supported.");
    }
}

// Event listener for the snap button
document.getElementById('snap').addEventListener('click', function() {
    var canvas = document.getElementById('canvas');
    var video = document.getElementById('video');
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(function(blob) {
        var file = new File([blob], "photo.jpg", { type: "image/jpeg" });
        var dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        document.getElementById('fileInput').files = dataTransfer.files;
        document.getElementById('uploadForm').submit();
    }, 'image/jpeg');
});
