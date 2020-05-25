package bscthesis.service.impl;

import bscthesis.dao.CityRepository;
import bscthesis.dao.ConcertRepository;
import bscthesis.dao.SongRepository;
import bscthesis.dao.UserRepository;
import bscthesis.dto.ConcertDTO;
import bscthesis.models.CityModel;
import bscthesis.models.ConcertModel;
import bscthesis.models.UserModel;
import bscthesis.service.ConcertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ConcertServiceJpa implements ConcertService {
    @Autowired
    private ConcertRepository concertRepo;

    @Autowired
    private CityRepository cityRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<ConcertModel> listAll() {
        List<ConcertModel> concerts = new ArrayList<>();
        concerts.addAll(concertRepo.findAllByDateGreaterThanEqualOrderByDateAscTimeAsc(LocalDate.now()));
        concerts.addAll(concertRepo.findAllByDateBeforeOrderByDateDescTimeDesc(LocalDate.now()));
        return concerts;
    }

    @Override
    public List<ConcertModel> listAllByArtist(Long artistId) {
        List<ConcertModel> concerts = new ArrayList<>();
        concerts.addAll(concertRepo.findAllByDateGreaterThanEqualAndUser_IdOrderByDateAscTimeAsc(LocalDate.now(), artistId));
        concerts.addAll(concertRepo.findAllByDateBeforeAndUser_IdOrderByDateDescTimeDesc(LocalDate.now(), artistId));
        return concerts;
    }

    @Override
    @Secured("ROLE_ARTIST")
    public ConcertModel createConcert(ConcertDTO concertDTO) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime concertDate = LocalDateTime.of(concertDTO.getDate(), concertDTO.getTime());
        if(concertDate.isBefore(now))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        ConcertModel c = new ConcertModel();
        UserModel artist = userRepo.findById(concertDTO.getArtistId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        CityModel city = cityRepo.findById(concertDTO.getCityId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        c.setUser(artist);
        c.setCity(city);
        c.setTime(concertDTO.getTime());
        c.setDate(concertDTO.getDate());
        return concertRepo.save(c);
    }

    @Override
    @Secured("ROLE_ARTIST")
    public ConcertModel updateConcert(ConcertDTO concertDTO, User user) {
        UserModel artist = userRepo.findById(concertDTO.getArtistId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime concertDate = LocalDateTime.of(concertDTO.getDate(), concertDTO.getTime());
        if(concertDate.isBefore(now))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        if(!user.getUsername().equals(artist.getUsername()))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);

        ConcertModel c = fetch(concertDTO.getId());
        CityModel city = cityRepo.findById(concertDTO.getCityId()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        c.setCity(city);
        c.setTime(concertDTO.getTime());
        c.setDate(concertDTO.getDate());
        return concertRepo.save(c);
    }

    @Override
    @Secured("ROLE_ARTIST")
    public ConcertModel deleteConcert(Long concertId) {
        ConcertModel c = fetch(concertId);
        concertRepo.delete(c);
        return c;
    }

    @Override
    public Optional<ConcertModel> findById(Long id) {
        return concertRepo.findById(id);
    }

    @Override
    public ConcertModel fetch(Long id) {
        return findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
