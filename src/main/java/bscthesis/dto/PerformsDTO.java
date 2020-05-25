package bscthesis.dto;

import bscthesis.models.PerformsModel;

public class PerformsDTO {
    private SongDTO song;
    private UserDTO artist;

    public PerformsDTO(SongDTO s, UserDTO u) {
        this.song = s;
        this.artist = u;
    }

    public PerformsDTO(PerformsModel p) {
        this(new SongDTO(p.getSong()), new UserDTO(p.getUser()));
    }

    public SongDTO getSong() {
        return song;
    }

    public void setSong(SongDTO song) {
        this.song = song;
    }

    public UserDTO getArtist() {
        return artist;
    }

    public void setArtist(UserDTO artist) {
        this.artist = artist;
    }
}
