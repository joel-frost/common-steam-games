package com.joelfrost.commongamesbackend.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlCData;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.Data;

import java.util.List;

@JsonRootName("gamesList")
@Data
public class GamesList {
    @JacksonXmlProperty(localName = "steamID64")
    private String steamID64;

    @JacksonXmlProperty(localName = "steamID")
    @JacksonXmlCData
    private String steamID;

    @JacksonXmlProperty(localName = "games")
    private List<Game> games;
}
