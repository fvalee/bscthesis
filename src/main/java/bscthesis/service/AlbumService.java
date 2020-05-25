package bscthesis.service;

import bscthesis.dto.AlbumDTO;
import bscthesis.models.AlbumModel;
import org.springframework.security.core.userdetails.User;

import java.util.List;
import java.util.Optional;

public interface AlbumService {
    List<AlbumModel> listAll();
    List<AlbumModel> listMyAlbums(Long id);
    AlbumModel createAlbum(AlbumDTO albumDTO, User user);
    AlbumModel updateAlbum(AlbumDTO albumDTO, User user);
    AlbumModel deleteAlbum(Long id, User user);
    Optional<AlbumModel> findById(Long id);
    AlbumModel fetch(Long id);
}
