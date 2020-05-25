package bscthesis.dto;

import bscthesis.models.SongModel;

public class SongDTO {
    private Long id;
    private String title;
    private String link;
    private AlbumDTO album;
    private GenreDTO genre;

    public SongDTO(Long id, String title, String link, AlbumDTO album, GenreDTO genre) {
        this.id = id;
        this.title = title;
        this.link = link;
        this.album = album;
        this.genre = genre;
    }

    public SongDTO(SongModel s) {
        this(s.getId(), s.getTitle(), s.getLink(), new AlbumDTO(s.getAlbum()), new GenreDTO(s.getGenre()));
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public AlbumDTO getAlbum() {
        return album;
    }

    public void setAlbum(AlbumDTO album) {
        this.album = album;
    }

    public GenreDTO getGenre() {
        return genre;
    }

    public void setGenre(GenreDTO genre) {
        this.genre = genre;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }
}
