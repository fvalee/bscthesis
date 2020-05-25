package bscthesis.models;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity(name="Songs")
public class SongModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Size(max = 50)
    private String title;

    private String link;

    @ManyToOne
    @JoinColumn(name = "album_Id", nullable = false)
    private AlbumModel album;

    @ManyToOne
    @JoinColumn(name = "genre_Id", nullable = false)
    private GenreModel genre;

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

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public AlbumModel getAlbum() {
        return album;
    }

    public void setAlbum(AlbumModel album) {
        this.album = album;
    }

    public GenreModel getGenre() {
        return genre;
    }

    public void setGenre(GenreModel genre) {
        this.genre = genre;
    }
}
