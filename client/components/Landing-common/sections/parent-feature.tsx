import React from 'react'
import Image from 'next/image'
import { Activity } from 'lucide-react'

const ParentFeature = () => {
  return (
    <section className="w-full py-6 ">
    <div className="w-full flex items-center justify-center text-2xl font-bold text-center px-3 text-primary-600 dark:text-primary-700 sticky top-11 dark:bg-slate-800 bg-white">
      <Activity className="w-6 h-6 mr-2" /> HealthLink
    </div>
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-foreground">
            Revolutionizing Healthcare, One Consultation at a Time
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            HealthLink is a cutting-edge telemedicine service that
            provides 24/7 access to top doctors for all your medical
            needs.we&apos;re here to help you
            achieve your best health.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12 ">
        <Image
          src="/image/work.svg"
          alt="How HealthLink Works"
          width={100}
          height={100}
          className="mx-auto rounded-xl object-cover object-center sm:w-full lg:order-last"
        />
        <div className="z-0 flex flex-col justify-center space-y-4 border-l border-primary-700 dark:border-slate-50">
          <ul className="ml-3 grid gap-6">
            <li>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold text-primary-600 dark:text-primary-700">
                  Sign Up or Log In
                </h3>
                <p className="text-muted-foreground">
                  Create an account or log in to access our secure
                  telemedicine platform.
                </p>
              </div>
            </li>
            <li>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold text-primary-600 dark:text-primary-700">
                  Choose a Doctor
                </h3>
                <p className="text-muted-foreground">
                  Browse our directory of top doctors and select the one
                  that best fits your needs.
                </p>
              </div>
            </li>
            <li>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold text-primary-600 dark:text-primary-700">
                  Start Your Consultation
                </h3>
                <p className="text-muted-foreground">
                  Connect with your doctor via secure video call and
                  discuss your health concerns.
                </p>
              </div>
            </li>
            <li>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold text-primary-600 dark:text-primary-700">
                  Receive Your Treatment Plan
                </h3>
                <p className="text-muted-foreground">
                  Get a personalized treatment plan, including any
                  necessary prescriptions, and start your path to better
                  health.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  )
}

export default ParentFeature