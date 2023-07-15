package com.joelfrost.commongamesbackend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.joelfrost.commongamesbackend.model.Game;
import com.joelfrost.commongamesbackend.model.GamesList;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SteamGamesService {
    private static final String BASE_URL = "https://steamcommunity.com/id/%s/games/?xml=1";
    public List<String> getCommonGames(List<String> usernames) {
        List<Game> commonGames = usernames.stream()
                .map(username -> getGamesForUser(username).getGames())
                .reduce((games1, games2) ->
                        games1.stream()
                                .filter(game1 -> games2.stream()
                                .anyMatch(game2 -> game2.getAppID() == game1.getAppID()))
                                .collect(Collectors.toList()))
                .orElse(Collections.emptyList());

        return commonGames.stream()
                .map(Game::getName)
                .collect(Collectors.toList());
    }

    private GamesList getGamesForUser(String username) {
        System.out.println(username);
        RestTemplate restTemplate = new RestTemplate();
        String url = String.format(BASE_URL, username);
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
        String responseBody = response.getBody();
        XmlMapper xmlMapper = new XmlMapper();
        try {
            return xmlMapper.readValue(responseBody, GamesList.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}