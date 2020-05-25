package bscthesis.service;

import bscthesis.dto.CountryDTO;
import bscthesis.models.CountryModel;

import java.util.List;
import java.util.Optional;

public interface CountryService {
    List<CountryModel> listAll();
    CountryModel createCountry(CountryDTO countryDTO);
    CountryModel updateCountry(CountryDTO countryDTO);
    CountryModel deleteCountry(Long id);
    Optional<CountryModel> findById(Long id);
    CountryModel fetch(Long id);
}
