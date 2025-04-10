import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Database, Trash2, ArrowRight } from 'lucide-react'

function Admin() {
    const navigate = useNavigate();
    
     useEffect(() => {
            const data = localStorage.getItem("user");
            const parsedData = JSON.parse(data);
            if(!data || parsedData?.role==0){
              navigate("/"); 
            }
          },[]);
           
  return (
   
    <div className='bg-black min-h-screen flex justify-center items-center'>
      <motion.div 
        className='bg-gray-900/50 border border-gray-800 rounded-xl p-8 md:p-12 shadow-lg shadow-purple-900/20 max-w-3xl w-full'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className='text-purple-500 font-bold text-3xl md:text-5xl lg:text-6xl text-center mb-8'
          initial={{ x: -100, opacity: 0 }}
          animate={{ x:0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Welcome Admin
        </motion.div>
        
        <motion.div 
          className='text-white space-y-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <motion.div 
            className='text-center text-xl text-gray-300 mb-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.3 }}
          >
            What would you like to do today?
          </motion.div>
          
          <motion.div 
            className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.3 }}
          >
            <motion.button
              className='flex items-center cursor-pointer gap-2 px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white font-medium rounded-lg w-full md:w-auto justify-center border border-purple-500 transition-all duration-300'
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={()=>navigate('/admin/add-movie')}
            >
              <Database className="w-5 h-5" /> 
              Add Movies to DataBase
              <ArrowRight className="w-4 h-4 ml-1" />
            </motion.button>
            
            <motion.button
            onClick={()=>navigate('/admin/remove-movie')}
              className='flex cursor-pointer items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-lg w-full md:w-auto justify-center border border-zinc-700 transition-all duration-300'
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Trash2 className="w-5 h-5 text-red-400" /> 
              Remove Movies from DataBase
            </motion.button>
          </motion.div>
          
         
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Admin
