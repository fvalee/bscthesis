package bscthesis.rest;

import bscthesis.dto.CountryDTO;
import bscthesis.models.CountryModel;
import bscthesis.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/countries")
public class CountryController {
    @Autowired
    private CountryService countryService;

    @GetMapping("")
    public List<CountryModel> listCountries() {
        return countryService.listAll();
    }

    @GetMapping("/{id}")
    public CountryModel getCountry(@PathVariable Long id) {
        return countryService.fetch(id);
    }

    @PostMapping("/create")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<CountryModel> createCountry(@RequestBody CountryDTO countryDTO) {
        CountryModel c = countryService.createCountry(countryDTO);
        return ResponseEntity.created(URI.create("/countries/" + c.getId())).body(c);
    }

    @PutMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public CountryModel updateCountry(@PathVariable Long id, @RequestBody CountryDTO countryDTO) {
        return countryService.updateCountry(countryDTO);
    }

    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public CountryModel deleteCountry(@PathVariable Long id) {
        return countryService.deleteCountry(id);
    }
}
