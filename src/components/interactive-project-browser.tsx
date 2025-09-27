'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { InteractiveProjectCard } from '@/components/interactive-project-card'
import { ProjectModal } from '@/components/project-modal'
import { ProjectData, allProjects } from '@/lib/project-data'

export function InteractiveProjectBrowser() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleProjectExpand = (project: ProjectData) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    // Delay clearing the project to allow for exit animation
    setTimeout(() => setSelectedProject(null), 300)
  }

  const featuredProject = allProjects.find(p => p.featured)
  const otherProjects = allProjects.filter(p => !p.featured)

  return (
    <section
      id="projects"
      ref={ref}
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16"
    >
      <div className="container mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-8xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
          }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-impact text-lightning-gradient mb-4">
            Here&apos;s What I&apos;ve Built
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Real projects you can explore and interact with - built with modern development practices
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="space-y-8 lg:space-y-12">
          {/* Featured Project */}
          {featuredProject && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              <div className="mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="flex items-center gap-3 mb-2"
                >
                  <div className="w-1 h-8 bg-lightning-gradient rounded-full"></div>
                  <h3 className="text-xl sm:text-2xl font-bold text-lightning-yellow">
                    Featured Project
                  </h3>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="text-gray-400 text-sm ml-7 pb-4 xs:pb-6"
                >
                  My first client success - demonstrating real development capabilities
                </motion.p>
              </div>

              <InteractiveProjectCard
                project={featuredProject}
                featured={true}
                onExpand={handleProjectExpand}
              />
            </motion.div>
          )}

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              <div className="mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="flex items-center gap-3 mb-2"
                >
                  <div className="w-1 h-8 bg-lightning-gradient rounded-full"></div>
                  <h3 className="text-xl sm:text-2xl font-bold text-lightning-yellow">
                    More Projects
                  </h3>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="text-gray-400 text-sm ml-7"
                >
                  Additional projects demonstrating various technologies and approaches
                </motion.p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {otherProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.7 + index * 0.1,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                  >
                    <InteractiveProjectCard
                      project={project}
                      featured={false}
                      onExpand={handleProjectExpand}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Coming Soon Placeholder */}
          {allProjects.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="text-center py-12"
            >
              <div className="max-w-md mx-auto space-y-4">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-4xl"
                >
                  🚧
                </motion.div>
                <h3 className="text-xl font-semibold text-lightning-yellow">
                  More Projects Coming Soon
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Next project: Full-stack e-commerce platform with React Native mobile app,
                  showcasing cross-platform development and advanced payment integration. Currently in development.
                </p>
                <div className="flex justify-center">
                  <div className="px-4 py-2 bg-lightning-gradient/10 border border-lightning-yellow/30 rounded-full">
                    <span className="text-lightning-orange text-sm font-medium">
                      In Development
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.6,
            delay: 0.8,
            ease: [0.23, 1, 0.32, 1]
          }}
          className="text-center mt-16 lg:mt-20"
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-lightning-yellow">
              Explore the Technical Implementation
            </h3>
            <p className="text-gray-300 leading-relaxed">
              See how modern development practices and technical decisions create real results.
              Each project demonstrates different aspects of full-stack development.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="pt-4"
            >
              <a
                href="#ai-lab"
                className="inline-flex items-center gap-2 px-8 py-3 bg-lightning-gradient text-lightning-black font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                <span>⚡</span>
                See More Projects
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}