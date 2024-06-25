import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const MainView = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative">
    <Image
      src="/image/bg.jpg"
      alt="Doctor consulting patient via video call"
      width={400}
      height={400}
      className="absolute inset-0 w-full h-full object-cover opacity-50"
    />
    <div className="container px-4 md:px-6 relative">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Connecting You to Quality Healthcare, Anytime, Anywhere
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              HealthLink is a cutting-edge telemedicine service that
              provides 24/7 access to top doctors for all your medical
              needs.
            </p>
          </div>
          <Link
            href="/sign-up/patient"
            className="flex flex-col gap-2 min-[400px]:flex-row"
          >
            <Button>Get Started Now</Button>
          </Link>
          <Link
            href="/sign-up/doctor"
            className="flex flex-col gap-2 min-[400px]:flex-row"
          >
            <Button variant={"secondary"}>Are You Doctor?</Button>
          </Link>
        </div>
      </div>
    </div>
  </section>
  )
}

export default MainView