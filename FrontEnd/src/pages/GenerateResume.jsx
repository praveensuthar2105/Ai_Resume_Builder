import React, { useState, useRef, useEffect } from "react";
import { generateResume } from "../api/ResumeService";

function GenerateResume() {
    const [userDescription, setUserDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [data, setData] = useState(null);
    const [template, setTemplate] = useState("professional");
    const [showPreview, setShowPreview] = useState(false);
    const resumeRef = useRef(null);

    useEffect(() => {
        // lock background scroll when preview modal is open
        const originalOverflow = document.body.style.overflow;
        if (showPreview) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = originalOverflow;
        }
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [showPreview]);

    // UI helper classes for consistent styling
    const cardClass = "bg-white/80 backdrop-blur-md p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-100";
    const inputLarge = "w-full p-3 border border-gray-300 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-gray-50 text-gray-900 placeholder-gray-500 transition-all";
    const inputSmall = "w-full p-2 border border-gray-300 rounded-md focus:border-indigo-400 focus:ring-1 focus:ring-indigo-100 bg-gray-50 text-gray-900 placeholder-gray-500 transition-all";
    const sectionHeader = "text-xl font-semibold text-gray-700 mb-4 pb-2 pl-3 border-l-4 border-indigo-400";
    const primaryButton = "bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-700 hover:to-emerald-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300";

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("User Description:", userDescription);
        
        // Reset messages
        setError("");
        setSuccess("");
        
        if (userDescription.length < 50) {
            setError("Please provide at least 50 characters to generate a good resume.");
            return;
        }

        try {
            setLoading(true);
            const response = await generateResume(userDescription);
            console.log("Raw response object:", response);

            // Ensure response and response.data exist before processing
            if (response && response.data) {
                const responseData = response.data;
                console.log("Raw response data:", responseData);

                // Process the response data and update the form data
                const pi = responseData.personalInformation || {};
                const processedData = {
                    personalInformation: {
                        fullName: pi.fullName || "",
                        email: pi.email || "",
                        phoneNumber: pi.phoneNumber || "",
                        location: pi.location || "",
                        linkedIn: pi.linkedIn || "",
                        gitHub: pi.gitHub || pi.repository || "",
                        portfolio: pi.portfolio || ""
                    },
                    summary: responseData.summary || "",
                    skills: responseData.skills || [],
                    experience: responseData.experience || [],
                    education: responseData.education || [],
                    certifications: responseData.certifications || [],
                    projects: responseData.projects || [],
                    achievements: responseData.achievements || [],
                    extraInformation: responseData.extraInformation || "",
                    languages: responseData.languages || [],
                    interests: responseData.interests || []
                };
                
                console.log("Processed data:", processedData);
                setData(processedData);
            } else {
                // Handle cases where response.data is not available
                setError("Received an invalid response from the server.");
                setData(null); // Or set to a default empty state
            }
            
            // Always clear success message when we have backend data to show the form
            setSuccess("");
            
            setUserDescription(""); // Clear the input after successful submission
        } catch (error) {
            console.error("Error generating resume:", error);
            console.error("Full error object:", JSON.stringify(error, null, 2));
            
            if (error.response?.status === 500) {
                const errorMessage = error.response?.data ? 
                    `Server error: ${error.response.data}` : 
                    "Server error: Please check your backend server logs for details.";
                setError(errorMessage);
            } else if (error.code === 'ERR_NETWORK') {
                setError("Network error: Cannot connect to the server. Please check if your backend is running on port 8081.");
            } else if (error.response?.status === 404) {
                setError("API endpoint not found. Please check if your backend API is properly configured.");
            } else if (error.response?.status === 400) {
                setError("Bad request: Please check your input data format.");
            } else {
                setError(`Failed to generate resume: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    }

    // changing personal information
    const updatePersonalInfo = (field, value) => {
        setData(prev => ({
            ...prev,
            personalInformation: {
                ...prev.personalInformation,
                [field]: value
            }
        }));
    };

    // Update other resume sections (for future use)
    const updateResumeSection = (section, value) => {
        setData(prev => ({
            ...prev,
            [section]: value
        }));
    };

    // Generic handler for updating items in an array (e.g., experience, education)
    const handleItemChange = (section, index, field, value) => {
        setData(prev => {
            const newItems = [...prev[section]];
            if (typeof newItems[index] === 'object' && newItems[index] !== null) {
                newItems[index] = { ...newItems[index], [field]: value };
            } else {
                // This case is for simple arrays of strings, which we aren't using based on the JSON spec.
                // However, keeping it for flexibility, though it might need adjustment if used.
                newItems[index] = value;
            }
            return { ...prev, [section]: newItems };
        });
    };

    // Generic handler for adding a new item to an array
    const addItem = (section, newItem) => {
        setData(prev => ({
            ...prev,
            [section]: [...(prev[section] || []), newItem]
        }));
    };

    // Generic handler for removing an item from an array
    const removeItem = (section, index) => {
        setData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    // Print/export the resume preview into a new window with styles
    const handleDownload = () => {
        if (!resumeRef?.current) {
            alert('Nothing to download');
            return;
        }

        const printWindow = window.open('', '_blank', 'width=900,height=700');
        if (!printWindow) {
            alert('Unable to open print window. Please allow popups for this site.');
            return;
        }

        // Collect stylesheet and style tags from current document so the resume looks similar when printed
        const styles = Array.from(document.querySelectorAll("link[rel='stylesheet'], style")).map(n => n.outerHTML).join('\n');

        // Improved print CSS to mimic LaTeX resume spacing and letter page size
        const printStyles = `
          <style>
            @page { size: letter; margin: 0.5in; }
            html,body { height: 100%; }
            body { font-family: Georgia, 'Times New Roman', serif; color: #111827; line-height: 1.18; font-size: 12.2px; }
            .resume-container { max-width: 7.5in; margin: 0 auto; }
            .name { font-size: 34px; font-weight: 900; letter-spacing: 0.4px; margin-bottom: 2px; }
            .contact { font-size: 12px; color: #374151; margin-top: 4px; text-align: center; }
            .section-title { font-variant: small-caps; font-weight: 800; margin-top: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; font-size: 12.5px; text-align: left; }
            .item-title { font-weight: 700; font-size: 12.2px; }
            .muted { color: #6b7280; font-size: 11.5px; }
            ul { margin: 6px 0 12px 0; padding-left: 16px; }
            li { margin-bottom: 6px; }
            .section-title + p, .section-title + ul { margin-top: 8px; }
            /* Force stronger contrast for headings when printing */
            h1, .name { color: #111827; }
          </style>
        `;
        
        printWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Resume</title>${styles}${printStyles}</head><body>${resumeRef.current.outerHTML}</body></html>`);
        printWindow.document.close();
        printWindow.focus();
        // Wait for content to load and then trigger print
        printWindow.onload = () => {
            printWindow.print();
            // Optionally close the window after printing: printWindow.close();
        };
    };

    // ShowForm function to display the form for editing personal information
    // and ShowInputField function to display the input field for user description
    function ShowForm() {
        return (
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-6">
                        📝 Edit Your Resume
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        Review and customize your personal information. Make any changes you need.
                    </p>
                </div>

                {/* Form Section */}
                <div className={cardClass}>
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                        <button 
                            className="btn btn-outline btn-sm"
                            onClick={() => {
                                // Reset form to show input field
                                setData(null);
                                setError("");
                                setSuccess("");
                            }}
                        >
                            ← Back to Input
                        </button>
                    </div>

                    {/* Personal Information Form */}
                    <div className="mb-8">
                        <h3 className={sectionHeader}>👤 Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={data?.personalInformation?.fullName || ""}
                                    onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                                    className={inputLarge}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={data?.personalInformation?.email || ""}
                                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                                    className={inputLarge}
                                    placeholder="john.doe@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    value={data?.personalInformation?.phoneNumber || ""}
                                    onChange={(e) => updatePersonalInfo('phoneNumber', e.target.value)}
                                    className={inputLarge}
                                    placeholder="+1-234-567-8901"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">Location</label>
                                <input
                                    type="text"
                                    value={data?.personalInformation?.location || ""}
                                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                                    className={inputLarge}
                                    placeholder="New York, USA"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">LinkedIn</label>
                                <input
                                    type="url"
                                    value={data?.personalInformation?.linkedIn || ""}
                                    onChange={(e) => updatePersonalInfo('linkedIn', e.target.value)}
                                    className={inputLarge}
                                    placeholder="https://linkedin.com/in/johndoe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2">GitHub</label>
                                <input
                                    type="url"
                                    value={data?.personalInformation?.gitHub || ""}
                                    onChange={(e) => updatePersonalInfo('gitHub', e.target.value)}
                                    className={inputLarge}
                                    placeholder="https://github.com/johndoe"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-600 mb-2">Portfolio</label>
                                <input
                                    type="url"
                                    value={data?.personalInformation?.portfolio || ""}
                                    onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                                    className={inputLarge}
                                    placeholder="https://johndoe.dev"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="mb-8">
                        <h3 className={sectionHeader}>📄 Professional Summary</h3>
                        <textarea
                            value={data?.summary || ""}
                            onChange={(e) => updateResumeSection('summary', e.target.value)}
                            rows={4}
                            className={`${inputLarge} resize-none`}
                            placeholder="Professional summary..."
                        />
                    </div>

                    {/* Skills Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">🛠️ Skills</h3>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            {(data?.skills || []).map((skill, index) => (
                                <div key={index} className="flex items-center bg-blue-100 p-2 rounded-lg mb-2">
                                    <input
                                        type="text"
                                        value={skill.title || ""}
                                        onChange={(e) => handleItemChange('skills', index, 'title', e.target.value)}
                                        placeholder="Skill"
                                        className="bg-transparent text-blue-800 focus:outline-none w-full mr-2"
                                    />
                                    <button onClick={() => removeItem('skills', index)} className="ml-2 text-red-500 hover:text-red-700">×</button>
                                </div>
                            ))}
                            <button onClick={() => addItem('skills', { title: 'New Skill' })} className="mt-4 text-sm text-blue-600 hover:text-blue-800">
                                + Add Skill
                            </button>
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="mb-8">
                        <h3 className={sectionHeader}>💼 Work Experience</h3>
                        <div className="space-y-4">
                            {(data?.experience || []).map((exp, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-xl relative">
                                    <button onClick={() => removeItem('experience', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">×</button>
                                    <input type="text" value={exp.jobTitle || ''} onChange={(e) => handleItemChange('experience', index, 'jobTitle', e.target.value)} placeholder="Job Title" className={`${inputSmall} mb-2`} />
                                    <input type="text" value={exp.company || ''} onChange={(e) => handleItemChange('experience', index, 'company', e.target.value)} placeholder="Company" className={`${inputSmall} mb-2`} />
                                    <input type="text" value={exp.location || ''} onChange={(e) => handleItemChange('experience', index, 'location', e.target.value)} placeholder="Location" className={`${inputSmall} mb-2`} />
                                    <input type="text" value={exp.duration || ''} onChange={(e) => handleItemChange('experience', index, 'duration', e.target.value)} placeholder="Duration" className={`${inputSmall} mb-2`} />
                                    <textarea value={exp.responsibility || ''} onChange={(e) => handleItemChange('experience', index, 'responsibility', e.target.value)} placeholder="Responsibility" className={`${inputSmall} h-24`} />
                                </div>
                            ))}
                            <button onClick={() => addItem('experience', { jobTitle: '', company: '', location: '', duration: '', responsibility: '' })} className="mt-4 text-sm text-blue-600 hover:text-blue-800">
                                + Add Experience
                            </button>
                        </div>
                    </div>

                    {/* Education Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">🎓 Education</h3>
                        <div className="space-y-4">
                            {(data?.education || []).map((edu, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-xl relative">
                                    <button onClick={() => removeItem('education', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">×</button>
                                    <input type="text" value={edu.degree || ''} onChange={(e) => handleItemChange('education', index, 'degree', e.target.value)} placeholder="Degree" className="w-full p-1 mb-2 border rounded" />
                                    <input type="text" value={edu.university || ''} onChange={(e) => handleItemChange('education', index, 'university', e.target.value)} placeholder="University" className="w-full p-1 mb-2 border rounded" />
                                    <input type="text" value={edu.location || ''} onChange={(e) => handleItemChange('education', index, 'location', e.target.value)} placeholder="Location" className="w-full p-1 mb-2 border rounded" />
                                    <input type="text" value={edu.graduationYear || ''} onChange={(e) => handleItemChange('education', index, 'graduationYear', e.target.value)} placeholder="Graduation Year" className="w-full p-1 border rounded" />
                                </div>
                            ))}
                            <button onClick={() => addItem('education', { degree: '', university: '', location: '', graduationYear: '' })} className="mt-4 text-sm text-blue-600 hover:text-blue-800">
                                + Add Education
                            </button>
                        </div>
                    </div>

                    {/* Certifications Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">🏆 Certifications</h3>
                        <div className="space-y-4">
                            {(data?.certifications || []).map((cert, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-xl relative">
                                    <button onClick={() => removeItem('certifications', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">×</button>
                                    <input type="text" value={cert.title || ''} onChange={(e) => handleItemChange('certifications', index, 'title', e.target.value)} placeholder="Certification Title" className="w-full p-1 mb-2 border rounded" />
                                    <input type="text" value={cert.issuingOrganization || ''} onChange={(e) => handleItemChange('certifications', index, 'issuingOrganization', e.target.value)} placeholder="Issuing Organization" className="w-full p-1 mb-2 border rounded" />
                                    <input type="text" value={cert.year || ''} onChange={(e) => handleItemChange('certifications', index, 'year', e.target.value)} placeholder="Year" className="w-full p-1 border rounded" />
                                </div>
                            ))}
                            <button onClick={() => addItem('certifications', { title: '', issuingOrganization: '', year: '' })} className="mt-4 text-sm text-blue-600 hover:text-blue-800">
                                + Add Certification
                            </button>
                        </div>
                    </div>

                    {/* Projects Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">🚀 Projects</h3>
                        <div className="space-y-4">
                            {(data?.projects || []).map((project, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-xl relative">
                                    <button onClick={() => removeItem('projects', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">×</button>
                                    <input type="text" value={project.title || ''} onChange={(e) => handleItemChange('projects', index, 'title', e.target.value)} placeholder="Project Title" className="w-full p-1 mb-2 border rounded" />
                                    <textarea value={project.description || ''} onChange={(e) => handleItemChange('projects', index, 'description', e.target.value)} placeholder="Description" className="w-full p-1 mb-2 border rounded" />
                                    <input type="text" value={project.githubLink || ''} onChange={(e) => handleItemChange('projects', index, 'githubLink', e.target.value)} placeholder="GitHub Link" className="w-full p-1 mb-2 border rounded" />
                                    <input type="text" value={(project.technologiesUsed || []).join(', ')} onChange={(e) => handleItemChange('projects', index, 'technologiesUsed', e.target.value.split(',').map(t => t.trim()))} placeholder="Technologies (comma-separated)" className="w-full p-1 border rounded" />
                                </div>
                            ))}
                            <button onClick={() => addItem('projects', { title: '', description: '', technologiesUsed: [], githubLink: '' })} className="mt-4 text-sm text-blue-600 hover:text-blue-800">
                                + Add Project
                            </button>
                        </div>
                    </div>

                    {/* Achievements Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">🏅 Achievements</h3>
                        <div className="space-y-3">
                            {(data?.achievements || []).map((achievement, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-xl flex items-center">
                                    <input type="text" value={achievement.title || ''} onChange={(e) => handleItemChange('achievements', index, 'title', e.target.value)} placeholder="Achievement" className="w-full p-1 mr-2 border rounded" />
                                    <input type="text" value={achievement.year || ''} onChange={(e) => handleItemChange('achievements', index, 'year', e.target.value)} placeholder="Year" className="w-40 p-1 border rounded" />
                                    <button onClick={() => removeItem('achievements', index)} className="ml-2 text-red-500 hover:text-red-700">×</button>
                                </div>
                            ))}
                            <button onClick={() => addItem('achievements', { title: '', year: '' })} className="mt-4 text-sm text-blue-600 hover:text-blue-800">
                                + Add Achievement
                            </button>
                        </div>
                    </div>

                    {/* Languages Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">🌍 Languages</h3>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <div className="flex flex-wrap gap-2">
                                {(data?.languages || []).map((language, index) => (
                                    <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                        <input
                                            type="text"
                                            value={language.name || ""}
                                            onChange={(e) => handleItemChange('languages', index, 'name', e.target.value)}
                                            className="bg-transparent focus:outline-none w-full"
                                        />
                                        <button onClick={() => removeItem('languages', index)} className="ml-2 text-red-500 hover:text-red-700">×</button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => addItem('languages', { name: 'New Language' })} className="mt-4 text-sm text-blue-600 hover:text-blue-800">
                                + Add Language
                            </button>
                        </div>
                    </div>

                    {/* Interests Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">🎯 Interests</h3>
                        <div className="bg-gray-50 p-4 rounded-xl">
                            <div className="flex flex-wrap gap-2">
                                {(data?.interests || []).map((interest, index) => (
                                    <div key={index} className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                                        <input
                                            type="text"
                                            value={interest.name || ""}
                                            onChange={(e) => handleItemChange('interests', index, 'name', e.target.value)}
                                            className="bg-transparent focus:outline-none w-full"
                                        />
                                        <button onClick={() => removeItem('interests', index)} className="ml-2 text-red-500 hover:text-red-700">×</button>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => addItem('interests', { name: 'New Interest' })} className="mt-4 text-sm text-blue-600 hover:text-blue-800">
                                + Add Interest
                            </button>
                        </div>
                    </div>

                    {/* Extra Information Section */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">📝 Additional Information</h3>
                        <textarea
                            value={data?.extraInformation || ""}
                            onChange={(e) => updateResumeSection('extraInformation', e.target.value)}
                            rows={3}
                            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300 bg-white text-gray-800 resize-none"
                            placeholder="Any additional information (awards, volunteer work, etc.)"
                        />
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <label className="text-sm text-gray-600">Template:</label>
                            <select value={template} onChange={(e) => setTemplate(e.target.value)} className="p-2 border rounded">
                                <option value="professional">Professional</option>
                                <option value="modern">Modern</option>
                            </select>
                        </div>
                         <div className="flex justify-end">
                             <button 
                                 className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                                 onClick={() => {
                                     console.log("Saving resume data:", data);
                                     alert("Resume data saved successfully!");
                                 }}
                             >
                                 💾 Save Resume
                             </button>
                            <button onClick={() => setShowPreview(true)} className="ml-3 px-4 py-2 border rounded text-sm">Preview</button>
                            <button onClick={handleDownload} className="ml-3 px-4 py-2 bg-gray-800 text-white rounded text-sm">Download</button>
                         </div>
                     </div>
                 </div>
             </div>
         );
     }

    // Initial input field to ask user for resume brief
    function ShowInputField() {
        return (
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">Generate a Resume</h1>
                    <p className="text-gray-600">Describe the candidate (skills, role, years of experience). Minimum 50 characters for a good result.</p>
                </div>

                <div className={cardClass}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600 mb-2">Tell us about the candidate</label>
                            <textarea
                                value={userDescription}
                                onChange={(e) => setUserDescription(e.target.value)}
                                className={`${inputLarge} h-40 resize-none`}
                                placeholder="e.g. Senior frontend developer with 6 years experience in React, TypeScript, and team leadership..."
                            />
                        </div>

                        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
                        {success && <div className="text-sm text-green-600 mb-3">{success}</div>}

                        <div className="flex items-center gap-3">
                            <button type="submit" className={primaryButton} disabled={loading}>
                                {loading ? 'Generating...' : 'Generate Resume'}
                            </button>
                            <button type="button" onClick={() => { setUserDescription(''); setError(''); setSuccess(''); }} className="px-4 py-2 border rounded">
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    // Resume preview component (simple)
    function ResumePreview({ data, template }) {
        return (
            <div ref={resumeRef} className="resume-container bg-white text-gray-900">
                <div style={{ textAlign: 'center', marginBottom: 10 }}>
                    <div className="name" style={{fontSize: 34, fontWeight: 900}}>{data?.personalInformation?.fullName || 'Your Name'}</div>
                    <div className="contact muted" style={{fontSize: 12}}>
                        {data?.personalInformation?.phoneNumber || ''} &nbsp;|&nbsp; {data?.personalInformation?.email || ''} &nbsp;|&nbsp; {data?.personalInformation?.linkedIn || ''} &nbsp;|&nbsp; {data?.personalInformation?.gitHub || ''}
                    </div>
                </div>

                <div>
                    <div className="section-title" style={{fontWeight:800}}>Summary</div>
                    <p style={{marginTop:6}}>{data?.summary || ''}</p>

                    <div className="section-title" style={{fontWeight:800}}>Education</div>
                    <ul>
                        {(data?.education || []).map((edu, i) => (
                            <li key={i}>
                                <div className="item-title">{edu.degree} — {edu.university}</div>
                                <div className="muted">{edu.graduationYear} • {edu.location}</div>
                            </li>
                        ))}
                    </ul>

                    <div className="section-title" style={{fontWeight:800}}>Experience</div>
                    <ul>
                        {(data?.experience || []).map((exp, i) => (
                            <li key={i}>
                                <div className="item-title">{exp.jobTitle} — {exp.company}</div>
                                <div className="muted">{exp.duration} • {exp.location}</div>
                                <div>{exp.responsibility}</div>
                            </li>
                        ))}
                    </ul>

                    <div className="section-title" style={{fontWeight:800}}>Projects</div>
                    <ul>
                        {(data?.projects || []).map((p, i) => (
                            <li key={i}>
                                <div className="item-title">{p.title}</div>
                                <div className="muted">{(p.technologiesUsed || []).join(', ')}</div>
                                <div>{p.description}</div>
                            </li>
                        ))}
                    </ul>

                    <div className="section-title" style={{fontWeight:800}}>Skills</div>
                    <div style={{ marginTop: 6, marginBottom: 6 }}>
                        {(data?.skills || []).map((s, i) => (
                            <span key={i} style={{ marginRight: 8, fontSize: 13 }} className="muted">{s.title}</span>
                        ))}
                    </div>

                    <div className="section-title" style={{fontWeight:800}}>Certifications & Achievements</div>
                    <ul>
                        {(data?.certifications || []).map((c, i) => (
                            <li key={`cert-${i}`} className="text-sm">{c.title} — {c.issuingOrganization} ({c.year})</li>
                        ))}
                        {(data?.achievements || []).map((a, i) => (
                            <li key={`ach-${i}`} className="text-sm">{a.title} {a.year ? `— ${a.year}` : ''}</li>
                        ))}
                    </ul>

                    <div className="section-title" style={{fontWeight:800}}>Languages & Interests</div>
                    <div className="muted" style={{ marginBottom: 8 }}>
                        {(data?.languages || []).map((l, i) => l.name).filter(Boolean).join(', ')}
                        { (data?.interests || []).length ? ' • ' + (data.interests.map(it => it.name).filter(Boolean).join(', ')) : '' }
                    </div>

                    {data?.extraInformation && (
                        <>
                            <div className="section-title">Additional Information</div>
                            <div className="text-sm">{data.extraInformation}</div>
                        </>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
            {data !== null ? ShowForm() : ShowInputField()}

            {showPreview && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 py-6">
                    <div className="bg-white p-4 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
                        <div className="flex justify-end mb-4">
                            <button onClick={() => setShowPreview(false)} className="text-gray-600 px-3 py-1">Close</button>
                            <button onClick={handleDownload} className="ml-3 bg-gray-800 text-white px-3 py-1 rounded">Download</button>
                        </div>
                        <ResumePreview data={data} template={template} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default GenerateResume;