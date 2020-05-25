package bscthesis.dto;

import bscthesis.models.AlbumModel;

public class AlbumDTO {
    private Long id;
    private String albumName;
    private String imageLink;
    private Long creatorId;

    public AlbumDTO(Long id, String albumName, String imageLink, Long creatorId) {
        this.id = id;
        this.albumName = albumName;
        this.imageLink = imageLink;
        this.creatorId = creatorId;
    }

    public AlbumDTO(AlbumModel a) {
        this(a.getAlbumId(), a.getAlbumName(), a.getImageLink(), a.getCreator().getId());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }
}
