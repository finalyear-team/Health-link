import React from 'react'
import { Quote } from 'lucide-react'
import { Card,CardContent,CardHeader } from '@/components/ui/card'
import { Avatar, AvatarImage,AvatarFallback } from '@/components/ui/avatar'

const Testimonials = () => {
  return (
    <section className="w-full py-6">
    <div className="w-full flex items-center justify-center mb-2 text-2xl font-bold text-center px-3 text-primary-600 dark:text-primary-700 sticky top-11 bg-slate-800">
      <Quote className="w-6 h-6 mr-2" /> Testimonials
    </div>
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Hear from Our Satisfied Patients
        </h2>
        <p className="max-w-[600px] md:text-xl/relaxed text-center lg:text-base/relaxed xl:text-xl/relaxed">
          Our patients rave about the convenience, quality, and
          professionalism of our telemedicine services.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        <Card className="bg-background p-6 rounded-xl">
          <CardHeader>
            <Avatar>
              <AvatarImage src="/image/profile-picture.jpg" />
              <AvatarFallback>P1</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <blockquote className="text-muted-foreground italic">
              &quot;HealthLink has been a game-changer for me. I can now
              access top-quality medical care from the comfort of my own
              home. The doctors are knowledgeable and compassionate, and
              the entire process is so convenient.&quot;
            </blockquote>
            <div className="mt-4 text-primary-foreground font-bold">
              Sarah, 35
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background p-6 rounded-xl">
          <CardHeader>
            <Avatar>
              <AvatarImage src="/image/profile-picture.jpg" />
              <AvatarFallback>P2</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <blockquote className="text-muted-foreground italic">
              &quot;I was hesitant to try telemedicine at first, but
              HealthLink has completely changed my mind. The doctors are
              just as attentive and thorough as in-person visits, and I
              love the convenience of being able to get care on my own
              schedule.&quot;
            </blockquote>
            <div className="mt-4 text-primary-foreground font-bold">
              Michael, 42
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background p-6 rounded-xl">
          <CardHeader>
            <Avatar>
              <AvatarImage src="/image/profile-picture.jpg" />
              <AvatarFallback>P3</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <blockquote className="text-muted-foreground italic">
              &quot;I&apos;ve been using HealthLink for over a year now,
              and it&apos;s been a lifesaver. The doctors are always
              available, the prescriptions are delivered quickly, and the
              overall experience is just so much better than traditional
              healthcare.&quot;
            </blockquote>
            <div className="mt-4 text-primary-foreground font-bold">
              Emily, 28
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
  )
}

export default Testimonials