package bscthesis.rest;

import bscthesis.dto.AlbumDTO;
import bscthesis.models.AlbumModel;
import bscthesis.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/albums")
public class AlbumController {
    @Autowired
    private AlbumService albumService;

    @GetMapping("")
    public List<AlbumModel> listAlbums() {
        return albumService.listAll();
    }

    @GetMapping("/my/{id}")
    public List<AlbumModel> listMyAlbums(@PathVariable Long id) {
        return albumService.listMyAlbums(id);
    }

    @GetMapping("/{id}")
    public AlbumModel getAlbum(@PathVariable Long id) {
        return albumService.fetch(id);
    }

    @PostMapping("/create")
    @Secured("ROLE_ARTIST")
    public ResponseEntity<AlbumModel> createAlbum(@RequestBody AlbumDTO albumDTO, @AuthenticationPrincipal User user) {
        AlbumModel album = albumService.createAlbum(albumDTO, user);
        return ResponseEntity.created(URI.create("/albums" + album.getAlbumId())).body(album);
    }

    @PutMapping("/{id}")
    @Secured("ROLE_ARTIST")
    public AlbumModel updateAlbum(@PathVariable Long id, @RequestBody AlbumDTO albumDTO, @AuthenticationPrincipal User user) {
        return albumService.updateAlbum(albumDTO, user);
    }

    @DeleteMapping("/{id}")
    @Secured("ROLE_ARTIST")
    public AlbumModel deleteAlbum(@PathVariable Long id, @AuthenticationPrincipal User user) {
        return albumService.deleteAlbum(id, user);
    }
}
