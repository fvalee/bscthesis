package bscthesis.dto;

import bscthesis.models.GenreModel;

public class GenreDTO {
    private Long id;
    private String genreName;

    public GenreDTO(Long id, String genreName) {
        this.id = id;
        this.genreName = genreName;
    }

    public GenreDTO(GenreModel g) {
        this(g.getGenreId(), g.getGenreName());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGenreName() {
        return genreName;
    }

    public void setGenreName(String genreName) {
        this.genreName = genreName;
    }
}
