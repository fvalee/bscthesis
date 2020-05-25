package bscthesis.models;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity(name="Review")
public class ReviewModel {
    @EmbeddedId
    private ReviewModelId id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @MapsId("songId")
    @JoinColumn(name = "song_id", nullable = false)
    private SongModel song;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel user;

    @Min(1)
    @Max(5)
    @Column(nullable = false)
    private int mark;

    @Size(max = 240)
    private String comment;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime posted;

    public ReviewModelId getId() {
        return id;
    }

    public void setId(ReviewModelId id) {
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

    public int getMark() {
        return mark;
    }

    public void setMark(int mark) {
        this.mark = mark;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDateTime getPosted() {
        return posted;
    }

    public void setPosted(LocalDateTime posted) {
        this.posted = posted;
    }
}
