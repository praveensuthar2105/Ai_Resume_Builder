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

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = {"http://localhost:5175", "http://localhost:5178", "http://localhost:5173", "http://localhost:5174"})
public class resumeController {
	@Autowired
	private ResumeService resumeService;
	
	@PostMapping("/generate")
	public ResponseEntity<Map<String , Object>> getResumeData(@RequestBody ResumeRequest resumeRequest) {
		try {
			// Validate input
			if (resumeRequest == null || resumeRequest.userResumeDescription() == null ||
			    resumeRequest.userResumeDescription().trim().isEmpty()) {
				Map<String, Object> errorResponse = new HashMap<>();
				errorResponse.put("error", "Invalid input");
				errorResponse.put("message", "User resume description is required");
				return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
			}
			
			Map<String, Object> jsonObject = resumeService.generateResumeResponse(resumeRequest.userResumeDescription());
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
			errorResponse.put("exception", e.getClass().getName());
			errorResponse.put("stackTrace", e.getStackTrace());
			e.printStackTrace(); // Add logging for debugging
			return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

