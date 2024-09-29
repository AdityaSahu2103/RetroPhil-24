import React, { useState, useRef } from "react";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../pages/firebase';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../Seller/CertificatePage.css';
import './CheckCertificate.css';

const CheckCertificate = () => {
  const [certificateNumber, setCertificateNumber] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const certificateRef = useRef(null); // Reference to the certificate container

  const handleFetchCertificate = async () => {
    setLoading(true);
    setError(null);

    try {
      const certsRef = collection(db, 'verifiedCertificates');
      const q = query(certsRef, where('certificateNumber', '==', certificateNumber));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const certData = querySnapshot.docs[0].data();
        setCertificate(certData);
        console.log("Certificate data:", certData); // Debugging line
      } else {
        setError("Certificate not found. Please check the certificate number.");
      }
    } catch (error) {
      console.error('Error fetching certificate:', error);
      setError('Failed to fetch certificate.');
    } finally {
      setLoading(false);
    }
  };

  const downloadCertificate = () => {
    const input = certificateRef.current;

    // Hide the download button before capturing the canvas
    const downloadButton = document.querySelector('.download-btn');
    downloadButton.style.display = 'none';

    // Render to canvas and generate PDF
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 10, 10, 180, canvas.height * 180 / canvas.width);
      pdf.save(`${certificate.certificateNumber}_certificate.pdf`);

      // Restore the download button after PDF is generated
      downloadButton.style.display = 'block';
    });
  };

  return (
    <div className="check-certificate-container">
      <div className="check-certificate-header">
        <h1>Check Verified Certificate</h1>
        <p>Enter your certificate number below to retrieve the verified details.</p>
      </div>

      <div className="check-certificate-form">
        <label htmlFor="certificateNumber">Certificate Number:</label>
        <input
          id="certificateNumber"
          type="text"
          placeholder="Enter Certificate Number"
          value={certificateNumber}
          onChange={(e) => setCertificateNumber(e.target.value)}
          className="certificate-input"
        />
        <button onClick={handleFetchCertificate} className="fetch-certificate-button">
          Fetch Certificate
        </button>
      </div>

      {loading && <p className="loading-message">Loading certificate details...</p>}
      {error && <p className="error-message">{error}</p>}

      {certificate && (
        <div ref={certificateRef} className="certificate-container">
          <div className="certificate-header">
            <h1>Indian Philatelic Society</h1>
            <h2>Verified Certificate of Authenticity</h2>
          </div>
          <div className="certificate-body">
            <p><strong>Certificate Number:</strong> {certificate.certificateNumber}</p>
            <p><strong>Date of Certification:</strong> {new Date(certificate.dateOfCertification.seconds * 1000).toLocaleDateString()}</p>
            <p><strong>Country:</strong> {certificate.stampDetails.country}</p>
            <p><strong>Year:</strong> {certificate.stampDetails.year}</p>
            <p><strong>Denomination:</strong> {certificate.stampDetails.denomination}</p>
            <p><strong>Color:</strong> {certificate.stampDetails.color}</p>
            <p><strong>Grading Score:</strong> {certificate.stampDetails.gradingScore}</p>
            <p><strong>Description:</strong> {certificate.stampDetails.description}</p>
            <p><strong>Expert Opinion:</strong> {certificate.stampDetails.opinion}</p>
            <img
              src={certificate.image}
              alt="Stamp"
              className="certificate-stamp-image"
              onLoad={() => console.log("Image loaded")} // Optional for debugging
            />
          </div>
          <div className="certificate-footer">
            <p><strong>Verified by:</strong> {certificate.verifierSignature}</p>
          </div>
          <button className="download-btn" onClick={downloadCertificate}>Download Certificate</button>
        </div>
      )}
    </div>
  );
};

export default CheckCertificate;
