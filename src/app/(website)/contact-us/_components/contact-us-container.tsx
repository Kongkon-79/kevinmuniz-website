

import { Mail } from 'lucide-react'
import React from 'react'
import ContactForm from './contact-form'

const ContactInformation = () => {
    return (
        <div className='bg-[#F6FBFF]'>
            <div className='container grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 py-10 md:py-14 lg:py-20 '>
                <div className='md:col-span-1 h-full w-full flex flex-col justify-center '>
                    <div className='flex flex-col xl:flex-row items-start xl:items-center justify-start gap-6 md:gap-8 pl-6 md:pl-8 pb-8 md:pb-10 lg:pb-12'>
                        <div className='flex items-center  gap-2'>
                            <div>
                                <span className='bg-white p-4 rounded-full inline-flex justify-center items-center'><Mail className='text-[#8F5AFF]'/></span>
                            </div>
                            <div>
                                <h4 className='text-base lg:text-lg font-normal leading-[120%] text-[#131313]'>Email Address</h4>
                                <p className='text-sm lg:text-base leading-[150%] text-[#616161] font-normal'>Info@hierarchyofvisionaries.com</p>
                            </div>
                        </div>
                    </div>
                    <h4 className='bg-gradient-to-r from-[#14C0FB] to-[#8B5EFF] bg-clip-text text-transparent font-extrabold leading-normal text-3xl md:text-4xl lg:text-5xl'>Connect And Create</h4>
                </div>
                <div className='md:col-span-1 pr-0 md:pr-2'>
                    <div className='bg-white p-6 border border-[#8D5BFF] rounded-[16px]'>
                        <h4 className='text-lg md:text-xl lg:text-2xl text-[#424242] leading-[120%] font-normal'>Contact Information</h4>
                        <div className='pt-6 md:pt-8 lg:pt-8'>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactInformation