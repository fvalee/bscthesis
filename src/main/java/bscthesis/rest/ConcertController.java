package bscthesis.rest;

import bscthesis.dto.ConcertDTO;
import bscthesis.models.ConcertModel;
import bscthesis.service.ConcertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/concerts")
public class ConcertController {
    @Autowired
    private ConcertService concertService;

    @GetMapping("")
    public List<ConcertModel> listAllConcerts() {
        return concertService.listAll();
    }

    @GetMapping("/{id}")
    public List<ConcertModel> listConcertsByArtist(@PathVariable Long id) {
        return concertService.listAllByArtist(id);
    }

    @PostMapping("/{id}/create")
    @Secured("ROLE_ARTIST")
    public ResponseEntity<ConcertModel> createConcert(@RequestBody ConcertDTO concertDTO) {
        ConcertModel c = concertService.createConcert(concertDTO);
        return ResponseEntity.created(URI.create("/concerts/" + c.getId())).body(c);
    }

    @PutMapping("/{id}/update")
    @Secured("ROLE_ARTIST")
    public ConcertModel updateConcert(@PathVariable Long id, @RequestBody ConcertDTO concertDTO, @AuthenticationPrincipal User user) {
        return concertService.updateConcert(concertDTO, user);
    }

    @DeleteMapping("/{id}")
    public ConcertModel deleteConcert(@PathVariable Long id) {
        return concertService.deleteConcert(id);
    }
}
