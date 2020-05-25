package bscthesis.service;

import bscthesis.dto.UserDTO;
import bscthesis.models.UserModel;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<UserModel> listAll();
    List<UserModel> listArtists();
    UserModel createUser(UserDTO userDTO);
    UserModel updateUser(UserDTO userDTO);
    UserModel deleteUser(String username);
    Optional<UserModel> findByUsername(String username);
    UserModel fetch(String username);
    UserModel fetchById(Long id);
}
