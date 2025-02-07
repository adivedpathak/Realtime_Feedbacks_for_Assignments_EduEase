import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

function LandingNav() {
  return (
<nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                EduFeedback
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/signin">
                <Button variant="ghost" className="text-gray-700 hover:text-purple-600">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>  )
}

export default LandingNav