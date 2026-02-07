import Head from 'next/head';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  onSnapshot
} from 'firebase/firestore';
import Layout from '../components/Layout';
import AdminDashboard from '../components/AdminDashboard';
import DoctorCard from '../components/DoctorCard';

export default function Home({ initialData }) {
  const [showAdmin, setShowAdmin] = useState(false);
  const [siteSettings, setSiteSettings] = useState(initialData.settings);
  const [doctors, setDoctors] = useState(initialData.doctors);
  const [successRates, setSuccessRates] = useState(initialData.successRates);
  const [heroSection, setHeroSection] = useState(initialData.hero);
  const [reviews, setReviews] = useState(initialData.reviews);

  // Listen for real-time updates
  useEffect(() => {
    const unsubscribeSettings = onSnapshot(doc(db, 'settings', 'colors'), (doc) => {
      if (doc.exists()) {
        setSiteSettings(prev => ({ ...prev, colors: doc.data() }));
      }
    });

    const unsubscribeHero = onSnapshot(doc(db, 'settings', 'hero'), (doc) => {
      if (doc.exists()) {
        setHeroSection(doc.data());
      }
    });

    const unsubscribeDoctors = onSnapshot(collection(db, 'doctors'), (snapshot) => {
      const docs = {};
      snapshot.forEach((doc) => {
        docs[doc.id] = doc.data();
      });
      setDoctors(docs);
    });

    const unsubscribeRates = onSnapshot(collection(db, 'successRates'), (snapshot) => {
      const rates = {};
      snapshot.forEach((doc) => {
        rates[doc.id] = doc.data();
      });
      setSuccessRates(rates);
    });

    return () => {
      unsubscribeSettings();
      unsubscribeHero();
      unsubscribeDoctors();
      unsubscribeRates();
    };
  }, []);

  // Secret key sequence detector
  useEffect(() => {
    let secretSequence = [];
    const secretCode = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    
    const handleKeyDown = (e) => {
      secretSequence.push(e.key.toLowerCase());
      
      if (secretSequence.length > 9) {
        secretSequence.shift();
      }
      
      if (JSON.stringify(secretSequence) === JSON.stringify(secretCode)) {
        setShowAdmin(true);
        secretSequence = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Apply colors to root
  useEffect(() => {
    if (siteSettings.colors) {
      const root = document.documentElement;
      Object.entries(siteSettings.colors).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [siteSettings.colors]);

  return (
    <>
      <Head>
        <title>{siteSettings.title || 'NAEEM SURGERY CLINIC'}</title>
        <meta name="description" content={siteSettings.description || 'Expert healthcare services'} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-video-container">
            <video className="hero-video" autoPlay muted loop playsInline>
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="container hero-content">
            <div>
              <h1>{heroSection.title || 'Expert Care in a Personal Setting'}</h1>
              <p>{heroSection.subtitle || 'Your health is our priority. Experience compassionate healthcare at NAEEM SURGERY CLINIC'}</p>
              <div className="hero-buttons">
                <a href="#doctors" className="btn btn-primary btn-lg px-4 py-3 me-3">
                  {heroSection.button1 || 'Meet Our Doctors'}
                </a>
                <a href="#contact" className="btn btn-outline-light btn-lg px-4 py-3">
                  {heroSection.button2 || 'Book Appointment'}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-5">
          <div className="container">
            <div className="section-title">
              <h2>About NAEEM SURGERY CLINIC</h2>
            </div>
            
            <div className="row align-items-center mb-5">
              <div className="col-lg-6">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Clinic Building" 
                  className="img-fluid rounded-4 shadow" 
                />
              </div>
              <div className="col-lg-6">
                <h2 className="mb-4">About NAEEM SURGERY CLINIC</h2>
                <p className="lead mb-4">
                  Established in 2010, NAEEM SURGERY CLINIC is a trusted healthcare provider offering 
                  personalized medical services in a warm, welcoming environment.
                </p>
                <p>
                  Our modern facility combines the latest medical technology with a personal touch that 
                  larger hospitals can't match. We focus on building lasting relationships with our patients, 
                  understanding their unique health needs and providing tailored care solutions.
                </p>
                <p>
                  With a team of specialized physicians across 8 medical disciplines, we serve over 10,000 
                  patients annually in our facility. Our clinic is designed for comfort and efficiency, 
                  with private consultation rooms and minimal wait times.
                </p>
                
                <div className="row mt-4">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-check-circle text-primary me-2"></i>
                      <span>Specialized Doctors</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-check-circle text-primary me-2"></i>
                      <span>Same-Day Appointments</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-check-circle text-primary me-2"></i>
                      <span>PHARMACY</span>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-check-circle text-primary me-2"></i>
                      <span>Modern Diagnostic Equipment</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-check-circle text-primary me-2"></i>
                      <span>Personalized Care Plans</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <i className="fas fa-check-circle text-primary me-2"></i>
                      <span>LABS</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row mt-5">
              <div className="col-md-4 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                        <i className="fas fa-heartbeat text-primary fs-4"></i>
                      </div>
                      <h3 className="card-title mb-0">Our Mission</h3>
                    </div>
                    <p className="card-text">
                      To provide personalized, compassionate healthcare that addresses the complete well-being 
                      of each patient, combining medical expertise with a human touch.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                        <i className="fas fa-eye text-success fs-4"></i>
                      </div>
                      <h3 className="card-title mb-0">Our Vision</h3>
                    </div>
                    <p className="card-text">
                      To be the most trusted neighborhood clinic, recognized for exceptional patient care, 
                      medical expertise, and a welcoming environment where patients feel valued.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">
                        <i className="fas fa-handshake text-info fs-4"></i>
                      </div>
                      <h3 className="card-title mb-0">Our Values</h3>
                    </div>
                    <p className="card-text">
                      Compassion, Integrity, Excellence, Personalized Care, and Community Focus guide 
                      everything we do at NAEEM SURGERY CLINIC.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-5 bg-light">
          <div className="container">
            <div className="section-title">
              <h2>Our Medical Services</h2>
            </div>
            
            <div className="row">
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-stethoscope"></i>
                  </div>
                  <div className="service-content">
                    <h3>Family Medicine</h3>
                    <p>
                      Comprehensive primary care for patients of all ages, from infants to seniors. 
                      We provide preventive care, chronic disease management, and acute illness treatment.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-tooth"></i>
                  </div>
                  <div className="service-content">
                    <h3>Orthopedic Care</h3>
                    <p>
                      Expert treatment for bones, joints, and muscles using modern techniques to 
                      restore mobility and relieve pain.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-heartbeat"></i>
                  </div>
                  <div className="service-content">
                    <h3>Gynecology</h3>
                    <p>
                      Comprehensive women's health care including routine exams, pregnancy care, 
                      hormonal management, and personalized treatment plans.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-baby"></i>
                  </div>
                  <div className="service-content">
                    <h3>Pediatrics</h3>
                    <p>
                      Specialized care for infants, children, and adolescents with a child-friendly 
                      environment and pediatric specialists available for all developmental stages.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-brain"></i>
                  </div>
                  <div className="service-content">
                    <h3>Neurology</h3>
                    <p>
                      Diagnosis and treatment of neurological conditions including headaches, migraines, 
                      epilepsy, and nerve disorders with advanced diagnostic tools.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 mb-4">
                <div className="service-card">
                  <div className="service-icon">
                    <i className="fas fa-vial"></i>
                  </div>
                  <div className="service-content">
                    <h3>Lab Services</h3>
                    <p>
                      On-site laboratory for blood tests, urinalysis, and other diagnostic testing 
                      with quick turnaround times for accurate results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Doctors Section */}
        <section id="doctors" className="py-5">
          <div className="container">
            <div className="section-title">
              <h2>Our Medical Team</h2>
            </div>
            
            <div className="row">
              {Object.entries(doctors).map(([id, doctor]) => (
                <div className="col-lg-4 mb-5" key={id}>
                  <DoctorCard 
                    doctor={doctor} 
                    successRate={successRates[id]} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-5 bg-light">
          <div className="container">
            <div className="section-title">
              <h2>What Our Patients Say</h2>
            </div>
            
            <div className="row">
              <div className="col-lg-4 mb-4">
                <div className="testimonial">
                  <div className="testimonial-text">
                    "I've been a patient at NAEEM SURGERY CLINIC for over 5 years, and the level of 
                    care I receive is exceptional. Dr. Johnson takes the time to listen and explain 
                    everything thoroughly. I feel like part of the family here."
                  </div>
                  <div className="testimonial-author">
                    <div className="author-img">JW</div>
                    <div>
                      <h5>Jennifer Williams</h5>
                      <p>Long-term Patient</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="testimonial">
                  <div className="testimonial-text">
                    "Dr. Chen's expertise in cardiology gave me peace of mind when I was diagnosed 
                    with hypertension. His personalized treatment plan and constant support have 
                    improved my heart health significantly."
                  </div>
                  <div className="testimonial-author">
                    <div className="author-img">MR</div>
                    <div>
                      <h5>Michael Rodriguez</h5>
                      <p>Cardiology Patient</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 mb-4">
                <div className="testimonial">
                  <div className="testimonial-text">
                    "As a parent, finding a pediatrician who genuinely cares about my children was 
                    crucial. Dr. Patel makes every visit enjoyable for them while providing excellent 
                    medical care. I couldn't ask for more."
                  </div>
                  <div className="testimonial-author">
                    <div className="author-img">SK</div>
                    <div>
                      <h5>Sarah Kim</h5>
                      <p>Pediatric Patient Parent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-5">
          <div className="container">
            <div className="section-title">
              <h2>Contact Us</h2>
            </div>
            
            <div className="row">
              <div className="col-lg-7 mb-5">
                <div className="card border-0 shadow-sm">
                  <div className="card-body p-5">
                    <h3 className="mb-4">Get In Touch</h3>
                    <form>
                      <div className="row mb-4">
                        <div className="col-md-6">
                          <label className="form-label">Full Name</label>
                          <input type="text" className="form-control" required />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Email Address</label>
                          <input type="email" className="form-control" required />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Subject</label>
                        <input type="text" className="form-control" required />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Message</label>
                        <textarea className="form-control" rows="5" required></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary px-5 py-2">Send Message</button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="contact-info">
                  <h3 className="mb-4">Contact Information</h3>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h5>Address</h5>
                      <p>246 Health Avenue, Suite 100<br />MediCity, CA 98765</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div>
                      <h5>Phone</h5>
                      <p>Main: (555) 123-4567</p>
                      <p>Appointment Line: (555) 987-6543</p>
                      <p>24/7 Nurse Line: (555) 321-7890</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h5>Email</h5>
                      <p>info@naeemsurgeryclinic.com</p>
                      <p>appointments@naeemsurgeryclinic.com</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <h5>Hours</h5>
                      <p>Mon - Fri: 8:00 AM - 7:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                      <p>After Hours: 24/7 Nurse Line Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>

      {showAdmin && (
        <AdminDashboard 
          onClose={() => setShowAdmin(false)} 
          settings={siteSettings}
          hero={heroSection}
          doctors={doctors}
          successRates={successRates}
        />
      )}
    </>
  );
}

// Fetch initial data for SSR
export async function getStaticProps() {
  // In a real app, you would fetch from Firebase here
  // For demo purposes, returning sample data
  return {
    props: {
      initialData: {
        settings: {
          title: "NAEEM SURGERY CLINIC",
          description: "Expert healthcare services",
          colors: {
            "--primary": "#1a73e8",
            "--secondary": "#34a853",
            "--dark": "#096cff",
            "--light": "#f8f9fa",
            "--accent": "#fbbc05"
          }
        },
        doctors: {
          "dr-johnson": {
            name: "Dr. Sarah Johnson",
            specialty: "Family Medicine",
            bio: "Dr. Johnson specializes in preventive care and chronic disease management. She believes in building long-term relationships with patients to provide the most effective care.",
            education: [
              "MD, Harvard Medical School",
              "Residency: Massachusetts General Hospital",
              "BS in Biology, Stanford University"
            ],
            experience: [
              "15 years at NAEEM SURGERY CLINIC",
              "5 years at Boston Medical Center",
              "Founder of Community Health Initiative",
              "Board Certified in Family Medicine"
            ]
          },
          "dr-chen": {
            name: "Dr. Michael Chen",
            specialty: "Cardiology",
            bio: "Dr. Chen focuses on preventive cardiology and innovative treatments for heart conditions. He is known for his compassionate approach and clear communication with patients.",
            education: [
              "MD, Johns Hopkins University",
              "Cardiology Fellowship: Mayo Clinic",
              "BS in Chemistry, MIT"
            ],
            experience: [
              "12 years at NAEEM SURGERY CLINIC",
              "8 years at Cleveland Clinic",
              "Published 25+ research papers on heart health",
              "Board Certified in Cardiology"
            ]
          }
        },
        successRates: {
          "dr-johnson": {
            rate: 98,
            description: "Patient Satisfaction Rate"
          },
          "dr-chen": {
            rate: 95,
            description: "Treatment Success Rate"
          }
        },
        hero: {
          title: "Expert Care in a Personal Setting",
          subtitle: "Your health is our priority. Experience compassionate healthcare at NAEEM SURGERY CLINIC",
          button1: "Meet Our Doctors",
          button2: "Book Appointment"
        },
        reviews: []
      }
    },
    revalidate: 60 // Revalidate every minute
  };
}
