import React from 'react';
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const teamMembers = [
  {
    name: 'Aditya Sahu',
    position: 'Team Leader',
    image: 'Aditya.jpg',
    socials: {
      twitter: 'https://twitter.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      instagram: 'https://instagram.com/johndoe'
    }
  },
  {
    name: 'Dhananjay Chitale',
    position: 'Backend Developer',
    image: 'Dhananjay.jpg',
    socials: {
      twitter: 'https://twitter.com/janesmith',
      linkedin: 'https://linkedin.com/in/janesmith',
      instagram: 'https://instagram.com/janesmith'
    }
  },
  {
    name: 'Raj Barshikar',
    position: 'Backend Developer',
    image: 'Raj.jpg',
    socials: {
      twitter: 'https://twitter.com/alicejohnson',
      linkedin: 'https://linkedin.com/in/alicejohnson',
      instagram: 'https://instagram.com/alicejohnson'
    }
  },
  {
    name: 'Suraj Gunjal',
    position: 'Frontend Developer',
    image: 'Suraj.jpg',
    socials: {
      twitter: 'https://twitter.com/bobbrown',
      linkedin: 'https://linkedin.com/in/bobbrown',
      instagram: 'https://instagram.com/bobbrown'
    }
  },
  {
    name: 'Chandan Bhirud',
    position: 'Designer',
    image: 'Chandan.jpg',
    socials: {
      twitter: 'https://twitter.com/charliedavis',
      linkedin: 'https://linkedin.com/in/charliedavis',
      instagram: 'https://instagram.com/charliedavis'
    }
  },
  {
    name: 'Vasundhara Dixit',
    position: 'Frontend Developer',
    image: 'DefinitiveStamp.png',
    socials: {
      twitter: 'https://twitter.com/emilywilson',
      linkedin: 'https://linkedin.com/in/emilywilson',
      instagram: 'https://instagram.com/emilywilson'
    }
  }
];

const Team = () => {
  return (
    <section className='pt-24'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold'>Meet Our Team</h1>
        <p className='text-lg'>Passionate individuals dedicated to stamp collecting</p>
      </div>

      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 mx-12'>
        {teamMembers.map((member, index) => (
          <div key={index} className='p-5 border rounded-lg shadow-md'>
            <div className='w-full h-60 mb-4'>
              <img className='object-cover w-2/3 mx-auto h-full rounded' src={member.image} alt={member.name} />
            </div>
            <div className='text-center'>
              <h2 className='text-2xl font-bold'>{member.name}</h2>
              <p className='text-lg'>{member.position}</p>
              <div className='flex justify-center gap-4 mt-4'>
                {member.socials.twitter && (
                  <a href={member.socials.twitter} target='_blank' rel='noopener noreferrer'>
                    <FaTwitter className='text-2xl text-blue-500 hover:text-gray-400' />
                  </a>
                )}
                {member.socials.linkedin && (
                  <a href={member.socials.linkedin} target='_blank' rel='noopener noreferrer'>
                    <FaLinkedin className='text-2xl text-blue-700 hover:text-gray-400' />
                  </a>
                )}
                {member.socials.instagram && (
                  <a href={member.socials.instagram} target='_blank' rel='noopener noreferrer'>
                    <FaInstagram className='text-2xl text-pink-500 hover:text-gray-400' />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
