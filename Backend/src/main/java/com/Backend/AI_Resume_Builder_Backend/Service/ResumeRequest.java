package com.Backend.AI_Resume_Builder_Backend.Service;

public class ResumeRequest {
    private String userResumeDescription;
    private String message;

    public ResumeRequest(String userResumeDescription) {
        this.userResumeDescription = userResumeDescription;
    }

    // This record is used to encapsulate the request data for generating a resume.
    // It contains a single field, userResumeDescription, which holds the description provided by the user.
    // The record automatically generates the constructor, getters, equals, hashCode, and toString methods.

    public String getUserResumeDescription() {
        return userResumeDescription;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}