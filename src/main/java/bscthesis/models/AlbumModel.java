package bscthesis.models;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity(name="Album")
public class AlbumModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Size(max = 50)
    private String albumName;
    private String imageLink;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserModel creator;

    public Long getAlbumId() {
        return id;
    }

    public void setAlbumId(Long albumId) {
        this.id = albumId;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String imageLink) {
        this.imageLink = imageLink;
    }

    public UserModel getCreator() {
        return creator;
    }

    public void setCreator(UserModel creator) {
        this.creator = creator;
    }
}
