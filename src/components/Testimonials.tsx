
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "TEDora+ saved me during exams! Their babysitter taught my kids ABCs while I studied. Highly professional and reliable service.",
      name: "Mrs. Rahman",
      location: "Dhanmondi",
      image: "" // Placeholder
    },
    {
      quote: "My father adores his caregiver – they even pray together! The companionship and care have made such a positive difference in his life.",
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
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-tedora-cream/20 to-white -z-10"></div>
      <div className="absolute top-10 left-10 w-64 h-64 bg-tedora-peach/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-tedora-sage/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Why Dhaka Families Love TEDora+</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 relative"
            >
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-tedora-peach/30 rounded-full flex items-center justify-center">
                <Quote size={18} className="text-tedora-peach" />
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-tedora-peach/30 to-tedora-sage/30 flex-shrink-0 overflow-hidden border-2 border-white shadow-sm">
                  {testimonial.image ? (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-bold">
                      {testimonial.name[0]}
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="mb-2">
                    {renderStars()}
                  </div>
                  <blockquote className="text-gray-700 italic mb-3 relative">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="h-px w-8 bg-tedora-sage mr-2"></div>
                    <p className="font-semibold text-tedora-sage">
                      {testimonial.name}, <span className="text-gray-600 font-normal">{testimonial.location}</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-1 -right-1 w-12 h-12 bg-tedora-sage/10 rounded-full"></div>
            </motion.div>
          ))}
        </div>
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">Experience the TEDora+ difference today and join our satisfied clients.</p>
          <motion.a 
            href="#services"
            className="btn-primary inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Book Your Care Service
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
