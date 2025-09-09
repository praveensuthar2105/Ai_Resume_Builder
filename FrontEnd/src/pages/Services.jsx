import React from "react";

function Services() {
    return (
        <div className="min-h-screen py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <h1 className="text-6xl font-bold text-gradient mb-8">Our Services</h1>
                    <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        Everything you need to create, customize, and perfect your resume for landing your dream job.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    <div className="glass-card card-hover p-10 text-center">
                        <div className="text-7xl mb-6">📝</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Resume Builder</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Create professional resumes with our easy-to-use drag-and-drop builder.
                        </p>
                        <div className="badge badge-primary badge-lg px-4 py-2 text-white font-semibold">Free</div>
                    </div>

                    <div className="glass-card card-hover p-10 text-center">
                        <div className="text-7xl mb-6">🎨</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Premium Templates</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Access to 50+ premium templates designed by professionals.
                        </p>
                        <div className="badge badge-primary badge-lg px-4 py-2 text-white font-semibold">Free</div>
                    </div>

                    <div className="glass-card card-hover p-10 text-center">
                        <div className="text-7xl mb-6">📊</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">ATS Analysis</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Check if your resume passes Applicant Tracking Systems.
                        </p>
                        <div className="badge badge-primary badge-lg px-4 py-2 text-white font-semibold">Free</div>
                    </div>

                    <div className="glass-card card-hover p-10 text-center">
                        <div className="text-7xl mb-6">💼</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Cover Letters</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Generate matching cover letters for your applications.
                        </p>
                        <div className="badge badge-primary badge-lg px-4 py-2 text-white font-semibold">Free</div>
                    </div>

                    <div className="glass-card card-hover p-10 text-center">
                        <div className="text-7xl mb-6">📈</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Career Coaching</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            One-on-one sessions with career experts.
                        </p>
                        <div className="badge badge-primary badge-lg px-4 py-2 text-white font-semibold">Free</div>
                    </div>

                    <div className="glass-card card-hover p-10 text-center">
                        <div className="text-7xl mb-6">🔒</div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Privacy Protection</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Your data is secure and never shared with third parties.
                        </p>
                        <div className="badge badge-success badge-lg px-4 py-2 text-white font-semibold">Included</div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="glass-card p-16 text-center">
                    <h2 className="text-4xl font-bold text-gradient mb-8">
                        Ready to Build Your Perfect Resume?
                    </h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of professionals who have landed their dream jobs with our resume builder.
                    </p>
                    <button className="btn-primary-custom text-lg px-12 py-4">
                        🚀 Start Building Now
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Services;