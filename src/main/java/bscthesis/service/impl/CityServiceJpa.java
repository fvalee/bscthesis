package bscthesis.service.impl;

import bscthesis.dao.CityRepository;
import bscthesis.dao.CountryRepository;
import bscthesis.dto.CityDTO;
import bscthesis.models.CityModel;
import bscthesis.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class CityServiceJpa implements CityService {
    @Autowired
    private CityRepository cityRepo;

    @Autowired
    private CountryRepository countryRepo;

    @Override
    public List<CityModel> listAll() {
        return cityRepo.findAll();
    }

    @Override
    public CityModel createCity(CityDTO cityDTO) {
        CityModel c = new CityModel();

        if(cityDTO.getCityName().isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        c.setCityName(cityDTO.getCityName());
        c.setPostcode(cityDTO.getPostcode());
        c.setCountry(countryRepo.findById(cityDTO.getCountry().getId()).get());

        return cityRepo.save(c);
    }

    @Override
    public CityModel updateCity(CityDTO cityDTO) {
        CityModel c = fetch(cityDTO.getId());

        if(cityDTO.getCityName().isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        c.setCityName(cityDTO.getCityName());
        c.setPostcode(cityDTO.getPostcode());
        c.setCountry(countryRepo.findById(cityDTO.getCountry().getId()).get());

        return cityRepo.save(c);
    }

    @Override
    public CityModel deleteCity(Long id) {
        CityModel c = fetch(id);
        cityRepo.delete(c);
        return c;
    }

    @Override
    public Optional<CityModel> findById(Long id) {
        return cityRepo.findById(id);
    }

    @Override
    public CityModel fetch(Long id) {
        return findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
