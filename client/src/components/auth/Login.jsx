import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon ,EyeClosedIcon, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useConfig } from '../../context/ConfigContext';
import { toast } from 'sonner'

function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [loading,setLoading] = useState(false);
    const {server} = useConfig();

    const registerUser = async() => {
        try {
            setLoading(true);
            const data = {username, email, password};
            const res = await axios.post(`${server}/api/auth/register`, data);
            if(res.status === 200) {
                toast.success('Account created successfully');
                setIsLogin(true);
            }
        } catch(err) {
            toast.error(err.response?.data?.error || "Something went wrong");
        }
        finally {
            setLoading(false);
        }
    }

    const loginUser = async() => {
        try {
            setLoading(true);
            const data = {email, password};
            const res = await axios.post(`${server}/api/auth/login`, data);
            if(res.status === 200) {
                
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data));
                localStorage.setItem("isAdmin", res.data.role);
                if(res.data.role === 1) {
                   toast.success('Admin logged in successfully');
                }
                else{
                    toast.success('User logged in successfully');      
                }
                if(res.data.role === 1) {
                    navigate("/admin");
                }
                else{
                navigate("/");
                }
            }
        } catch(err) {
            toast.error(err.response?.data?.error || "Invalid credentials");
        }
        finally{
            setLoading(false);
        }
    }

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
                                    value={username}
                                        onChange={(e)=>setUsername(e.target.value)}
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
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
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
                                    value ={password}
                                    onChange={(e)=>setPassword(e.target.value)}
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
                             {!loading?(           
                            <motion.button
                            onClick={isLogin?()=>loginUser():()=>registerUser()}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 rounded-lg bg-purple-500 cursor-pointer text-white"
                            >
                                {isLogin ? "Sign In" : "Sign Up"}
                            </motion.button>):<div   className="flex justify-center items-center w-full py-3 rounded-lg bg-purple-700 cursor-pointer text-white">
                                {isLogin?"Logging in":"Registering user"} <Loader2 className='animate-spin p-1'/>
                                </div>}
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
