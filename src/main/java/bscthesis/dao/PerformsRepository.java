package bscthesis.dao;

import bscthesis.models.PerformsModel;
import bscthesis.models.PerformsModelId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PerformsRepository extends JpaRepository<PerformsModel, PerformsModelId> {
    //@Query("SELECT p FROM Performs p WHERE p.user.id=:i")
    List<PerformsModel> findById_ArtistId(Long id);
    List<PerformsModel> findById_SongId(Long id);
    Optional<PerformsModel> findById_SongIdAndId_ArtistId(Long songId, Long artistId);
}
