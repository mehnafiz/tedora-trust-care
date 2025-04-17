
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "TEDora+ saved me during exams! Their babysitter taught my kids ABCs!",
      name: "Mrs. Rahman",
      location: "Dhanmondi",
      image: "" // Placeholder
    },
    {
      quote: "My father adores his caregiver – they even pray together!",
      name: "Mr. Hossain",
      location: "Gulshan",
      image: "" // Placeholder
    }
  ];

  // Generate 5 stars for ratings
  const renderStars = () => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill="#FFB88C" className="text-tedora-peach" />
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Why Dhaka Families Love TEDora+</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-tedora-cream/30 p-8 rounded-lg border border-tedora-peach/20 shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden border-2 border-tedora-peach/30 shadow-sm">
                  {testimonial.image ? (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-tedora-sage/30 to-tedora-peach/30" />
                  )}
                </div>
                
                <div>
                  <div className="mb-2">
                    {renderStars()}
                  </div>
                  <blockquote className="text-gray-700 italic mb-3">
                    "{testimonial.quote}"
                  </blockquote>
                  <p className="font-semibold text-tedora-sage">
                    – {testimonial.name}, {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
