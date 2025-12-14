import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function Contact() {
    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50 animate-fade-up">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-muted-foreground">
                        Have a project in mind? Let's work together to create something amazing
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <Card>
                        <CardContent className="p-6 sm:p-8">
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Your Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Your Name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Your Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Your Message</Label>
                                    <Textarea
                                        id="message"
                                        rows={5}
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <Button className="w-full">
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-muted">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <a href="mailto:husoaib422@gmail.com" className="font-medium hover:text-primary transition-colors">
                                            husoaib422@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-muted">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Location</p>
                                        <p className="font-medium">
                                            Mohakhali, Dhaka-1207, Bangladesh
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-primary/10 border border-primary/20">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-primary">
                                        Available for freelance work
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Connect With Me</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <a
                                        href="https://github.com/helalscript"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent hover:scale-105 transition-all"
                                    >
                                        <Github className="w-6 h-6" />
                                        <span className="text-sm font-medium">GitHub</span>
                                    </a>

                                    <a
                                        href="https://www.linkedin.com/in/helal-uddin"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent hover:scale-105 transition-all"
                                    >
                                        <Linkedin className="w-6 h-6 text-blue-500" />
                                        <span className="text-sm font-medium">LinkedIn</span>
                                    </a>

                                    <a
                                        href="https://twitter.com/helalscript"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent hover:scale-105 transition-all"
                                    >
                                        <Twitter className="w-6 h-6 text-blue-400" />
                                        <span className="text-sm font-medium">Twitter</span>
                                    </a>

                                    <a
                                        href="mailto:husoaib422@gmail.com"
                                        className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent hover:scale-105 transition-all"
                                    >
                                        <Mail className="w-6 h-6 text-red-500" />
                                        <span className="text-sm font-medium">Email</span>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
