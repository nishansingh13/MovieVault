import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { EyeIcon ,EyeClosedIcon } from 'lucide-react';
function Login() {
    const [isLogin, setIsLogin] = useState(true);

    const [showPassword, setShowPassword] = useState(false);
   

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <motion.div 
                className="w-full max-w-[35rem]"
            >
                <div className="bg-gray-900/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-800">
                    <motion.div 
                        className="text-center mb-8"
                        initial={{ x: -100 , opacity: 0 }}
                        animate={{ x:0, opacity: 1 }}
                        transition={{ delay: 0.8  }}
                        
                    >
                        <div  className="text-3xl font-bold text-white">
                            MovieVault
                        </div>
                        <p className="text-gray-400 mt-2">
                            {isLogin ? "Welcome back!" : "Create your account"}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y:20,opacity: 0 }}
                        animate={{ y:0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        Username
                                    </label>
                                    <input 
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
                                        placeholder="Enter your username"
                                    />
                                </motion.div>
                            )}
                            
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Email
                                </label>
                                <input 
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                            
                            <div className="relative">
                                <label className="block text-gray-300 text-sm font-medium mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white "
                                        placeholder="Enter your password"
                                    />
                                    <div 
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 
                                            <EyeIcon className="text-gray-300" /> : 
                                            <EyeClosedIcon className="text-gray-300" />
                                        }
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 rounded-lg bg-purple-500 cursor-pointer text-white"
                            >
                                {isLogin ? "Sign In" : "Sign Up"}
                            </motion.button>
                        </form>

                        <motion.div 
                            className="mt-6 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <button 
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-purple-400 hover:text-purple-300 text-sm cursor-pointer"
                            >
                                {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default Login;
