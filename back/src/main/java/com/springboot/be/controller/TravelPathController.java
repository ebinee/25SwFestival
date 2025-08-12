package com.springboot.be.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/map/routes")
@RequiredArgsConstructor
public class TravelPathController {
    /*

    private final TravelPathService travelPathService;

    @GetMapping
    public ApiResponse<List<TravelPathDto>> getAllRoutes() {
        List<TravelPathDto> routes = travelPathService.getAllTravelPaths();
        return ApiResponse.success("전체 여행 경로 조회 성공", routes);
    }

    @GetMapping(params = "region")
    public ApiResponse<List<TravelPathDto>> getRecommendedRoutes(@RequestParam String region) {
        List<TravelPathDto> routes = travelPathService.getRecommendedRoutes(region);
        return ApiResponse.success("추천 여행 경로 조회 성공", routes);
    }

    @GetMapping("/{routeId}/markers")
    public ApiResponse<List<MarkerSummaryDto>> getMarkersByRoute(@PathVariable Long routeId) {
        List<MarkerSummaryDto> markers = travelPathService.getMarkersByRoute(routeId);
        return ApiResponse.success("특정 여행 경로 마커 조회 성공", markers);
    }

     */
}
