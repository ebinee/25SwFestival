package com.springboot.be.dto.response;

import com.springboot.be.entity.TravelPath;

import java.util.List;

public record TravelPathResponse(
        Long pathId,
        String pathName,
        List<Coordinate> coordinates) {
    public record Coordinate(double lat, double lng) {
    }

    public static TravelPathResponse from(TravelPath path) {
        return new TravelPathResponse(
                path.getId(),
                path.getPathName(),
                path.getPoints().stream().map(p -> new Coordinate(p.getLatitude(), p.getLongitude())).toList()
        );
    }
}
