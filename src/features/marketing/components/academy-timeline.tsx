import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useTranslation } from '../i18n/language-context';
import { Play, RotateCcw, X, TrendingUp, BarChart2 } from 'lucide-react';
import { MouseTiltCard } from './mouse-tilt-card';
import { cn } from '@/lib/utils';

export function AcademyTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const timeline = t.academy.timeline;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 85%', 'center center'],
    });

    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div ref={containerRef} className="relative mx-auto mt-24 max-w-6xl w-full">
            {/* Background Vertical Line (Mobile) */}
            <div className="absolute md:hidden left-1/2 top-[28px] bottom-[150px] w-px -translate-x-1/2 bg-white/10" />
            {/* Background Horizontal Line (Desktop) */}
            <div className="hidden md:block absolute left-[12.5%] top-[28px] w-[75%] h-px bg-white/10" />

            {/* Animated Vertical Line (Mobile) */}
            <motion.div
                className="absolute md:hidden left-1/2 top-[28px] bottom-[150px] w-px -translate-x-1/2 origin-top"
                style={{
                    scaleY: lineScale,
                    backgroundImage: 'linear-gradient(to bottom, #ef4444 0%, #f97316 33%, #3b82f6 66%, #10b981 100%)'
                }}
            />
            {/* Animated Horizontal Line (Desktop) */}
            <motion.div
                className="hidden md:block absolute left-[12.5%] top-[28px] w-[75%] h-px origin-left"
                style={{
                    scaleX: lineScale,
                    backgroundImage: 'linear-gradient(to right, #ef4444 0%, #f97316 33%, #3b82f6 66%, #10b981 100%)'
                }}
            />

            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12 md:gap-6">
                {/* Phase 1 */}
                <TimelineNode
                    index={0}
                    icon={<X className="h-4 w-4 text-red-500" />}
                    iconBorder="border-red-500/50"
                    iconGlow="shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                    badge={timeline.phase1.badge}
                    title={timeline.phase1.title}
                    description={timeline.phase1.description}
                    headerClass="bg-red-500/10 text-red-500"
                    current
                >
                    <button className="w-full rounded-lg bg-red-500/10 border border-red-500/20 py-2.5 text-xs font-bold text-red-500 hover:bg-red-500/20 transition-colors">
                        {timeline.phase1.action}
                    </button>
                </TimelineNode>

                {/* Phase 2 */}
                <TimelineNode
                    index={1}
                    icon={<Play className="h-4 w-4 text-orange-500 ml-0.5" />}
                    iconBorder="border-orange-500/50"
                    iconGlow="shadow-[0_0_20px_rgba(249,115,22,0.6)]"
                    badge={timeline.phase2.badge}
                    title={timeline.phase2.title}
                    description={timeline.phase2.description}
                    headerClass="bg-orange-500/10 text-orange-500"
                />

                {/* Phase 3 */}
                <TimelineNode
                    index={2}
                    icon={<BarChart2 className="h-4 w-4 text-blue-500" />}
                    iconBorder="border-blue-500/50"
                    iconGlow="shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    badge={timeline.phase3.badge}
                    title={timeline.phase3.title}
                    description={timeline.phase3.description}
                    headerClass="bg-blue-500/10 text-blue-500"
                />

                {/* Phase 4 */}
                <TimelineNode
                    index={3}
                    icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
                    iconBorder="border-emerald-500/50"
                    iconGlow="shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                    badge={timeline.phase4.badge}
                    title={timeline.phase4.title}
                    description={timeline.phase4.description}
                    headerClass="bg-emerald-500/10 text-emerald-500"
                />

            </div>
        </div>
    );
}

function TimelineNode({
    index,
    icon,
    iconBorder,
    iconGlow,
    badge,
    title,
    description,
    headerClass,
    locked,
    current,
    children
}: {
    index: number;
    icon: React.ReactNode;
    iconBorder: string;
    iconGlow?: string;
    badge: string;
    title: string;
    description: string;
    headerClass: string;
    locked?: boolean;
    current?: boolean;
    children?: React.ReactNode;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const { t } = useTranslation();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="flex w-full flex-col items-center md:flex-1 relative" // w-full required for correct rendering in vertical flex
        >
            {/* Node Circle */}
            <div className={cn(
                "relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-background border-2 z-20 mb-8 md:mb-10",
                iconBorder, iconGlow
            )}>
                {icon}
            </div>

            {/* Card */}
            <div className="w-full relative h-full flex flex-col">
                {current && (
                    <div className="absolute -top-3 right-4 z-30 rounded bg-red-500 px-2 py-0.5 text-[10px] font-black tracking-wider text-white">
                        {t.academy.timeline.phase1.current}
                    </div>
                )}
                <div className="flex-1 w-full flex flex-col items-stretch h-full">
                    {/* We wrap MouseTiltCard in a flex-1 container to make it stretch */}
                    <MouseTiltCard intensity={0.2} maxRotation={5} enableGlare>
                        {/* Setting a min-h-[360px] to ensure all cards have identical heights and look clean */}
                        <div className={cn(
                            "glass-card glass-noise w-full rounded-2xl p-6 text-left relative overflow-hidden h-full min-h-[260px] flex flex-col",
                            locked ? "opacity-60 grayscale-[0.3]" : ""
                        )}>
                            <div className={cn("inline-block self-start rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider mb-4", headerClass)}>
                                {badge}
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
                            <p className="text-sm text-muted-foreground">{description}</p>

                            {children && (
                                <div className="mt-auto pt-6">
                                    {children}
                                </div>
                            )}

                            {/* Background graph mockup */}
                            <div className="absolute right-0 top-12 opacity-[0.03] pointer-events-none -z-10 w-[120%] h-32 flex items-end">
                                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full text-foreground stroke-current">
                                    <path d="M0 40 L10 30 L20 35 L30 20 L40 25 L50 15 L60 20 L70 5 L80 15 L100 0" fill="none" strokeWidth="2" />
                                    <path d="M0 40 L10 30 L20 35 L30 20 L40 25 L50 15 L60 20 L70 5 L80 15 L100 0 L100 40 Z" fill="currentColor" fillOpacity="0.2" stroke="none" />
                                </svg>
                            </div>
                        </div>
                    </MouseTiltCard>
                </div>
            </div>
        </motion.div>
    );
}
