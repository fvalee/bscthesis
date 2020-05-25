package bscthesis.service;

import bscthesis.dto.ConcertDTO;
import bscthesis.models.ConcertModel;
import org.springframework.security.core.userdetails.User;

import java.util.List;
import java.util.Optional;

public interface ConcertService {
    List<ConcertModel> listAll();
    List<ConcertModel> listAllByArtist(Long artistId);
    ConcertModel createConcert(ConcertDTO concertDTO);
    ConcertModel updateConcert(ConcertDTO concertDTO, User user);
    ConcertModel deleteConcert(Long concertId);
    Optional<ConcertModel> findById(Long id);
    ConcertModel fetch(Long id);
}
