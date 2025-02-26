/*const LOCAL_IP_ADDRESS = "192.168.1.136"; // change it

const getElement = id => document.getElementById(id);
const [btnConnect, btnToggleVideo, btnToggleAudio, divRoomConfig, roomDiv, roomNameInput, localVideo, remoteVideo] = ["btnConnect",
  "toggleVideo", "toggleAudio", "roomConfig", "roomDiv", "roomName",
  "localVideo", "remoteVideo"].map(getElement);
let remoteDescriptionPromise, roomName, localStream, remoteStream,
    rtcPeerConnection, isCaller;

// you can use public stun and turn servers,
// but we don't need for local development
/*const iceServers = {
  iceServers: [
    {urls: `stun:${LOCAL_IP_ADDRESS}:3478`},
    {
      urls: `turn:${LOCAL_IP_ADDRESS}:3478`,
      username: "username",
      credential: "password"
    }
  ]
};*/
/*const iceServers = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" }, // Serveur STUN de Google
    {
      urls: "turn:turn.anyfirewall.com:443?transport=tcp", // Serveur TURN public
      username: "webrtc",
      credential: "webrtc",
    }
  ],
};

const streamConstraints = {audio: true, video: true};

let socket = io.connect(`https://${LOCAL_IP_ADDRESS}`, {secure: true});
// let socket = io.connect("http://192.168.0.3:8000");

btnToggleVideo.addEventListener("click", () => toggleTrack("video"));
btnToggleAudio.addEventListener("click", () => toggleTrack("audio"));

function toggleTrack(trackType) {
  if (!localStream) {
    return;
  }

  const track = trackType === "video" ? localStream.getVideoTracks()[0]
      : localStream.getAudioTracks()[0];
  const enabled = !track.enabled;
  track.enabled = enabled;

  const toggleButton = getElement(
      `toggle${trackType.charAt(0).toUpperCase() + trackType.slice(1)}`);
  const icon = getElement(`${trackType}Icon`);
  toggleButton.classList.toggle("disabled-style", !enabled);
  toggleButton.classList.toggle("enabled-style", enabled);
  icon.classList.toggle("bi-camera-video-fill",
      trackType === "video" && enabled);
  icon.classList.toggle("bi-camera-video-off-fill",
      trackType === "video" && !enabled);
  icon.classList.toggle("bi-mic-fill", trackType === "audio" && enabled);
  icon.classList.toggle("bi-mic-mute-fill", trackType === "audio" && !enabled);
}

btnConnect.onclick = () => {
  if (roomNameInput.value === "") {
    alert("Room can not be null!");
  } else {
    roomName = roomNameInput.value;
    socket.emit("joinRoom", roomName);
    divRoomConfig.classList.add("d-none");
    roomDiv.classList.remove("d-none");
  }
};

const handleSocketEvent = (eventName, callback) => socket.on(eventName,
    callback);

handleSocketEvent("created", e => {
  navigator.mediaDevices.getUserMedia(streamConstraints).then(stream => {
    localStream = stream;
    localVideo.srcObject = stream;
    isCaller = true;
  }).catch(console.error);
});

handleSocketEvent("joined", e => {
  navigator.mediaDevices.getUserMedia(streamConstraints).then(stream => {
    localStream = stream;
    localVideo.srcObject = stream;
    socket.emit("ready", roomName);
  }).catch(console.error);
});

handleSocketEvent("candidate", e => {
  if (rtcPeerConnection) {
    const candidate = new RTCIceCandidate({
      sdpMLineIndex: e.label, candidate: e.candidate,
    });

    rtcPeerConnection.onicecandidateerror = (error) => {
      console.error("Error adding ICE candidate: ", error);
    };

    if (remoteDescriptionPromise) {
      remoteDescriptionPromise
      .then(() => {
        if (candidate != null) {
          return rtcPeerConnection.addIceCandidate(candidate);
        }
      })
      .catch(error => console.log(
          "Error adding ICE candidate after remote description: ", error));
    }
  }
});

handleSocketEvent("ready", e => {
  if (isCaller) {
    rtcPeerConnection = new RTCPeerConnection(iceServers);
    rtcPeerConnection.onicecandidate = onIceCandidate;
    rtcPeerConnection.ontrack = onAddStream;
    rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream);
    rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream);
    rtcPeerConnection
    .createOffer()
    .then(sessionDescription => {
      rtcPeerConnection.setLocalDescription(sessionDescription);
      socket.emit("offer", {
        type: "offer", sdp: sessionDescription, room: roomName,
      });
    })
    .catch(error => console.log(error));
  }
});

handleSocketEvent("offer", e => {
  if (!isCaller) {
    rtcPeerConnection = new RTCPeerConnection(iceServers);
    rtcPeerConnection.onicecandidate = onIceCandidate;
    rtcPeerConnection.ontrack = onAddStream;
    rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream);
    rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream);

    if (rtcPeerConnection.signalingState === "stable") {
      remoteDescriptionPromise = rtcPeerConnection.setRemoteDescription(
          new RTCSessionDescription(e));
      remoteDescriptionPromise
      .then(() => {
        return rtcPeerConnection.createAnswer();
      })
      .then(sessionDescription => {
        rtcPeerConnection.setLocalDescription(sessionDescription);
        socket.emit("answer", {
          type: "answer", sdp: sessionDescription, room: roomName,
        });
      })
      .catch(error => console.log(error));
    }
  }
});

handleSocketEvent("answer", e => {
  if (isCaller && rtcPeerConnection.signalingState === "have-local-offer") {
    remoteDescriptionPromise = rtcPeerConnection.setRemoteDescription(
        new RTCSessionDescription(e));
    remoteDescriptionPromise.catch(error => console.log(error));
  }
});

handleSocketEvent("userDisconnected", (e) => {
  remoteVideo.srcObject = null;
  isCaller = true;
});

handleSocketEvent("setCaller", callerId => {
  isCaller = socket.id === callerId;
});

handleSocketEvent("full", e => {
  alert("room is full!");
  window.location.reload();
});

const onIceCandidate = e => {
  if (e.candidate) {
    console.log("sending ice candidate");
    socket.emit("candidate", {
      type: "candidate",
      label: e.candidate.sdpMLineIndex,
      id: e.candidate.sdpMid,
      candidate: e.candidate.candidate,
      room: roomName,
    });
  }
}

const onAddStream = e => {
  remoteVideo.srcObject = e.streams[0];
  remoteStream = e.stream;
}*/




