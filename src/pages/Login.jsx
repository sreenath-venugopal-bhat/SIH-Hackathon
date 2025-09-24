import { useState, useEffect } from "react";
import loginImage from "../assets/img3.jpg";
import logo from "../assets/lg1.png";
import backgroundImage from "../assets/downloadbg.jpg"; // Import your background image

export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate if input is email or phone
    const isEmail = emailOrPhone.includes('@');
    const isPhone = /^\d+$/.test(emailOrPhone.replace(/\D/g, '')); // Basic phone number check
    
    console.log("Input:", emailOrPhone, "Type:", isEmail ? "Email" : "Phone", "Password:", password);
    
    if (!isEmail && !isPhone) {
      alert("Please enter a valid email address or phone number");
      return;
    }
    
    alert("Login attempted! Check console.");
  };

  // Function to validate input in real-time (optional)
  const validateInput = (value) => {
    if (!value) return "valid"; // Empty is valid until submit
    const isEmail = value.includes('@');
    const isPhone = /^\d+$/.test(value.replace(/\D/g, ''));
    return isEmail || isPhone ? "valid" : "invalid";
  };

  const inputStatus = validateInput(emailOrPhone);

  return (
    <div 
      className="min-h-screen w-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed" // Optional: creates parallax effect
      }}
    >
      {/* Main container wrapper with fade-in animation */}
      <div className={`w-full max-w-6xl mx-auto my-4 rounded-xl overflow-hidden shadow-2xl transition-all duration-1000 transform ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div 
          className="flex flex-col md:flex-row h-auto md:h-[600px] w-full relative"
          style={{
            backgroundImage: `url(${loginImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          {/* Animated floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-float"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + i * 0.5}s`
                }}
              />
            ))}
          </div>

          {/* Form Section with slide-in animation */}
          <div className={`w-full md:w-1/2 lg:w-2/5 flex items-center justify-center md:justify-start p-6 md:p-12 lg:pl-20 transition-all duration-1000 delay-300 transform ${
        isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}>
            <div 
              className="w-full max-w-md p-6 md:p-10 rounded-2xl shadow-xl border border-white/30 relative overflow-hidden"
              style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
              }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer -skew-x-12" />
              
              <div className="relative z-10">
                {/* Logo and Title with bounce animation */}
                <div className={`flex flex-col items-center justify-center mb-6 md:mb-8 transition-all duration-700 delay-500 transform ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}>
                  <div className="flex items-center justify-center mb-3 md:mb-4">
                    <img 
                      src={logo} 
                      alt="EcoDesh Logo" 
                      className="h-10 w-10 md:h-12 md:w-12 mr-3 drop-shadow-lg animate-pulse-slow"
                    />
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#669D31] to-[#558B2F] bg-clip-text text-transparent animate-gradient">
                      EcoDesh
                    </h2>
                  </div>
                  <p className="text-gray-600 text-center text-xs md:text-sm animate-fade-in">Welcome back! Please login to your account</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  {/* Input fields with staggered animations */}
                  <div className={`space-y-2 transition-all duration-700 delay-700 transform ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email or Phone Number</label>
                    <input
                      type="text"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      className={`w-full px-4 py-3 text-sm md:text-base border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                        inputStatus === 'invalid' && emailOrPhone 
                          ? 'border-red-300 focus:ring-red-500' 
                          : 'border-gray-300 focus:ring-green-500'
                      }`}
                      placeholder="Email or Phone number"
                      required
                    />
                    {inputStatus === 'invalid' && emailOrPhone && (
                      <p className="text-red-500 text-xs mt-1 animate-fade-in">
                        Please enter a valid email or phone number
                      </p>
                    )}
                  </div>
                  
                  <div className={`space-y-2 transition-all duration-700 delay-900 transform ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:shadow-md hover:scale-[1.02]"
                      placeholder="Password"
                      required
                    />
                  </div>
                  
                  {/* Animated submit button */}
                  <div className={`transition-all duration-700 delay-1100 transform ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
                    <button
                      type="submit"
                      className="w-full text-white py-3 text-sm md:text-base rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                      style={{ 
                        background: "linear-gradient(135deg, #669D31 0%, #7cb342 100%)"
                      }}
                    >
                      {/* Button shine effect */}
                      <span className="absolute inset-0 bg-white/20 -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      <span className="relative z-10">Sign In</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Empty space on the right side - hidden on mobile */}
          <div className="hidden md:block md:w-1/2 lg:w-3/5"></div>
        </div>
      </div>

      {/* Add custom animations to your CSS file */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-100px) rotate(180deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-float {
          animation: float infinite ease-in-out;
        }
        .animate-shimmer {
          animation: shimmer 4s infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
      `}</style>
    </div>
  );
}