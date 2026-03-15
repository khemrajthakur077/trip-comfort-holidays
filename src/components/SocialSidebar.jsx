import React from 'react';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const SocialSidebar = () => {
  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp size={20} />,
      color: 'bg-[#25D366]',
      link: 'https://wa.me/918091655570', 
    },
    {
      name: 'Facebook',
      icon: <FaFacebookF size={18} />,
      color: 'bg-[#1877F2]',
      link: 'https://www.facebook.com/share/14WtQSUqxS2/', 
    },
    {
      name: 'Instagram',
      icon: <FaInstagram size={20} />,
      color: 'bg-[#E4405F]',
      link: 'https://www.instagram.com/tripcomfortholidays?igsh=N2FwNzByMGJ5Njlm',
    },
    {
      name: 'YouTube',
      icon: <FaYoutube size={20} />,
      color: 'bg-[#FF0000]',
      link: 'https://www.youtube.com/@TripComfortHolidays',
    },
  ];

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-1">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center p-3 text-white transition-all duration-300 first:rounded-tr-xl last:rounded-br-xl shadow-lg ${social.color} hover:pr-8 hover:pl-5`}
        >
          {/* Icon */}
          <span className="z-10">{social.icon}</span>
          
          {/* Label (Hover karne par dikhega) */}
          <span className="max-w-0 overflow-hidden whitespace-now-nowrap transition-all duration-300 group-hover:max-w-[100px] group-hover:ml-3 font-bold text-xs uppercase tracking-wider">
            {social.name}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;