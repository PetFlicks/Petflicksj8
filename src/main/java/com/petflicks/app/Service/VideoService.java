package com.petflicks.app.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.petflicks.app.Models.Video;

@Service
public interface VideoService {

	public void uploadVideo(MultipartFile file);
	public List<Video> getAll();
	
	
}
