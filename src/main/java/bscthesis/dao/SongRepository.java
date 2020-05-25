package bscthesis.dao;

import bscthesis.models.SongModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SongRepository extends JpaRepository<SongModel, Long> {
    Optional<SongModel> findById(Long id);
    List<SongModel> findByAlbum_Id(Long id);
    List<SongModel> findByGenre_Id(Long id);
}
