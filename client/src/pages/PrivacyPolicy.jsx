import React from 'react';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div>
      <div className="contact-banner">
        <h1 className="ram">Privacy Policy</h1>
      </div>
      <div className='py-20 px-4 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4 text-slate-800'>Privacy Policy</h1>
        <p className='mb-4 text-slate-700'>
          This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from www.HomAssist.com (the “Site”).
        </p>
        <h2 className='text-2xl font-bold mb-2 text-slate-800'>Personal Information We Collect</h2>
        <p className='mb-4 text-slate-700'>
          The User expressly agrees and acknowledges that the company collects and stores the Users personal information, which is provided by the user from time to time on the Website, including but not limited to the users user name, passwords, email address, name, address, age, date of birth, sex, nationality, shopping preferences, browsing history, etc., as well as any images or other information uploaded/published by the user on the website. The user is aware that this information will be used by the company/website to provide services and features targeted at the user, that are most likely to meet the users needs, and also to customize and improve the website to make its users experiences safer and easier.
        </p>
        <p className='mb-4 text-slate-700'>
          When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information.”
        </p>
        <h2 className='text-2xl font-bold mb-2 text-slate-800'>Device Information</h2>
        <p className='mb-4 text-slate-700'>
          We collect Device Information using the following technologies:
          <ul className='list-disc pl-5'>
            <li>“Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier.</li>
            <li>“Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</li>
            <li>“Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.</li>
          </ul>
        </p>
        <h2 className='text-2xl font-bold mb-2 text-slate-800'>How Do We Use Your Personal Information?</h2>
        <p className='mb-4 text-slate-700'>
          We use the Information that we collect generally to fulfil any queries placed through the Site. Additionally, we use this Information to communicate with you and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.
        </p>
        <p className='mb-4 text-slate-700'>
          We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site.
        </p>
        <h2 className='text-2xl font-bold mb-2 text-slate-800'>Sharing Your Personal Information</h2>
        <p className='mb-4 text-slate-700'>
          We share your Personal Information with third parties to help us use your Personal Information, as described above.
        </p>
        <p className='mb-4 text-slate-700'>
          Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
        </p>
        <h2 className='text-2xl font-bold mb-2 text-slate-800'>Behavioural Advertising</h2>
        <p className='mb-4 text-slate-700'>
          As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you.
        </p>
        <h2 className='text-2xl font-bold mb-2 text-slate-800'>Data Retention</h2>
        <p className='mb-4 text-slate-700'>
          When you place an enquiry through the Site, we will maintain your Information for our records unless and until you ask us to delete this information.
        </p>
        <h2 className='text-2xl font-bold mb-2 text-slate-800'>Contact Us</h2>
        <p className='mb-4 text-slate-700'>
          For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:help@homassist.com" className='text-blue-600'>help@homassist.com</a> or by mail using the details provided below:
        </p>
        <address className='mb-4 text-slate-700'>
        B Junction, Survey No. 1/2, 1st Floor, Next to Kothrud Post office, near Karve Statue, Kothrud, Pune, Maharashtra 411038
        </address>
        <p className='mb-4 text-slate-700'>
          By using our site, you consent to our Privacy Policy.
        </p>
      </div>
      <Footer />
    </div>
  );
}
