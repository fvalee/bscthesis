package bscthesis.service;

import bscthesis.dto.CityDTO;
import bscthesis.models.CityModel;

import java.util.List;
import java.util.Optional;

public interface CityService {
    List<CityModel> listAll();
    CityModel createCity(CityDTO cityDTO);
    CityModel updateCity(CityDTO cityDTO);
    CityModel deleteCity(Long id);
    Optional<CityModel> findById(Long id);
    CityModel fetch(Long id);
}
