import { skillCategories } from '@/data/skills'

export function Skills() {
    return (
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 animate-fade-up">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Proficiency</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A comprehensive toolset for building robust, scalable, and user-centric digital solutions.
                    </p>
                </div>

                <div className="space-y-12">
                    {skillCategories.map((category, catIndex) => (
                        <div key={catIndex} className="animate-fade-up" style={{ animationDelay: `${catIndex * 100}ms` }}>
                            <div className="flex items-center gap-4 mb-6">
                                <h3 className="text-2xl font-semibold">{category.title}</h3>
                                <div className="h-px bg-border flex-grow"></div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {category.skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="group relative p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
                                    >
                                        <div className="flex flex-col items-center text-center gap-2">
                                            <div className="text-4xl mb-2 transition-transform duration-300 group-hover:scale-110">
                                                {skill.icon}
                                            </div>
                                            <h4 className="font-bold text-foreground">{skill.name}</h4>
                                            <span className="text-xs text-muted-foreground">{skill.description}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
