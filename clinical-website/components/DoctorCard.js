const DoctorCard = ({ doctor, successRate }) => {
  return (
    <div className="doctor-card">
      <div className="doctor-img">
        <i className="fas fa-user-md"></i>
      </div>
      <div className="doctor-content">
        <h3 className="doctor-name">{doctor.name}</h3>
        <span className="doctor-specialty">{doctor.specialty}</span>
        
        {successRate && (
          <div className="success-rate-container">
            <div className="success-rate-title">{successRate.description}</div>
            <div className="success-rate-bar">
              <div 
                className="success-rate-fill" 
                style={{width: `${successRate.rate}%`}} 
                data-width={successRate.rate}
              >
                <span className="success-rate-percent">{successRate.rate}%</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="doctor-education">
          <h4><i className="fas fa-graduation-cap"></i> Education</h4>
          <ul className="list-unstyled">
            {doctor.education.map((edu, index) => (
              <li key={index}>{edu}</li>
            ))}
          </ul>
        </div>
        
        <div className="doctor-experience">
          <h4><i className="fas fa-briefcase"></i> Experience</h4>
          {doctor.experience.map((exp, index) => (
            <div className="experience-item" key={index}>{exp}</div>
          ))}
        </div>
        
        <p>{doctor.bio}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
