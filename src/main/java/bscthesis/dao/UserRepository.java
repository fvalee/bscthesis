package bscthesis.dao;

import bscthesis.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {
    List<UserModel> findAll();
    List<UserModel> findByIsArtistTrue();
    Optional<UserModel> findByUsername(String username);
    Optional<UserModel> findById(Long id);
    boolean existsByEmailOrUsername(String email, String username);
}
