package com.Backend.AI_Resume_Builder_Backend.Service;

public record ResumeRequest( String userResumeDescription) {
	
	// This record is used to encapsulate the request data for generating a resume.
	// It contains a single field, userResumeDescription, which holds the description provided by the user.
	// The record automatically generates the constructor, getters, equals, hashCode, and toString methods.
}