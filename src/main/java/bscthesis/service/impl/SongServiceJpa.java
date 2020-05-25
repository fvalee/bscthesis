package bscthesis.service.impl;

import bscthesis.dao.*;
import bscthesis.dto.PerformsDTO;
import bscthesis.dto.SongDTO;
import bscthesis.dto.UserDTO;
import bscthesis.models.PerformsModel;
import bscthesis.models.SongModel;
import bscthesis.models.UserModel;
import bscthesis.service.PerformsService;
import bscthesis.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SongServiceJpa implements SongService {
    @Autowired
    private SongRepository songRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PerformsRepository performsRepo;

    @Autowired
    private AlbumRepository albumRepo;

    @Autowired
    private GenreRepository genreRepo;

    @Autowired
    private PerformsService performsService;

    @Override
    public List<SongModel> listAll() {
        return songRepo.findAll();
    }

    @Override
    public List<SongModel> listMySongs(Long id) {
        List<PerformsModel> performances = performsRepo.findById_ArtistId(id);
        List<SongModel> s = new ArrayList<>();
        for (PerformsModel p : performances) {
            s.add(p.getSong());
        }
        return s;
    }

    @Override
    public List<SongModel> listSongsOnAlbum(Long id) {
        return songRepo.findByAlbum_Id(id);
    }

    @Override
    public List<SongModel> listSongsByGenre(Long id) {
        return songRepo.findByGenre_Id(id);
    }

    @Override
    public SongModel createSong(SongDTO songDTO) {
        SongModel s = new SongModel();

        if(songDTO.getTitle().isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        s.setAlbum(albumRepo.findById(songDTO.getAlbum().getId()).get());
        s.setGenre(genreRepo.findById(songDTO.getGenre().getId()).get());
        s.setLink(songDTO.getLink());
        s.setTitle(songDTO.getTitle());

        return songRepo.save(s);
    }

    @Override
    public SongModel updateSong(SongDTO songDTO, User user) {
        SongModel s = fetch(songDTO.getId());

        if(songDTO.getTitle().isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        s.setAlbum(albumRepo.findById(songDTO.getAlbum().getId()).get());
        s.setGenre(genreRepo.findById(songDTO.getGenre().getId()).get());
        s.setLink(songDTO.getLink());
        s.setTitle(songDTO.getTitle());

        return songRepo.save(s);
    }

    @Override
    public SongModel deleteSong(Long id) {
        SongModel s = fetch(id);
        songRepo.delete(s);
        return s;
    }

    @Override
    public Optional<SongModel> findById(Long id) {
        return songRepo.findById(id);
    }

    @Override
    public SongModel fetch(Long id) {
        return findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
