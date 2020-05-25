package bscthesis.service.impl;

import bscthesis.dao.CountryRepository;
import bscthesis.dto.CountryDTO;
import bscthesis.models.CountryModel;
import bscthesis.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class CountryServiceJpa implements CountryService {
    @Autowired
    private CountryRepository countryRepo;

    @Override
    public List<CountryModel> listAll() {
        return countryRepo.findAll();
    }

    @Override
    public CountryModel createCountry(CountryDTO countryDTO) {
        CountryModel c = new CountryModel();

        if(countryRepo.existsByCountryName(countryDTO.getCountryName()))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        if(countryDTO.getCountryName().isEmpty())
            throw new ResponseStatusException((HttpStatus.BAD_REQUEST));

        c.setCountryName(countryDTO.getCountryName());
        return countryRepo.save(c);
    }

    @Override
    public CountryModel updateCountry(CountryDTO countryDTO) {
        CountryModel c = fetch(countryDTO.getId());

        if(countryRepo.existsByCountryName(countryDTO.getCountryName()))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        if(countryDTO.getCountryName().isEmpty())
            throw new ResponseStatusException((HttpStatus.BAD_REQUEST));

        c.setCountryName(countryDTO.getCountryName());
        return countryRepo.save(c);
    }

    @Override
    public CountryModel deleteCountry(Long id) {
        CountryModel c = fetch(id);
        countryRepo.delete(c);
        return c;
    }

    @Override
    public Optional<CountryModel> findById(Long id) {
        return countryRepo.findById(id);
    }

    @Override
    public CountryModel fetch(Long id) {
        return findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
