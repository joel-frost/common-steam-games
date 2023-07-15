package com.joelfrost.commongamesbackend.model;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlCData;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
public class Game {
    @JacksonXmlProperty(localName = "appID")
    private int appID;

    @JacksonXmlProperty(localName = "name")
    @JacksonXmlCData
    private String name;

    @JacksonXmlProperty(localName = "logo")
    @JacksonXmlCData
    private String logo;

    @JacksonXmlProperty(localName = "storeLink")
    @JacksonXmlCData
    private String storeLink;

    @JacksonXmlProperty(localName = "hoursLast2Weeks")
    private String hoursLast2Weeks;

    @JacksonXmlProperty(localName = "hoursOnRecord")
    private String hoursOnRecord;

    @JacksonXmlProperty(localName = "statsLink")
    @JacksonXmlCData
    private String statsLink;

    @JacksonXmlProperty(localName = "globalStatsLink")
    @JacksonXmlCData
    private String globalStatsLink;
}

