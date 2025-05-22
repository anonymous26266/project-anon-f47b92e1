

// This is based on https://robustnerf.github.io/, : http://thenewcode.com/364/Interactive-Before-and-After-Video-Comparison-in-HTML5-Canvas
// With additional modifications based on: https://jsfiddle.net/7sk5k4gp/13/


var scans = [24, 40, 55, 65, 69, 97, ];
var scans_2 = [105, 106, 110, 114, 118, 122];


scan_selection_template = `
<li class="tablinks is-active" onclick="toggleView(event)" scan="scanid">
              <a>
                <span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span>
                <span>Scan scanid</span>
              </a>
            </li>
`;

scan_content_template = `
        <!--/ Scan 24 -->
        
        <div class="tabcontent" style="display: block;" scan="scanid">
        <!-- source views. -->
        <h4 class="title is-4">Unfavorable Source Views</h4> <!-- Fixed closing tag -->
        <div class="columns is-centered has-text-centered" style="gap: 5px;"> <!-- Adjusted for closer columns -->
          <div class="column" style="padding: 0.25rem;">
            <img src="static/images/source_views/scanid/1.png" style="width: 70%; display: block; margin: auto;" />
          </div>
          <div class="column" style="padding: 0.25rem;">
            <img src="static/images/source_views/scanid/2.png" style="width: 70%; display: block; margin: auto;" />
          </div>
          <div class="column" style="padding: 0.25rem;">
            <img src="static/images/source_views/scanid/3.png" style="width: 70%; display: block; margin: auto;" />
          </div>
        </div>
          <!-- source views. -->
          <!--/ Renderings -->
          <h4 class="title is-4">Results</h2>
          <table>
            <tbody>
              <!--
              //! uncomment below to toggle video 
              // <tr>
              //   <td align="left" valign="top" width="50%">
              //     <video class="video" preload="auto" id="scanid" loop="" playsinline="" autoplay="" muted=""
              //       src="static/videos/unfavorable_scanid.mp4" onplay="resizeAndPlay(this)" style="height: 0px;"></video>
              //     <canvas class="videoMerge" id="scanidMerge" width="800" height="600"></canvas>
              //   </td>
              // </tr>
              //! ----------------------------
              -->
             
              <div class="columns is-centered has-text-centered">
              <!-- Volrecon video column -->
              <div class="column video-container">
                <h3 class="title is-5">Volrecon</h3>
                <video id="volrecon" autoplay muted loop controls>
                  <source src="static/videos/volrecon/unfavorable_scanid.mp4" type="video/mp4">
                </video>
              </div>
              <!-- UFORecon video column -->
              <div class="column video-container">
                <h3 class="title is-5">Ours</h3>
                <video id="uforecon" autoplay muted loop controls>
                  <source src="static/videos/uforecon_best/unfavorable_scanid.mp4" type="video/mp4">
                </video>
              </div>
              <!-- UFORecon(random) video column -->
              <div class="column video-container">
                <h3 class="title is-5">Ours (Random Set Training)</h3>
                <video id="volrecon" autoplay muted loop controls>
                  <source src="static/videos/uforecon_random/unfavorable_scanid.mp4" type="video/mp4">
                </video>
              </div>
            </div>
            </tbody>
          
            <!--/ Renderings -->
            <div class="columns is-centered has-text-centered">
            <!-- Column for images -->
            <div class="column">
            <h2 class="title is-4">Favorable Source Views</h2>
              <!-- Image 1 -->
              <img src="static/images/source_views_fav/scanid/1.png" alt="first favorable source" style="width: 100%;">
              <!-- Image 2 -->
              <img src="static/images/source_views_fav/scanid/2.png" alt="second favorable source" style="width: 100%;">
              <!-- Image 3 -->
              <img src="static/images/source_views_fav/scanid/3.png" alt="third favorable source" style="width: 100%;">
           </div>

            <!-- Column for 3D model -->
            <div class="column is-full_width">
              <h2 class="title is-4">Favorable 3-Views (UFORecon)</h2>
              <model-viewer alt="Scan scaind Mesh"
                exposure=".35" shadow-intensity="1" shadow-softness="1"
                orientation="orientation-string"
                src="https://raw.githubusercontent.com/Youngju-Na/UFORecon-project-page/master/static/scanid.glb"
                style="width: 700px; height: 700px; background-color: #404040"
                poster="" auto-rotate camera-controls
                ar-status="not-presenting"></model-viewer>
            </div>
          
            
            </table>
          </div>
`;



