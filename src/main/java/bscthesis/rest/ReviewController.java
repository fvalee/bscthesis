package bscthesis.rest;

import bscthesis.dto.ReviewDTO;
import bscthesis.models.ReviewModel;
import bscthesis.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/{id}")
    public List<ReviewModel> listAllReviewsOfSong(@PathVariable("id") long id) {
        return reviewService.listAllReviewsOfSong(id);
    }

    @GetMapping("/my")
    public List<ReviewModel> listMyReviews(@AuthenticationPrincipal User user) {
        return reviewService.listMyReviews(user);
    }

    @PostMapping("/{id}/create")
    @Secured("ROLE_USER")
    public ReviewModel createReview(@PathVariable("id") long id, @RequestBody ReviewDTO reviewDTO, @AuthenticationPrincipal User user) {
        return reviewService.createReview(reviewDTO, user);
    }

    @DeleteMapping("/{id}/delete")
    public ReviewModel deleteReview(@PathVariable("id") long songId, @AuthenticationPrincipal User user) {
        return reviewService.deleteReview(songId, user);
    }
}
