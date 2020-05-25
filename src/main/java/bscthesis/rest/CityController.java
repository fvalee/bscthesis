package bscthesis.rest;

import bscthesis.dto.CityDTO;
import bscthesis.models.CityModel;
import bscthesis.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/cities")
public class CityController {
    @Autowired
    private CityService cityService;

    @GetMapping("")
    public List<CityModel> listCities() {
        return cityService.listAll();
    }

    @GetMapping("/{id}")
    public CityModel getCountry(@PathVariable Long id) {
        return cityService.fetch(id);
    }

    @PostMapping("/create")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<CityModel> createCity(@RequestBody CityDTO cityDTO) {
        CityModel c = cityService.createCity(cityDTO);
        return ResponseEntity.created(URI.create("/cities/" + c.getId())).body(c);
    }

    @PutMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public CityModel updateCity(@PathVariable Long id, @RequestBody CityDTO cityDTO) {
        return cityService.updateCity(cityDTO);
    }

    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public CityModel deleteCity(@PathVariable Long id) {
        return cityService.deleteCity(id);
    }
}
