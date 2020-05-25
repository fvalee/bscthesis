package bscthesis.dto;

import bscthesis.models.CountryModel;

public class CountryDTO {
    private Long id;
    private String countryName;

    public CountryDTO(Long id, String countryName) {
        this.id = id;
        this.countryName = countryName;
    }

    public CountryDTO(CountryModel c) {
        this(c.getId(), c.getCountryName());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }
}
