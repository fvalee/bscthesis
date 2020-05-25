package bscthesis.rest;

import bscthesis.dto.GenreDTO;
import bscthesis.models.GenreModel;
import bscthesis.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/genres")
public class GenreController {
    @Autowired
    private GenreService genreService;

    @GetMapping("")
    public List<GenreModel> listGenres() {
        return genreService.listAll();
    }

    @GetMapping("/{id}")
    public GenreModel getGenre(@PathVariable Long id) {
        return genreService.fetch(id);
    }

    @PostMapping("/create")
    @Secured("ROLE_ADMIN")
    public ResponseEntity<GenreModel> createGenre(@RequestBody GenreDTO genreDTO) {
        GenreModel genre = genreService.createGenre(genreDTO);
        return ResponseEntity.created(URI.create("/genres/" + genre.getGenreId())).body(genre);
    }

    @PutMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public GenreModel updateGenre(@PathVariable Long id, @RequestBody GenreDTO genreDTO) {
        return genreService.updateGenre(genreDTO);
    }

    @DeleteMapping("/{id}")
    @Secured("ROLE_ADMIN")
    public GenreModel deleteGenre(@PathVariable Long id) {
        return genreService.deleteGenre(id);
    }
}
