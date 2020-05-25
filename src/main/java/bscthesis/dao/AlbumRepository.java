package bscthesis.dao;

import bscthesis.models.AlbumModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlbumRepository extends JpaRepository<AlbumModel, Long> {
    List<AlbumModel> findAllByCreator_Id(Long id);
    Optional<AlbumModel> findById(Long id);
}
