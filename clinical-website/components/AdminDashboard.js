import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  doc, 
  setDoc, 
  collection, 
  addDoc,
  serverTimestamp
} from 'firebase/firestore';

const AdminDashboard = ({ onClose, settings, hero, doctors, successRates }) => {
  const [colors, setColors] = useState(settings.colors);
  const [selectedDoctor, setSelectedDoctor] = useState('dr-johnson');
  const [doctorForm, setDoctorForm] = useState({
    name: '',
    specialty: '',
    bio: '',
    education: '',
    experience: ''
  });
  const [successRateForm, setSuccessRateForm] = useState({
    doctorId: 'dr-johnson',
    rate: 95,
    description: 'Patient Satisfaction Rate'
  });
  const [heroForm, setHeroForm] = useState(hero);
  const [status, setStatus] = useState({ show: false, message: '', type: '' });

  // Initialize forms with existing data
  useEffect(() => {
    setColors(settings.colors);
    setHeroForm(hero);
    
    if (doctors[selectedDoctor]) {
      const doctor = doctors[selectedDoctor];
      setDoctorForm({
        name: doctor.name,
        specialty: doctor.specialty,
        bio: doctor.bio,
        education: doctor.education.join('\n'),
        experience: doctor.experience.join('\n')
      });
    }
    
    if (successRates[selectedDoctor]) {
      setSuccessRateForm({
        doctorId: selectedDoctor,
        rate: successRates[selectedDoctor].rate,
        description: successRates[selectedDoctor].description
      });
    }
  }, [settings, hero, doctors, successRates, selectedDoctor]);

  const showStatus = (message, type = 'success') => {
    setStatus({ show: true, message, type });
    setTimeout(() => {
      setStatus({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleColorChange = (key, value) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  const applyColors = () => {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    showStatus('Colors applied temporarily. Click "Save Colors" to make permanent.');
  };

  const saveColors = async () => {
    try {
      await setDoc(doc(db, 'settings', 'colors'), colors);
      showStatus('Colors saved successfully!');
    } catch (error) {
      showStatus('Error saving colors: ' + error.message, 'error');
    }
  };

  const handleDoctorChange = (field, value) => {
    setDoctorForm(prev => ({ ...prev, [field]: value }));
  };

  const updateDoctorPreview = () => {
    showStatus('Doctor profile updated temporarily. Click "Save Doctor Profile" to make permanent.');
  };

  const saveDoctorProfile = async () => {
    try {
      const doctorData = {
        name: doctorForm.name,
        specialty: doctorForm.specialty,
        bio: doctorForm.bio,
        education: doctorForm.education.split('\n'),
        experience: doctorForm.experience.split('\n')
      };
      
      await setDoc(doc(db, 'doctors', selectedDoctor), doctorData);
      showStatus(`Doctor profile for ${doctorForm.name} saved successfully!`);
    } catch (error) {
      showStatus('Error saving doctor profile: ' + error.message, 'error');
    }
  };

  const handleSuccessRateChange = (field, value) => {
    setSuccessRateForm(prev => ({ ...prev, [field]: value }));
  };

  const updateSuccessRate = () => {
    showStatus('Success rate updated temporarily. Click "Save Success Rate" to make permanent.');
  };

  const saveSuccessRate = async () => {
    try {
      const rateData = {
        doctorId: successRateForm.doctorId,
        rate: parseInt(successRateForm.rate),
        description: successRateForm.description
      };
      
      await setDoc(doc(db, 'successRates', successRateForm.doctorId), rateData);
      showStatus(`Success rate for ${doctors[successRateForm.doctorId]?.name || 'doctor'} saved successfully!`);
    } catch (error) {
      showStatus('Error saving success rate: ' + error.message, 'error');
    }
  };

  const handleHeroChange = (field, value) => {
    setHeroForm(prev => ({ ...prev, [field]: value }));
  };

  const updateHero = () => {
    showStatus('Hero section updated temporarily. Click "Save Hero Section" to make permanent.');
  };

  const saveHero = async () => {
    try {
      await setDoc(doc(db, 'settings', 'hero'), heroForm);
      showStatus('Hero section saved successfully!');
    } catch (error) {
      showStatus('Error saving hero section: ' + error.message, 'error');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title"><i className="fas fa-cogs"></i> Admin Dashboard</h1>
          <button className="btn-close-dashboard" onClick={onClose}>
            <i className="fas fa-times"></i> Close Dashboard
          </button>
        </div>
        
        {status.show && (
          <div className={`status-message status-${status.type}`}>
            {status.message}
          </div>
        )}
        
        <div className="dashboard-grid">
          {/* Color Customization */}
          <div className="dashboard-card">
            <h3><i className="fas fa-palette"></i> Color Customization</h3>
            <div className="color-picker">
              <div 
                className={`color-option ${colors['--primary'] === '#1a73e8' ? 'active' : ''}`} 
                style={{background: '#1a73e8'}} 
                onClick={() => handleColorChange('--primary', '#1a73e8')}
              ></div>
              <div 
                className={`color-option ${colors['--secondary'] === '#34a853' ? 'active' : ''}`} 
                style={{background: '#34a853'}} 
                onClick={() => handleColorChange('--secondary', '#34a853')}
              ></div>
              <div 
                className={`color-option ${colors['--dark'] === '#096cff' ? 'active' : ''}`} 
                style={{background: '#096cff'}} 
                onClick={() => handleColorChange('--dark', '#096cff')}
              ></div>
              <div 
                className={`color-option ${colors['--accent'] === '#fbbc05' ? 'active' : ''}`} 
                style={{background: '#fbbc05'}} 
                onClick={() => handleColorChange('--accent', '#fbbc05')}
              ></div>
              <div 
                className={`color-option ${colors['--light'] === '#f8f9fa' ? 'active' : ''}`} 
                style={{background: '#f8f9fa'}} 
                onClick={() => handleColorChange('--light', '#f8f9fa')}
              ></div>
            </div>
            <div className="form-group">
              <label htmlFor="custom-primary">Primary Color</label>
              <input 
                type="color" 
                id="custom-primary" 
                className="form-control" 
                value={colors['--primary']} 
                onChange={(e) => handleColorChange('--primary', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="custom-secondary">Secondary Color</label>
              <input 
                type="color" 
                id="custom-secondary" 
                className="form-control" 
                value={colors['--secondary']} 
                onChange={(e) => handleColorChange('--secondary', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="custom-dark">Dark Color</label>
              <input 
                type="color" 
                id="custom-dark" 
                className="form-control" 
                value={colors['--dark']} 
                onChange={(e) => handleColorChange('--dark', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="custom-accent">Accent Color</label>
              <input 
                type="color" 
                id="custom-accent" 
                className="form-control" 
                value={colors['--accent']} 
                onChange={(e) => handleColorChange('--accent', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="custom-light">Light Color</label>
              <input 
                type="color" 
                id="custom-light" 
                className="form-control" 
                value={colors['--light']} 
                onChange={(e) => handleColorChange('--light', e.target.value)}
              />
            </div>
            <button className="btn-dashboard" onClick={applyColors}>
              <i className="fas fa-eye"></i> Apply Colors
            </button>
            <button className="btn-dashboard" onClick={saveColors}>
              <i className="fas fa-save"></i> Save Colors
            </button>
          </div>
          
          {/* Doctor Profile Management */}
          <div className="dashboard-card">
            <h3><i className="fas fa-user-md"></i> Doctor Profile Management</h3>
            <div className="form-group">
              <label htmlFor="doctor-select">Select Doctor</label>
              <select 
                id="doctor-select" 
                className="form-control"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                <option value="dr-johnson">Dr. Sarah Johnson</option>
                <option value="dr-chen">Dr. Michael Chen</option>
                <option value="dr-patel">Dr. Aisha Patel</option>
                <option value="dr-garcia">Dr. Robert Garcia</option>
                <option value="dr-wong">Dr. Emily Wong</option>
                <option value="dr-reed">Dr. Thomas Reed</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="doctor-name">Doctor Name</label>
              <input 
                type="text" 
                id="doctor-name" 
                className="form-control" 
                placeholder="Dr. John Smith"
                value={doctorForm.name}
                onChange={(e) => handleDoctorChange('name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="doctor-specialty">Specialty</label>
              <input 
                type="text" 
                id="doctor-specialty" 
                className="form-control" 
                placeholder="Cardiologist"
                value={doctorForm.specialty}
                onChange={(e) => handleDoctorChange('specialty', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="doctor-bio">Biography</label>
              <textarea 
                id="doctor-bio" 
                className="form-control" 
                placeholder="Doctor's biography..."
                value={doctorForm.bio}
                onChange={(e) => handleDoctorChange('bio', e.target.value)}
                rows="4"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="doctor-education">Education Details</label>
              <textarea 
                id="doctor-education" 
                className="form-control" 
                placeholder="Education details (one per line)..."
                value={doctorForm.education}
                onChange={(e) => handleDoctorChange('education', e.target.value)}
                rows="3"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="doctor-experience">Experience Details</label>
              <textarea 
                id="doctor-experience" 
                className="form-control" 
                placeholder="Experience details (one per line)..."
                value={doctorForm.experience}
                onChange={(e) => handleDoctorChange('experience', e.target.value)}
                rows="3"
              ></textarea>
            </div>
            <button className="btn-dashboard" onClick={updateDoctorPreview}>
              <i className="fas fa-sync-alt"></i> Update Doctor Profile
            </button>
            <button className="btn-dashboard" onClick={saveDoctorProfile}>
              <i className="fas fa-cloud-upload-alt"></i> Save Doctor Profile
            </button>
          </div>
          
          {/* Success Rates Management */}
          <div className="dashboard-card">
            <h3><i className="fas fa-chart-line"></i> Success Rates</h3>
            <div className="form-group">
              <label htmlFor="success-rate-doctor">Doctor</label>
              <select 
                id="success-rate-doctor" 
                className="form-control"
                value={successRateForm.doctorId}
                onChange={(e) => handleSuccessRateChange('doctorId', e.target.value)}
              >
                <option value="dr-johnson">Dr. Sarah Johnson</option>
                <option value="dr-chen">Dr. Michael Chen</option>
                <option value="dr-patel">Dr. Aisha Patel</option>
                <option value="dr-garcia">Dr. Robert Garcia</option>
                <option value="dr-wong">Dr. Emily Wong</option>
                <option value="dr-reed">Dr. Thomas Reed</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="success-rate-value">Success Rate (%)</label>
              <input 
                type="number" 
                id="success-rate-value" 
                className="form-control" 
                min="0" 
                max="100" 
                placeholder="98"
                value={successRateForm.rate}
                onChange={(e) => handleSuccessRateChange('rate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="success-rate-description">Description</label>
              <input 
                type="text" 
                id="success-rate-description" 
                className="form-control" 
                placeholder="Patient satisfaction rate"
                value={successRateForm.description}
                onChange={(e) => handleSuccessRateChange('description', e.target.value)}
              />
            </div>
            <button className="btn-dashboard" onClick={updateSuccessRate}>
              <i className="fas fa-sync-alt"></i> Update Success Rate
            </button>
            <button className="btn-dashboard" onClick={saveSuccessRate}>
              <i className="fas fa-cloud-upload-alt"></i> Save Success Rate
            </button>
          </div>
          
          {/* Hero Section Customization */}
          <div className="dashboard-card">
            <h3><i className="fas fa-home"></i> Hero Section</h3>
            <div className="form-group">
              <label htmlFor="hero-title">Hero Title</label>
              <input 
                type="text" 
                id="hero-title" 
                className="form-control" 
                value={heroForm.title}
                onChange={(e) => handleHeroChange('title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="hero-subtitle">Hero Subtitle</label>
              <textarea 
                id="hero-subtitle" 
                className="form-control" 
                value={heroForm.subtitle}
                onChange={(e) => handleHeroChange('subtitle', e.target.value)}
                rows="3"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="hero-button1">Button 1 Text</label>
              <input 
                type="text" 
                id="hero-button1" 
                className="form-control" 
                value={heroForm.button1}
                onChange={(e) => handleHeroChange('button1', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="hero-button2">Button 2 Text</label>
              <input 
                type="text" 
                id="hero-button2" 
                className="form-control" 
                value={heroForm.button2}
                onChange={(e) => handleHeroChange('button2', e.target.value)}
              />
            </div>
            <button className="btn-dashboard" onClick={updateHero}>
              <i className="fas fa-sync-alt"></i> Update Hero Section
            </button>
            <button className="btn-dashboard" onClick={saveHero}>
              <i className="fas fa-cloud-upload-alt"></i> Save Hero Section
            </button>
          </div>
        </div>
        
        {/* Doctor Preview Section */}
        <div className="doctor-preview">
          <h3 className="preview-title">Doctor Profile Preview</h3>
          <div id="doctorPreviewContent">
            <h4>{doctorForm.name || 'Doctor Name'}</h4>
            <p><strong>Specialty:</strong> {doctorForm.specialty || 'Specialty'}</p>
            <p><strong>Biography:</strong> {doctorForm.bio || 'Biography'}</p>
            <p><strong>Education:</strong><br/>{doctorForm.education.split('\n').map((line, i) => <div key={i}>{line}</div>)}</p>
            <p><strong>Experience:</strong><br/>{doctorForm.experience.split('\n').map((line, i) => <div key={i}>{line}</div>)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
