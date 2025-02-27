package com.gucardev.springbootwebrtcpeer2peer;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.listener.DataListener;
import org.springframework.stereotype.Component;
import com.corundumstudio.socketio.SocketIOServer;

@Component
public class FileTransferHandler {

    public FileTransferHandler(SocketIOServer server) {
        server.addEventListener("fileUpload", FileData.class, (client, data, ackSender) -> {
            // Diffuser le fichier à tous les clients sauf l'expéditeur
            server.getBroadcastOperations().sendEvent("fileDownload", data);
        });
    }

    // Classe représentant un fichier
    public static class FileData {
        public String fileName;
        public byte[] fileData;
    }
}
