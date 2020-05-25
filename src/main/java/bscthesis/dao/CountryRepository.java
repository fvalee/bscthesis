package bscthesis.dao;

import bscthesis.models.CountryModel;
import bscthesis.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CountryRepository extends JpaRepository<CountryModel, Long> {
    boolean existsByCountryName(String countryName);
    Optional<CountryModel> findById(Long id);
}