function loadScanSelection() {
  var ul = document.getElementById("scan_selection");
  var ul_html = "";
  for (let i = 0; i < scans.length; i++) {
    const scan = scans[i];
    element_html = scan_selection_template.replaceAll("scanid", scan);
    if (i != 0) {
      element_html = element_html.replaceAll("is-active", "");
    }
    ul_html += element_html;
  }
  ul.innerHTML = ul_html;
}
function loadScanContent() {
  var div = document.getElementById("scan_content");
  var div_html = "";
  for (let i = 0; i < scans.length; i++) {
    const scan = scans[i];
    element_html = scan_content_template.replaceAll("scanid", scan);
    
    element_html = element_html.replaceAll("orientation-string", transforms[scan]);
    if (i != 0) {
      element_html = element_html.replaceAll("style=\"display: block;\"", "style=\"display: none;\"");
    }
    div_html += element_html;
  }
  div.innerHTML = div_html;
}
$(document).ready(function () {
  loadScanSelection();
  loadScanContent();
});


// controls rotation
var transforms = {
  24: "170deg 340deg 110deg",
  37: "170deg 340deg 110deg",
  40: "170deg 340deg 110deg",
  65: "170deg 340deg 110deg",
  106: "170deg 340deg 110deg",
  114: "170deg 340deg 110deg",
};


function transformModels() {
  modelViewerTransform.orientation = `${roll.value}deg ${pitch.value}deg ${yaw.value}deg`;
  modelViewerTransform.updateFraming();

}



function toggleView(evt) {
  var elem = evt.currentTarget;
  var scan = elem.attributes["scan"].value;

  // Get all elements with class="tabcontent" and hide them
  var tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    var display = tabcontent[i].attributes["scan"].value == scan ? "block" : "none";
    tabcontent[i].style.display = display;
  }

  // Get all elements with class="tablinks" and remove the class "active"
  var tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" is-active", "");
  }
  // Show the current tab, and add an "active" class to the button that opened the tab
  elem.className += " is-active";
}

function playVids(videoId) {
  var videoMerge = document.getElementById(videoId + "Merge");
  var vid = document.getElementById(videoId);

  var position = 0.5;
  var vidWidth = vid.videoWidth/2;
  var vidHeight = vid.videoHeight;

  var mergeContext = videoMerge.getContext("2d");

  
  if (vid.readyState > 3) {
      vid.play();

      function trackLocation(e) {
          // Normalize to [0, 1]
          bcr = videoMerge.getBoundingClientRect();
          position = ((e.pageX - bcr.x) / bcr.width);
      }
      function trackLocationTouch(e) {
          // Normalize to [0, 1]
          bcr = videoMerge.getBoundingClientRect();
          position = ((e.touches[0].pageX - bcr.x) / bcr.width);
      }

      videoMerge.addEventListener("mousemove",  trackLocation, false); 
      videoMerge.addEventListener("touchstart", trackLocationTouch, false);
      videoMerge.addEventListener("touchmove",  trackLocationTouch, false);


      function drawLoop() {
          mergeContext.drawImage(vid, 0, 0, vidWidth, vidHeight, 0, 0, vidWidth, vidHeight);
          var colStart = (vidWidth * position).clamp(0.0, vidWidth);
          var colWidth = (vidWidth - (vidWidth * position)).clamp(0.0, vidWidth);
          mergeContext.drawImage(vid, colStart+vidWidth, 0, colWidth, vidHeight, colStart, 0, colWidth, vidHeight);
          requestAnimationFrame(drawLoop);

          
          var arrowLength = 0.09 * vidHeight;
          var arrowheadWidth = 0.025 * vidHeight;
          var arrowheadLength = 0.04 * vidHeight;
          var arrowPosY = vidHeight / 10;
          var arrowWidth = 0.007 * vidHeight;
          var currX = vidWidth * position;

          // Draw circle
          mergeContext.arc(currX, arrowPosY, arrowLength*0.7, 0, Math.PI * 2, false);
          mergeContext.fillStyle = "#FFD79340";
          mergeContext.fill()
          //mergeContext.strokeStyle = "#444444";
          //mergeContext.stroke()
          
          // Draw border
          mergeContext.beginPath();
          mergeContext.moveTo(vidWidth*position, 0);
          mergeContext.lineTo(vidWidth*position, vidHeight);
          mergeContext.closePath()
          mergeContext.strokeStyle = "#444444";
          mergeContext.lineWidth = 5;            
          mergeContext.stroke();

          // Draw arrow
          mergeContext.beginPath();
          mergeContext.moveTo(currX, arrowPosY - arrowWidth/2);
          
          // Move right until meeting arrow head
          mergeContext.lineTo(currX + arrowLength/2 - arrowheadLength/2, arrowPosY - arrowWidth/2);
          
          // Draw right arrow head
          mergeContext.lineTo(currX + arrowLength/2 - arrowheadLength/2, arrowPosY - arrowheadWidth/2);
          mergeContext.lineTo(currX + arrowLength/2, arrowPosY);
          mergeContext.lineTo(currX + arrowLength/2 - arrowheadLength/2, arrowPosY + arrowheadWidth/2);
          mergeContext.lineTo(currX + arrowLength/2 - arrowheadLength/2, arrowPosY + arrowWidth/2);

          // Go back to the left until meeting left arrow head
          mergeContext.lineTo(currX - arrowLength/2 + arrowheadLength/2, arrowPosY + arrowWidth/2);
          
          // Draw left arrow head
          mergeContext.lineTo(currX - arrowLength/2 + arrowheadLength/2, arrowPosY + arrowheadWidth/2);
          mergeContext.lineTo(currX - arrowLength/2, arrowPosY);
          mergeContext.lineTo(currX - arrowLength/2 + arrowheadLength/2, arrowPosY  - arrowheadWidth/2);
          mergeContext.lineTo(currX - arrowLength/2 + arrowheadLength/2, arrowPosY);
          
          mergeContext.lineTo(currX - arrowLength/2 + arrowheadLength/2, arrowPosY - arrowWidth/2);
          mergeContext.lineTo(currX, arrowPosY - arrowWidth/2);

          mergeContext.closePath();

          mergeContext.fillStyle = "#444444";
          mergeContext.fill();
      }
      requestAnimationFrame(drawLoop);
  } 
}

Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};

    
function resizeAndPlay(element)
{
  var cv = document.getElementById(element.id + "Merge");
  cv.width = element.videoWidth/2;
  cv.height = element.videoHeight;
  element.play();
  element.style.height = "0px";  // Hide video without stopping it
    
  playVids(element.id);
}



