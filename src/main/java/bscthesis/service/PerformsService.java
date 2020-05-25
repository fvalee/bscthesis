package bscthesis.service;

import bscthesis.dto.PerformsDTO;
import bscthesis.models.PerformsModel;
import bscthesis.models.SongModel;
import bscthesis.models.UserModel;
import org.springframework.security.core.userdetails.User;

import java.util.List;
import java.util.Optional;

public interface PerformsService {
    List<PerformsModel> listAll();
    PerformsModel addPerformance(PerformsDTO performsDTO);
    void deletePerformancesBySong(Long id);
    PerformsModel deletePerformanceBySongAndArtist(Long sID, Long aID);
    List<UserModel> findArtistBySongId(Long id);
    List<PerformsModel> findSongsByArtistId(Long id);
    Optional<PerformsModel> find(Long songId, Long artistId);
    PerformsModel fetch(Long songId, Long artistId);
}
