package bscthesis.rest;

import bscthesis.dto.SongDTO;
import bscthesis.models.SongModel;
import bscthesis.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/songs")
public class SongController {
    @Autowired
    private SongService songService;

    @GetMapping("")
    public List<SongModel> listSongs() {
        return songService.listAll();
    }

    @GetMapping("/{id}")
    public SongModel getSong(@PathVariable Long id) {
        return songService.fetch(id);
    }

    @GetMapping("/my/{id}")
    public List<SongModel> listMySongs(@PathVariable Long id) {
        return songService.listMySongs(id);
    }

    @GetMapping("/onAlbum/{id}")
    public List<SongModel> listSongsOnAlbum(@PathVariable Long id) {
        return songService.listSongsOnAlbum(id);
    }

    @GetMapping("/byGenre/{id}")
    public List<SongModel> listSongsByGenre(@PathVariable Long id) {
        return songService.listSongsByGenre(id);
    }

    @PostMapping("/create")
    @Secured("ROLE_ARTIST")
    public ResponseEntity<SongModel> createSong(@RequestBody SongDTO songDTO) {
        SongModel s = songService.createSong(songDTO);
        return ResponseEntity.created(URI.create("/songs/" + s.getId())).body(s);
    }

    @PutMapping("/{id}")
    @Secured("ROLE_ARTIST")
    public SongModel updateSong(@PathVariable Long id, @RequestBody SongDTO songDTO, @AuthenticationPrincipal User user) {
        return songService.updateSong(songDTO, user);
    }

    @DeleteMapping("/{id}")
    @Secured("ROLE_ARTIST")
    public SongModel deleteSong(@PathVariable Long id) {
        return songService.deleteSong(id);
    }
}
