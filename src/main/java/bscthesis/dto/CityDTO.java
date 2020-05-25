package bscthesis.dto;

import bscthesis.models.CityModel;

public class CityDTO {
    private Long id;
    private String cityName;
    private String postcode;
    private CountryDTO country;

    public CityDTO(Long id, String cityName, String postcode, CountryDTO country) {
        this.id = id;
        this.cityName = cityName;
        this.postcode = postcode;
        this.country = country;
    }

    public CityDTO(CityModel c) {
        this(c.getId(), c.getCityName(), c.getPostcode(), new CountryDTO(c.getCountry()));
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public CountryDTO getCountry() {
        return country;
    }

    public void setCountry(CountryDTO country) {
        this.country = country;
    }
}
