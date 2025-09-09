import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="min-h-screen relative z-10">
            {/* Hero Section */}
            <div className="hero min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="hero-content text-center">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient mb-8 leading-tight">
                            Create Your Perfect Resume
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto px-4">
                            Build a professional resume in minutes with our modern, ATS-friendly templates. 
                            Stand out from the crowd and land your dream job.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center px-4">
                            <Link to="/GenerateResume" className="btn-primary-custom text-lg px-10 py-4">
                                🚀 Start Building
                            </Link>
                            <button className="btn btn-outline btn-lg rounded-full px-10 text-lg border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400">
                                📖 Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-bold text-center text-gradient mb-20">
                        Why Choose Our Resume Builder?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="glass-card card-hover p-10 text-center">
                            <div className="text-7xl mb-6">⚡</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Lightning Fast</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">Create a professional resume in under 10 minutes with our intuitive builder.</p>
                        </div>
                        <div className="glass-card card-hover p-10 text-center">
                            <div className="text-7xl mb-6">🎨</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">Beautiful Templates</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">Choose from dozens of modern, recruiter-approved templates that stand out.</p>
                        </div>
                        <div className="glass-card card-hover p-10 text-center">
                            <div className="text-7xl mb-6">🤖</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">ATS Optimized</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">All templates are optimized to pass Applicant Tracking Systems.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home;