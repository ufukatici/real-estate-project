import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

const API_URL = 'http://localhost:8005/api';

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [filters, setFilters] = useState({
    property_type: '',
    city: '',
    min_price: '',
    max_price: ''
  });
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${API_URL}/properties/`);
      setProperties(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const submitInquiry = async (e) => {
    e.preventDefault();
    if (!selectedProperty) return;
    try {
      await axios.post(`${API_URL}/properties/${selectedProperty.id}/add_inquiry/`, inquiryForm);
      alert('Inquiry submitted successfully!');
      setShowInquiryForm(false);
      setInquiryForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    }
  };

  const filteredProperties = properties.filter(prop => {
    if (filters.property_type && prop.property_type !== filters.property_type) return false;
    if (filters.city && !prop.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.min_price && parseFloat(prop.price) < parseFloat(filters.min_price)) return false;
    if (filters.max_price && parseFloat(prop.price) > parseFloat(filters.max_price)) return false;
    return true;
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>🏠 Real Estate Platform</h1>
      </header>

      <div className={styles.filters}>
        <select
          value={filters.property_type}
          onChange={(e) => setFilters({...filters, property_type: e.target.value})}
        >
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="villa">Villa</option>
        </select>
        <input
          type="text"
          placeholder="City"
          value={filters.city}
          onChange={(e) => setFilters({...filters, city: e.target.value})}
        />
        <input
          type="number"
          placeholder="Min Price"
          value={filters.min_price}
          onChange={(e) => setFilters({...filters, min_price: e.target.value})}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.max_price}
          onChange={(e) => setFilters({...filters, max_price: e.target.value})}
        />
      </div>

      <div className={styles.properties}>
        {filteredProperties.map(property => (
          <div
            key={property.id}
            className={styles.propertyCard}
            onClick={() => setSelectedProperty(property)}
          >
            {property.image_url && (
              <img src={property.image_url} alt={property.title} className={styles.propertyImage} />
            )}
            <div className={styles.propertyInfo}>
              <h3>{property.title}</h3>
              <p className={styles.address}>{property.address}, {property.city}</p>
              <p className={styles.price}>${parseFloat(property.price).toLocaleString()}</p>
              <div className={styles.details}>
                <span>🛏️ {property.bedrooms} bed</span>
                <span>🚿 {property.bathrooms} bath</span>
                <span>📐 {property.area_sqft} sqft</span>
              </div>
              <p className={styles.status}>Status: {property.status}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProperty && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeBtn} onClick={() => setSelectedProperty(null)}>×</button>
            <h2>{selectedProperty.title}</h2>
            <p className={styles.address}>{selectedProperty.address}, {selectedProperty.city}, {selectedProperty.state} {selectedProperty.zip_code}</p>
            <p className={styles.price}>${parseFloat(selectedProperty.price).toLocaleString()}</p>
            <div className={styles.details}>
              <span>Type: {selectedProperty.property_type}</span>
              <span>🛏️ {selectedProperty.bedrooms} bed</span>
              <span>🚿 {selectedProperty.bathrooms} bath</span>
              <span>📐 {selectedProperty.area_sqft} sqft</span>
            </div>
            <p className={styles.description}>{selectedProperty.description}</p>
            <div className={styles.agentInfo}>
              <h4>Contact Agent</h4>
              <p>{selectedProperty.agent_name}</p>
              <p>📞 {selectedProperty.agent_phone}</p>
              <p>✉️ {selectedProperty.agent_email}</p>
            </div>
            <button onClick={() => setShowInquiryForm(true)} className={styles.inquiryBtn}>
              Send Inquiry
            </button>
          </div>
        </div>
      )}

      {showInquiryForm && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Send Inquiry</h2>
            <form onSubmit={submitInquiry}>
              <input
                type="text"
                placeholder="Your Name"
                value={inquiryForm.name}
                onChange={(e) => setInquiryForm({...inquiryForm, name: e.target.value})}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={inquiryForm.email}
                onChange={(e) => setInquiryForm({...inquiryForm, email: e.target.value})}
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={inquiryForm.phone}
                onChange={(e) => setInquiryForm({...inquiryForm, phone: e.target.value})}
              />
              <textarea
                placeholder="Message"
                value={inquiryForm.message}
                onChange={(e) => setInquiryForm({...inquiryForm, message: e.target.value})}
                rows={5}
                required
              />
              <div className={styles.modalButtons}>
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowInquiryForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

