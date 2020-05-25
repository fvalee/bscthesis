package bscthesis.models;

import javax.persistence.*;
import java.io.Serializable;

@Embeddable
public class ReviewModelId implements Serializable {
    @Column(name = "user_Id", nullable = false)
    private Long userId;

    @Column(name = "song_Id", nullable = false)
    private Long songId;

    public ReviewModelId(Long userId, Long songId) {
        this.userId = userId;
        this.songId = songId;
    }

    public ReviewModelId() {
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getSongId() {
        return songId;
    }

    public void setSongId(Long songId) {
        this.songId = songId;
    }
}