const LOCAL_IP_ADDRESS = "192.168.1.136"; // À changer selon l'environnement

const getElement = id => document.getElementById(id);
const [
  btnConnect, btnCallAudio, btnCallVideo, btnToggleVideo, btnToggleAudio,
  divRoomConfig, roomDiv, roomNameInput, localVideo, remoteVideo
] = [
  "btnConnect", "btnCallAudio", "btnCallVideo", "toggleVideo", "toggleAudio",
  "roomConfig", "roomDiv", "roomName", "localVideo", "remoteVideo"
].map(getElement);

let roomName, localStream, remoteStream, rtcPeerConnection, isCaller;
const iceServers = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "turn:turn.anyfirewall.com:443?transport=tcp", username: "webrtc", credential: "webrtc" }
  ]
};

let socket = io.connect(`https://${LOCAL_IP_ADDRESS}`, { secure: true });

// Boutons de connexion et d'appel
btnConnect.onclick = () => {
  if (roomNameInput.value.trim() === "") {
    alert("Le nom de la salle ne peut pas être vide !");
    return;
  }
  roomName = roomNameInput.value.trim();
  divRoomConfig.classList.add("d-none");
  roomDiv.classList.remove("d-none");
  socket.emit("joinRoom", roomName);
};

btnCallAudio.onclick = () => startCall({ audio: true, video: false });
btnCallVideo.onclick = () => startCall({ audio: true, video: true });

const startCall = async (constraints) => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia(constraints);
    localVideo.srcObject = localStream;
    socket.emit("ready", roomName);
  } catch (error) {
    console.error("Erreur d'accès aux médias :", error);
    alert("Impossible d'accéder au microphone/caméra.");
  }
};

// Gestion des événements WebSocket
const handleSocketEvent = (event, callback) => socket.on(event, callback);

handleSocketEvent("created", () => { isCaller = true; });
handleSocketEvent("joined", () => { isCaller = false; });

handleSocketEvent("ready", () => {
  if (isCaller) initiateOffer();
});

handleSocketEvent("offer", (offer) => {
  if (!isCaller) acceptOffer(offer);
});

handleSocketEvent("answer", (answer) => {
  rtcPeerConnection?.setRemoteDescription(new RTCSessionDescription(answer))
      .catch(console.error);
});

handleSocketEvent("candidate", ({ candidate }) => {
  if (rtcPeerConnection) {
    rtcPeerConnection.addIceCandidate(new RTCIceCandidate(candidate))
        .catch(console.error);
  }
});

