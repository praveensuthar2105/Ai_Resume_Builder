import React from "react";

function About() {
    return (
        <div className="min-h-screen py-24 px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <h1 className="text-6xl font-bold text-gradient mb-8">About Resume Builder</h1>
                    <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        Empowering professionals to create outstanding resumes that open doors to new opportunities.
                    </p>
                </div>

                {/* Story Section */}
                <div className="glass-card p-12 mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8 text-center">
                        We believe that everyone deserves a chance to showcase their skills and experience in the best possible way. 
                        That's why we created Resume Builder - a modern, intuitive platform that makes creating professional 
                        resumes simple and enjoyable.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed text-center">
                        Our team of designers and developers worked tirelessly to create templates that not only look stunning 
                        but also pass through Applicant Tracking Systems (ATS) with ease.
                    </p>
                </div>

                {/* Mission & Values */}
                <div className="grid md:grid-cols-2 gap-10 mb-16">
                    <div className="glass-card card-hover p-10 text-center">
                        <div className="text-6xl mb-6">🎯</div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            To democratize access to professional resume design and help job seekers 
                            present their best selves to potential employers.
                        </p>
                    </div>
                    <div className="glass-card card-hover p-10 text-center">
                        <div className="text-6xl mb-6">💎</div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Values</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Simplicity, accessibility, and excellence in design. We believe great tools 
                            should be intuitive and available to everyone.
                        </p>
                    </div>
                </div>

                {/* Team Section */}
                <div className="glass-card p-12 text-center">
                    <h2 className="text-4xl font-bold text-gradient mb-8">Built with ❤️ by Developers</h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        We're passionate about creating tools that make a real difference in people's careers. 
                        Every feature is crafted with care and attention to detail to ensure you get the best possible resume.
                    </p>
                </div>
            </div>
        </div>
    )
}
export default About;