package com.springboot.be.service;

import com.springboot.be.dto.response.MarkerSummaryDto;
import com.springboot.be.dto.response.TravelPathDto;
import com.springboot.be.dto.response.TravelPathWithMarkersDto;
import com.springboot.be.repository.TravelPathPointRepository;
import com.springboot.be.repository.TravelPathRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TravelPathService {
    private final TravelPathRepository travelPathRepository;
    private final TravelPathPointRepository travelPathPointRepository;

    public List<TravelPathDto> getAllTravelPaths() {
        return travelPathRepository.findAll()
                .stream()
                .map(TravelPathDto::from)
                .toList();
    }

    public List<TravelPathDto> getRecommendedRoutes(String region) {
        return travelPathRepository.findRecommendedByRegion(region)
                .stream()
                .map(TravelPathDto::from)
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
}
