package bscthesis.models;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity(name="Genre")
public class GenreModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Size(max = 30)
    private String genreName;

    public Long getGenreId() {
        return id;
    }

    public void setGenreId(Long genreId) {
        this.id = genreId;
    }

    public String getGenreName() {
        return genreName;
    }

    public void setGenreName(String genreName) {
        this.genreName = genreName;
    }
}