handleSocketEvent("userDisconnected", () => {
  remoteVideo.srcObject = null;
  isCaller = true;
  rtcPeerConnection?.close();
  rtcPeerConnection = null;
});

// Fonction pour établir la connexion WebRTC
const initiateOffer = () => {
  rtcPeerConnection = new RTCPeerConnection(iceServers);
  rtcPeerConnection.onicecandidate = sendIceCandidate;
  rtcPeerConnection.ontrack = onAddStream;

  localStream.getTracks().forEach(track => {
    rtcPeerConnection.addTrack(track, localStream);
  });

  rtcPeerConnection.createOffer()
      .then(offer => {
        rtcPeerConnection.setLocalDescription(offer);
        socket.emit("offer", { type: "offer", sdp: offer, room: roomName });
      })
      .catch(console.error);
};

// Fonction pour accepter une offre et répondre
const acceptOffer = (offer) => {
  rtcPeerConnection = new RTCPeerConnection(iceServers);
  rtcPeerConnection.onicecandidate = sendIceCandidate;
  rtcPeerConnection.ontrack = onAddStream;

  localStream.getTracks().forEach(track => {
    rtcPeerConnection.addTrack(track, localStream);
  });

  rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(offer))
      .then(() => rtcPeerConnection.createAnswer())
      .then(answer => {
        rtcPeerConnection.setLocalDescription(answer);
        socket.emit("answer", { type: "answer", sdp: answer, room: roomName });
      })
      .catch(console.error);
};

// Gestion des ICE Candidates
const sendIceCandidate = (event) => {
  if (event.candidate) {
    socket.emit("candidate", { candidate: event.candidate, room: roomName });
  }
};

// Ajout du flux vidéo distant
const onAddStream = (event) => {
  remoteVideo.srcObject = event.streams[0];

};


//Fonction pour une deconnexion
const btnDisconnect = document.getElementById("btnDisconnect");

btnDisconnect.addEventListener("click", () => {
  if (roomName) {
    socket.emit("leaveRoom", roomName); // Quitte la salle
  }
  socket.disconnect(); // Déconnecte du serveur
  window.location.reload(); // Recharge la page pour revenir à l'état initial
  btnDisconnect.style.display = 'none';// Cache le bouton après déconnexion
});

document.addEventListener("DOMContentLoaded", function () {
  const btnCallVideo = document.getElementById("btnCallVideo");
  const btnCallAudio = document.getElementById("btnCallAudio");
  const remoteVideoContainer = document.getElementById("remoteVideoContainer");

  // Masquer la vidéo au début
  remoteVideoContainer.style.display = "none";

  btnCallVideo.addEventListener("click", function () {
    remoteVideoContainer.style.display = "flex"; // Affiche la vidéo
  });

  btnCallAudio.addEventListener("click", function () {
    remoteVideoContainer.style.display = "none"; // Cache la vidéo
  });
});


//messagerie IRC _____________________________________________________________________________________________________________________________

//const socket = io();

// Envoyer un message via WebRTC et IRC
document.getElementById("sendChatButton").addEventListener("click", function () {
  const message = document.getElementById("chatInput").value.trim();
  if (message !== "") {
    socket.emit("sendChatMessage", { message });
    addMessage("You", message, true);
    document.getElementById("chatInput").value = "";
  }
});

// Recevoir un message de WebRTC ou de l'IRC
socket.on("receiveChatMessage", (data) => {
  const { sender, message } = data;
  addMessage(sender, message, false);
});

// Ajouter un message dans l'interface du chat
/*function addMessage(sender, message, isSender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  if (isSender) {
    messageElement.classList.add("sender");
  } else if (sender.includes("IRC")) {
    messageElement.classList.add("irc-message"); // Ajout d'un style spécifique aux messages IRC
  }

  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  document.getElementById("chatMessages").appendChild(messageElement);

  // Faire défiler automatiquement le chat vers le bas
  document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight;
}*/


// Ajouter un message dans l'interface du chat
function addMessage(sender, message, isSender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  // Ajouter une classe 'sender' si le message est envoyé par l'utilisateur, sinon 'receiver'
  if (isSender) {
    messageElement.classList.add("sender");
  } else {
    messageElement.classList.add("receiver");
  }

  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  document.getElementById("chatMessages").appendChild(messageElement);

  // Faire défiler automatiquement le chat vers le bas
  document.getElementById("chatMessages").scrollTop = document.getElementById("chatMessages").scrollHeight;
}



