import Header from '../components/Header'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Wellspring Health Foundation',
  description: 'Get in touch with Wellspring Health Foundation about donations, volunteering, or research partnerships.',
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-48 md:pb-24">
        <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-gray-950 leading-[0.9] mb-6">
          Contact
        </h1>
        <p className="text-lg text-gray-400 mb-16 max-w-xl">
          Have questions about our campaigns, research, or how to get involved? We&apos;d love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <Phone className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                  <p className="text-sm text-gray-400 mt-1">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Email</h3>
                  <p className="text-sm text-gray-400 mt-1">hello@wellspringhealth.org</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Address</h3>
                  <p className="text-sm text-gray-400 mt-1">500 Health Plaza, Suite 300<br />Boston, MA 02108</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Hours</h3>
                  <p className="text-sm text-gray-400 mt-1">Mon-Fri: 9am - 6pm<br />Sat: 10am - 4pm</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm text-gray-500 mb-2">First Name</label>
                  <input type="text" id="firstName" name="firstName" className="w-full px-0 py-2 border-0 border-b border-gray-200 focus:outline-none focus:border-primary-600 text-sm transition-colors" required />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm text-gray-500 mb-2">Last Name</label>
                  <input type="text" id="lastName" name="lastName" className="w-full px-0 py-2 border-0 border-b border-gray-200 focus:outline-none focus:border-primary-600 text-sm transition-colors" required />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-500 mb-2">Email</label>
                <input type="email" id="email" name="email" className="w-full px-0 py-2 border-0 border-b border-gray-200 focus:outline-none focus:border-primary-600 text-sm transition-colors" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-gray-500 mb-2">Message</label>
                <textarea id="message" name="message" rows={4} className="w-full px-0 py-2 border-0 border-b border-gray-200 focus:outline-none focus:border-primary-600 text-sm transition-colors resize-none" required />
              </div>
              <button type="submit" className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 text-sm font-medium tracking-wide uppercase hover:bg-gray-900 hover:text-white transition-colors duration-200">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
