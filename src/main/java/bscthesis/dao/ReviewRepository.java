package bscthesis.dao;

import bscthesis.models.ReviewModel;
import bscthesis.models.ReviewModelId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<ReviewModel, ReviewModelId> {
    List<ReviewModel> getById_SongIdOrderByPostedDesc(Long songId);
    List<ReviewModel> getById_UserId(Long userId);
    Optional<ReviewModel> getById_SongIdAndId_UserId(Long songId, Long userId);
}
