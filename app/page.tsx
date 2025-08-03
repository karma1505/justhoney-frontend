// TEMPORARILY DISABLED - SITE UNDER MAINTENANCE
// All main page content has been commented out to prevent errors
// while the site is being developed and APIs are not yet ready

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">

        {/* Maintenance Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gray rounded-full flex items-center justify-center mx-auto mb-4">
            <svg 
              className="w-12 h-12 text-amber-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            We&apos;re Making Things Better
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our hive is buzzing with activity as we work to bring you the sweetest honey experience. 
            We&apos;re upgrading our systems to serve you better.
          </p>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-black">
            <h3 className="font-semibold text-amber-800 mb-3">What&apos;s Happening?</h3>
            <ul className="text-sm text-gray-600 space-y-2 text-left">
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                Upgrading our e-commerce platform
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                Adding new honey varieties
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                Improving payment processing
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                Enhancing customer experience
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                There might be some links or features that may not work now. But you can always place your order through the phone number.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}