package bscthesis.dao;

import bscthesis.models.CityModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<CityModel, Long> {
    Optional<CityModel> findById(Long id);
}
