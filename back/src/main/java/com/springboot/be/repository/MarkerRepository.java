package com.springboot.be.repository;

import com.springboot.be.entity.Marker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MarkerRepository extends JpaRepository<Marker, Long> {

    List<Marker> findByGlobalPlace_PlaceNameContaining(String keyword);

    @Query(value = """
            SELECT m.* FROM marker m
            JOIN global_place gp ON m.global_place_id = gp.id
            WHERE ST_DistanceSphere(
                ST_MakePoint(gp.longitude, gp.latitude),
                ST_MakePoint(:lng, :lat)
            ) < :radius
            """, nativeQuery = true)
    List<Marker> findWithinRadius(@Param("lat") double lat, @Param("lng") double lng, @Param("radius") double radius);

    @Query("SELECT m FROM Marker m ORDER BY m.postCount DESC")
    List<Marker> findPopularMarkers();

    @Query("""
            SELECT DISTINCT m
            FROM Marker m
            JOIN TravelPathPoint tpp ON tpp.marker.id = m.id
            WHERE tpp.travelPath.id = :travelPathId
            ORDER BY tpp.sequence ASC
            """)
    List<Marker> findMarkerWithTravelPaths(@Param("travelPathId") Long travelPathId);

}
