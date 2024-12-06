import { Button } from '@/components/ui/button'
import Header from '@/components/ui/custom/Header'
import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const isSignedIn = false; // Replace this with the actual isSignedIn state or prop

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Create Professional Resumes with AI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Build stunning resumes in minutes using our advanced AI technology
        </p>
        <div>
        {
                isSignedIn
                    ? <div className='flex gap-2 items-center'>
                            <Link to="/dashboard">
                                <Button variant="outline">Dashboard</Button>
                            </Link>
                            <UserButton />
                        </div>
                    : <Link to='/auth/sign-in'>
                            <Button >Create your resume now</Button>
                        </Link>
            }
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
const features = [
  {
    title: "AI-Powered Writing",
    description: "Let our AI help you write professional and impactful content for your resume."
  },
  {
    title: "Beautiful Templates",
    description: "Choose from dozens of professionally designed templates."
  },
  {
    title: "Easy Customization",
    description: "Customize every aspect of your resume with our intuitive editor."
  }
]

const faqs = [
  {
    question: "How does the AI resume builder work?",
    answer: "Our AI analyzes your input and helps create professional content while suggesting improvements."
  },
  {
    question: "Can I download my resume?",
    answer: "Yes, you can download your resume in formats PDF."
  },
  {
    question: "Is my data secure?",
    answer: "We use enterprise-grade encryption to ensure your personal information is always protected."
  }
]

export default Home