package bscthesis.rest;

import bscthesis.dto.UserDTO;
import bscthesis.models.UserModel;
import bscthesis.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("")
    public List<UserModel> listUsers() {
        return userService.listAll();
    }

    @GetMapping("/artists")
    public List<UserModel> listArtists() {
        return userService.listArtists();
    }

    @GetMapping("/{username}")
    public UserModel getUser(@PathVariable String username) {
        return userService.fetch(username);
    }

    @GetMapping("/find/{id}")
    public UserModel getUserById(@PathVariable Long id) {
        return userService.fetchById(id);
    }
	
    @GetMapping("/current-user")
    public UserDTO onLogin() {
        return new UserDTO((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }

    @PostMapping("/sign-up")
    public ResponseEntity<UserModel> createUser(@RequestBody UserDTO userDTO) {
        UserModel u = userService.createUser(userDTO);
        return ResponseEntity.created(URI.create("/users/" + u.getUsername())).body(u);
    }

    @PutMapping("/{username}")
    @Secured("ROLE_USER")
    public UserModel updateUser(@PathVariable String username, @RequestBody UserDTO userDTO, @AuthenticationPrincipal User user) {
        if(!username.equals(user.getUsername()))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        return userService.updateUser(userDTO);
    }

    @DeleteMapping("/{username}")
    @Secured("ROLE_USER")
    public UserModel deleteUser(@PathVariable String username, @AuthenticationPrincipal User user) {
        if(!username.equals(user.getUsername()) && !"admin".equals(user.getUsername()))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        return userService.deleteUser(username);
    }
}
