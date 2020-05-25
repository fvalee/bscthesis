package bscthesis.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
public class PerformsModelId implements Serializable {
    @Column(name = "song_id")
    private Long songId;

    @Column(name = "artist_id", nullable = false)
    private Long artistId;

    public PerformsModelId(Long songId, Long userId) {
        this.songId = songId;
        this.artistId = userId;
    }

    public PerformsModelId(){
    }

    public Long getSongId() {
        return songId;
    }

    public void setSongId(Long songId) {
        this.songId = songId;
    }

    public Long getArtistId() {
        return artistId;
    }

    public void setArtistId(Long artistId) {
        this.artistId = artistId;
    }
}
