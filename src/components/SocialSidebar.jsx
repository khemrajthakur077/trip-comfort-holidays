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
    /* Mobile: Bottom-Left (fixed position)
       Desktop: Center-Left (fixed position)
    */
    <div className="fixed left-0 bottom-24 md:top-1/2 md:-translate-y-1/2 z-[100] flex flex-col gap-1.5 md:gap-1">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group flex items-center p-3 text-white transition-all duration-300 shadow-xl
            /* Mobile Shape */
            rounded-r-full md:rounded-none
            /* Desktop Border Radius */
            md:first:rounded-tr-xl md:last:rounded-br-xl 
            ${social.color} 
            /* Hover Effects */
            hover:pr-8 hover:pl-5 active:scale-95
          `}
        >
          {/* Icon */}
          <span className="z-10 group-hover:scale-110 transition-transform">{social.icon}</span>
          
          {/* Label (Mobile par default hidden, Hover par dono jagah dikhega) */}
          <span className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:max-w-[120px] group-hover:ml-3 font-bold text-[10px] md:text-xs uppercase tracking-wider">
            {social.name}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;