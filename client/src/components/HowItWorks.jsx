import React from 'react';
import { 
  CameraIcon, 
  MapPinIcon, 
  ShieldCheckIcon, 
  RocketLaunchIcon 
} from '@heroicons/react/24/outline';

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Capture the Issue",
      description: "Snap a clear photo of the problem—whether it's a pothole, broken streetlight, or waste accumulation.",
      icon: <CameraIcon className="size-8" />,
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: "02",
      title: "Pin the Location",
      description: "Our system automatically detects your GPS coordinates or lets you manually drop a pin on Salokhenagar’s map.",
      icon: <MapPinIcon className="size-8" />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: "03",
      title: "Verification",
      description: "Community members upvote the report to verify its urgency, ensuring the most critical tasks get seen first.",
      icon: <ShieldCheckIcon className="size-8" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "04",
      title: "Resolution Track",
      description: "Watch the status change from 'Pending' to 'Resolved' as local authorities and teams take action.",
      icon: <RocketLaunchIcon className="size-8" />,
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-black tracking-tight text-white mb-4 uppercase">
            The <span className="text-indigo-500">Process</span>
          </h2>
          <p className="text-gray-500 font-light">Four simple steps to a better neighborhood.</p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Vertical Connecting Line */}
          <div className="absolute left-[35px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500/50 via-purple-500/20 to-transparent hidden md:block"></div>

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <div key={step.id} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Content Side */}
                <div className="flex-1 w-full text-center md:text-left">
                  <div className={`p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500 group shadow-2xl ${index % 2 !== 0 ? 'md:text-right' : ''}`}>
                    <span className="text-5xl font-black text-white/5 group-hover:text-indigo-500/20 transition-colors duration-500 block mb-2">
                      {step.id}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Icon / Center Point */}
                <div className="relative z-10 flex items-center justify-center">
                  <div className={`size-16 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)]`}>
                    <div className="w-full h-full bg-[#030712] rounded-2xl flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                  </div>
                  {/* Glowing Pulse Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                </div>

                {/* Empty Spacer for desktop alignment */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;