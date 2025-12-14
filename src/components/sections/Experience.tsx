import { Calendar, GraduationCap, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { experiences, education, certifications } from '@/data/experience'

export function Experience() {

    return (
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 animate-fade-up">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Experience & Education</h2>
                    <p className="text-muted-foreground">My professional journey and qualifications</p>
                </div>

                <Tabs defaultValue="experience" className="w-full">
                    <div className="flex justify-center mb-8">
                        <TabsList className="grid w-full max-w-md grid-cols-3">
                            <TabsTrigger value="experience">Experience</TabsTrigger>
                            <TabsTrigger value="education">Education</TabsTrigger>
                            <TabsTrigger value="certifications">Certified</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="experience" className="space-y-6">
                        {experiences.map((exp, index) => (
                            <Card key={index} className="transition-all hover:shadow-md border-border/60">
                                <CardHeader>
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                        <div>
                                            <CardTitle className="text-xl text-primary">{exp.role}</CardTitle>
                                            <p className="font-medium text-lg mt-1">{exp.company}</p>
                                        </div>
                                        <div className="flex items-center text-muted-foreground bg-muted px-3 py-1 rounded-full text-sm">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            {exp.period}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {exp.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>

                    <TabsContent value="education" className="space-y-6">
                        {education.map((edu, index) => (
                            <Card key={index} className="transition-all hover:shadow-md border-border/60">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-2">
                                        <GraduationCap className="w-6 h-6 text-primary" />
                                        <CardTitle className="text-xl">{edu.degree}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold text-lg">{edu.school}</p>
                                    <p className="text-sm text-muted-foreground mb-2">{edu.period}</p>
                                    <p className="text-muted-foreground">{edu.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>

                    <TabsContent value="certifications" className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            {certifications.map((cert, index) => (
                                <Card key={index} className="transition-all hover:shadow-md border-border/60">
                                    <CardHeader>
                                        <div className="flex items-center gap-3">
                                            <Award className="w-5 h-5 text-primary" />
                                            <CardTitle className="text-lg">{cert.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="font-medium">{cert.issuer}</p>
                                        <p className="text-sm text-muted-foreground">Issued: {cert.date}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}
