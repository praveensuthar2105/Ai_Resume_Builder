package com.Backend.AI_Resume_Builder_Backend.Controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Backend.AI_Resume_Builder_Backend.Service.ResumeRequest;
import com.Backend.AI_Resume_Builder_Backend.Service.ResumeService;
import com.Backend.AI_Resume_Builder_Backend.Service.AtsScoreService;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = { "http://localhost:5175", "http://localhost:5178", "http://localhost:5173",
		"http://localhost:5174" })
public class resumeController {
	@Autowired
	private ResumeService resumeService;

	@Autowired
	private AtsScoreService atsScoreService;

	@PostMapping("/generate")
	public ResponseEntity<Map<String, Object>> getResumeData(@RequestBody ResumeRequest resumeRequest) {
		try {
			// Validate input
			if (resumeRequest == null || resumeRequest.getUserResumeDescription() == null ||
					resumeRequest.getUserResumeDescription().trim().isEmpty()) {
				Map<String, Object> errorResponse = new HashMap<>();
				errorResponse.put("error", "Invalid input");
				errorResponse.put("message", "User resume description is required");
				return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
			}

			Map<String, Object> jsonObject = resumeService
					.generateResumeResponse(resumeRequest.getUserResumeDescription());
			return new ResponseEntity<>(jsonObject, HttpStatus.OK);
		} catch (IOException e) {
			Map<String, Object> errorResponse = new HashMap<>();
			errorResponse.put("error", "Failed to load prompt template");
			errorResponse.put("message", e.getMessage());
			e.printStackTrace(); // Add logging for debugging
			return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			Map<String, Object> errorResponse = new HashMap<>();
			errorResponse.put("error", "Internal server error");
			errorResponse.put("message", e.getMessage());
			// Avoid returning raw stacktrace in API responses; log it server-side instead.
			return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/ats-score")
	public ResponseEntity<Map<String, Object>> getAtsScore(@RequestParam MultipartFile file) {
		try {
			if (file.isEmpty()) {
				Map<String, Object> errorResponse = new HashMap<>();
				errorResponse.put("error", "Invalid input");
				errorResponse.put("message", "File is required");
				return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
			}

			Map<String, Object> atsScore = atsScoreService.getAtsScore(file);
			return new ResponseEntity<>(atsScore, HttpStatus.OK);
		} catch (Exception e) {
			Map<String, Object> errorResponse = new HashMap<>();
			errorResponse.put("error", "Internal server error");
			errorResponse.put("message", e.getMessage());
			e.printStackTrace();
			return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
