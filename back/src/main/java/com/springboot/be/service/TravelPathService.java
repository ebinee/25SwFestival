package com.springboot.be.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TravelPathService {
    /*

    private final TravelPathRepository travelPathRepository;
    private final TravelPathPointRepository travelPathPointRepository;

    public List<TravelPathResponse> getAllTravelPaths() {
        return travelPathRepository.findAll()
                .stream()
                .map(TravelPathResponse::from)
                .toList();
    }

    public List<TravelPathResponse> getRecommendedRoutes(String region) {
        return travelPathRepository.findRecommendedByRegion(region)
                .stream()
                .map(TravelPathResponse::from)
                .toList();
    }

    public List<MarkerSummaryDto> getMarkersByRoute(Long routeId) {
        return travelPathPointRepository.findMarkerByTravelPath(routeId);
    }

    public List<TravelPathWithMarkersDto> getAllTravelPathsWithMarkers() {
        return travelPathRepository.findAll().stream()
                .map(path -> new TravelPathWithMarkersDto(
                        path.getId(),
                        path.getPathName(),
                        travelPathPointRepository.findMarkerByTravelPath(path.getId())
                ))
                .toList();
    }
    */
}
