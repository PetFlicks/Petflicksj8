package com.petflicks.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.petflicks.app.Models.Video;
import com.petflicks.app.Service.VideoService;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "http://localhost:4200")
public class VideoController {

	private VideoService videoServ;

	@Autowired
	public VideoController(VideoService videoServ) {
		super();
		this.videoServ = videoServ;
	}

	@PostMapping(path ="/upload")
	@ResponseStatus(HttpStatus.CREATED)
	public void uploadVideo(@RequestParam("file") MultipartFile file) {

		videoServ.uploadVideo(file);

	}

	@GetMapping(path = "/videos")
	public List<Video> getVideos() {
		List<Video> videos;
		videos = videoServ.getAll();

		return videos;

	}

}
