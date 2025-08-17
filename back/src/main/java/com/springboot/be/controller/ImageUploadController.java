package com.springboot.be.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageUploadController {

    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadImages(@RequestParam("images") List<MultipartFile> files) {
        // TODO
        return ResponseEntity.ok(List.of("http://example.com/image.jpg"));
    }

    @PostMapping("/metadata")
    public ResponseEntity<List<String>> extractMetadata(@RequestBody List<String> imageUrls) {
        // TODO
        return ResponseEntity.ok().build();
    }
}
