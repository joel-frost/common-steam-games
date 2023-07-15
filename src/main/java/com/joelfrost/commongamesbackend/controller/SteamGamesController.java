package com.joelfrost.commongamesbackend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.joelfrost.commongamesbackend.model.GamesList;
import com.joelfrost.commongamesbackend.model.RequestModel;
import com.joelfrost.commongamesbackend.service.SteamGamesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games/")
public class SteamGamesController {
    @Autowired
    private SteamGamesService steamGamesService;

    @CrossOrigin
    @PostMapping()
    public List<String> getCommonSteamGames(@RequestBody RequestModel requestModel) throws JsonProcessingException {
        return steamGamesService.getCommonGames(requestModel.getUsernames());
    }
}
