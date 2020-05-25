package bscthesis.dto;

import bscthesis.models.ReviewModel;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class ReviewDTO {
    private Long songId;
    private int mark;
    private String comment;

    public ReviewDTO(Long songId, int mark, String comment) {
        this.songId = songId;
        this.mark = mark;
        this.comment = comment;
    }

    public Long getSongId() {
        return songId;
    }

    public void setSongId(Long songId) {
        this.songId = songId;
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
}
