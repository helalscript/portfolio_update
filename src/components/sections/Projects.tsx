import { ExternalLink, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { projects } from '@/data/projects'
import { Link } from 'react-router-dom'

export function Projects() {
    return (
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50 animate-fade-up">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Real-world applications I've built, focusing on scalability, performance, and user experience.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 border-border/60 hover:border-primary/50 flex flex-col h-full">
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="text-4xl">{project.icon}</div>
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                                    {project.title}
                                </CardTitle>
                                <CardDescription className="text-base mt-2">
                                    {project.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="flex-grow">
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {project.tech.map((tech) => (
                                        <Badge key={tech} variant="secondary" className="bg-background/80 backdrop-blur-sm group-hover:bg-primary/10 transition-colors">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>

                            <CardFooter className="pt-6 border-t border-border/50 mt-auto">
                                <Link to={`/project/${project.id}`} className="w-full">
                                    <Button className="w-full group/btn" variant="outline">
                                        View Details
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
