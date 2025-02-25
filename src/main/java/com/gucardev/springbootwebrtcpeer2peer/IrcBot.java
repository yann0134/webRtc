package com.gucardev.springbootwebrtcpeer2peer;

import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.pircbotx.Configuration;
import org.pircbotx.PircBotX;
import org.pircbotx.hooks.ListenerAdapter;
import org.pircbotx.hooks.events.MessageEvent;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Map;

@Component
public class IrcBot extends ListenerAdapter {

    private final SocketIOServer socketIOServer; // Injection de Socket.IO
    private final IrcConfig ircConfig; // Configuration IRC
    private PircBotX bot;

    @Autowired
    public IrcBot(SocketIOServer socketIOServer, IrcConfig ircConfig) {
        this.socketIOServer = socketIOServer;
        this.ircConfig = ircConfig;
    }

    @PostConstruct
    private void startBot() {
        Configuration configuration = new Configuration.Builder()
                .setName(ircConfig.getNickname())
                .setServerHostname(ircConfig.getServer())
                .addAutoJoinChannel(ircConfig.getChannel())
                .addListener(this)
                .buildConfiguration();

        bot = new PircBotX(configuration);
        try {
            bot.startBot();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onMessage(MessageEvent event) {
        String message = event.getMessage();
        String sender = event.getUser().getNick();
        System.out.println(sender + ": " + message);

        // Envoyer le message au chat WebRTC via WebSocket
        socketIOServer.getBroadcastOperations().sendEvent("receiveChatMessage", Map.of(
                "sender", sender,
                "message", message
        ));
    }

    public void sendMessage(String message) {
        bot.sendIRC().message(ircConfig.getChannel(), message);
    }
}
