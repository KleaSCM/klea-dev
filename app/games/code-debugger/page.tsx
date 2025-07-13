import CodeDebugger from "../../components/games/CodeDebugger";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

/**
 * Code Debugger Game Page
 * 
 * A dedicated page for the Code Debugger game featuring:
 * - Full-screen game experience
 * - Navigation and footer integration
 * - Dark/light mode support
 * - Responsive design
 * 
 * @returns {JSX.Element} Code Debugger game page
 */
export default function CodeDebuggerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Game Content */}
      <div className="pt-16">
        <CodeDebugger />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
} 