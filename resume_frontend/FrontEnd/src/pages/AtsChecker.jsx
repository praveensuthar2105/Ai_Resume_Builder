import React, { useState, useEffect } from 'react';
import ResumeService from '../api/ResumeService';
import { FiUploadCloud, FiCheckCircle, FiXCircle, FiChevronDown } from 'react-icons/fi';

const AtsChecker = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [atsResult, setAtsResult] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showUploader, setShowUploader] = useState(true);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
            setError('');
        } else {
            setSelectedFile(null);
            setError('Please select a valid PDF file.');
        }
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            setError('Please select a file first.');
            return;
        }

        setLoading(true);
        setError('');
        setAtsResult(null);

        try {
                        const data = await ResumeService.checkAtsScore(file);
            if (response && response.data) {
                setAtsResult(response.data);
                setShowUploader(false); // Hide uploader on success
            } else {
                setError('Failed to get ATS score. The response was empty or invalid.');
            }
        } catch (err) {
            setError('An error occurred while checking the ATS score. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setAtsResult(null);
        setError('');
        setShowUploader(true);
    };

    const ScoreCircle = ({ score }) => {
        const [offset, setOffset] = useState(251.2); // Circumference of circle
        const scoreValue = parseInt(score, 10);
        const circumference = 2 * Math.PI * 40; // 2 * pi * r

        useEffect(() => {
            const progress = ((100 - scoreValue) / 100) * circumference;
            setOffset(progress);
        }, [scoreValue, circumference]);

        return (
            <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                        className="text-gray-200"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                    />
                    {/* Progress circle */}
                    <circle
                        className="text-blue-600"
                        strokeWidth="10"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-bold text-gray-800">{score}</span>
                </div>
            </div>
        );
    };
    
    const AccordionItem = ({ section, suggestion, index }) => {
        const [isOpen, setIsOpen] = useState(index === 0); // Open first item by default
        return (
            <div className="border-b border-gray-200">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center py-4 px-2 text-left text-lg font-semibold text-gray-800 hover:bg-gray-50"
                >
                    <span>{section}</span>
                    <FiChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                    <div className="p-4 bg-gray-50 text-gray-600">
                        <p>{suggestion}</p>
                    </div>
                )}
            </div>
        );
    };


    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="container mx-auto p-4 sm:p-8">
                <div className={`transition-all duration-500 ${showUploader ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 invisible'}`}>
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">ATS Resume Score Checker</h1>
                        <p className="text-lg text-gray-600 mb-8">Upload your resume to see how it stacks up against applicant tracking systems.</p>
                    </div>
                    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                        <div className="flex flex-col items-center justify-center w-full">
                            <label htmlFor="resume-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <FiUploadCloud className="w-12 h-12 text-gray-400 mb-4" />
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">PDF only (MAX. 5MB)</p>
                                </div>
                                <input id="resume-upload" type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
                            </label>
                            {selectedFile && <p className="mt-4 text-sm text-gray-600">Selected file: <span className="font-medium">{selectedFile.name}</span></p>}
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !selectedFile}
                                className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 text-lg"
                            >
                                {loading ? 'Analyzing...' : 'Check My Score'}
                            </button>
                        </div>
                        {error && <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-lg text-center">{error}</div>}
                    </div>
                </div>

                {loading && (
                    <div className="text-center mt-8">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                        <p className="mt-4 text-xl text-gray-600">Analyzing your resume, this may take a moment...</p>
                    </div>
                )}

                {atsResult && (
                    <div className="animate-fade-in">
                        <div className="text-center mb-10">
                            <h2 className="text-4xl font-bold text-gray-800">Your Analysis Report</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column: Score */}
                            <div className="lg:col-span-1 bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center flex flex-col justify-center">
                                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Overall ATS Score</h3>
                                <ScoreCircle score={atsResult.atsScore} />
                                <div className="mt-6 space-y-3">
                                    {Object.entries(atsResult.scoreBreakdown).map(([key, value]) => (
                                        <div key={key} className="text-left">
                                            <div className="flex justify-between items-center mb-1">
                                                <p className="text-base font-medium text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                                <p className="text-base font-bold text-gray-800">{value}</p>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(parseInt(value.split('/')[0]) / parseInt(value.split('/')[1])) * 100}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column: Details */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                                        <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center"><FiCheckCircle className="mr-2" /> Strengths</h3>
                                        <ul className="space-y-3 list-inside text-gray-700">
                                            {atsResult.strengths.map((strength, index) => <li key={index} className="flex items-start"><span className="text-green-500 mr-2 mt-1">&#10003;</span>{strength}</li>)}
                                        </ul>
                                    </div>
                                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                                        <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center"><FiXCircle className="mr-2" /> Areas for Improvement</h3>
                                        <ul className="space-y-3 list-inside text-gray-700">
                                            {atsResult.weaknesses.map((weakness, index) => <li key={index} className="flex items-start"><span className="text-red-500 mr-2 mt-1">&#10007;</span>{weakness}</li>)}
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Detailed Suggestions</h3>
                                    <div className="space-y-2">
                                        {atsResult.detailedSuggestions.map((item, index) => (
                                            <AccordionItem key={index} section={item.section} suggestion={item.suggestion} index={index} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-10">
                            <button
                                onClick={handleReset}
                                className="px-8 py-3 bg-gray-700 text-white font-bold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-all duration-300"
                            >
                                Check Another Resume
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AtsChecker;
