import React, { useState } from 'react';
import { Question } from '../types';
import styles from './ProgramOverviewPopup.module.css';

interface ProgramOverviewPopupProps {
  questions: Question[];
  selectedAnswers: { [key: number]: string };
  onGenerateReport: (formData: any) => void;
  onReset: () => void;
  onClose: () => void;
}

const ProgramOverviewPopup: React.FC<ProgramOverviewPopupProps> = ({
  questions,
  selectedAnswers,
  onGenerateReport,
  onReset,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    businessUrl: 'https://www.example.com',
    aov: '150',
    ltv: '750',
    retentionRate: '65',
    wholesaleRate: '40',
    productDescription: 'Handmade eco-friendly accessories',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateReport(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2 className={styles.title}>Customize Your Report</h2>
        <p className={styles.description}>
          We need some information about your business to give you the best insight into your program and what it can do for you. Complete the questions below to get your report!
        </p>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
              className={styles.input}
              value={formData.name}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className={styles.input}
              value={formData.email}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="url"
              name="businessUrl"
              placeholder="Business URL"
              onChange={handleChange}
              required
              className={styles.input}
              value={formData.businessUrl}
            />
          </div>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <input
                type="number"
                name="aov"
                placeholder="AOV ($)"
                onChange={handleChange}
                required
                className={styles.input}
                value={formData.aov}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="number"
                name="ltv"
                placeholder="LTV ($)"
                onChange={handleChange}
                required
                className={styles.input}
                value={formData.ltv}
              />
            </div>
          </div>
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <input
                type="number"
                name="retentionRate"
                placeholder="Retention Rate (%)"
                onChange={handleChange}
                required
                className={styles.input}
                value={formData.retentionRate}
              />
            </div>
            <div className={styles.inputGroup}>
              <input
                type="number"
                name="wholesaleRate"
                placeholder="Wholesale Rate (%)"
                onChange={handleChange}
                required
                className={styles.input}
                value={formData.wholesaleRate}
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="productDescription"
              placeholder="What do you sell?"
              onChange={handleChange}
              required
              className={styles.input}
              value={formData.productDescription}
            />
          </div>
          
          <div className={styles.actions}>
            <button type="submit" className={`${styles.button} ${styles.generateButton}`}>
              Generate Report
            </button>
            <button type="button" onClick={onReset} className={`${styles.button} ${styles.resetButton}`}>
              Start Over
            </button>
            <button type="button" onClick={onClose} className={`${styles.button} ${styles.closeButton}`}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramOverviewPopup;