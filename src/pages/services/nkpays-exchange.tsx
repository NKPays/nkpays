import ContactSection from '@/components/landing-page/ContactSection'
import DownloadAppSection from '@/components/shared/DownloadAppSection'
import InfoCard from '@/components/shared/InfoCard'
import Section from '@/components/shared/Section'
import PageHero from '@/components/shared/page/PageHero'
import { Button } from '@/components/ui/button'
import { env } from '@/env.mjs'
import { CheckCircle } from 'lucide-react'
import { nanoid } from 'nanoid'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const content = {
    meta: {
        title: 'Sell Lapu/API Stock Instantly with NkPays Exchange',
        description: 'Lapu/API stock, sell instantly, high margins, no software, multiple API, instant redeem, NkPays Exchange'
    },
    hero: {
        titles: [
            'Sell Your Lapu/API Stock',
            'at High Margins with',
            'NkPays Exchange',
        ],
        desc: 'Effortlessly sell your Lapu/API stock from any operator with NkPays Exchange. Enjoy high margins, instant redeem, multiple API integration, and more. No software required',
        image: '/assets/images/nkpays-exchange-2.svg'
    },
    info: [
        {
            title: '100% Support',
            desc: 'Without any Software you can Sell using Robotic we will guide you if any issue. Multiple API integration available',
            image: '/assets/images/icons/help-desk.png'
        },
        {
            title: 'Instant Redeem',
            desc: '',
            image: '/assets/images/icons/instant-redeem.png',
            highlight: true
        },
        {
            title: 'Multiple Seller Available',
            desc: '',
            image: '/assets/images/icons/seller-available.png'
        },
    ]
}

const RechargeServicePage = () => {
    return (
        <>

            <NextSeo
                title={content.meta.title}
                description={content.meta.description}
                openGraph={{
                    title: content.meta.title,
                    description: content.meta.description,
                    url: env.NEXT_PUBLIC_SITE_URL,
                    images: []
                }}
                twitter={{
                    cardType: 'summary_large_image',
                }}
            />
            <PageHero
                titles={content.hero.titles}
                image={content.hero.image}
                desc={content.hero.desc}
                extra={<div className='mt-10'><Link href="contact"><Button variant={'glow'} size={'lg'}>Contact Us</Button></Link></div>}
            />

            <Section
                sectionTitle='What is NkPays Exchange?'
                sectionDesc={
                    <p className='text-center text-muted-foreground'>
                        NkPays Exchange is a revolutionary platform that empowers you to <strong>sell your Lapu/API stock</strong> from any operator <strong>seamlessly and instantly</strong>, without any software requirements
                    </p>
                }
            >
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center ">
                    {
                        content.info.map(ct => {
                            return (
                                <div key={nanoid()}>
                                    <div className='max-w-sm w-full'>
                                        <InfoCard key={nanoid()} {...ct} />
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </Section>

            <article className='max-w-6xl mx-auto space-y-10'>
                <Section>
                    <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 items-center">
                    <div>
                            <div className="max-w-lg">
                                <h2 className='mb-3 text-3xl font-medium'>Key Features & Benefits</h2>
                                <ul className='text-gray-500 mt-4'>
                                    <li className='flex items-center gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <p><strong>Extra Margins:</strong> Enjoy superior margins on all operators, compared to traditional methods.</p>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <p><strong>Multiple Sellers, Diverse Stock:</strong> Choose from a wide range of sellers with diverse stock options, ensuring you always find the best deal.</p>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <p><strong>Seller Performance Control:</strong> Disable sellers with high complaint rates directly, giving you complete control over your transactions.</p>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <p><strong>Convenient Deposit Methods:</strong> Fund your account easily with various options like CDM, online transfer, and UPI.</p>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <p><strong>GST & Non-GST Support:</strong> Cater to all your needs with both GST and non-GST compliant transactions.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className='aspect-square relative '>
                            <Image className='object-contain' alt="What-is-bbps-api" src="/assets/images/stock-exchange.jpg" fill />
                        </div>
                    </div>
                </Section>

                <section className=''>
                    <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 justify-center">
                        <div>
                            <Image alt="What-is-reacharge-api" src="/assets/images/benefits.jpg" width={500} height={500} />
                        </div>
                        <div>
                            <div className="max-w-lg">
                                <h2 className='mb-3 text-3xl font-medium'>Advantages of using NkPays Exchange</h2>
                                <ul className='text-gray-500 mt-4'>
                                    <li className='flex items-center gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <p><strong>Sell Without Software:</strong> No need for complex software or API integrations. Our user-friendly platform makes selling a breeze.</p>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <p><strong>Multiple API Integration:</strong> Integrate with multiple APIs for even wider reach and flexibility if needed.</p>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <p><strong>Instant Redeem:</strong> Access your funds instantly after every successful transaction.</p>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <p><strong>Low Minimum Transfer:</strong> Start small with a minimum transfer amount of only ₹5,000. </p>
                                    </li>
                                    <li className='flex items-center gap-3'>
                                        <span><CheckCircle className='w-6 h-6 text-primary' /></span>
                                        <p><strong>Zero Platform Fees:</strong> Enjoy no platform rental charges or software investment required.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className=''>
                    <div className="grid grid-cols-1 md:grid-cols-2 container mx-auto px-4 justify-center items-center">

                        <div>
                            <div className="max-w-lg">
                                <h2 className='mb-3 text-3xl font-medium'>Partner with Us</h2>
                                <p className='text-gray-500'>{`By partnering with NKPays for Recharge Service API integration, you gain access to a reliable and efficient solution that enhances your service offerings. Simplify the recharge process for your users, increase customer satisfaction, and stay ahead in the competitive market by leveraging the power of our Recharge Service API.`}</p>
                            </div>
                        </div>
                        <div>
                            <Image alt="bbps-partners" src="/assets/images/tb-3.jpg" width={500} height={500} />
                        </div>
                    </div>
                </section>

            </article>


            <DownloadAppSection />
            <ContactSection />
        </>
    )
}

export default RechargeServicePage