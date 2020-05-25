package bscthesis.dao;

import bscthesis.models.ConcertModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ConcertRepository extends JpaRepository<ConcertModel, Long> {
    List<ConcertModel> findAllByDateGreaterThanEqualOrderByDateAscTimeAsc(LocalDate date);
    List<ConcertModel> findAllByDateBeforeOrderByDateDescTimeDesc(LocalDate date);
    List<ConcertModel> findAllByDateGreaterThanEqualAndUser_IdOrderByDateAscTimeAsc(LocalDate date, Long id);
    List<ConcertModel> findAllByDateBeforeAndUser_IdOrderByDateDescTimeDesc(LocalDate date, Long id);
    Optional<ConcertModel> findById(Long id);
}
