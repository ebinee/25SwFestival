package com.springboot.be.service;

import com.springboot.be.dto.response.CommentDto;
import com.springboot.be.dto.response.PhotoDetailDto;
import com.springboot.be.dto.response.PhotoSummaryDto;
import com.springboot.be.entity.Photo;
import com.springboot.be.entity.PhotoLike;
import com.springboot.be.entity.User;
import com.springboot.be.exception.NotFoundException;
import com.springboot.be.repository.CommentRepository;
import com.springboot.be.repository.PhotoLikeRepository;
import com.springboot.be.repository.PhotoRepository;
import com.springboot.be.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PhotoService {
    private final PhotoRepository photoRepository;
    private final PhotoLikeRepository photoLikeRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    @Transactional(readOnly = true)
    public PhotoDetailDto getPhotoDetail(Long photoId) {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new NotFoundException("사진을 찾을 수 없습니다."));
        List<CommentDto> comments = commentRepository
                .findByPhoto_IdOrderByCreatedAtAsc(photoId)
                .stream()
                .map(CommentDto::from)
                .toList();
        return PhotoDetailDto.from(photo, comments);
    }

    @Transactional
    public void likePhoto(Long photoId, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new NotFoundException("사진을 찾을 수 없습니다."));

        if (photoLikeRepository.existsByUserAndPhoto(user, photo)) return;

        photoLikeRepository.save(new PhotoLike(user, photo));
        photo.increaseLike();
    }

    @Transactional
    public void unlikePhoto(Long photoId, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("사용자를 찾을 수 없습니다."));
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new NotFoundException("사진을 찾을 수 없습니다."));

        int deleted = photoLikeRepository.deleteByUserAndPhoto(user, photo);
        if (deleted > 0) {
            photo.decreaseLike();
        }
    }

    @Transactional(readOnly = true)
    public List<PhotoSummaryDto> getFavoritePhotos(Long userId) {
        return photoLikeRepository.findPhotoLikedByUser(userId)
                .stream().map(PhotoSummaryDto::from).toList();
    }
}
