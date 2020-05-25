package bscthesis.service.impl;

import bscthesis.dao.ReviewRepository;
import bscthesis.dao.SongRepository;
import bscthesis.dao.UserRepository;
import bscthesis.dto.ReviewDTO;
import bscthesis.models.ReviewModel;
import bscthesis.models.ReviewModelId;
import bscthesis.models.UserModel;
import bscthesis.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceJpa implements ReviewService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ReviewRepository reviewRepo;
    @Autowired
    private SongRepository songRepo;

    @Override
    public List<ReviewModel> listAllReviewsOfSong(long id) {
        return reviewRepo.getById_SongIdOrderByPostedDesc(id);
    }

    @Override
    public List<ReviewModel> listMyReviews(User user) {
        UserModel u = userRepo.findByUsername(user.getUsername()).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        return reviewRepo.getById_UserId(u.getId());
    }

    @Override
    public ReviewModel createReview(ReviewDTO reviewDTO, User user) {
        ReviewModel r = new ReviewModel();
        ReviewModelId rId = new ReviewModelId();


        r.setComment(reviewDTO.getComment());
        r.setMark(reviewDTO.getMark());
        r.setPosted(LocalDateTime.now());
        r.setSong(songRepo.findById(reviewDTO.getSongId()).get());
        r.setUser(userRepo.findByUsername(user.getUsername()).get());
        rId.setSongId(r.getSong().getId());
        rId.setUserId(r.getUser().getId());
        r.setId(rId);

        return reviewRepo.save(r);

        //izmjeniti review DTO -> nama praktički treba samo id pjesme + ocjena i komentar, nije nužno toliko puno podataka slat nazad..
        //vidit di se još moglo to radit, da JSONi ne budu tako veliki...
    }

    @Override
    public ReviewModel deleteReview(Long id, User user) {
        ReviewModel r = reviewRepo.getById_SongIdAndId_UserId(id, userRepo.findByUsername(user.getUsername()).get().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST));
        reviewRepo.delete(r);
        return r;
    }
}
