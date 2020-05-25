package bscthesis.service.impl;

import bscthesis.dao.PerformsRepository;
import bscthesis.dao.SongRepository;
import bscthesis.dao.UserRepository;
import bscthesis.dto.PerformsDTO;
import bscthesis.models.PerformsModel;
import bscthesis.models.PerformsModelId;
import bscthesis.models.SongModel;
import bscthesis.models.UserModel;
import bscthesis.service.PerformsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PerformsServiceJpa implements PerformsService {
    @Autowired
    private PerformsRepository performsRepo;

    @Autowired
    private SongRepository songRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<PerformsModel> listAll() {
        return performsRepo.findAll();
    }

    @Override
    public PerformsModel addPerformance(PerformsDTO performsDTO) {
        PerformsModel p = new PerformsModel();
        PerformsModelId pID = new PerformsModelId();

        p.setSong(songRepo.findById(performsDTO.getSong().getId()).get());
        p.setUser(userRepo.findById(performsDTO.getArtist().getId()).get());
        pID.setArtistId(performsDTO.getArtist().getId());
        pID.setSongId(performsDTO.getSong().getId());
        p.setId(pID);

        return performsRepo.save(p);
    }

    @Override
    public void deletePerformancesBySong(Long id) {
        List<PerformsModel> p = performsRepo.findById_SongId(id);
        for(PerformsModel x : p) {
            performsRepo.delete(x);
        }
    }

    @Override
    public PerformsModel deletePerformanceBySongAndArtist(Long sID, Long aID) {
        PerformsModel p = fetch(sID, aID);
        performsRepo.delete(p);
        return p;
    }

    @Override
    public List<UserModel> findArtistBySongId(Long id) {
        List<UserModel> u = new ArrayList<>();
        List<PerformsModel> p = performsRepo.findById_SongId(id);
        for (PerformsModel perf : p) {
            u.add(perf.getUser());
        }
        return u;
    }

    @Override
    public List<PerformsModel> findSongsByArtistId(Long id) {
        return performsRepo.findById_ArtistId(id);
    }

    @Override
    public Optional<PerformsModel> find(Long songId, Long artistId) {
        return performsRepo.findById_SongIdAndId_ArtistId(songId, artistId);
    }

    @Override
    public PerformsModel fetch(Long songId, Long artistId) {
        return find(songId, artistId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
