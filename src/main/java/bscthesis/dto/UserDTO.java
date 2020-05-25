package bscthesis.dto;

import bscthesis.models.UserModel;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String password;
    private String name;
    private String surname;
    private boolean isArtist;
    private String stageName;
    private List<String> authorities;

    public UserDTO(String username, String email, String password, String name, String surname, boolean isArtist, String stageName) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.isArtist = isArtist;
        this.stageName = stageName;
    }

    public UserDTO(UserModel u) {
        this(u.getUsername(), u.getEmail(), u.getPassword(), u.getName(), u.getSurname(), u.isArtist(), u.getStageName());
        setId(u.getId());
    }

    public UserDTO(User user) {
        this(user.getUsername(), "", "", "", "", false, "");
        this.authorities = user
                .getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .map(s -> s.replace("ROLE_", ""))
                .collect(Collectors.toList());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public boolean isArtist() {
        return isArtist;
    }

    public void setArtist(boolean artist) {
        isArtist = artist;
    }

    public String getStageName() {
        return stageName;
    }

    public void setStageName(String stageName) {
        this.stageName = stageName;
    }

    public List<String> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<String> authorities) {
        this.authorities = authorities;
    }
}
