package bscthesis.service.impl;

import bscthesis.dao.UserRepository;
import bscthesis.dto.UserDTO;
import bscthesis.models.UserModel;
import bscthesis.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceJpa implements UserService {
    @Autowired
    private UserRepository userRepo;
    private BCryptPasswordEncoder pswdEncoder;

    public UserServiceJpa(BCryptPasswordEncoder pswdEncoder) {
        this.pswdEncoder = pswdEncoder;
    }

    @Override
    public List<UserModel> listAll() {
        return userRepo.findAll();
    }

    @Override
    public List<UserModel> listArtists() {
        return userRepo.findByIsArtistTrue();
    }

    @Override
    public UserModel createUser(UserDTO userDTO) {
        UserModel u = new UserModel();
        validate(userDTO);
        if(userRepo.existsByEmailOrUsername(userDTO.getEmail(), userDTO.getUsername()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        u.setUsername(userDTO.getUsername());
        u.setEmail(userDTO.getEmail());
        u.setPassword(pswdEncoder.encode(userDTO.getPassword()));
        u.setName(userDTO.getName());
        u.setSurname(userDTO.getSurname());
        u.setArtist(userDTO.isArtist());
        u.setStageName(userDTO.getStageName());

        return userRepo.save(u);
    }

    @Override
    public UserModel updateUser(UserDTO userDTO) {
        UserModel u = fetch(userDTO.getUsername());
        validate(userDTO);

        u.setEmail(userDTO.getEmail());
        u.setPassword(pswdEncoder.encode(userDTO.getPassword()));
        u.setName(userDTO.getName());
        u.setSurname(userDTO.getSurname());
        u.setStageName(userDTO.getStageName());

        return userRepo.save(u);
    }

    @Override
    public UserModel deleteUser(String username) {
        UserModel u = fetch(username);
        userRepo.delete(u);
        return u;
    }

    @Override
    public Optional<UserModel> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public UserModel fetch(String username) {
        return findByUsername(username).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @Override
    public UserModel fetchById(Long id) {
        return userRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    private void validate(UserDTO userDTO) {
        Assert.notNull(userDTO.getEmail(), "E-mail ne smije biti prazan.");
        Assert.notNull(userDTO.getPassword(), "Lozinka ne smije biti prazna.");
        if(!userDTO.isArtist() && !userDTO.getStageName().isEmpty() || userDTO.isArtist() && userDTO.getStageName().isEmpty()) //ako korisnik je izvođač a nema umjetničko ime
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }
}
