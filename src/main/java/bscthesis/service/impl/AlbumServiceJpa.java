package bscthesis.service.impl;

import bscthesis.dao.AlbumRepository;
import bscthesis.dao.UserRepository;
import bscthesis.dto.AlbumDTO;
import bscthesis.models.AlbumModel;
import bscthesis.models.UserModel;
import bscthesis.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class AlbumServiceJpa implements AlbumService {
    @Autowired
    private AlbumRepository albumRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<AlbumModel> listAll() {
        return albumRepo.findAll();
    }

    @Override
    public List<AlbumModel> listMyAlbums(Long id) {
        return albumRepo.findAllByCreator_Id(id);
    }

    @Override
    public AlbumModel createAlbum(AlbumDTO albumDTO, User user) {
        UserModel u = fetchUser(user.getUsername());
        if(!u.isArtist())
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);

        AlbumModel album = new AlbumModel();

        if(albumDTO.getAlbumName().isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        album.setAlbumName(albumDTO.getAlbumName());
        album.setImageLink(albumDTO.getImageLink());
        album.setCreator(u);

        return albumRepo.save(album);
    }

    @Override
    public AlbumModel updateAlbum(AlbumDTO albumDTO, User user) {
        UserModel u = fetchUser(user.getUsername());
        AlbumModel album = fetch(albumDTO.getId());

        if(!u.getId().equals(album.getCreator().getId()))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        if(albumDTO.getAlbumName().isEmpty())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        album.setAlbumName(albumDTO.getAlbumName());
        album.setImageLink(albumDTO.getImageLink());

        return albumRepo.save(album);
    }

    @Override
    public AlbumModel deleteAlbum(Long id, User user) {
        UserModel u = fetchUser(user.getUsername());
        AlbumModel album = fetch(id);

        if(!u.getId().equals(album.getCreator().getId()))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);

        albumRepo.delete(album);
        return album;
    }

    @Override
    public Optional<AlbumModel> findById(Long id) {
        return albumRepo.findById(id);
    }

    @Override
    public AlbumModel fetch(Long id) {
        return findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public UserModel fetchUser(String username) {
        return userRepo.findByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
