package com.gucardev.springbootwebrtcpeer2peer;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebSocketConfig {

  @Value("${socket.host}")
  private String host;

  @Value("${socket.port}")
  private int port;

  @Bean
  public SocketIOServer socketIOServer() throws Exception {
    com.corundumstudio.socketio.Configuration config =
            new com.corundumstudio.socketio.Configuration();
    config.setHostname(host);
    config.setPort(port);

    // Créer l'instance de SocketIOServer
    SocketIOServer server = new SocketIOServer(config);

    // Enregistrer les listeners de connexion et de déconnexion
    server.addConnectListener(onConnected());
    server.addDisconnectListener(onDisconnected());

    // Démarrer le serveur
    server.start();
    return server;
  }

  private ConnectListener onConnected() {
    return client -> {
      // Récupérer l'identifiant de session du client
      String sessionId = client.getSessionId().toString();

      // Envoyer l'identifiant de session au client
      client.sendEvent("setCurrentUser", sessionId);

      System.out.println("Client connecté : " + sessionId);
    };
  }

  private DisconnectListener onDisconnected() {
    return client -> {
      String sessionId = client.getSessionId().toString();
      System.out.println("Client déconnecté : " + sessionId);
    };
  }
}