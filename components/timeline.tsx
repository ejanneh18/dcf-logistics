import React from "react";

const timelineData = [
  {
    year: "2010",
    title: "Foundation in Banjul",
    description:
      "DCF Logistics was established in Banjul with a vision to modernize The Gambia's clearing and forwarding industry.",
    imageUrl:
      "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    year: "2015",
    title: "Digital Transformation",
    description:
      "Pioneered digital documentation and online tracking systems in The Gambia, becoming the first fully digitized clearing and forwarding agency in the country.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    year: "2018",
    title: "Regional Expansion",
    description:
      "Expanded operations to serve clients across ECOWAS region, establishing partnerships in Senegal, Guinea-Bissau, and Mali for seamless cross-border logistics.",
    imageUrl:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    year: "2022",
    title: "Technology Leadership",
    description:
      "Launched AI-powered logistics platform and real-time cargo tracking, setting new standards for logistics technology in West Africa.",
    imageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    year: "Today",
    title: "Industry Leader",
    description:
      "Today, DCF Logistics stands as The Gambia's premier logistics company, handling over 1000 shipments annually and serving as the trusted partner for businesses across West Africa.",
    imageUrl:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
  },
];

const Timeline = () => {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20"></div>

      {/* Timeline items */}
      <div className="space-y-24 relative">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "" : "md:flex-row-reverse"
            }`}
          >
            <div className="md:w-1/2 md:pr-12 md:text-right">
              <h3 className="text-2xl font-bold text-primary mb-2">
                {item.year}
              </h3>
              <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
              <p className="text-gray-600">{item.description}</p>
            </div>
            <div className="md:w-1/2 md:pl-12 mt-4 md:mt-0">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="rounded-md w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;