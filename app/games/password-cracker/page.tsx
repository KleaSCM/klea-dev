import PasswordCracker from "../../components/games/PasswordCracker";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

/**
 * Password Cracker Game Page
 * 
 * A dedicated page for the Password Cracker game featuring:
 * - Full-screen game experience
 * - Navigation and footer integration
 * - Dark/light mode support
 * - Responsive design
 * 
 * @returns {JSX.Element} Password Cracker game page
 */
export default function PasswordCrackerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-100 dark:from-slate-900 dark:via-red-900/20 dark:to-orange-900/20">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Game Content */}
      <div className="pt-16">
        <PasswordCracker />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
} 