function playVidsDual(videoId, videoId2) {
  var videoMerge = document.getElementById(videoId + "Merge");
  var vid = document.getElementById(videoId);

  var videoMerge2 = document.getElementById(videoId2 + "Merge");
  var vid2 = document.getElementById(videoId2);

  var position = 0.5;
  var vidWidth = vid.videoWidth / 2;
  var vidHeight = vid.videoHeight;

  var mergeContext = videoMerge.getContext("2d");
  var mergeContext2 = videoMerge2.getContext("2d");


  if ((vid.readyState > 3) && (vid2.readyState > 3)) {
    vid.play();
    vid2.play();

    function trackLocation(e) {
      // Normalize to [0, 1]
      bcr = videoMerge.getBoundingClientRect();
      position = ((e.pageX - bcr.x) / bcr.width);
      positionY = ((e.pageY - (bcr.top + window.scrollY)) / bcr.height);

      if (position > 1) {
        position = position - 1;
      }
      // console.log("pos1: " + position)
    }
    function trackLocationTouch(e) {
      // Normalize to [0, 1]
      bcr = videoMerge.getBoundingClientRect();
      position = ((e.touches[0].pageX - bcr.x) / bcr.width);
      positionY = ((e.touches[0].pageY - (bcr.top + window.scrollY)) / bcr.height);

      if (position > 1) {
        position = position - 1;
      }
    }

    videoMerge.addEventListener("mousemove", trackLocation, false);
    videoMerge.addEventListener("touchstart", trackLocationTouch, false);
    videoMerge.addEventListener("touchmove", trackLocationTouch, false);

    videoMerge2.addEventListener("mousemove", trackLocation, false);
    videoMerge2.addEventListener("touchstart", trackLocationTouch, false);
    videoMerge2.addEventListener("touchmove", trackLocationTouch, false);


    function drawLoop() {
      // Assuming both videos have the same dimensions and you want them fully visible.
      // Clear the canvas for fresh drawing.
      mergeContext.clearRect(0, 0, videoMerge.width, videoMerge.height);
      mergeContext2.clearRect(0, 0, videoMerge2.width, videoMerge2.height);
      
      // Draw videos side by side or overlaid fully. Adjust based on exact need.
      // For side-by-side with both fully visible, you'd adjust the canvas width to be the sum of both video widths.
      // This example assumes an overlay where both videos are drawn on top of each other.
      mergeContext.drawImage(vid, 0, 0, vidWidth, vidHeight);
      mergeContext2.drawImage(vid2, 0, 0, vidWidth, vidHeight);
    }
      // Continue with animation loop
      requestAnimationFrame(drawLoop);
    }
}

Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};


