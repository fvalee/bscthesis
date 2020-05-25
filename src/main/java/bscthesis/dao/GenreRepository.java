package bscthesis.dao;

import bscthesis.models.GenreModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GenreRepository extends JpaRepository<GenreModel, Long> {
    boolean existsByGenreName(String genreName);
    Optional<GenreModel> findById(Long id);
}
