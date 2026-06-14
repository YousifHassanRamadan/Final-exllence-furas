import { useState } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import MapComponent from "./Map";
import { useTranslation } from "react-i18next";

const contactInfo = [
  {
    icon: <Mail className="w-6 h-6" aria-label="Email Icon" />,
    title: "support",
    details: "excellencefuras@gmail.com",
    extraClass: "bg-blue-50",
  },
  {
    icon: <Phone className="w-6 h-6" aria-label="Phone Icon" />,
    title: "ourPhone",
    details: "+966 545 960 600",
    extraClass: "bg-orange-50",
  },
  {
    icon: <MapPin className="w-6 h-6" aria-label="Location Icon" />,
    title: "location",
    details: "123 King Street Avenue",
    extraClass: "bg-green-50",
  },
];

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-gray-300 bg-white";

export default function ContactContent() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    department: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full">
      {/* Full-width Map */}
      <div className="w-full">
        <MapComponent />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg flex items-center space-x-4 border border-gray-100 transform transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-gray-100 hover:scale-105 ${info.extraClass}`}
            >
              <div className="shrink-0">{info.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{t(info.title)}</h3>
                <p className="text-gray-600">{info.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
