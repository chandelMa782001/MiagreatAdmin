import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { images } from '../../utils/Image'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)



  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    setIsLoading(true)
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
     
      if (formData.username === 'admin' && formData.password === 'password') {
        console.log('Login successful:', formData)
        
        navigate('/dashboard')
      } else {
        console.log('Invalid username or password')
      }
    } catch (error) {
      console.log('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full">
     
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8 backdrop-blur-sm">

          <div className="text-center mb-6">
            <div className="mx-auto  flex items-center justify-center rounded-xl    p-2 ">
              <img 
                src={images.companyLogo} 
                alt="MalgreatGroup Logo" 
                className="w-[130px] h-full object-contain"
              />
            </div>
            
            <p className="text-base sm:text-lg text-gray-600 font-medium">
              Admin Login
            </p>
          </div>


        
          <form onSubmit={handleSubmit} className="space-y-4">
         
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 pl-12 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-sm sm:text-base border-gray-300 focus:ring-green-500 focus:border-green-500"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>

            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 pl-12 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 text-sm sm:text-base border-gray-300 focus:ring-green-500 focus:border-green-500"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>

            </div>


            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

    
          <div className="mt-6 space-y-3 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              By signing in, you automatically accept our{' '}
              <a href="#" className="text-green-600 hover:text-green-700 underline font-medium transition-colors">
                Terms & Conditions
              </a>
            </p>
            <a 
              href="#" 
              className="inline-flex items-center text-sm text-green-600 hover:text-green-700 transition-colors duration-200 font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Forgot your password?
            </a>
          </div>
        </div>



      </div>
    </div>
  )
}
export default Login
