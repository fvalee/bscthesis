package bscthesis.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class ConcertDTO {
    private Long id;
    private Long artistId;
    private Long cityId;
    private LocalDate date;
    private LocalTime time;

    public ConcertDTO(Long id, Long artistId, Long cityId, LocalDate date, LocalTime time) {
        this.id = id;
        this.artistId = artistId;
        this.cityId = cityId;
        this.date = date;
        this.time = time;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getArtistId() {
        return artistId;
    }

    public void setArtistId(Long artistId) {
        this.artistId = artistId;
    }

    public Long getCityId() {
        return cityId;
    }

    public void setCityId(Long cityId) {
        this.cityId = cityId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }
}
