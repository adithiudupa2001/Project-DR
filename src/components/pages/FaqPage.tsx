import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'How does buying a pre-rented home work?',
    a: 'You purchase a completed residential property with a tenant already residing in it under an active lease. The rent and deposit transfer to you on registration.',
  },
  {
    q: 'When does rental income start?',
    a: 'Rent starts from day one of property registration. The tenant pays monthly rent directly to your bank account.',
  },
  {
    q: 'How is tenant history verified?',
    a: 'We review bank statements showing regular monthly rent deposits, the registered lease deed, and society maintenance records.',
  },
  {
    q: 'Can NRIs buy these properties remotely?',
    a: 'Yes. Overseas buyers can purchase via registered power of attorney without traveling to India, and receive rent in their NRO account.',
  },
  {
    q: 'What does membership include?',
    a: 'Members get access to complete past rent records, tenant profile details, due diligence documents, and full property comparison.',
  },
];

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0E1A2B] py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="font-serif font-semibold text-3xl sm:text-4xl text-[#0E1A2B]">
            Questions and answers
          </h1>
          <p className="text-[14px] text-[#6B7280] mt-1">
            Common questions about buying pre-rented properties.
          </p>
        </div>

        <div className="bg-white rounded-[12px] border border-[#ECECE8] divide-y divide-[#ECECE8]">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="p-5">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between text-left font-medium text-[15px] text-[#0E1A2B] hover:text-[#8C6D2F] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#6B7280] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-[14px] text-[#6B7280] leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
