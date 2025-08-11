package com.springboot.be.service;

import com.springboot.be.dto.response.PhotoDetailResponse;
import com.springboot.be.entity.Photo;
import com.springboot.be.exception.NotFoundException;
import com.springboot.be.repository.PhotoLikeRepository;
import com.springboot.be.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PhotoService {
    private final PhotoRepository photoRepository;
    private final PhotoLikeRepository photoLikeRepository;

    public PhotoDetailResponse getPhotoDetail(Long photoId) {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new NotFoundException("사진을 찾을 수 없습니다."));
        return PhotoDetailResponse.from(photo);
    }

    public void likePhoto(Long photoId) {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new NotFoundException("사진을 찾을 수 없습니다."));
        photo.increaseLike();
    }

    public void unlikePhoto(Long photoId) {
        Photo photo = photoRepository.findById(photoId)
                .orElseThrow(() -> new NotFoundException("사진을 찾을 수 없습니다."));
        photo.decreaseLike();
    }
}
