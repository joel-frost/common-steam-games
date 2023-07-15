package com.joelfrost.commongamesbackend.model;

import lombok.Data;

import java.util.List;

@Data
public class RequestModel {
    private List<String> usernames;
}
