package bscthesis.service;

import bscthesis.dto.GenreDTO;
import bscthesis.models.GenreModel;

import java.util.List;
import java.util.Optional;

public interface GenreService {
    List<GenreModel> listAll();
    GenreModel createGenre(GenreDTO genreDTO);
    GenreModel updateGenre(GenreDTO genreDTO);
    GenreModel deleteGenre(Long id);
    Optional<GenreModel> findById(Long id);
    GenreModel fetch(Long id);
}