function resizeAndPlayDual(element, id2) {
  var cv = document.getElementById(element.id + "Merge");
  cv.width = element.videoWidth / 2;
  cv.height = element.videoHeight;

  console.log("video height:" + element.videoHeight);
  console.log("video width:" + element.videoWidth);

  element.play();
  element.style.height = "0px";  // Hide video without stopping it

  element2 = document.getElementById(id2);
  var cv2 = document.getElementById(element2.id + "Merge");
  cv2.width = element2.videoWidth / 2;
  cv2.height = element2.videoHeight;

  console.log("video height:" + element2.videoHeight);
  console.log("video width:" + element2.videoWidth);

  element2.play();
  element2.style.height = "0px";  // Hide video without stopping it

  playVidsDual(element.id, element2.id);
}


function resizeAndPlayDualWhenReady(element, id2) {
  var element2 = document.getElementById(id2);
  var cnt = 0;
  setTimeout(function playIfReady() {
    if ((element2.readyState != 4) || (element.readyState != 4)) {
      console.log("second video is not ready yet, cnt=" + cnt);
      cnt++;
      // Bail out if it retries for more than 10 seconds.
      if (cnt < 1000) {
        setTimeout(playIfReady, 10);
      }
    }
    resizeAndPlayDual(element, id2);
  }, 10);
}



function drawOverlay(mergeContext, vidWidth, vidHeight, position, positionY, arrowLength, arrowheadWidth, arrowheadLength, arrowPosY, arrowWidth, currX) {
  // Draw circle
  mergeContext.arc(currX, arrowPosY, arrowLength * 0.7, 0, Math.PI * 2, false);
  mergeContext.fillStyle = "#FFD79340";
  mergeContext.fill();
  //mergeContext.strokeStyle = "#444444";
  //mergeContext.stroke()

  // Draw border
  mergeContext.beginPath();
  mergeContext.moveTo(vidWidth * position, 0);
  mergeContext.lineTo(vidWidth * position, vidHeight);
  mergeContext.closePath();
  mergeContext.strokeStyle = "#444444";
  mergeContext.lineWidth = 5;
  mergeContext.stroke();

  // Draw arrow
  mergeContext.beginPath();
  mergeContext.moveTo(currX, arrowPosY - arrowWidth / 2);

  // Move right until meeting arrow head
  mergeContext.lineTo(currX + arrowLength / 2 - arrowheadLength / 2, arrowPosY - arrowWidth / 2);

  // Draw right arrow head
  mergeContext.lineTo(currX + arrowLength / 2 - arrowheadLength / 2, arrowPosY - arrowheadWidth / 2);
  mergeContext.lineTo(currX + arrowLength / 2, arrowPosY);
  mergeContext.lineTo(currX + arrowLength / 2 - arrowheadLength / 2, arrowPosY + arrowheadWidth / 2);
  mergeContext.lineTo(currX + arrowLength / 2 - arrowheadLength / 2, arrowPosY + arrowWidth / 2);

  // Go back to the left until meeting left arrow head
  mergeContext.lineTo(currX - arrowLength / 2 + arrowheadLength / 2, arrowPosY + arrowWidth / 2);

  // Draw left arrow head
  mergeContext.lineTo(currX - arrowLength / 2 + arrowheadLength / 2, arrowPosY + arrowheadWidth / 2);
  mergeContext.lineTo(currX - arrowLength / 2, arrowPosY);
  mergeContext.lineTo(currX - arrowLength / 2 + arrowheadLength / 2, arrowPosY - arrowheadWidth / 2);
  mergeContext.lineTo(currX - arrowLength / 2 + arrowheadLength / 2, arrowPosY);

  mergeContext.lineTo(currX - arrowLength / 2 + arrowheadLength / 2, arrowPosY - arrowWidth / 2);
  mergeContext.lineTo(currX, arrowPosY - arrowWidth / 2);

  mergeContext.closePath();

  mergeContext.fillStyle = "#444444";
  mergeContext.fill();
}