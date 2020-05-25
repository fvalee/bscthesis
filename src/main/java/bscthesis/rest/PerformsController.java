package bscthesis.rest;

import bscthesis.dto.PerformsDTO;
import bscthesis.models.PerformsModel;
import bscthesis.models.SongModel;
import bscthesis.models.UserModel;
import bscthesis.service.PerformsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/performs")
public class PerformsController {
    @Autowired
    private PerformsService performsService;

    @GetMapping("/song/{id}")
    public List<UserModel> findArtistBySongId(@PathVariable Long id) {
        return performsService.findArtistBySongId(id);
    }

    @GetMapping("/artist/{id}")
    public List<PerformsModel> findSongsByArtistId(@PathVariable Long id) {
        return performsService.findSongsByArtistId(id);
    }

    @PostMapping("/song/{id}/{aid}")
    @Secured("ROLE_ARTIST")
    public PerformsModel addPerformanceToSong(@PathVariable Long id, @PathVariable Long aid, @RequestBody PerformsDTO performsDTO) {
        return performsService.addPerformance(performsDTO);
    }

    @DeleteMapping("/song/{sID}/{aID}")
    public PerformsModel deletePerformance(@PathVariable Long sID, @PathVariable Long aID) {
        return performsService.deletePerformanceBySongAndArtist(sID, aID);
    }

    @DeleteMapping("/song/{id}")
    public void deletePerformancesOfSong(@PathVariable Long id) {
        performsService.deletePerformancesBySong(id);
    }
}
