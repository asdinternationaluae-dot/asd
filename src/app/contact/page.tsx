import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import SectionHeading from '@/components/SectionHeading';
import { Mail, MapPin, Phone } from 'lucide-react';
import styles from './contact.module.css';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with ASD International for product inquiries, distribution opportunities, and partnerships.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Header */}
        <section className={styles.headerSection}>
          <div className="container">
            <SectionHeading 
              eyebrow="Get In Touch"
              title="Let's Connect"
              subtitle="Whether you're a healthcare professional, a potential partner, or simply have a question about our products, we're here to help."
              centered
            />
          </div>
        </section>

        {/* Content */}
        <section className={`section ${styles.contentSection}`}>
          <div className={`container ${styles.grid}`}>
            
            {/* Contact Info Sidebar */}
            <div className={styles.infoSidebar}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Contact Information</h3>
                <p className={styles.infoDesc}>
                  Our dedicated team is available Monday through Friday, 9:00 AM to 5:00 PM (GST) to assist you with your inquiries.
                </p>
                
                <ul className={styles.infoList}>
                  <li>
                    <div className={styles.iconBox}><Phone size={20} /></div>
                    <div>
                      <strong>Phone</strong>
                      <p>+971 2 245 9549</p>
                    </div>
                  </li>
                  <li>
                    <div className={styles.iconBox}><Mail size={20} /></div>
                    <div>
                      <a href="mailto:info@asdinternational.co" className={styles.footerLink}>info@asdinternational.co</a>
                    </div>
                  </li>
                  <li>
                    <div className={styles.iconBox}><MapPin size={20} /></div>
                    <div>
                      <strong>Headquarters</strong>
                      <p>Block 2-Store No.3<br/>Abu Dhabi Industrial City - ICAD III<br/>Abu Dhabi, UAE</p>
                    </div>
                  </li>
                </ul>

                <div className={styles.mapPlaceholder}>
                  <iframe 
                    src="https://maps.google.com/maps?q=ASD%20International%20Medical%20Requisites%20LLC&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Form Area */}
            <div className={styles.formArea}>
              <div className={styles.formCard}>
                <h3 className={styles.formTitle}>Send a Message</h3>
                <ContactForm />
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
