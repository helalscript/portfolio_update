import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github, Layers, Cpu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { projects } from '@/data/projects'

export function SingleProject() {
    const { id } = useParams()
    const navigate = useNavigate()
    const project = projects.find(p => p.id === id)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
                <Button onClick={() => navigate('/')}>Back to Home</Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Button variant="ghost" onClick={() => navigate('/')} className="mb-8 pl-0 hover:pl-2 transition-all gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Projects
                </Button>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <div className="text-4xl mb-4">{project.icon}</div>
                            <h1 className="text-4xl font-bold mb-4 text-gradient">{project.title}</h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <Layers className="w-5 h-5 text-primary" /> About The Project
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {project.longDescription}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Cpu className="w-5 h-5 text-primary" /> Key Features
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {project.features?.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-2 text-muted-foreground text-sm">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardContent className="p-6 space-y-6">
                                <div>
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        Technologies
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map(t => (
                                            <Badge key={t} variant="secondary">{t}</Badge>
                                        ))}
                                    </div>
                                </div>

                                {project.stats && (
                                    <div>
                                        <h3 className="font-semibold mb-2">Metrics</h3>
                                        <p className="text-2xl font-bold text-primary">{project.stats}</p>
                                    </div>
                                )}

                                <div className="pt-4 border-t space-y-3">
                                    {project.link && (
                                        <Button className="w-full" asChild>
                                            <a href={project.link} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                                            </a>
                                        </Button>
                                    )}
                                    <Button variant="outline" className="w-full">
                                        <Github className="w-4 h-4 mr-2" /> View Source
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
