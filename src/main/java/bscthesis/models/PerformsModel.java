package bscthesis.models;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity(name="Performs")
public class PerformsModel {
    @EmbeddedId
    private PerformsModelId id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @MapsId("songId")
    @JoinColumn(name = "song_id", nullable = false)
    private SongModel song;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @MapsId("artistId")
    @JoinColumn(name = "artist_id", nullable = false)
    private UserModel user;

    public PerformsModelId getId() {
        return id;
    }

    public void setId(PerformsModelId id) {
        this.id = id;
    }

    public SongModel getSong() {
        return song;
    }

    public void setSong(SongModel song) {
        this.song = song;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }
}
