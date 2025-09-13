import quotation from "assets/quotation-mark.png";
import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import "./Landing.css";

// Dummy data for testimonials
const testimonials = [
  {
    testimonial:
      "I am eager to see Ayodhya setting an example for cities across the globe by demonstrating how sustainable development principles can keep pace with modern technology to create a resilient urban environment.",
    name: "Arjun Mehta",
    position: "Urban Planner",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    testimonial:
      "This platform brings together innovation and sustainability in a way that can truly inspire other cities worldwide.",
    name: "Priya Sharma",
    position: "Environmental Researcher",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    testimonial:
      "Beautiful Planet AI is a visionary initiative that showcases how communities can embrace green growth while adopting modern solutions.",
    name: "Ravi Patel",
    position: "Technology Consultant",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

// Template for individual testimonial cards
const testimonialTemplate = ({ testimonial, image, name, position }) => (
  <div className="mb-4 mx-5 bg-white">
    <div className="flex flex-column h-20rem justify-content-between">
      {/* Testimonial Text */}
      <p className="text-left font-regular text-900">"{testimonial}"</p>

      {/* Info Row */}
      <div className="flex align-items-center gap-4">
        <img
          src={image}
          alt={`${name}-profile`}
          className="border-circle"
          style={{ width: "3.5rem", height: "3.5rem", objectFit: "cover" }}
        />
        <div className="flex flex-column">
          <p className="text-base font-semibold text-900 m-0">{name}</p>
          <p className="text-sm text-700 m-0">{position}</p>
        </div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <div className="flex w-full align-items-center justify-content-center gap-8 px-5">
      {/* Heading */}
      <div className="flex flex-column justify-content-start">
        <img src={quotation} alt="quotation mark" className="w-3rem h-3rem" />
        <h1 className="text-5xl font-semibold mb-5 text-primary1">
          What People Say About Our Work
        </h1>
      </div>

      {/* Carousel */}
      <Card className="w-30rem border-round-2xl">
        <Carousel
          value={testimonials}
          itemTemplate={testimonialTemplate}
          numVisible={1}
          numScroll={1}
          circular
          autoplayInterval={10000}
        />
      </Card>
    </div>
  );
};

export default Testimonials;
