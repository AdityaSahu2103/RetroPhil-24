import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../pages/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './CertificatePage.css';

const CertificatePage = () => {
  const { certificateNumber } = useParams();
  const [certificate, setCertificate] = useState(null);
  const certificateRef = useRef(null); // Reference to the certificate container

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const certsRef = collection(db, 'verifiedCertificates');
        const q = query(certsRef, where('certificateNumber', '==', certificateNumber));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const certData = querySnapshot.docs[0].data();
          setCertificate(certData);
          console.log("Certificate data:", certData); // Debugging line
        } else {
          console.error("Certificate not found for:", certificateNumber);
          alert('Certificate not found');
        }
      } catch (error) {
        console.error('Error fetching certificate:', error);
        alert('Failed to fetch certificate');
      }
    };

    fetchCertificate();
  }, [certificateNumber]);

  const downloadCertificate = () => {
    const input = certificateRef.current;

    // Hide the download button before capturing the canvas
    const downloadButton = document.querySelector('.download-btn');
    downloadButton.style.display = 'none';

    html2canvas(input, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 10, 10, 180, canvas.height * 180 / canvas.width);
      pdf.save(`${certificate.certificateNumber}_certificate.pdf`);

      // Restore the download button after PDF is generated
      downloadButton.style.display = 'block';
    });
  };

  if (!certificate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="certificate-container" ref={certificateRef}>
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
        <img src={certificate.image} alt="image" className="certificate-stamp-image" />
      </div>
      <div className="certificate-footer">
        <p><strong>Verified by:</strong> {certificate.verifierSignature}</p>
      </div>
      <button className="download-btn" onClick={downloadCertificate}>Download Certificate</button>
    </div>
  );
};

export default CertificatePage;
