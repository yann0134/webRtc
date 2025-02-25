package com.gucardev.springbootwebrtcpeer2peer;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "irc")
public class IrcConfig {
    private String server;
    private String nickname;
    private String channel;
}
