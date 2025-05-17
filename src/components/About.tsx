import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="container-section py-16 bg-light-pink/5 dark:bg-dark-pink/5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-light-pink dark:bg-dark-pink opacity-20"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-light-pink dark:bg-dark-pink opacity-20"></div>
          <img 
            src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=1000&auto=format&fit=crop" 
            alt="Makeup Artist" 
            className="rounded-lg shadow-xl w-full h-[500px] object-cover relative z-10"
          />
          <div className="absolute -bottom-4 -right-4 z-0 w-full h-full border-4 border-dark-pink dark:border-light-pink rounded-lg"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
          
          <p className="text-lg mb-6">
            Sarah Condrea, upcoming makeup artist.
          </p>
          
          <p className="text-lg mb-6">
            I specialize in creating stunning looks for weddings, photo shoots, special events, and editorial work. 
            My approach is personalized and detail-oriented, ensuring that each client's unique beauty is enhanced.
          </p>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">My Qualifications</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-dark-pink dark:text-light-pink mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Certified Professional Makeup Artist</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-dark-pink dark:text-light-pink mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Advanced Bridal Makeup Specialist</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-dark-pink dark:text-light-pink mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Editorial Makeup Expert</span>
              </li>
            </ul>
          </div>
          
        
          
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block rounded-rounded bg-dark-pink dark:bg-light-pink text-white dark:text-gray-900 font-bold py-3 px-8 shadow-lg"
          >
            Book a Session
          </motion.a>
        </motion.div>
      </div>
      
      {/* Testimonials */}
      <div className="mt-20">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-8 text-center"
        >
          Client Testimonials
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Rebecca",
              role: "petardiera",
              quote: "Prea tare fata asta",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg relative"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-8 h-8 bg-dark-pink dark:bg-light-pink rounded-full"></div>
              <div className="flex items-center mb-4">
                <svg 
                  className="w-12 h-12 text-dark-pink dark:text-light-pink mr-4 flex-shrink-0" 
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-dark-pink dark:text-light-pink">{testimonial.role}</p>
                </div>
              </div>
              <p className="italic">"{testimonial.quote}"</p>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 