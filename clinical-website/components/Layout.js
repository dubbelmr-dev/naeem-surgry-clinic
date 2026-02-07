import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
          rel="stylesheet" 
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
        />
      </Head>
      
      <Navbar />
      
      <main>{children}</main>
      
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="footer-about">
                <div className="footer-logo">NAEEM SURGERY CLINIC</div>
                <p>
                  Providing personalized healthcare services with compassion and expertise since 2010. 
                  Our mission is to improve the health and well-being of our community.
                </p>
                <div className="social-links">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 mb-4">
              <div className="footer-links">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#doctors">Our Doctors</a></li>
                  <li><a href="#testimonials">Testimonials</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 mb-4">
              <div className="footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li><a href="#">Family Medicine</a></li>
                  <li><a href="#">Dental Care</a></li>
                  <li><a href="#">Cardiology</a></li>
                  <li><a href="#">Pediatrics</a></li>
                  <li><a href="#">Neurology</a></li>
                  <li><a href="#">Internal Medicine</a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 mb-4">
              <div className="footer-links">
                <h4>Contact Info</h4>
                <ul>
                  <li><i className="fas fa-map-marker-alt me-2"></i> 246 Health Avenue, MediCity</li>
                  <li><i className="fas fa-phone-alt me-2"></i> (555) 123-4567</li>
                  <li><i className="fas fa-envelope me-2"></i> info@naeemsurgeryclinic.com</li>
                  <li><i className="fas fa-clock me-2"></i> Mon-Sat: 8AM-7PM</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023 NAEEM SURGERY CLINIC. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Secret access hint */}
      <div className="secret-access" title="Press 'ASDFGHJKL' to access admin panel">ADMIN</div>
      
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
};

export default Layout;
