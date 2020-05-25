package bscthesis.service;

import bscthesis.dto.SongDTO;
import bscthesis.models.SongModel;
import org.springframework.security.core.userdetails.User;

import java.util.List;
import java.util.Optional;

public interface SongService {
    List<SongModel> listAll();
    List<SongModel> listMySongs(Long id);
    List<SongModel> listSongsOnAlbum(Long id);
    List<SongModel> listSongsByGenre(Long id);
    SongModel createSong(SongDTO songDTO);
    SongModel updateSong(SongDTO songDTO, User user);
    SongModel deleteSong(Long id);
    Optional<SongModel> findById(Long id);
    SongModel fetch(Long id);
}
