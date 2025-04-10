import React from 'react'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import { motion } from 'framer-motion'
import { Film, Code, Github, Linkedin, Mail } from 'lucide-react'

function About() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" }
    }
  }

  

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
 
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative pt-24 pb-16"
      >
        <div className="" />
        <div className=" mx-auto px-4 ">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-purple-500 mb-4">About MovieVault</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your premium destination for discovering and renting the latest movies online.
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-12"
      >
        <motion.div 
          variants={itemVariants}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/4 flex justify-center">
              <Film className="w-24 h-24 text-purple-500" />
            </div>
            <div className="md:w-3/4">
              <h2 className="text-2xl font-bold text-white mb-4">Our Project</h2>
              <p className="text-gray-300 mb-4">
                MovieVault is a modern movie rental platform built with React and Node.js. Our application 
                provides users with an intuitive interface to browse, search, and rent movies from our 
                extensive collection.
              </p>
              <p className="text-gray-300 mb-4">
                With features like real-time search, movie recommendations, and secure payment processing, 
                MovieVault offers a seamless movie rental experience.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="px-3 py-1 bg-purple-800 text-purple-200 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-purple-800 text-purple-200 rounded-full text-sm">Node.js</span>
                <span className="px-3 py-1 bg-purple-800 text-purple-200 rounded-full text-sm">MongoDB</span>
                <span className="px-3 py-1 bg-purple-800 text-purple-200 rounded-full text-sm">Express</span>
                <span className="px-3 py-1 bg-purple-800 text-purple-200 rounded-full text-sm">Tailwind CSS</span>
                <span className="px-3 py-1 bg-purple-800 text-purple-200 rounded-full text-sm">Framer Motion</span>
              </div>
            </div>
          </div>
        </motion.div>

    
      </motion.div>

      {/* Features Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-12"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-bold text-center text-purple-500 mb-12"
        >
          Key Features
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Extensive Movie Database", description: "Access thousands of movies from various genres and eras." },
            { title: "Personalized Recommendations", description: "Get movie suggestions based on your viewing history and preferences." },
            { title: "Secure Rental System", description: "Rent movies with confidence using our secure payment processing." },
            { title: "HD Streaming", description: "Enjoy high-definition streaming with adaptive quality based on your connection." },
            { title: "Responsive Design", description: "Access MovieVault from any device with our fully responsive interface." },
            { title: "User Reviews", description: "Read and write reviews to help the community discover great films." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 hover:bg-gray-800/30 transition-colors"
            >
              <Code className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

   
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-12 mb-8"
      >
        <motion.div 
          variants={itemVariants}
          className="border border-gray-800 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Have questions about MovieVault? Interested in collaborating with our team? 
            We'd love to hear from you!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  )
}

export default About
