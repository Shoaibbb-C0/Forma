import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header, Footer } from '@/components/site';
import './globals.css';
const sans=Geist({variable:'--font-geist-sans',subsets:['latin']});
const mono=Geist_Mono({variable:'--font-geist-mono',subsets:['latin']});
export const metadata:Metadata={metadataBase:new URL('https://forma-spatial-studio.nimble-aspen-2182.chatgpt.site'),title:{default:'Forma — Spaces for the way we live.',template:'%s — Forma'},description:'Architecture and interiors shaped around everyday life. Explore Forma’s concept studies, spatial thinking and design process.',icons:{icon:"/favicon.svg"},alternates:{canonical:"/"},robots:{index:false,follow:false},openGraph:{siteName:'Forma',type:'website'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}><a className="skip" href="#main">Skip to content</a><Header/>{children}<Footer/></body></html>}

