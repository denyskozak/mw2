import { Navigation } from '../components/navigation/navigation.jsx'
import { MagicCanvas } from '../components/magic-canvas.jsx'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@radix-ui/themes'
import { useNavigate } from 'react-router'

export function MainRoute() {
  const logoRef = useRef(null)
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!logoRef.current) return
    const tl = gsap.timeline({ repeat: -1, yoyo: true })

    tl.to(logoRef.current, { y: -20, duration: 2, ease: 'sine.inOut' })

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 10000)


    return () => {
      tl.kill()
      clearInterval(interval)
    }
  }, [])


  const slides = [
    {
      titles: ['Win Battles', 'Earn Real Rewards'],
      subtitle: 'Claim $MetaWars tokens, loot, and rare gear — fully tradable.',
    },
    {
      titles: ['Fantastic Online Game', 'Based on Sui Blockchain'],
      subtitle: 'Innovative technology which opens new world of opportunities',
    },
    {
      titles: ['Crafted RPG MMO', 'by Blizzard and Riot fans'],
      subtitle: 'Spell-slinging PvP with the thrill of FPS combat.',
    },
  ]


  return (
    <div className="h-full">
      <Navigation />

      <div className="relative justify-center align-middle items-center flex flex-col w-full h-[calc(100%-98px)]">
        <MagicCanvas />
        <img
          ref={logoRef}
          alt="Big Logo"
          className="mt-[86px] max-w-[350px] object-cover z-[2]"
          src="/images/big-logo.webp"
        />

        <img
          alt="Turtle Art"
          className="absolute top-0 left-0 w-full h-full object-cover z-[0]"
          src="/images/background.webp"
        />

        <main className="z-[2] flex justify-center w-full h-full overflow-y-auto">
          <div className=" flex items-center flex-col">
            {/* HeroUI-like header */}
            <div style={{ textAlign: 'center' }}>
              <div className="inline-block max-w-xl text-center justify-center items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slides[index].titles[0]}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg"
                    exit={{ opacity: 0, y: -10 }}
                    initial={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                  >
              <span className="text-4xl lg:text-6xl text-[#00b7fa]">
                {slides[index].titles[0]}
              </span>
                    <span className="text-4xl lg:text-6xl text-[#FF705B]">
                &nbsp;-&nbsp;{slides[index].titles[1]}
              </span>

                    {/*<div*/}
                    {/*  className="mt-4 text-xl text-[#FF705B"*/}
                    {/*>*/}
                    {/*  {slides[index].subtitle}*/}
                    {/*</div>*/}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div
            className="absolute bottom-[20vh]"
          >
            <Button
              size="4"
              onClick={() => navigate('/play')}
            >
              {/*<span className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] via-[#38BDF8] to-[#FBBF24] animate-pulse opacity-100 group-hover:opacity-100 blur-md" />*/}
              Launch Game
            </Button>
          </div>

          <div className="absolute bottom-16 right-0 transform -translate-x-1/2 z-[2] flex flex-col items-center">
            <img
              alt="Sui logo"
              height={200}
              src="/images/Sui_Logo_White.svg"
              width={120}
            />
          </div>
        </main>
      </div>

    </div>
  )
}