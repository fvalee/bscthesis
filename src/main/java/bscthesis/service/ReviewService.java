package bscthesis.service;

import bscthesis.dto.ReviewDTO;
import bscthesis.models.ReviewModel;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public interface ReviewService {
    List<ReviewModel> listAllReviewsOfSong(long id);
    List<ReviewModel> listMyReviews(User user);
    ReviewModel createReview(ReviewDTO reviewDTO, User user);
    ReviewModel deleteReview(Long id, User user);
}
