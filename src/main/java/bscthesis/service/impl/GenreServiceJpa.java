package bscthesis.service.impl;

import bscthesis.dao.GenreRepository;
import bscthesis.dto.GenreDTO;
import bscthesis.models.GenreModel;
import bscthesis.service.GenreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class GenreServiceJpa implements GenreService {
    @Autowired
    private GenreRepository genreRepo;

    @Override
    public List<GenreModel> listAll() {
        return genreRepo.findAll();
    }

    @Override
    public GenreModel createGenre(GenreDTO genreDTO) {
        GenreModel genre = new GenreModel();

        if(genreRepo.existsByGenreName(genreDTO.getGenreName()))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        if(genreDTO.getGenreName().isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        genre.setGenreName(genreDTO.getGenreName());
        return genreRepo.save(genre);
    }

    @Override
    public GenreModel updateGenre(GenreDTO genreDTO) {
        GenreModel genre = fetch(genreDTO.getId());

        if(genreRepo.existsByGenreName(genreDTO.getGenreName()))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        if(genreDTO.getGenreName().isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        genre.setGenreName(genreDTO.getGenreName());
        return genreRepo.save(genre);
    }

    @Override
    public GenreModel deleteGenre(Long id) {
        GenreModel genre = fetch(id);
        genreRepo.delete(genre);
        return genre;
    }

    @Override
    public Optional<GenreModel> findById(Long id) {
        return genreRepo.findById(id);
    }

    @Override
    public GenreModel fetch(Long id) {
        return findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
