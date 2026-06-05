/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Milestones from './components/Milestones';
import WhyChoose from './components/WhyChoose';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Careers from './components/Careers';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { ToastProvider } from './components/Toast';
import { LanguageProvider } from './components/LanguageContext';
import { ThemeProvider } from './components/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <main className="antialiased selection:bg-brand-accent selection:text-brand-primary dark:bg-slate-950 transition-colors duration-300">
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Milestones />
            <WhyChoose />
            <Portfolio />
            <Process />
            <Testimonials />
            <Careers />
            <FAQ />
            <CTA />
            <Contact />
            <Footer />
            <WhatsAppButton />
          </main>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
